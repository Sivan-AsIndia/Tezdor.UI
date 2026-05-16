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
import { WORK_ORDER_BOM_SEED } from '../work-order-bom.seed';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { SearchDropdownComponent } from '../../../../shared/components/search-dropdown/search-dropdown';

@Component({
  selector: 'app-work-order-create',
  imports: [RouterModule, CommonModule, SearchDropdownComponent,NgxEditorModule,ReactiveFormsModule,MatDatepickerModule],
  templateUrl: './work-order-create.html',
  styleUrl: './work-order-create.css',
})
export class WorkOrderCreateComponent {

  /* =====================================================
     INJECT
  ===================================================== */

  private readonly fb =
    inject(FormBuilder);

  private readonly router =
    inject(Router);

  private readonly route =
    inject(ActivatedRoute);

  private readonly service =
    inject(WorkOrderDataClient);

  /* =====================================================
     MODE
  ===================================================== */

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

  /* =====================================================
     ENUMS
  ===================================================== */

  priorityOptions =
    Object.values(
      WorkOrderPriority
    );

  statusOptions =
    Object.values(
      WorkOrderStatus
    );

  /* =====================================================
     OPTIONS
  ===================================================== */

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

  /* =====================================================
     BOM
  ===================================================== */

  bomLines =
    signal<WorkOrderBomLine[]>([]);

    isBomGenerated =
computed(() =>

  this.bomLines().length > 0

);

estimatedLeadTime =
signal<number>(0);

  /* =====================================================
     FORM
  ===================================================== */

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
      null as string | null,
      Validators.required
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

  /* =====================================================
     COMPUTED
  ===================================================== */

  selectedProduct =
    computed(() => {

      return this.products()

        .find(x =>

          x.ProductId ===
          this.form.value.productId

        );

    });

  selectedWorkOrderBomSeed =
    computed(() => {

      const productId =
        this.form.value.productId;

      if (!productId) {
        return [];
      }

      let templateWorkOrderId = '';

      switch (productId) {

        case 'prd-sofa-yashika-3-1-1':

          templateWorkOrderId =
            'WO-2026-00001';

          break;

        case 'prd-dining-chair-premium':

          templateWorkOrderId =
            'WO-2026-00002';

          break;

        case 'prd-office-table':

          templateWorkOrderId =
            'WO-2026-00003';

          break;

      }

      return WORK_ORDER_BOM_SEED

        .filter(x =>

          x.workOrderId ===
          templateWorkOrderId

        );

    });

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

    /* ===============================================
       EDIT LOAD
    =============================================== */

    if (this.isEdit) {

      const data =
        this.service.getById(
          this.workOrderId!
        );

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

        if (data.bomLines?.length) {

          this.bomLines.set(
            structuredClone(
              data.bomLines
            )
          );

        }

      }

    }

    /* ===============================================
       PRODUCT + QTY EFFECT
    =============================================== */
effect(() => {

  const product =
    this.selectedProduct();

  if (!product) {

    this.bomLines.set([]);

    return;

  }

});

  }

  /* =====================================================
     SAVE DRAFT
  ===================================================== */

  saveDraft() {

    this.save(
      WorkOrderStatus.Draft
    );

  }

  /* =====================================================
     SAVE CONFIRM
  ===================================================== */

  saveConfirm() {

    this.save(
      WorkOrderStatus.Confirmed
    );

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

  /* =====================================================
     SAVE
  ===================================================== */

  save(
    status:
    WorkOrderStatus
  ) {

    if (
      this.form.invalid
    ) {

      this.form.markAllAsTouched();

      return;

    }

    /* ===============================================
       VALIDATION
    =============================================== */

    if (

      this.pendingQty() < 0

    ) {

      alert(
        'Produced quantity cannot exceed ordered quantity'
      );

      return;

    }

    /* ===============================================
       MODEL
    =============================================== */

    const data: WorkOrder = {

      workOrderId:
        this.workOrderId || '',

      workOrderNo:
        this.form.value
          .workOrderNo || '',

      workOrderDate:
        this.form.value
          .workOrderDate || '',

      productId:
        this.form.value
          .productId || null,

      orderedQuantity:
        Number(
          this.form.value
            .orderedQuantity
        ),

      producedQuantity:
        this.producedQty(),

      pendingQuantity:
        this.pendingQty(),

      priority:
        this.form.value
          .priority!,

      plannedStartDate:
        this.form.value
          .plannedStartDate || '',

      plannedEndDate:
        this.form.value
          .plannedEndDate || '',

      actualStartDate:
        this.form.value
          .actualStartDate || null,

      actualEndDate:
        this.form.value
          .actualEndDate || null,

      salesOrderId:
        this.form.value
          .salesOrderId || null,

      customerId:
        this.form.value
          .customerId || null,

      warehouseId:
        this.form.value
          .warehouseId || null,

      remarks:
        this.form.value
          .remarks || '',

      status,

      confirmedBy:

        status ===
        WorkOrderStatus.Confirmed

          ? 'admin'

          : null,

      confirmedByName:

        status ===
        WorkOrderStatus.Confirmed

          ? 'Production Manager'

          : undefined,

      confirmedDate:

        status ===
        WorkOrderStatus.Confirmed

          ? new Date()
              .toISOString()

          : null,

      isActive: true,

      isCancelled:

        status ===
        WorkOrderStatus.Cancelled,

      isCompleted:

        status ===
        WorkOrderStatus.Completed,

      isProductionStarted:

        status ===
        WorkOrderStatus.InProgress ||

        this.producedQty() > 0,

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

      bomLines:
        structuredClone(
          this.bomLines()
        )

    };

    /* ===============================================
       SAVE
    =============================================== */

    if (this.isEdit) {

      this.service.update(
        data
      );

    } else {

      this.service.add(
        data
      );

    }

    /* ===============================================
       NAVIGATE
    =============================================== */

    this.router.navigate([

      '/manufacturing/work-order/list'

    ]);

  }

  /* =====================================================
     CANCEL
  ===================================================== */

  onCancel() {

    this.router.navigate([

      '/manufacturing/work-order/list'

    ]);

  }

  /* =====================================================
     HELPERS
  ===================================================== */

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

  generateBom() {

  const product =
    this.selectedProduct();

  const qty =
    this.orderedQty();

  const bomSeed =
    this.selectedWorkOrderBomSeed();

  if (!product) {

    this.bomLines.set([]);

    return;

  }

  const lines: WorkOrderBomLine[] =

    bomSeed.map(line => {

      const requiredQty =

        (
          Number(
            line.requiredQuantity
          )

          / 20
        )

        * qty;

      const consumedQty =

        (
          Number(
            line.consumedQuantity
          )

          / 20
        )

        * qty;

      return {

        ...line,

        workOrderBomLineId:
          crypto.randomUUID(),

        workOrderId:
          this.workOrderId || '',

        requiredQuantity:
          Number(
            requiredQty.toFixed(2)
          ),

        consumedQuantity:
          Number(
            consumedQty.toFixed(2)
          ),

        pendingQuantity:

          Number(
            (
              requiredQty -
              consumedQty
            ).toFixed(2)
          ),

        updatedOn:
          new Date()
            .toISOString()

      };

    });

  this.bomLines.set(lines);

}

readonly productDropdownItems =
  computed(() =>

    this.products().map(p => ({

      id:
        p.ProductId,

      name:
        `${p.productCode} - ${p.productName}`,

      data:
        p

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

}