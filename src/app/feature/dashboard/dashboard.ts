import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { GeneralLedgerEntryClient } from '../ledger/general-ledger-entry-client';
import { EmployeeDataClient } from '../employee/employee-data-client';
import { AttendanceDataClient } from '../employee/attendance/attendance-data-client';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ToastNotifier } from '../../core/services/toast';
import { AttendanceType } from '../employee/attendance/attendance-line';


export interface LedgerEntry {
  color: string;
  title: string;
  subtitle: string;
  amount: string;
}

export interface StockAlert {
  name: string;
  qty: string;
  level: 'critical' | 'warning';
}

export interface PendingApproval {
  label: string;
  value: string;
}
export interface StatRow {
  label: string;
  value: string | number;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink,RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {

  private readonly gleService = inject(GeneralLedgerEntryClient);
    private readonly employeeService = inject(EmployeeDataClient);
  private readonly attendanceService = inject(AttendanceDataClient);
  private readonly toast = inject(ToastNotifier);
  private readonly router = inject(Router);

    getEmployeeName(id: string): string {
    const emp = this.employeeMap()[id];
    return emp ? `${emp.firstName} ${emp.lastName}` : '—';
  }
  employees = this.employeeService.employees;
  
  employeeMap = computed(() => {
    const map: Record<string, any> = {};
    this.employees().forEach(e => {
      map[e.employeeId!] = e;
    });
    return map;
  });


AttendanceType = AttendanceType;
  // ===== STATE =====
  entries = this.gleService.activeEntries;
  attendanceList = this.attendanceService.attendanceList() // signal

  recentEntries = computed(() => {
  return [...this.entries()]   // clone
    .sort((a, b) => new Date(b.postingDate).getTime() - new Date(a.postingDate).getTime())
    .slice(0, 4);
});

  // --- KPI Data ---
attendance = computed(() => {

  const employees = this.employeeService.employees() ?? [];
  const total = employees.length;

  const today = new Date().toISOString().split('T')[0];

  //  Get ALL attendance lines once
  const lines = this.attendanceService.lines();

  // Filter today's records
  const todayLines = lines.filter(a =>
    a.attendanceDate === today
  );

  //  Get present employees (unique)
  const presentSet = new Set(
    todayLines
      .filter(a =>
        a.attendanceType === AttendanceType.Present || a.isHalfDay
      )
      .map(a => a.employeeId)
  );

  const present = presentSet.size;

  const percent = total > 0
    ? Math.round((present / total) * 100)
    : 0;

  return {
    present,
    total,
    percent,
    dashArray: `${percent}, 100`
  };

});
  revenue = {
    total: '₹64,280.50',
    growth: '+12.4%',
    bars: [
      { heightPct: 50, opacity: 0.2 },
      { heightPct: 67, opacity: 0.4 },
      { heightPct: 42, opacity: 0.2 },
      { heightPct: 83, opacity: 0.6 },
      { heightPct: 100, opacity: 1.0 },
    ],
  };

  pettyCash = {
    balance: '₹1,240.00',
    latestItem: 'Office Supplies',
    latestAmount: '-$45.00',
    budgetUsedPct: 65,
    resetDays: 12,
  };

  stockAlerts: StockAlert[] = [
    { name: 'Wireless Mouse', qty: '02', level: 'critical' },
    { name: 'Keyboard RGB',   qty: '05', level: 'warning'  },
  ];

  // --- Financial Data ---
  salary = {
    upcoming: '₹2,18,400',
    processed: 25,
    pending: 17,
    total: 42,
    dueDays: 4,
    get processedPct(): number { return Math.round((this.processed / this.total) * 100); },
  };

  todaySales = {
    amount: '₹42,850',
    growth: '+12.5%',
    bars: [
      { heightPct: 50,  colorClass: 'bar-low'    },
      { heightPct: 83,  colorClass: 'bar-mid'    },
      { heightPct: 67,  colorClass: 'bar-med'    },
      { heightPct: 100, colorClass: 'bar-high'   },
    ],
  };

pendingPOs = {
  count: 7,
  subtitle: 'Pending approvals',
  approvedToday: 4,
  totalValue: '₹84,200',
  awaitingReview: 7,
};

  // --- Ledger Entries ---
  ledgerEntries: LedgerEntry[] = [
    {
      color: 'blue',
      title: 'Accounts payable — Supplier XYZ',
      subtitle: '5 May 2026 • PI-0442',
      amount: '₹24,000',
    },
    {
      color: 'green',
      title: 'Sales revenue — Walk-in customers',
      subtitle: '5 May 2026 • Cash receipt',
      amount: '₹9,800',
    },
  ];

  ledgerSummary = {
  overallPct: 64,
  segments: [
    { pct: 30, color: '#ce8b8b' }, // red   — Debit
    { pct: 45, color: '#95bfa4' }, // green — Credit
    { pct: 25, color: '#ecc5aa' }, // orange — Balance
  ],
  cards: [
    { count: '₹24K', label: 'Debit',   bgColor: '#fee2e2', iconColor: '#ce8b8b', dashed: false },
    { count: '₹61K', label: 'Credit',  bgColor: '#dcfce7', iconColor: '#95bfa4', dashed: false },
    { count: '₹37K', label: 'Balance', bgColor: '#ffedd5', iconColor: '#ecc5aa', dashed: true  },
  ],
};

ledgers = [
  {
    account: 'Cash Account',
    type: 'Debit',
    amount: 50000,
    status: 'Posted',
    date: '01 Apr 2026'
  },
  {
    account: 'Office Expenses',
    type: 'Credit',
    amount: 12000,
    status: 'Pending',
    date: '01 Apr 2026'
  },
  {
    account: 'Bank Account',
    type: 'Debit',
    amount: 80000,
    status: 'Posted',
    date: '31 Mar 2026'
  },
  {
    account: 'Travel Expense',
    type: 'Credit',
    amount: 5000,
    status: 'Rejected',
    date: '30 Mar 2026'
  }
];

  // --- Store Health ---
  storeHealth = {
    capacityPct: 78,
    activeItems: 892,
    sectionsUsed: 12,
    sectionsTotal: 15,
    dashArray: '78 100',
  };



  // ── WIDGET 5: PRODUCT ─────────────────────────────────────
product = {
  totalSKUs: '1,240',
  subtitle: 'Total SKUs in stock',
  stats: [
    { label: 'Low stock items', value: 14 },
    { label: 'Out of stock',    value: 3  },
  ] as StatRow[],
  alertCount: 14,
};

// ── WIDGET 6: STORE MAINTAIN ──────────────────────────────
storeMaintain = {
  capacityPct: 78,
  subtitle: 'Store capacity used',
  stats: [
    { label: 'Active items', value: 892       },
    { label: 'Sections',     value: '12 / 15' },
  ] as StatRow[],
};



// RECENT ATTENDANCE

recentAttendance = computed(() => {

  return this.attendanceService
    .lines()
    .slice()
    .reverse()
    .slice(0, 5);
});


// RECENT LEAVES
recentLeaves = signal([

  {
    leaveId: 'LEV001',
    employeeName: 'Arun Kumar',
    leaveType: 'Casual Leave',
    fromDate: '2026-05-08',
    toDate: '2026-05-08',
    totalDays: 1,
    status: 'Approved'
  },

  {
    leaveId: 'LEV002',
    employeeName: 'Priya Sharma',
    leaveType: 'Sick Leave',
    fromDate: '2026-05-07',
    toDate: '2026-05-08',
    totalDays: 2,
    status: 'Pending'
  },

  {
    leaveId: 'LEV003',
    employeeName: 'Rahul Verma',
    leaveType: 'Emergency Leave',
    fromDate: '2026-05-06',
    toDate: '2026-05-06',
    totalDays: 1,
    status: 'Approved'
  },

  {
    leaveId: 'LEV004',
    employeeName: 'Sneha Reddy',
    leaveType: 'Medical Leave',
    fromDate: '2026-05-04',
    toDate: '2026-05-05',
    totalDays: 2,
    status: 'Rejected'
  },

  {
    leaveId: 'LEV005',
    employeeName: 'Vikram Singh',
    leaveType: 'Annual Leave',
    fromDate: '2026-05-02',
    toDate: '2026-05-03',
    totalDays: 2,
    status: 'Approved'
  }

]);

// ==========================================
// ACTIVITIES
// ==========================================

activities = signal([

  {
    title: 'Attendance marked',
    description: 'Today attendance processed successfully',
    time: '10 mins ago',
    type: 'success'
  },

  {
    title: 'Leave request submitted',
    description: '2 employees applied for leave',
    time: '35 mins ago',
    type: 'warning'
  },

  {
    title: 'Payroll generated',
    description: 'Monthly payroll completed',
    time: '1 hour ago',
    type: 'primary'
  }

]);

  events = [
    {
      title: '12 Invoices have been paid',
      time: '12 min ago',
      description: 'Invoices have been paid to the company',
      color: '#7F77DD',
      attachment: 'invoices.pdf',
      person: null, team: null
    },
    {
      title: 'Client Meeting',
      time: '45 min ago',
      description: 'Project meeting with john @10:15am',
      color: '#1D9E75',
      attachment: null,
      person: { initials: 'LM', name: 'Lester McCarthy (Client)', role: 'CEO of Pixinvent' },
      team: null
    },
    {
      title: 'Create a new project for client',
      time: '2 Day Ago',
      description: '6 team members in a project',
      color: '#378ADD',
      attachment: null, person: null,
      team: {
        members: [
          { initials: 'AJ', color: '#c4784a' },
          { initials: 'SR', color: '#7a9bc4' },
          { initials: 'KP', color: '#8c5e92' }
        ],
        extra: 3
      }
    }
  ];


  recentInvoices = signal([

  {
    invoiceNo: 'INV-2026-001',
    customer: 'Arun Traders',
    date: '08/05/2026',
    amount: 48500,
    status: 'Paid'
  },

  {
    invoiceNo: 'INV-2026-002',
    customer: 'SK Electronics',
    date: '07/05/2026',
    amount: 18200,
    status: 'Pending'
  },

  {
    invoiceNo: 'INV-2026-003',
    customer: 'Vetri Mobiles',
    date: '06/05/2026',
    amount: 72500,
    status: 'Paid'
  },

  {
    invoiceNo: 'INV-2026-004',
    customer: 'Classic Furniture',
    date: '05/05/2026',
    amount: 12400,
    status: 'Overdue'
  },

  {
    invoiceNo: 'INV-2026-005',
    customer: 'Sharma Agencies',
    date: '04/05/2026',
    amount: 31800,
    status: 'Pending'
  }

]);

recentActivities = signal([

  {
    type: 'Leave',
    employeeName: 'Arun Kumar',
    title: 'Casual Leave',
    date: '08/05/2026',
    status: 'Approved',
    createdAt: new Date()
  },

  {
    type: 'Permission',
    employeeName: 'Priya Sharma',
    title: '10:00 AM - 12:00 PM',
    date: '08/05/2026',
    status: 'Pending',
    createdAt: new Date()
  },

  {
    type: 'Leave',
    employeeName: 'Rahul Verma',
    title: 'Sick Leave',
    date: '07/05/2026',
    status: 'Rejected',
    createdAt: new Date()
  },

  {
    type: 'Permission',
    employeeName: 'Sneha Reddy',
    title: '02:00 PM - 04:00 PM',
    date: '07/05/2026',
    status: 'Approved',
    createdAt: new Date()
  },

]);

recentLeaveandPerm= signal([

  {
    type: 'Leave',
    employeeName: 'Arun Kumar',
    title: 'Casual Leave',
    date: '08/05/2026',
    status: 'Approved',
    createdAt: new Date()
  },

  {
    type: 'Permission',
    employeeName: 'Priya Sharma',
    title: '10:00 AM - 12:00 PM',
    date: '08/05/2026',
    status: 'Pending',
    createdAt: new Date()
  },

  {
    type: 'Leave',
    employeeName: 'Rahul Verma',
    title: 'Sick Leave',
    date: '07/05/2026',
    status: 'Rejected',
    createdAt: new Date()
  },

  {
    type: 'Permission',
    employeeName: 'Sneha Reddy',
    title: '02:00 PM - 04:00 PM',
    date: '07/05/2026',
    status: 'Approved',
    createdAt: new Date()
  },

  {
    type: 'Leave',
    employeeName: 'Vikram Singh',
    title: 'Annual Leave',
    date: '06/05/2026',
    status: 'Pending',
    createdAt: new Date()
  },


]);

salesSummary = {

  total: 428500,

  orders: 184,

  customers: 62,

  growth: '+18%',

  categories: [

    {
      label: 'Retail',
      percent: 78,
      color: '#7c3aed'
    },

    {
      label: 'Wholesale',
      percent: 56,
      color: '#22c55e'
    },

    {
      label: 'Online',
      percent: 34,
      color: '#3b82f6'
    }

  ]
};

}
