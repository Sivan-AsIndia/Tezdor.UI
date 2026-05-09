import { Leave, LeaveStatus } from "./leave";
import { LEAVE_TYPES } from "./leave-type.seed";

const leaveType = LEAVE_TYPES;

export const LEAVES: Leave[] = [

//   {
//     leaveId: crypto.randomUUID(),
//     leaveNumber: 'LEV-2026-001',

//     employeeId: 'EMP001',

//     leaveTypeId: leaveType.find(x => x.leaveTypeCode === 'CL')!.leaveTypeId!,

//     fromDate: '2026-05-02',
//     toDate: '2026-05-03',

//     totalDays: 2,

//     reason: 'Personal work',

//     status: LeaveStatus.Approved,

//     appliedOn: new Date('2026-04-28'),
//     approvedBy: 'EMP010',
//     approvedOn: new Date('2026-04-29'),

//     remarks: 'Approved',

//     createdAt: new Date(),
//     updatedAt: new Date()
//   },

//   {
//     leaveId: crypto.randomUUID(),
//     leaveNumber: 'LEV-2026-002',

//     employeeId: 'EMP002',

//     leaveTypeId: leaveType.find(x => x.leaveTypeCode === 'SL')!.leaveTypeId!,

//     fromDate: '2026-05-05',
//     toDate: '2026-05-05',

//     totalDays: 1,

//     reason: 'Fever and cold',

//     status: LeaveStatus.Approved,

//     appliedOn: new Date('2026-05-04'),
//     approvedBy: 'EMP010',
//     approvedOn: new Date('2026-05-04'),

//     remarks: 'Medical leave approved',

//     createdAt: new Date(),
//     updatedAt: new Date()
//   },

//   {
//     leaveId: crypto.randomUUID(),
//     leaveNumber: 'LEV-2026-003',

//     employeeId: 'EMP003',

//     leaveTypeId: leaveType.find(x => x.leaveTypeCode === 'EL')!.leaveTypeId!,

//     fromDate: '2026-05-10',
//     toDate: '2026-05-12',

//     totalDays: 3,

//     reason: 'Family function',

//     status: LeaveStatus.Pending,

//     appliedOn: new Date('2026-05-01'),

//     createdAt: new Date(),
//     updatedAt: new Date()
//   },

//   {
//     leaveId: crypto.randomUUID(),
//     leaveNumber: 'LEV-2026-004',

//     employeeId: 'EMP004',

//     leaveTypeId: leaveType.find(x => x.leaveTypeCode === 'LOP')!.leaveTypeId!,

//     fromDate: '2026-05-15',
//     toDate: '2026-05-16',

//     totalDays: 2,

//     reason: 'Personal travel',

//     status: LeaveStatus.Approved,

//     appliedOn: new Date('2026-05-10'),
//     approvedBy: 'EMP002',
//     approvedOn: new Date('2026-05-11'),

//     remarks: 'Approved as unpaid leave',

//     createdAt: new Date(),
//     updatedAt: new Date()
//   },

//   {
//     leaveId: crypto.randomUUID(),
//     leaveNumber: 'LEV-2026-005',

//     employeeId: 'EMP005',

//     leaveTypeId: leaveType.find(x => x.leaveTypeCode === 'CL')!.leaveTypeId!,

//     fromDate: '2026-05-20',
//     toDate: '2026-05-20',

//     totalDays: 1,

//     reason: 'Bank work',

//     status: LeaveStatus.Rejected,

//     appliedOn: new Date('2026-05-18'),

//     rejectedBy: 'EMP010',
//     rejectedOn: new Date('2026-05-19'),

//     rejectionReason: 'Project deadline',

//     createdAt: new Date(),
//     updatedAt: new Date()
//   },

//   {
//     leaveId: crypto.randomUUID(),
//     leaveNumber: 'LEV-2026-006',

//     employeeId: 'EMP006',

//     leaveTypeId: leaveType.find(x => x.leaveTypeCode === 'ML')!.leaveTypeId!,

//     fromDate: '2026-06-01',
//     toDate: '2026-11-27',

//     totalDays: 180,

//     reason: 'Maternity leave',

//     status: LeaveStatus.Approved,

//     appliedOn: new Date('2026-05-15'),
//     approvedBy: 'EMP002',
//     approvedOn: new Date('2026-05-16'),

//     remarks: 'Approved based on policy',

//     createdAt: new Date(),
//     updatedAt: new Date()
//   },

//   {
//     leaveId: crypto.randomUUID(),
//     leaveNumber: 'LEV-2026-007',

//     employeeId: 'EMP007',

//     leaveTypeId: leaveType.find(x => x.leaveTypeCode === 'SL')!.leaveTypeId!,

//     fromDate: '2026-05-08',
//     toDate: '2026-05-09',

//     totalDays: 2,

//     reason: 'Health issue',

//     status: LeaveStatus.Pending,

//     appliedOn: new Date('2026-05-07'),

//     createdAt: new Date(),
//     updatedAt: new Date()
//   },

//   {
//     leaveId: crypto.randomUUID(),
//     leaveNumber: 'LEV-2026-008',

//     employeeId: 'EMP009',

//     leaveTypeId: leaveType.find(x => x.leaveTypeCode === 'CL')!.leaveTypeId!,

//     fromDate: '2026-05-25',
//     toDate: '2026-05-25',

//     totalDays: 1,

//     reason: 'Festival celebration',

//     status: LeaveStatus.Approved,

//     appliedOn: new Date('2026-05-20'),
//     approvedBy: 'EMP002',
//     approvedOn: new Date('2026-05-21'),

//     createdAt: new Date(),
//     updatedAt: new Date()
//   }

];