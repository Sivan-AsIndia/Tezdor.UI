import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout';

export const routes: Routes = [
  // ── Public routes ────────────────────────────────────────────
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./feature/auth/login/login').then(m => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./feature/auth/signup/signup').then(m => m.SignupComponent),
  },
  {
    path: 'change-password',
    loadComponent: () =>
      import('./feature/auth/change-password/change-password').then(m => m.ChangePasswordComponent),
  },

  // ── Authenticated layout ──────────────────────────────────────
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      // Dashboard
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./feature/dashboard/dashboard').then(m => m.DashboardComponent),
      },

      // Auth (profile inside layout)
      {
        path: 'profile',
        loadComponent: () =>
          import('./feature/auth/profile/profile').then(m => m.ProfileComponent),
      },

      // ── Product ────────────────────────────────────────────────
      {
        path: 'products',
        loadComponent: () =>
          import('./feature/product/product-list/product-list').then(m => m.ProductListComponent),
      },
      {
        path: 'products/create',
        loadComponent: () =>
          import('./feature/product/product-create/product-create').then(m => m.ProductCreateComponent),
      },
      {
        path: 'products/edit/:id',
        loadComponent: () =>
          import('./feature/product/product-create/product-create').then(m => m.ProductCreateComponent),
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import('./feature/product/product-view/product-view').then(m => m.ProductViewComponent),
      },

      // ── Store / Stock Management ────────────────────────────────
      {
        path: 'store',
        loadComponent: () =>
          import('./feature/store/store-list/store-list').then(m => m.StoreListComponent),
      },
      {
        path: 'store/create',
        loadComponent: () =>
          import('./feature/store/store-create/store-create').then(m => m.StoreCreateComponent),
      },
      {
        path: 'store/:productCode',
        loadComponent: () =>
          import('./feature/store/store-view/store-view').then(m => m.StoreViewComponent),
      },

      // ── Purchase Order ──────────────────────────────────────────
      {
        path: 'purchase-order',
        loadComponent: () =>
          import('./feature/purchase/purchase-order/purchase-order-list/purchase-order-list')
            .then(m => m.PurchaseOrderListComponent),
      },
      {
        path: 'purchase-order/create',
        loadComponent: () =>
          import('./feature/purchase/purchase-order/purchase-order-create/purchase-order-create')
            .then(m => m.PurchaseOrderCreateComponent),
      },
      {
        path: 'purchase-order/edit/:id',
        loadComponent: () =>
          import('./feature/purchase/purchase-order/purchase-order-create/purchase-order-create')
            .then(m => m.PurchaseOrderCreateComponent),
      },
      {
        path: 'purchase-order/:id',
        loadComponent: () =>
          import('./feature/purchase/purchase-order/purchase-order-view/purchase-order-view')
            .then(m => m.PurchaseOrderViewComponent),
      },

      // ── Purchase Invoice ────────────────────────────────────────
      {
        path: 'purchase-invoice',
        loadComponent: () =>
          import('./feature/purchase/purchase-invoice/purchase-invoice-list/purchase-invoice-list')
            .then(m => m.PurchaseInvoiceListComponent),
      },
      {
        path: 'purchase-invoice/create',
        loadComponent: () =>
          import('./feature/purchase/purchase-invoice/purchase-invoice-create/purchase-invoice-create')
            .then(m => m.PurchaseInvoiceCreateComponent),
      },
      {
        path: 'purchase-invoice/edit/:id',
        loadComponent: () =>
          import('./feature/purchase/purchase-invoice/purchase-invoice-create/purchase-invoice-create')
            .then(m => m.PurchaseInvoiceCreateComponent),
      },
      {
        path: 'purchase-invoice/:id',
        loadComponent: () =>
          import('./feature/purchase/purchase-invoice/purchase-invoice-view/purchase-invoice-view')
            .then(m => m.PurchaseInvoiceViewComponent),
      },

      // ── Sales Invoice ────────────────────────────────────────

      {
        path: 'sales-invoice',
        loadComponent: () =>
          import('./feature/sales/sales-invoice-list/sales-invoice-list')
            .then(m => m.SalesInvoiceListComponent),
      },
      {
        path: 'sales-invoice/create',
        loadComponent: () =>
          import('./feature/sales/sales-invoice-create/sales-invoice-create')
            .then(m => m.SalesInvoiceCreateComponent),
      },
      {
        path: 'sales-invoice/edit/:id',
        loadComponent: () =>
          import('./feature/sales/sales-invoice-create/sales-invoice-create')
            .then(m => m.SalesInvoiceCreateComponent),
      },
      {
        path: 'sales-invoice/:id',
        loadComponent: () =>
          import('./feature/sales/sales-invoice-view/sales-invoice-view')
            .then(m => m.SalesInvoiceView),
      },
      // ── Employees ───────────────────────────────────────────────
      {
        path: 'employees',
        loadComponent: () =>
          import('./feature/employee/employee-list/employee-list').then(m => m.EmployeeListComponent),
      },
      {
        path: 'employees/create',
        loadComponent: () =>
          import('./feature/employee/employee-create/employee-create').then(m => m.EmployeeCreateComponent),
      },
      {
        path: 'employees/edit/:id',
        loadComponent: () =>
          import('./feature/employee/employee-create/employee-create').then(m => m.EmployeeCreateComponent),
      },
      {
        path: 'employees/:id',
        loadComponent: () =>
          import('./feature/employee/employee-detail/employee-detail').then(m => m.EmployeeDetailComponent),
      },

      // ── Attendance ──────────────────────────────────────────────
      {
        path: 'attendance',
        loadComponent: () =>
          import('./feature/employee/attendance/attendance-list/attendance-list')
            .then(m => m.AttendanceListComponent),
      },
      {
        path: 'attendance/create',
        loadComponent: () =>
          import('./feature/employee/attendance/attendance-create/attendance-create')
            .then(m => m.AttendanceCreateComponent),
      },
      {
        path: 'attendance/:id',
        loadComponent: () =>
          import('./feature/employee/attendance/attendance-detail/attendance-detail')
            .then(m => m.AttendanceDetailComponent),
      },
      {
        path: 'attendance/:id/lines',
        loadComponent: () =>
          import('./feature/employee/attendance/attendance-lines/attendance-lines')
            .then(m => m.AttendanceLinesComponent),
      },

      // ── Salary ──────────────────────────────────────────────────
      {
        path: 'salary',
        loadComponent: () =>
          import('./feature/employee/salary/salary-list/salary-list').then(m => m.SalaryListComponent),
      },
      {
        path: 'salary/create',
        loadComponent: () =>
          import('./feature/employee/salary/salary-create/salary-create').then(m => m.SalaryCreateComponent),
      },
      {
        path: 'salary/edit/:id',
        loadComponent: () =>
          import('./feature/employee/salary/salary-create/salary-create').then(m => m.SalaryCreateComponent),
      },
      {
        path: 'salary/:id',
        loadComponent: () =>
          import('./feature/employee/salary/salary-detail/salary-detail').then(m => m.SalaryDetailComponent),
      },

      // ── Petty Cash ──────────────────────────────────────────────
      {
        path: 'petty-cash',
        loadComponent: () =>
          import('./feature/employee/petty-cash/petty-cash-list/petty-cash-list')
            .then(m => m.PettyCashListComponent),
      },
      {
        path: 'petty-cash/create',
        loadComponent: () =>
          import('./feature/employee/petty-cash/petty-cash-create/petty-cash-create')
            .then(m => m.PettyCashCreateComponent),
      },
      {
        path: 'petty-cash/edit/:id',
        loadComponent: () =>
          import('./feature/employee/petty-cash/petty-cash-create/petty-cash-create')
            .then(m => m.PettyCashCreateComponent),
      },
      {
        path: 'petty-cash/:id',
        loadComponent: () =>
          import('./feature/employee/petty-cash/petty-cash-detail/petty-cash-detail')
            .then(m => m.PettyCashDetailComponent),
      },

      // ── General ledger Entry ──────────────────────────────────────────────
      {
        path: 'general-ledger-entries',
        loadComponent: () =>
          import('./feature/ledger/general-ledger-entry/general-ledger-entry')
            .then(m => m.GeneralLedgerEntryComponent),
      },
      {
        path: 'general-ledger-entries/:id',
        loadComponent: () =>
          import('./feature/ledger/general-ledger-entry-detail/general-ledger-entry-detail')
            .then(m => m.GeneralLedgerEntryDetailComponent),
      },
      {
        path: 'shifts',
        loadComponent: () =>
          import('./feature/employee/shift/shift-list/shift-list')
            .then(m => m.ShiftListComponent),
      },
            {
        path: 'shift/create',
        loadComponent: () =>
          import('./feature/employee/shift/shift-create/shift-create')
            .then(m => m.ShiftCreateComponent),
      },
    ],
  },

  // Catch-all
  { path: '**', redirectTo: 'login' },
];
