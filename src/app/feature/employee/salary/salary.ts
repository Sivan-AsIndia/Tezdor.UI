import { SalaryLine } from "./salary-line";

export interface Salary {

  // ===== CORE =====
  salaryId?: string;
  salaryNumber?: string;
  status: SalaryStatus;

  // ===== MULTI-TENANT / ORG =====
  tenantId?: string;
  companyId?: string;
  branchId: string;

  // ===== PERIOD =====
  payrollPeriodId: string;

  fromDate: string;        // YYYY-MM-DD
  toDate: string;

  salaryDate: string;      // processing date
  salaryMonth: string;     // "APR-2026"

  paymentDate: string;

  // ===== SUMMARY (DERIVED) =====
  totalEmployees?: number;

  totalGrossAmount?: number;
  totalDeductionAmount?: number;
  totalNetSalary?: number;

  // ===== POSTING =====
  isPosted?: boolean;

  postedOn?: Date;
  postedBy?: string;

  expenseAccountId: string;
  payableAccountId: string;
  paymentAccountId?: string;

  // ===== ATTACHMENTS =====
  attachmentCount?: number;
  supportingDocumentUrl?: string;

  // ===== COLLECTION =====
  salaryLines?: SalaryLine[];

  // ===== SYSTEM =====
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  isDeleted?: boolean;
}

export enum SalaryStatus {
  Draft = 1,
  Processed = 2,
  Approved = 3,
  Posted = 4,
  Paid = 5
}