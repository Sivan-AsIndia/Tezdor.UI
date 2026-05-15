export interface ShiftAssignment {

    shiftAssignmentId?: string;

    shiftId: string;

employeeIds: string[];

departmentIds: string[];

designationIds: string[];

    branchIds?: string[];

    effectiveFrom: string;

    effectiveTo?: string | null;

    applySunday?: boolean;
    applyMonday?: boolean;
    applyTuesday?: boolean;
    applyWednesday?: boolean;
    applyThursday?: boolean;
    applyFriday?: boolean;
    applySaturday?: boolean;

    overrideExistingShift: boolean;

    isDefaultShift: boolean;

    isActive: boolean;

    remarks?: string;

    createdOn?: string;

    createdBy?: string | null;

    updatedOn?: string;

    updatedBy?: string | null;

}