import {
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BomDataClient } from '../../../product/product-bom-data-client';
import { WorkOrder } from '../../work-order/work-order';
import { WorkOrderDataClient } from '../../work-order/work-order-data-client';
import { DayProductionDataClient } from '../day-production-data-client';

import {
  ConsumptionRow,
  LINE_OPTIONS,
  ProductionEntry,
  ProductionStatus,
  SHIFT_OPTIONS,
  SUPERVISOR_OPTIONS,
} from '../day-production';

import { INITIAL_PRODUCTS } from '../../../product/product.seed';
import { Product } from '../../../product/product';
import { WORK_ORDER_SEED } from '../../work-order/work-order.seed';
import { WORK_ORDER_BOM_SEED } from '../../work-order/work-order-bom.seed';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SHIFT_SEED_DATA } from '../../../employee/shift/shift.seed';
import { SearchDropdownComponent } from '../../../../shared/components/search-dropdown/search-dropdown';


function resolveProductName(
  products: Product[],
  productId: string | number | null | undefined,
): string {
  if (!productId) return '';
  const p = products.find((x) => String(x.ProductId) === String(productId));
  return p?.productName ?? String(productId);
}

function resolveMaterialCode(
  products: Product[],
  rawMaterialId: string | number | null | undefined,
): string {
  if (!rawMaterialId) return '';
  const p = products.find((x) => String(x.ProductId) === String(rawMaterialId));
  return p?.productCode ?? String(rawMaterialId);
}

const UOM_LABEL: Record<string, string> = {
  'UOM-NOS': 'Nos',
  'UOM-MTR': 'Meter',
  'UOM-KG':  'Kg',
  'UOM-SHT': 'Sheet',
  'UOM-CFT': 'Cft',
  'UOM-LTR': 'Liter',
  'UOM-SET': 'Set',
  'UOM-PKT': 'Packet',
  'UOM-BOX': 'Box',
};

function resolveUomLabel(unitOfMeasureId: string): string {
  return UOM_LABEL[unitOfMeasureId] ?? unitOfMeasureId ?? 'Nos';
}

function generateBatchNo(workOrderNo: string, date: Date = new Date()): string {
  const yyyy = date.getFullYear();
  const mm   = String(date.getMonth() + 1).padStart(2, '0');
  const dd   = String(date.getDate()).padStart(2, '0');

  const parts  = workOrderNo.split('-');
  const suffix = parts[parts.length - 1] ?? workOrderNo;
  const num    = parseInt(suffix, 10);
  const padded = isNaN(num)
    ? suffix.toUpperCase()
    : 'WO' + String(num).padStart(4, '0');

  return `BATCH-${yyyy}${mm}${dd}-${padded}`;
}

function resolveWarehouseCode(line: any): string {
  return (
    line.warehouseCode   ||
    line.warehouseId     ||
    line.Warehouse       ||
    line.warehouse       ||
    line.sourceWarehouse ||
    line.fromWarehouse   ||
    line.storeCode       ||
    ''
  );
}


@Component({
  selector: 'app-day-production-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, MatDatepickerModule,SearchDropdownComponent],
  templateUrl: './day-production-create.html',
  styleUrl:    './day-production-create.css',
})
export class DayProductionCreateComponent {
  private fb     = inject(FormBuilder);
  private router = inject(Router);
  private cdr    = inject(ChangeDetectorRef);
  service        = inject(DayProductionDataClient);
  woService      = inject(WorkOrderDataClient);
  bomService     = inject(BomDataClient);

  products: Product[] = INITIAL_PRODUCTS;

  id        = input<string>();
  editMode  = computed(() => !!this.id());
  editId    = computed(() => { const r = this.id(); return r ? Number(r) : 0; });
  pageTitle = computed(() => 'Production Entry');

  shiftOptions = SHIFT_SEED_DATA
    .filter(s => s.isActive)
    .map(s => ({
      value: s.shiftId,
      label: `${s.shiftName} (${s.startTime} - ${s.endTime})`,
    }));
  defaultShift = SHIFT_SEED_DATA.find(s => s.isDefault)?.shiftId ?? '';

  lineOptions       = LINE_OPTIONS;
  supervisorOptions = SUPERVISOR_OPTIONS;

  workOrderOptions = computed(() => this.woService.workOrders());

  selectedWorkOrder = signal<WorkOrder | null>(null);
  consumptionRows   = signal<ConsumptionRow[]>([]);
  private _nextRowId = 1;

workOrderDropdownItems = computed(() =>
  this.woService.workOrders().map(wo => ({
    id:   wo.workOrderId ?? '',
    name: `${wo.workOrderNo} — ${wo.pendingQuantity} pending`,
  }))
);


  goodQty = computed(() => {
    const val      = this.formValueSig();
    const produced = +(val.producedQty ?? 0);
    const rejected = +(val.rejectedQty ?? 0);
    return Math.max(0, produced - rejected);
  });

  overUseCount = computed(() =>
    this.consumptionRows().filter(
      row => row.plannedQty !== null && row.actualQty > row.plannedQty,
    ).length,
  );

  netVarianceValue = computed(() =>
    this.consumptionRows().reduce((sum, row) => {
      const variance = row.plannedQty !== null
        ? row.actualQty - row.plannedQty
        : row.actualQty;
      return sum + variance * (row.costPerUnit ?? 0);
    }, 0),
  );


  productionForm: FormGroup = this.fb.group({
    productionNo:    [{ value: '', disabled: true }],
    productionDate:  ['', Validators.required],
    shift:           [this.defaultShift],
    productionLine:  [''],
    workOrderId:     ['', Validators.required],
    supervisorId:    [''],
    producedQty:     [null, [Validators.required, Validators.min(0.001)]],
    rejectedQty:     [0,    [Validators.min(0)]],
    workerCount:     [null],
    startTime:       [''],
    endTime:         [''],
    downtimeMinutes: [0],
    downtimeReason:  [''],
    remarks:         [''],
    status:          ['draft'],
  });

  formValueSig = signal(this.productionForm.getRawValue());

  constructor() {
    this.productionForm.get('productionNo')
      ?.setValue(this.service.generateProductionNo());
    this.productionForm.get('productionDate')
      ?.setValue(new Date().toISOString().split('T')[0]);

    this.productionForm.valueChanges.subscribe(val => {
      this.formValueSig.set(val);
    });

    effect(() => {
      const routeId = this.id();
      if (!routeId) return;

      const entry = this.service.getById(Number(routeId));
      if (!entry) {
        this.router.navigate(['/production']);
        return;
      }

      this.productionForm.patchValue(entry);
      this.consumptionRows.set(entry.consumptions ?? []);

      const wo = this.woService
        .workOrders()
        .find(w => String(w.workOrderId) === String(entry.workOrderId)) ?? null;

      this.selectedWorkOrder.set(wo);
    });
  }

onWorkOrderChange(workOrderId: string): void {
    // form control sync
    this.productionForm.get('workOrderId')?.setValue(workOrderId);
    this.productionForm.get('workOrderId')?.markAsTouched();
    this.formValueSig.set(this.productionForm.getRawValue());

    if (!workOrderId) {
      this.selectedWorkOrder.set(null);
      this.consumptionRows.set([]);
      return;
    }
    const workOrder = WORK_ORDER_SEED.find(wo => wo.workOrderId === workOrderId) ?? null;
    this.selectedWorkOrder.set(workOrder as any);

    if (!workOrder) {
      this.consumptionRows.set([]);
      return;
    }

    const bomLines = WORK_ORDER_BOM_SEED.filter(line => line.workOrderId === workOrderId);
    if (bomLines.length === 0) {
      this.consumptionRows.set([]);
      return;
    }
    const sharedBatchNo = generateBatchNo((workOrder as any).workOrderNo ?? workOrderId);

    const rows: ConsumptionRow[] = bomLines.map((line, index) => {

      const materialName = line.materialName?.trim()
        ? line.materialName
        : line.itemName?.trim()
          ? line.itemName
          : line.rawMaterialId
            ? resolveProductName(this.products, line.rawMaterialId)
            : `Material ${index + 1}`;

      const materialCode =
        String(line.materialCode ?? '').trim() ||
        (line.rawMaterialId
          ? resolveMaterialCode(this.products, line.rawMaterialId)
          : '');

      const uomName       = resolveUomLabel(line.unitOfMeasureId);
      const warehouseCode = resolveWarehouseCode(line);

      return {
        id:            this._nextRowId++,
        materialId:    line.rawMaterialId ?? '',
        materialName,
        materialCode,
        plannedQty:    line.requiredQuantity ?? 0,
        actualQty:     line.consumedQuantity > 0
                         ? line.consumedQuantity
                         : (line.requiredQuantity ?? 0),
        uomId:         line.unitOfMeasureId ?? '',
        uomName,
        batchNo:       sharedBatchNo,
        warehouseCode,
        remarks:       '',
        isExtra:       false,
        costPerUnit:   0,
      };
    });

    this.consumptionRows.set(rows);
  }

  getProductName(productId: string | number | null | undefined): string {
    return resolveProductName(this.products, productId);
  }

  getVariance(row: ConsumptionRow): number {
    return row.plannedQty !== null
      ? row.actualQty - row.plannedQty
      : row.actualQty;
  }

  updateActualQty(rowId: number, value: number): void {
    this.consumptionRows.update(rows =>
      rows.map(r => r.id === rowId ? { ...r, actualQty: value } : r),
    );
  }

  updateRowField(rowId: number, field: keyof ConsumptionRow, value: any): void {
    this.consumptionRows.update(rows =>
      rows.map(r => r.id === rowId ? { ...r, [field]: value } : r),
    );
  }

  resetToPlanned(): void {
    this.consumptionRows.update(rows =>
      rows.map(r => ({ ...r, actualQty: r.plannedQty ?? r.actualQty })),
    );
  }

  addExtraItem(): void {
    const row: ConsumptionRow = {
      id:            this._nextRowId++,
      materialId:    '',
      materialName:  'Extra Item',
      materialCode:  '',
      plannedQty:    null,
      actualQty:     0,
      uomId:         '',
      uomName:       '',
      batchNo:       '',   
      warehouseCode: '',  
      remarks:       '',
      isExtra:       true,
      costPerUnit:   0,
    };
    this.consumptionRows.update(rows => [...rows, row]);
  }

  removeExtraItem(rowId: number): void {
    this.consumptionRows.update(rows => rows.filter(r => r.id !== rowId));
  }

  recomputeGoodQty(): void {}

  hasError(field: string): boolean {
    const c = this.productionForm.get(field);
    return !!(c?.invalid && c?.touched);
  }


  private buildPayload(status: 'draft' | 'submitted'): Omit<ProductionEntry, 'id'> {
    const val = this.productionForm.getRawValue();
    const wo  = this.selectedWorkOrder();

    const supervisorLabel =
      SUPERVISOR_OPTIONS.find(s => s.value === val.supervisorId)?.label ?? '';
    const supervisorName = supervisorLabel.includes('—')
      ? supervisorLabel.split('—')[1].trim()
      : supervisorLabel;

    return {
      productionNo:    val.productionNo,
      workOrderId:     Number(val.workOrderId),
      workOrderNo:     (wo as any)?.workOrderNo   ?? '',
      productId:       Number((wo as any)?.productId ?? 0),
      productCode:     resolveMaterialCode(this.products, (wo as any)?.productId),
      productName:     resolveProductName(this.products,  (wo as any)?.productId),
      productionLine:  val.productionLine,
      productionDate:  val.productionDate,
      shift:           val.shift,
      supervisorId:    val.supervisorId,
      supervisorName,
      workerCount:     +(val.workerCount     ?? 0),
      producedQty:     +(val.producedQty     ?? 0),
      rejectedQty:     +(val.rejectedQty     ?? 0),
      goodQty:         this.goodQty(),
      uom:             (wo as any)?.uom      ?? 'Nos',
      startTime:       val.startTime         ?? '',
      endTime:         val.endTime           ?? '',
      downtimeMinutes: +(val.downtimeMinutes ?? 0),
      downtimeReason:  val.downtimeReason    ?? '',
      remarks:         val.remarks           ?? '',
      status,
      createdAt:       new Date().toISOString(),
      updatedAt:       new Date().toISOString(),
      consumptions:    this.consumptionRows(),
    };
  }


  onSaveDraft(): void {
    const payload = this.buildPayload('draft');
    if (this.editMode()) {
      this.service.update({ ...payload, id: this.editId() });
    } else {
      this.service.add(payload);
    }
    this.router.navigate(['/day-production']);
  }


  onSave(): void {
    if (!this.productionForm.valid) {
      this.productionForm.markAllAsTouched();
      return;
    }
    const payload = this.buildPayload('submitted');
    if (this.editMode()) {
      this.service.update({ ...payload, id: this.editId() });
    } else {
      this.service.add(payload);
    }
    this.router.navigate(['/day-production']);
  }

  onCancel(): void {
    this.router.navigate(['/day-production']);
  }
}