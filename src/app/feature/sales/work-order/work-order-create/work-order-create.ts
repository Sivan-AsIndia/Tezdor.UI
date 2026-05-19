import { afterNextRender, ChangeDetectorRef, Component, computed, effect, inject, signal } from '@angular/core';
import { WorkOrderDataClient } from '../work-order-data-client';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkOrder, WorkOrderPriority, WorkOrderStatus } from '../work-order';
import { CommonModule } from '@angular/common';
import { VENDOR_OPTIONS, WAREHOUSE_OPTIONS } from '../../../store/store';
import { INITIAL_PRODUCTS } from '../../../product/product.seed';
import { Product } from '../../../product/product';
import { WorkOrderBomLine } from '../work-order-bom';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { SearchDropdownComponent } from '../../../../shared/components/search-dropdown/search-dropdown';
import { ToastNotifier } from '../../../../core/services/toast';
import { MasterDataClient } from '../../../../core/services/master-data';
import { getBomByProductId } from '../../../product/product-bom.seed';

@Component({
  selector: 'app-work-order-create',
  imports: [RouterModule, CommonModule, SearchDropdownComponent, NgxEditorModule, ReactiveFormsModule, MatDatepickerModule],
  templateUrl: './work-order-create.html',
  styleUrl: './work-order-create.css',
})
export class WorkOrderCreateComponent {

  /* ====INJECT ===== */

  private readonly fb =
    inject(FormBuilder);

  private readonly router =
    inject(Router);

  private readonly route =
    inject(ActivatedRoute);

  private readonly service =
    inject(WorkOrderDataClient);
  private readonly toast = inject(ToastNotifier);
  private readonly masterData = inject(MasterDataClient);

  /* === MODE ======= */

  workOrderId =
    this.route.snapshot
      .paramMap
      .get('id');

  isEdit =
    !!this.workOrderId;

  today =
    new Date()
      .toISOString()
      .substring(0, 10);

  /* ===  ENUMS ========= */

  priorityOptions =
    Object.values(
      WorkOrderPriority
    );

  statusOptions =
    Object.values(
      WorkOrderStatus
    );

  WorkOrderStatus = WorkOrderStatus;

  /* ===== OPTIONS ============ */

  vendorOptions =
    VENDOR_OPTIONS;

  warehouseOptions =
    WAREHOUSE_OPTIONS;

  products =
    signal<Product[]>(
      INITIAL_PRODUCTS
    );

  editor!: Editor;

  readonly editorForm = new FormGroup({

    remarks:
      new FormControl('')

  });

  showEditor =
    signal(false);
  private readonly cdr =
    inject(ChangeDetectorRef);

  readonly toolbar: Toolbar = [

    ['bold', 'italic', 'underline'],

    ['strike'],

    ['code', 'blockquote'],

    [
      {
        heading: [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6'
        ]
      }
    ],

    ['ordered_list', 'bullet_list'],

    ['link', 'image'],

    ['text_color', 'background_color'],

    ['horizontal_rule'],

    ['undo', 'redo']

  ];

  /* ==========  BOM ========= */

  bomLines =
    signal<WorkOrderBomLine[]>([]);

  isBomGenerated =
    computed(() =>

      this.bomLines().length > 0

    );

  estimatedLeadTime =
    signal<number>(0);

  /* ====== FORM ========== */

  form = this.fb.group({

    workOrderNo: [''],

    workOrderDate: [
      '',
      Validators.required
    ],

    priority: [
      WorkOrderPriority.Normal,
      Validators.required
    ],

    productId: [
      null as number | null,
      [Validators.required]
    ],
    

    orderedQuantity: [
      0,
      [
        Validators.required,
        Validators.min(1)
      ]
    ],

    producedQuantity: [0],

    plannedStartDate: [
      '',
      Validators.required
    ],
     uom: ['Nos'], 

    plannedEndDate: [
      '',
      Validators.required
    ],

    actualStartDate: [''],

    actualEndDate: [''],

    salesOrderId: [''],

    customerId: [''],

    warehouseId: [''],

    remarks: [''],

    status: [
      WorkOrderStatus.Draft
    ]

  });

  onProductChange(
    value: string | null
  ) {

    this.form.controls.productId.setValue(

      value
        ? Number(value)
        : null

    );
    this.bomLines.set([]);

  }

  /* ==== COMPUTED ============ */

  getSelectedProduct() {

    const productId =
      this.form.controls.productId.value;

    return this.products().find(

      x => x.id === productId

    ) ?? null;

  }

  orderedQty =
    computed(() =>

      Number(
        this.form.value
          .orderedQuantity || 0
      )

    );

  producedQty =
    computed(() =>

      Number(
        this.form.value
          .producedQuantity || 0
      )

    );

  pendingQty =
    computed(() =>

      this.orderedQty() -
      this.producedQty()

    );



  totalMaterialCost =
    computed(() => {

      return this.bomLines()

        .reduce(

          (
            sum,
            x
          ) =>

            sum +

            (
              x.requiredQuantity * 100
            ),

          0

        );

    });


  constructor() {

    afterNextRender(() => {
      requestAnimationFrame(() => {
        this.editor = new Editor();   // init here first

        // subscribe AFTER editor is created
        // this.editorForm.controls['remarks']
        //   .valueChanges.subscribe(value => {
        //     this.update('remarks', value || '');
        //   });

        this.showEditor.set(true);
        this.cdr.detectChanges();
      });
    });

    if (!this.isEdit) {

      this.form.patchValue({

        workOrderDate:
          this.today,

        plannedStartDate:
          this.today,

        status:
          WorkOrderStatus.Draft

      });

    }

    /* ======== EDIT LOAD ========== */

    if (this.isEdit) {

      const data =
        this.service.getById(
          this.workOrderId!
        );

      console.log('EDIT DATA', data);

      if (data) {

        this.form.patchValue({

          workOrderNo:
            data.workOrderNo,

          workOrderDate:
            data.workOrderDate,

          priority:
            data.priority,

          productId:
            data.productId,

          orderedQuantity:
            data.orderedQuantity,

          producedQuantity:
            data.producedQuantity,

          plannedStartDate:
            data.plannedStartDate,

          plannedEndDate:
            data.plannedEndDate,

          actualStartDate:
            data.actualStartDate || '',

          actualEndDate:
            data.actualEndDate || '',

          salesOrderId:
            data.salesOrderId || '',

          customerId:
            data.customerId || '',

          warehouseId:
            data.warehouseId || '',

          remarks:
            data.remarks || '',

          status:
            data.status

        });

        /* LOAD EXISTING BOM */

        setTimeout(() => {

          this.loadBomFromWorkOrder(
            this.workOrderId!
          );

          console.log(
            'LOADED BOM',
            this.bomLines()
          );

        });

      }

    }
    // effect(() => {

    //   const productId =
    //     this.form.controls.productId.value;

    //   const qty =
    //     this.form.controls.orderedQuantity.value;

    //   if (productId && qty) {

    //     this.generateBom();

    //   }

    // });

    /* ========PRODUCT + QTY EFFECT ============== */
    // effect(() => {

    //   const product =
    //     this.getSelectedProduct();

    //   if (!product) {

    //     this.bomLines.set([]);

    //     return;

    //   }

    // });

  }

  /* ===== LOAD BOM FROM WORK ORDER ===== */

  loadBomFromWorkOrder(
    workOrderId: string
  ): void {

    const bomLines =

      this.service
        .getBomLinesByWorkOrderId(
          workOrderId
        );

    if (!bomLines.length) {

      this.bomLines.set([]);

      return;

    }

    /* BIND EXISTING BOM */

    this.bomLines.set(

      structuredClone(
        bomLines
      )

    );

  }

  /* ======= SAVE DRAFT ================ */

  saveDraft() {

    try {
      this.save(
        WorkOrderStatus.Draft
      );
    } catch (err: any) {
      this.toast.error(err.message);
      return;
    }



  }

  /* ======= SAVE CONFIRM ========== */

  saveConfirm() {



    try {
      this.save(
        WorkOrderStatus.Confirmed
      );
    } catch (err: any) {
      this.toast.error(err.message);
      return;
    }

  }

  /* ===== APPROVE ===== */

  approveWorkOrder(): void {

    if (!this.workOrderId) {

      this.toast.warning(
        'Invalid Work Order'
      );

      return;

    }

    const existing =
      this.service.getById(
        this.workOrderId
      );

    if (!existing) {

      this.toast.error(
        'Work Order not found'
      );

      return;

    }

    const updated: WorkOrder = {

      ...existing,

      status:
        WorkOrderStatus.Confirmed,

      confirmedBy:
        'emp-admin',

      confirmedByName:
        'Admin',

      confirmedDate:
        new Date().toISOString(),

      updatedOn:
        new Date().toISOString()

    };

    this.service.update(updated);

    this.toast.success(
      'Work Order approved successfully'
    );

    this.router.navigate([

      '/work-orders'

    ]);

  }


  calculateLeadTime() {

    const start =
      this.form.value
        .plannedStartDate;

    const end =
      this.form.value
        .plannedEndDate;

    if (!start || !end) {

      this.estimatedLeadTime.set(0);

      return;

    }

    const startDate =
      new Date(start);

    const endDate =
      new Date(end);

    const diffTime =

      endDate.getTime()

      -

      startDate.getTime();

    const diffDays =

      Math.ceil(

        diffTime /

        (
          1000 *
          60 *
          60 *
          24
        )

      );

    this.estimatedLeadTime.set(

      diffDays > 0
        ? diffDays
        : 0

    );

  }

  /* ========== SAVE ============ */

  save(
    status:
      WorkOrderStatus
  ) {

    if (
      this.form.invalid
    ) {

      this.form.markAllAsTouched();
      this.toast.error('Please fix validation errors');
      return;

    }

    /* ========= VALIDATION ======= */

    if (

      this.pendingQty() < 0

    ) {

      this.toast.error('Produced quantity cannot exceed ordered quantity');


      return;

    }

const data: WorkOrder = {
  workOrderId: this.workOrderId || '',
  workOrderNo: this.form.value.workOrderNo || '',
  workOrderDate: this.form.value.workOrderDate || '',
  uom: this.form.value.uom || 'Nos',
  productId: this.form.value.productId || null,
  orderedQuantity: Number(this.form.value.orderedQuantity),
  producedQuantity: this.producedQty(),
  pendingQuantity: this.pendingQty(),

  priority: this.form.value.priority!,
  plannedStartDate: this.form.value.plannedStartDate || '',
  plannedEndDate: this.form.value.plannedEndDate || '',

  actualStartDate: this.form.value.actualStartDate || null,
  actualEndDate: this.form.value.actualEndDate || null,

  salesOrderId: this.form.value.salesOrderId || null,
  customerId: this.form.value.customerId || null,
  warehouseId: this.form.value.warehouseId || null,

  remarks: this.form.value.remarks || '',

  status,

  confirmedBy:
    status === WorkOrderStatus.Confirmed ? 'admin' : null,

  confirmedByName:
    status === WorkOrderStatus.Confirmed ? 'Production Manager' : undefined,

  confirmedDate:
    status === WorkOrderStatus.Confirmed ? new Date().toISOString() : null,

  isActive: true,
  isCancelled: status === WorkOrderStatus.Cancelled,
  isCompleted: status === WorkOrderStatus.Completed,
  isProductionStarted:
    status === WorkOrderStatus.InProgress || this.producedQty() > 0,


      createdBy:
        'admin',

      createdOn:
        new Date()
          .toISOString(),

      updatedBy:
        'admin',

      updatedOn:
        new Date()
          .toISOString(),

      bomLines: []

    };

    /* ======== SAVE ============= */

    if (this.isEdit) {

      this.service.update(
        data
      );
      this.service.updateBomLines(

        data.workOrderId!,

        this.bomLines()

      );
      this.toast.success(
        'Work Order updated successfully'
      );

    } else {

      const savedWorkOrder =

        this.service.add(
          data
        );

      const bomLines: WorkOrderBomLine[] =

        this.bomLines().map(x => ({

          ...x,

          workOrderId:
            savedWorkOrder.workOrderId!

        }));

      this.service.addBomLines(
        bomLines
      );
    }

    /* ============ NAVIGATE ========== */

    this.router.navigate([

      '/work-orders'

    ]);

  }

  /* =============== CANCEL ============ */

  onCancel() {

    this.router.navigate([

      '/manufacturing/work-order/list'

    ]);

  }

  /* ==== HELPERS ==== */

  getLevelClass(
    level: number
  ) {

    switch (level) {

      case 1:
        return 'dark';

      case 2:
        return 'light';

      case 3:
        return 'orange';

      default:
        return 'light';

    }

  }

  getUom(
    id?: string
  ) {

    switch (id) {

      case 'UOM-SET':
        return 'Set';

      case 'UOM-NOS':
        return 'Nos';

      case 'UOM-MTR':
        return 'Meter';

      case 'UOM-SHEET':
        return 'Sheet';

      case 'UOM-LTR':
        return 'Litre';

      default:
        return '-';

    }

  }

  formatCurrency(
    value: number
  ) {

    return new Intl.NumberFormat(

      'en-IN',

      {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }

    ).format(value);

  }


  generateBom(): void {


    const selectedProduct =
      this.getSelectedProduct();


    if (!selectedProduct) {

      this.bomLines.set([]);

      return;

    }

    const productId =
      selectedProduct.id;

    if (
      (this.form.controls
        .orderedQuantity
        .value ?? 0) <= 0
    ) {

      this.toast.error(
        'Order Quantity must be greater than 0'
      );

      return;

    }

    const qty =
      Number(
        this.form.controls
          .orderedQuantity.value || 0
      );


    const bomSeed =
      getBomByProductId(productId);

    console.log(
      'BOM SEED',
      bomSeed
    );

    if (!bomSeed?.length) {

      this.bomLines.set([]);

      return;

    }

    const lines: WorkOrderBomLine[] =

      bomSeed.map(line => {

        const bomQty =
          Number(line.quantity || 0);

        const wastage =
          Number(line.wastagePercent || 0);

        const requiredQty =
          bomQty *
          qty *
          (
            1 + (wastage / 100)
          );

        return {

          workOrderBomLineId:
            crypto.randomUUID(),

          workOrderId:
            this.workOrderId || '',

          productStructureId:
            String(line.id),

          parentLineId:
            line.parentId
              ? String(line.parentId)
              : null,

          itemName:
            line.itemName,

          level:
            line.level,

          rawMaterialId:
            line.rawMaterialId,

          requiredQuantity:
            Number(
              requiredQty.toFixed(2)
            ),

          consumedQuantity:
            0,

          pendingQuantity:
            Number(
              requiredQty.toFixed(2)
            ),

          wastagePercentage:
            wastage,

          // unitOfMeasureId:
          //   line.unitId,

          createdOn:
            new Date().toISOString(),

          updatedOn:
            new Date().toISOString(),


        };

      });

    console.log(
      'FINAL BOM LINES',
      lines
    );

    this.bomLines.set(lines);

  }
  readonly productDropdownItems =
    computed(() =>

      this.products().map(p => ({

        id: p.id.toString(),

        name:
          `${p.productCode} - ${p.productName}`,

        data: p

      }))

    );

  readonly customerDropdownItems =
    computed(() =>

      this.vendorOptions.map(c => ({

        id:
          c.code,

        name:
          `${c.code} - ${c.name}`,

        data:
          c

      }))

    );


  hasError(
    controlName: string
  ): boolean {

    const control =
      this.form.get(controlName);

    return !!(
      control &&
      control.invalid &&
      (
        control.touched ||
        control.dirty
      )
    );

  }

  getUnitName(
    unitId: string | null | undefined
  ): string {

    return this.masterData.getUnitById(
      unitId
    )?.unitName || '-';

  }

  getStatusClass(
    status?: string
  ) {

    return {

      'status-draft':
        status === 'Draft',

      'status-confirmed':
        status === 'Confirmed',

      'status-progress':
        status === 'InProgress',

      'status-completed':
        status === 'Completed',

      'status-cancelled':
        status === 'Cancelled'

    };

  }

}