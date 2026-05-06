// master-data.service.ts
import { Injectable, signal } from '@angular/core';

export interface Option {
  id: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class MasterDataClient {

  // 🔹 Departments
  readonly departments = signal<Option[]>([
    { id: 'IT', name: 'IT' },
    { id: 'HR', name: 'HR' },
    { id: 'FIN', name: 'Finance' }
  ]);

  // 🔹 Designations
  readonly designations = signal<Option[]>([
    { id: 'DEV', name: 'Developer' },
    { id: 'TL', name: 'Team Lead' },
    { id: 'MGR', name: 'Manager' }
  ]);

  // 🔹 Cities
  readonly cities = signal<Option[]>([
    { id: 'CHN', name: 'Chennai' },
    { id: 'MDU', name: 'Madurai' },
    { id: 'BLR', name: 'Bangalore' }
  ]);

  // 🔹 States
  readonly states = signal<Option[]>([
    { id: 'TN', name: 'Tamil Nadu' },
    { id: 'KA', name: 'Karnataka' },
    { id: 'KL', name: 'Kerala' }
  ]);

  // 🔹 Countries
  readonly countries = signal<Option[]>([
    { id: 'IN', name: 'India' },
    { id: 'US', name: 'USA' },
    { id: 'AE', name: 'UAE' }
  ]);

  readonly roles = signal<Option[]>([
  { id: 'ADMIN', name: 'Administrator' },
  { id: 'SUPER_ADMIN', name: 'Super Admin' },
  { id: 'HR_EXEC', name: 'HR Executive' },
  { id: 'HR_MANAGER', name: 'HR Manager' },
  { id: 'FIN_MANAGER', name: 'Finance Manager' },
  { id: 'ACCOUNTANT', name: 'Accountant' },
  { id: 'TEAM_LEAD', name: 'Team Lead' },
  { id: 'PROJECT_MANAGER', name: 'Project Manager' },
  { id: 'DEV', name: 'Developer' },
  { id: 'QA', name: 'QA Engineer' },
  { id: 'SUPPORT', name: 'Support Engineer' },
  { id: 'SALES', name: 'Sales Executive' },
  { id: 'OPS', name: 'Operations Executive' },
  { id: 'EMP', name: 'Employee' }
]);

readonly degrees = signal<Option[]>([
  { id: 'SSLC', name: 'SSLC' },
  { id: 'HSC', name: 'HSC' },
  { id: 'DIP', name: 'Diploma' },

  { id: 'BA', name: 'B.A' },
  { id: 'BSC', name: 'B.Sc' },
  { id: 'BCOM', name: 'B.Com' },
  { id: 'BE', name: 'B.E' },
  { id: 'BTECH', name: 'B.Tech' },
  { id: 'BCA', name: 'BCA' },

  { id: 'MA', name: 'M.A' },
  { id: 'MSC', name: 'M.Sc' },
  { id: 'MCOM', name: 'M.Com' },
  { id: 'ME', name: 'M.E' },
  { id: 'MTECH', name: 'M.Tech' },
  { id: 'MCA', name: 'MCA' },
  { id: 'MBA', name: 'MBA' },

  { id: 'PHD', name: 'Ph.D' }
]);

readonly bankNames = signal<Option[]>([
  { id: 'SBI', name: 'State Bank of India' },
  { id: 'HDFC', name: 'HDFC Bank' },
  { id: 'ICICI', name: 'ICICI Bank' },
  { id: 'AXIS', name: 'Axis Bank' },
  { id: 'PNB', name: 'Punjab National Bank' },
  { id: 'BOB', name: 'Bank of Baroda' },
  { id: 'CANARA', name: 'Canara Bank' },
  { id: 'UBI', name: 'Union Bank of India' },
  { id: 'IOB', name: 'Indian Overseas Bank' },
  { id: 'IDBI', name: 'IDBI Bank' },
  { id: 'INDUSIND', name: 'IndusInd Bank' },
  { id: 'YES', name: 'Yes Bank' },
  { id: 'KOTAK', name: 'Kotak Mahindra Bank' },
  { id: 'FEDERAL', name: 'Federal Bank' },
  { id: 'RBL', name: 'RBL Bank' }
]);

}