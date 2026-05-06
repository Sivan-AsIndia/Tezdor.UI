export interface Employee {

  // ===== CORE =====
  employeeId?: string;
  employeeCode: string;
  employeeName?: string;
  status: EmployeeStatus;

  // ===== MULTI-TENANT / ORG =====
  id?: string;
  tenantId?: string;
  companyId?: string;
  branchId?: string;

  // ===== PERSONAL =====
  firstName: string;
  lastName: string;
  displayName?: string;
  dateOfBirth: Date;
  gender?: Gender;
  maritalStatus?: MaritalStatus;
  fatherOrSpouseOrGuardianName?: string;

  aboutMe?: string;
  expertise?: string;

  bloodGroup?: string;
  profilePhotoUrl?: string;

  // ===== CONTACT =====
  personalmobileNumber: string;
  workPhoneNumber?: string;
  extension?: string;

  officialEmail?: string;        // official email
  personalEmail?: string;


  permanentAddress?: AddressModel;
  currentAddress?: AddressModel;
  sameAsPresentAddress?: boolean;

  // ===== JOB =====
  departmentId: string;
  designationId: string;
  locationId?: string;

  role?: string;
  employmentType: EmploymentType;
  statusReason?: string;

  dateOfJoining: Date;
  probationEndDate?: Date;

  reportingManagerId?: string;
  workLocation?: string;
  shiftType?: string;

  sourceOfHire?: string;

  currentExperience?: number;
  totalExperience?: number;

  // ===== BANK / IDENTITY =====
  bankAccountNumber: string;
  bankName: string;
  branchName?: string;
  ifscCode: string;
  micrNumber?: string;
  upiIds?: string[];

  panNumber: string;
  aadhaarNumber: string;
  uanNumber?: string;
  esiNumber?: string;

  // ===== SALARY =====
  basicSalary: number;
  paymentMode?: PaymentMode;

  // ===== LIFECYCLE =====
  dateOfResignation?: Date;
  lastWorkingDate?: Date;
  relievingDate?: Date;
  dateOfExit?: Date;

  // ===== COLLECTIONS =====
  workExperiences?: WorkExperienceModel[];
  educations?: EducationModel[];

  // ===== SYSTEM =====
  createdAt?: Date;
  createdBy?: string;
  modifiedAt?: Date;
  modifiedBy?: string;
  isDeleted?: boolean;

  onboardingTriggered?: boolean;
}

export interface AddressModel {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  stateId?: string;
  countryId?: string;
  postalCode?: string;
}

export interface WorkExperienceModel {
  id?: string;
  companyName: string;
  jobTitle?: string;
  fromDate?: Date;
  toDate?: Date;
  jobDescription?: string;
  isRelevant?: boolean;
}

export interface EducationModel {
  id?: string;
  instituteName?: string;
  degree?: string;
  specialization?: string;
  dateOfCompletion?: Date;
}

// enums ----------------------------//

export enum EmployeeStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Resigned = 'Resigned',
  Terminated = 'Terminated',
  OnNotice = 'OnNotice'
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other'
}

export enum EmploymentType {
  FullTime = 'FullTime',
  PartTime = 'PartTime',
  Contract = 'Contract',
  Intern = 'Intern'
}

export enum PaymentMode {
  Cash = 'Cash',
  BankTransfer = 'BankTransfer',
  Cheque = 'Cheque'
}

export enum MaritalStatus {
  Single = 'Single',
  Married = 'Married'
}