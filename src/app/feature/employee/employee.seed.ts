import { EmployeeStatus, EmploymentType, Gender, Employee, MaritalStatus, PaymentMode } from "./employee";


export const EMPLOYEES: Employee[] = [

/* ===================== 1 ===================== */
{
  // ===== CORE =====
  employeeId: 'EMP001',
  employeeCode: 'E001',
  employeeName: 'Arun Kumar',
  status: EmployeeStatus.Active,

  // ===== MULTI-TENANT =====
  tenantId: 'T1',
  companyId: 'C1',
  branchId: 'B1',

  // ===== PERSONAL =====
  firstName: 'Arun',
  lastName: 'Kumar',
  displayName: 'Arun K',
  dateOfBirth: new Date('1995-05-12'),
  gender: Gender.Male,
  maritalStatus: MaritalStatus.Single,
  fatherOrSpouseOrGuardianName: 'Ramesh Kumar',

  aboutMe: 'Passionate software developer with 4+ years experience',
  expertise: 'Angular, .NET, SQL',

  bloodGroup: 'B+',
  profilePhotoUrl: '',

  // ===== CONTACT =====
  personalmobileNumber: '9876543210',
  workPhoneNumber: '9876000000',
  extension: '102',

  personalEmail: 'arun@xyz.com',
  officialEmail: 'arun@company.com',

  permanentAddress: {
    addressLine1: 'Anna Nagar',
    addressLine2: '3rd Street',
    city: 'Chennai',
    stateId: 'TN',
    countryId: 'IN',
    postalCode: '600040'
  },

  currentAddress: {
    addressLine1: 'Velachery',
    addressLine2: 'Near Bus Stand',
    city: 'Chennai',
    stateId: 'TN',
    countryId: 'IN',
    postalCode: '600042'
  },

  sameAsPresentAddress: false,

  // ===== JOB =====
  departmentId: 'IT',
  designationId: 'MGR',
  locationId: 'LOC1',

  role: 'Software Engineer',
  employmentType: EmploymentType.FullTime,
  statusReason: '',

  dateOfJoining: new Date('2022-01-10'),
  probationEndDate: new Date('2022-07-10'),

  reportingManagerId: 'EMP010',
  workLocation: 'Chennai Office',
  shiftType: 'General',

  sourceOfHire: 'LinkedIn',

  currentExperience: 2.5,
  totalExperience: 4,

  // ===== BANK / IDENTITY =====
  bankAccountNumber: '1234567890',
  bankName: 'State Bank of India',
  branchName: 'Anna Nagar Branch',
  ifscCode: 'SBIN0001234',
  micrNumber: '600002123',

  panNumber: 'ABCDE1234F',
  aadhaarNumber: '123412341234',
  uanNumber: '100200300400',
  esiNumber: 'ESI123456',

  upiIds: [
    'arun@upi',
    'arun.kumar@ybl'
  ],

  // ===== SALARY =====
  basicSalary: 35000,
  paymentMode: PaymentMode.BankTransfer,

  // ===== LIFECYCLE =====
  dateOfResignation: undefined,
  lastWorkingDate: undefined,
  relievingDate: undefined,
  dateOfExit: undefined,

  // ===== COLLECTIONS =====
  workExperiences: [
    {
      id: 'WE1',
      companyName: 'ABC Pvt Ltd',
      jobTitle: 'Junior Developer',
      fromDate: new Date('2020-01-01'),
      toDate: new Date('2021-12-31'),
      jobDescription: 'Worked on Angular apps',
      isRelevant: true
    }
  ],

  educations: [
    {
      id: 'ED1',
      instituteName: 'Anna University',
      degree: 'B.E',
      specialization: 'Computer Science',
      dateOfCompletion: new Date('2019-05-01')
    }
  ],

  // ===== SYSTEM =====
  createdAt: new Date(),
  createdBy: 'admin',
  modifiedAt: new Date(),
  modifiedBy: 'admin',
  isDeleted: false,

  onboardingTriggered: true
},

/* ===================== 2 ===================== */
{
  employeeId: 'EMP002',
  employeeCode: 'E002',
  employeeName: 'Priya Sharma',
  status: EmployeeStatus.Active,

  firstName: 'Priya',
  lastName: 'Sharma',
  dateOfBirth: new Date('1993-03-21'),
  gender: Gender.Female,
  maritalStatus: MaritalStatus.Married,
  personalmobileNumber: '9876500001',

  officialEmail: 'priya@company.com',

  permanentAddress: {
    addressLine1: 'KK Nagar',
    city: 'Madurai',
    stateId: 'TN',
    countryId: 'IN',
    postalCode: '625020'
  },

  departmentId: 'HR',
  designationId: 'MGR',
  employmentType: EmploymentType.FullTime,
  dateOfJoining: new Date('2021-06-15'),

  bankAccountNumber: '2222333344',
  bankName: 'ICICI',
  ifscCode: 'ICIC0005678',
  panNumber: 'PQRSX6789Z',
  aadhaarNumber: '567856785678',

  basicSalary: 42000,

  workExperiences: [
    {
      companyName: 'Infosys',
      jobTitle: 'Software Engineer',
      fromDate: new Date('2018-01-01'),
      toDate: new Date('2021-05-30'),
      isRelevant: true
    }
  ],

  educations: [
    {
      instituteName: 'Madurai Kamaraj University',
      degree: 'B.Sc',
      specialization: 'IT',
      dateOfCompletion: new Date('2017-04-01')
    }
  ]
},

/* ===================== 3 ===================== */
{
  employeeId: 'EMP003',
  employeeCode: 'E003',
  employeeName: 'Rahul Verma',
  status: EmployeeStatus.OnNotice,
  firstName: 'Rahul',
  lastName: 'Verma',
  dateOfBirth: new Date('1990-08-11'),
  gender: Gender.Male,
  personalmobileNumber: '9000000001',
  permanentAddress: { city: 'Coimbatore' },
  departmentId: 'FIN',
  designationId: 'TL',
  employmentType: EmploymentType.Contract,
  dateOfJoining: new Date('2020-02-01'),
  bankAccountNumber: '3333444455',
  bankName: 'HDFC',
  ifscCode: 'HDFC0001111',
  panNumber: 'AAAAA1111A',
  aadhaarNumber: '111122223333',
  basicSalary: 30000
},

/* ===================== 4 ===================== */
{
  employeeId: 'EMP004',
  employeeCode: 'E004',
  employeeName: 'Sneha Reddy',
  status: EmployeeStatus.Active,
  firstName: 'Sneha',
  lastName: 'Reddy',
  dateOfBirth: new Date('1998-12-02'),
  gender: Gender.Female,
  personalmobileNumber: '9000000002',
  permanentAddress: { city: 'Hyderabad' },
  departmentId: 'FIN',
  designationId: 'DEV',
  employmentType: EmploymentType.Intern,
  dateOfJoining: new Date('2024-01-05'),
  bankAccountNumber: '4444555566',
  bankName: 'Axis',
  ifscCode: 'UTIB0001234',
  panNumber: 'BBBBB2222B',
  aadhaarNumber: '222233334444',
  basicSalary: 15000
},

/* ===================== 5 ===================== */
{
  employeeId: 'EMP005',
  employeeCode: 'E005',
  employeeName: 'Vikram Singh',
  status: EmployeeStatus.Active,
  firstName: 'Vikram',
  lastName: 'Singh',
  dateOfBirth: new Date('1989-07-14'),
  gender: Gender.Male,
  personalmobileNumber: '9000000003',
  permanentAddress: { city: 'Delhi' },
  departmentId: 'IT',
  designationId: 'DEV',
  employmentType: EmploymentType.FullTime,
  dateOfJoining: new Date('2019-09-10'),
  bankAccountNumber: '5555666677',
  bankName: 'PNB',
  ifscCode: 'PUNB0001111',
  panNumber: 'CCCCC3333C',
  aadhaarNumber: '333344445555',
  basicSalary: 60000
},

/* ===================== 6 ===================== */
{
  employeeId: 'EMP006',
  employeeCode: 'E006',
  employeeName: 'Meena Das',
  status: EmployeeStatus.Active,
  firstName: 'Meena',
  lastName: 'Das',
  dateOfBirth: new Date('1996-01-01'),
  gender: Gender.Female,
  personalmobileNumber: '9000000004',
  permanentAddress: { city: 'Kolkata' },
  departmentId: 'IT',
  designationId: 'DEV',
  employmentType: EmploymentType.FullTime,
  dateOfJoining: new Date('2022-05-01'),
  bankAccountNumber: '6666777788',
  bankName: 'SBI',
  ifscCode: 'SBIN0009999',
  panNumber: 'DDDDD4444D',
  aadhaarNumber: '444455556666',
  basicSalary: 38000
},

/* ===================== 7 ===================== */
{
  employeeId: 'EMP007',
  employeeCode: 'E007',
  employeeName: 'Ajay Nair',
  status: EmployeeStatus.Active,
  firstName: 'Ajay',
  lastName: 'Nair',
  dateOfBirth: new Date('1992-11-22'),
  gender: Gender.Male,
  personalmobileNumber: '9000000005',
  permanentAddress: { city: 'Kerala' },
  departmentId: 'FIN',
  designationId: 'TL',
  employmentType: EmploymentType.Contract,
  dateOfJoining: new Date('2023-03-01'),
  bankAccountNumber: '7777888899',
  bankName: 'HDFC',
  ifscCode: 'HDFC0002222',
  panNumber: 'EEEEE5555E',
  aadhaarNumber: '555566667777',
  basicSalary: 32000
},

/* ===================== 8 ===================== */
{
  employeeId: 'EMP008',
  employeeCode: 'E008',
  employeeName: 'Karthik Raj',
  status: EmployeeStatus.Inactive,
  firstName: 'Karthik',
  lastName: 'Raj',
  dateOfBirth: new Date('1994-06-30'),
  gender: Gender.Male,
  personalmobileNumber: '9000000006',
  permanentAddress: { city: 'Trichy' },
  departmentId: 'IT',
  designationId: 'DEV',
  employmentType: EmploymentType.PartTime,
  dateOfJoining: new Date('2021-02-20'),
  bankAccountNumber: '8888999900',
  bankName: 'Axis',
  ifscCode: 'UTIB0005678',
  panNumber: 'FFFFF6666F',
  aadhaarNumber: '666677778888',
  basicSalary: 25000
},

/* ===================== 9 ===================== */
{
  employeeId: 'EMP009',
  employeeCode: 'E009',
  employeeName: 'Divya Iyer',
  status: EmployeeStatus.Active,
  firstName: 'Divya',
  lastName: 'Iyer',
  dateOfBirth: new Date('1997-09-09'),
  gender: Gender.Female,
  personalmobileNumber: '9000000007',
  permanentAddress: { city: 'Bangalore' },
  departmentId: 'IT',
  designationId: 'TL',
  employmentType: EmploymentType.FullTime,
  dateOfJoining: new Date('2023-07-10'),
  bankAccountNumber: '9999000011',
  bankName: 'ICICI',
  ifscCode: 'ICIC0008888',
  panNumber: 'GGGGG7777G',
  aadhaarNumber: '777788889999',
  basicSalary: 45000
},

/* ===================== 10 ===================== */
{
  employeeId: 'EMP010',
  employeeCode: 'E010',
  employeeName: 'Suresh Babu',
  status: EmployeeStatus.Terminated,
  firstName: 'Suresh',
  lastName: 'Babu',
  dateOfBirth: new Date('1985-04-04'),
  gender: Gender.Male,
  personalmobileNumber: '9000000008',
  permanentAddress: { city: 'Salem' },
  departmentId: 'IT',
  designationId: 'DEV',
  employmentType: EmploymentType.FullTime,
  dateOfJoining: new Date('2015-01-01'),
  bankAccountNumber: '1010101010',
  bankName: 'SBI',
  ifscCode: 'SBIN0002222',
  panNumber: 'HHHHH8888H',
  aadhaarNumber: '888899990000',
  basicSalary: 55000
},

/* ===================== 11 ===================== */
{
  employeeId: 'EMP011',
  employeeCode: 'E011',
  employeeName: 'Anita Joseph',
  status: EmployeeStatus.Active,
  firstName: 'Anita',
  lastName: 'Joseph',
  dateOfBirth: new Date('1999-02-02'),
  gender: Gender.Female,
  personalmobileNumber: '9000000009',
  permanentAddress: { city: 'Kochi' },
  departmentId: 'IT',
  designationId: 'DEV',
  employmentType: EmploymentType.Intern,
  dateOfJoining: new Date('2024-02-01'),
  bankAccountNumber: '1111222233',
  bankName: 'HDFC',
  ifscCode: 'HDFC0003333',
  panNumber: 'IIIII9999I',
  aadhaarNumber: '999900001111',
  basicSalary: 18000
},

/* ===================== 12 ===================== */
{
  employeeId: 'EMP012',
  employeeCode: 'E012',
  employeeName: 'Manoj Kumar',
  status: EmployeeStatus.Resigned,
  firstName: 'Manoj',
  lastName: 'Kumar',
  dateOfBirth: new Date('1991-10-10'),
  gender: Gender.Male,
  personalmobileNumber: '9000000010',
  permanentAddress: { city: 'Erode' },
  departmentId: 'IT',
  designationId: 'DEV',
  employmentType: EmploymentType.FullTime,
  dateOfJoining: new Date('2018-08-08'),
  bankAccountNumber: '1212121212',
  bankName: 'Axis',
  ifscCode: 'UTIB0009999',
  panNumber: 'JJJJJ0000J',
  aadhaarNumber: '000011112222',
  basicSalary: 48000
}

];