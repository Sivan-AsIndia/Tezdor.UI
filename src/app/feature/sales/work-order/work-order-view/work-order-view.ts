import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WorkOrderDataClient } from '../work-order-data-client';
import { WorkOrder } from '../work-order';
import { WorkOrderBomLine } from '../work-order-bom';
import { CommonModule } from '@angular/common';
import { Product } from '../../../product/product';
import { INITIAL_PRODUCTS } from '../../../product/product.seed';
import { MasterDataClient } from '../../../../core/services/master-data';

@Component({
  selector: 'app-work-order-view',
  imports: [CommonModule, RouterModule],
  templateUrl: './work-order-view.html',
  styleUrl: './work-order-view.css',
})
export class WorkOrderViewComponent {




  private readonly route =
    inject(ActivatedRoute);

  private readonly service =
    inject(WorkOrderDataClient);

  private readonly masterData = inject(MasterDataClient);



  workOrderId =
    this.route.snapshot.paramMap.get('id') || '';


  workOrder =
    signal<WorkOrder | null>(null);



  bomLines =
    signal<WorkOrderBomLine[]>([]);

  products =
    signal<Product[]>(
      INITIAL_PRODUCTS
    );



  constructor() {

    this.loadData();

  }

  totalMaterialCost =
computed(() => {

  return this.bomLines()

    .reduce(

      (
        total,
        line
      ) =>

        total +

        (
          line.requiredQuantity * 100
        ),

      0

    );

});


  loadData(): void {

    /* ===== WORK ORDER ===== */

    const wo =

      this.service.getById(
        this.workOrderId
      );

    if (!wo) {

      return;

    }

    this.workOrder.set(

      structuredClone(wo)

    );

    /* ===== BOM LINES ===== */

    const lines =

      this.service
        .getBomLinesByWorkOrderId(
          this.workOrderId
        );

    this.bomLines.set(

      structuredClone(lines)

    );

  }



  progress =
    computed(() => {

      const wo =
        this.workOrder();

      if (!wo) {
        return 0;
      }

      if (
        !wo.orderedQuantity
      ) {
        return 0;
      }

      return Math.round(

        (
          wo.producedQuantity
          /
          wo.orderedQuantity
        ) * 100

      );

    });



  getProductName(
    productId: number | null
  ): string {

    if (!productId) {
      return '-';
    }

    const product =
      this.products()
        .find(x =>
          x.id === productId
        );

    return product
      ? `${product.productName}`
      : '-';

  }

  formatCurrency(
    value: number
  ): string {

    return new Intl.NumberFormat(

      'en-IN',

      {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }

    ).format(value);

  }

  getProductCode(
    productId: number | null
  ): string {

    if (!productId) {
      return '-';
    }

    const product =
      this.products()
        .find(x =>
          x.id === productId
        );

    return product
      ? `${product.productCode}`
      : '-';

  }



  getStatusClass(
    status?: string
  ) {

    return {

      'status-progress':
        status === 'InProgress',

      'status-completed':
        status === 'Completed',

      'status-draft':
        status === 'Draft',

      'status-cancelled':
        status === 'Cancelled'

    };

  }



  getPriorityClass(
    priority?: string
  ) {

    return {

      'priority-high':
        priority === 'High',

      'priority-medium':
        priority === 'Medium',

      'priority-low':
        priority === 'Low',

      'priority-urgent':
        priority === 'Urgent'

    };

  }

  getUnitName(
    unitId: string | null | undefined
  ): string {

    return this.masterData.getUnitById(
      unitId
    )?.unitName || '-';

  }

selectedBomLine =
signal<WorkOrderBomLine | null>(
  null
);

openRowDetails(
  line: WorkOrderBomLine
) {

  this.selectedBomLine.set(
    line
  );

}


}