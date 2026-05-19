import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { WorkOrder, WorkOrderPriority, WorkOrderStatus } from '../work-order';
import { WorkOrderDataClient } from '../work-order-data-client';
import { ToastNotifier } from '../../../../core/services/toast';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal';
import { Product } from '../../../product/product';
import { INITIAL_PRODUCTS } from '../../../product/product.seed';

@Component({
  selector: 'app-work-order-list',
  imports: [CommonModule, RouterModule, MatDatepickerModule, ConfirmModalComponent],
  templateUrl: './work-order-list.html',
  styleUrl: './work-order-list.css',
})
export class WorkOrderListComponent {

  private readonly toast = inject(ToastNotifier);
  private readonly router = inject(Router);
    private readonly workOrderService = inject(WorkOrderDataClient);
  modal = viewChild<ConfirmModalComponent>('modal');

  searchValue = signal('');

page = signal(1);

pageSize = signal(10);

showFilter = signal(false);

filterTop = 0;

filterRight = 0;

filters = signal({

  status: null as string | null,

  priority: null as string | null,

  workOrderDate: null as string | null

});

sortField =
  signal<string>('workOrderDate');

sortDirection =
  signal<'asc' | 'desc'>(
    'desc'
  );

  selectedRow =
  signal<WorkOrder | null>(
    null
  );

    products =
      signal<Product[]>(
        INITIAL_PRODUCTS
      );

  WorkOrderStatus = WorkOrderStatus;

statusOptions =

  Object.values(
    WorkOrderStatus
  );

priorityOptions =

  Object.values(
    WorkOrderPriority
  );

workOrders =
  this.workOrderService
    .workOrders;

/* =====================================================
   FILTER
===================================================== */

filteredWorkOrders =
  computed(() => {

    let data = [

      ...this.workOrders()

    ];

    /* SEARCH */

    const search =

      this.searchValue()
        .toLowerCase();

    if (search) {

      data = data.filter(x =>

        x.workOrderNo
          ?.toLowerCase()
          .includes(search)

        ||

        this.getProductName(
          x.productId
        )

          .toLowerCase()

          .includes(search)

      );

    }

    /* STATUS */

    const status =
      this.filters().status;

    if (status) {

      data = data.filter(x =>

        x.status === status

      );

    }

    /* =====================================================
   FILTER INSIDE computed
===================================================== */

const priority =
  this.filters().priority;

if (priority) {

  data = data.filter(x =>

    x.priority === priority

  );

}

/* WO DATE */

const woDate =
  this.filters().workOrderDate;

if (woDate) {

  const selectedDate =

    new Date(woDate)

      .toDateString();

  data = data.filter(x =>

    new Date(
      x.workOrderDate
    )

      .toDateString()

    ===

    selectedDate

  );

}

    /* SORT */

    const field =
      this.sortField();

    const dir =
      this.sortDirection();

    data.sort((a: any, b: any) => {

      let valA: any;
      let valB: any;

      switch(field){

        case 'product':

          valA =
            this.getProductName(
              a.productId
            );

          valB =
            this.getProductName(
              b.productId
            );

          break;

        case 'customer':

          valA =
            this.getCustomerName(
              a.customerId
            );

          valB =
            this.getCustomerName(
              b.customerId
            );

          break;

        case 'qty':

          valA =
            a.orderedQuantity;

          valB =
            b.orderedQuantity;

          break;

        default:

          valA =
            a[field];

          valB =
            b[field];

      }

      if (valA < valB) {

        return dir === 'asc'
          ? -1
          : 1;

      }

      if (valA > valB) {

        return dir === 'asc'
          ? 1
          : -1;

      }

      return 0;

    });

    return data;

  });

/* =====================================================
   PAGINATION
===================================================== */

total = computed(() =>
  this.filteredWorkOrders().length
);

paginatedWorkOrders =
  computed(() => {

    const start =

      (
        this.page() - 1
      )

      *

      this.pageSize();

    return this
      .filteredWorkOrders()

      .slice(

        start,

        start +
        this.pageSize()

      );

  });

totalPages =
  computed(() =>

    Math.ceil(

      this.total()

      /

      this.pageSize()

    )

  );

visiblePages =
  computed(() => {

    const current =
      this.page();

    const total =
      this.totalPages();

    const pages: number[] = [];

    for (

      let i = current;

      i <= Math.min(total, current + 2);

      i++

    ) {

      pages.push(i);

    }

    return pages;

  });

/* =====================================================
   METHODS
===================================================== */

onSearch(value: string){

  this.searchValue.set(value);

  this.page.set(1);
}

clearSearch(){

  this.searchValue.set('');
}

changePage(p: number){

  if (

    p >= 1
    &&
    p <= this.totalPages()

  ) {

    this.page.set(p);
  }
}

changePageSize(size: number){

  this.pageSize.set(+size);

  this.page.set(1);
}

selectStatus(value: string){

  this.filters.update(f => ({

    ...f,

    status: value || null

  }));
}

selectPriority(
  value: string
){

  this.filters.update(f => ({

    ...f,

    priority:
      value || null

  }));

}



openRowDetails(
  row: WorkOrder
){

  this.selectedRow.set(
    row
  );

}

setWorkOrderDate(
  value: string
){

  this.filters.update(f => ({

    ...f,

    workOrderDate:
      value || null

  }));

}

resetFilters(){

  this.filters.set({

    status: null,

    priority: null,

    workOrderDate: null

  });

}
toggleFilter(){

  const btn =

    document.querySelector(
      '.filter-btn'
    ) as HTMLElement;

  const rect =
    btn?.getBoundingClientRect();

  if(rect){

    this.filterTop =
      rect.bottom + 8;

    this.filterRight =
      window.innerWidth -
      rect.right + -65;
  }

  this.showFilter.set(true);
}

closeFilter(){

  this.showFilter.set(false);
}

onAddNewWO(){
      this.router.navigate([
      '/work-order/create'
    ]);
}


sort(field: string){

  if (

    this.sortField() === field

  ) {

    this.sortDirection.update(x =>

      x === 'asc'
        ? 'desc'
        : 'asc'

    );

  }

  else {

    this.sortField.set(field);

    this.sortDirection.set('asc');

  }

}

onView(wo:WorkOrder){
this.router.navigate(['/work-order/', wo.workOrderId]);
}

onEdit(wo:WorkOrder){
this.router.navigate(['/work-order/edit', wo.workOrderId]);
}

onDelete(wo:WorkOrder){
    this.modal()?.open({
      type: 'delete',
      title: 'Delete',
      message: `Are you sure you want to delete ${wo.workOrderId}?`,
      onConfirm: () => {
        this.delete(wo);
      }
    });
  }

  delete(wo:WorkOrder) {
    this.workOrderService.delete(wo.workOrderId);
    this.toast.success('Employee deleted successfully');
  }



/* =====================================================
   HELPERS
===================================================== */

getProgress(wo: WorkOrder){

  if (

    wo.orderedQuantity === 0

  ) {

    return 0;
  }

  return (

    wo.producedQuantity

    /

    wo.orderedQuantity

  ) * 100;
}

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
    ? `${product.productCode} - ${product.productName}`
    : '-';

}

getCustomerName(
  customerId: string | null | undefined
): string {

  if (!customerId) {
    return '-';
  }

  const map: Record<string, string> = {

    'cust-0142':
      'Sundaram Furnishings',

    'cust-0188':
      'Royal Interiors'

  };

  return map[customerId] || customerId;
}
}
