import { Component, inject, signal, OnInit, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastNotifier } from '../../../core/services/toast';
import { EmployeeStatus, EmploymentType, Gender, Employee, PaymentMode } from '../employee';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeDataClient } from '../employee-data-client';
import { MasterDataClient } from '../../../core/services/master-data';

type EducationForm = FormGroup<{
  degree: FormControl<string>;
  specialization: FormControl<string>;
  instituteName: FormControl<string>;
  dateOfCompletion: FormControl<string | null>;
}>;

type WorkForm = FormGroup<{
  companyName: FormControl<string>;
  jobTitle: FormControl<string>;
  fromDate: FormControl<string | null>;
  toDate: FormControl<string | null>;
}>;

type Option = { id: string; name: string };



@Component({
  selector: 'app-create-employee',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-create.html',
  styleUrl: './employee-create.css',
})
export class EmployeeCreateComponent {

  private readonly empService = inject(EmployeeDataClient);
  private readonly toast = inject(ToastNotifier);
  private readonly router = inject(Router);
  private readonly master = inject(MasterDataClient);

   private readonly fb = new FormBuilder();

  private readonly route = inject(ActivatedRoute);

  paramMapSignal = toSignal(this.route.paramMap);

  constructor() {
    effect(() => {
      const params = this.paramMapSignal();

      if (!params) return;

      const id = params.get('id');

      if (id) {
        this.loadEmployee(id);
      } else {
        this.reset();
      }
    });
  }


  mode = signal<'create' | 'edit'>('create');
  selectedId = signal<string | null>(null);
  activeAddressTab = signal<'permanent' | 'current'>('current');

  readonly departments = this.master.departments;
  readonly designations = this.master.designations;
  readonly cities = this.master.cities;
  readonly states = this.master.states;
  readonly countries = this.master.countries;
  readonly bankNames = this.master.bankNames;
  readonly degrees = this.master.degrees;
  readonly roles = this.master.roles;


  readonly paymentModes = signal<PaymentMode[]>(
    Object.values(PaymentMode)
  );

  readonly genders = signal<Gender[]>(
    Object.values(Gender)
  );

  readonly statuses = signal<EmployeeStatus[]>(
    Object.values(EmployeeStatus)
  );
  readonly bloodGroups = signal<string[]>([
    'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
  ]);

  // ===== MAIN FORM =====
  form = this.fb.group({

    // ===== CORE =====
    employeeCode: this.fb.control('', {
      nonNullable: true,
      // validators: [Validators.required],
      updateOn: 'blur'
    }),

    employeeName: this.fb.control<string | null>(null),

    status: this.fb.control<EmployeeStatus>(
      EmployeeStatus.Active,
      { nonNullable: true }
    ),

    // ===== PERSONAL =====
    firstName: this.fb.control('', {
      nonNullable: true,
      validators: [Validators.required],
      updateOn: 'blur'
    }),

    lastName: this.fb.control('', {
      nonNullable: true,
      // validators: [Validators.required],
      updateOn: 'blur'
    }),

    displayName: this.fb.control('', {
      nonNullable: true,
      // validators: [Validators.required],
      updateOn: 'blur'
    }),

    fatherOrSpouseOrGuardianName: this.fb.control('', {
      nonNullable: true,
      // validators: [Validators.required],
      updateOn: 'blur'
    }),

    dateOfBirth: this.fb.control<string | null>(null, {
      validators: [Validators.required]
    }),

    gender: this.fb.control<Gender | ''>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),

    personalmobileNumber: this.fb.control('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^[6-9]\d{9}$/)
      ],
      updateOn: 'blur'
    }),

    workPhoneNumber: this.fb.control('', {
      nonNullable: true,
      validators: [
        // Validators.required,
        Validators.pattern(/^[6-9]\d{9}$/)
      ],
      updateOn: 'blur'
    }),

    officialEmail: this.fb.control<string | null>(null, {
      validators: [
        // Validators.required,
        Validators.email
      ],
      updateOn: 'blur'
    }),

    personalEmail: this.fb.control<string | null>(null, {
      validators: [
        Validators.required,
        Validators.email
      ],
      updateOn: 'blur'
    }),

    // ===== JOB =====
    departmentId: this.fb.control('', {
      nonNullable: true,
      // validators: [Validators.required]
    }),

    designationId: this.fb.control('', {
      nonNullable: true,
      // validators: [Validators.required]
    }),

    dateOfJoining: this.fb.control<string | null>(null, {
      // validators: [Validators.required]
    }),

    employmentType: this.fb.control<EmploymentType>(
      EmploymentType.FullTime,
      { nonNullable: true }
    ),

    // ===== BANK =====
    bankAccountNumber: this.fb.control('', {
      nonNullable: true,
      validators: [
        // Validators.required,
        Validators.minLength(8)
      ],
      updateOn: 'blur'
    }),

    bankName: this.fb.control('', {
      nonNullable: true,
      // validators: [Validators.required]
    }),

    ifscCode: this.fb.control('', {
      nonNullable: true,
      validators: [
        // Validators.required,
        // Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)
      ],
      updateOn: 'blur'
    }),

    esiNumber: this.fb.control('', {
      nonNullable: true,
    }),

        uanNumber: this.fb.control('', {
      nonNullable: true,
    }),

    panNumber: this.fb.control('', {
      nonNullable: true,
      validators: [
        // Validators.required,
        Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]$/)
      ],
      updateOn: 'blur'
    }),

    micrNumber: this.fb.control('', {
      nonNullable: true,
      validators: [
        Validators.pattern(/^\d{9}$/) // exactly 9 digits
      ],
      updateOn: 'blur'
    }),

    upiIds: this.fb.array<FormControl<string>>([]),

    aadhaarNumber: this.fb.control('', {
      nonNullable: true,
      validators: [
        // Validators.required,
        Validators.pattern(/^\d{12}$/)
      ],
      updateOn: 'blur'
    }),

    // ===== SALARY =====
    basicSalary: this.fb.control(0, {
      nonNullable: true,
      // validators: [
      //   Validators.required,
      //   Validators.min(0)
      // ]
    }),

    paymentMode: this.fb.control<PaymentMode | null>(null),

    probationEndDate: this.fb.control<string | null>(null),
    bloodGroup: this.fb.control('', { nonNullable: true }),
    permanentAddress: this.fb.group({
      addressLine1: this.fb.control<string | null>(null, {
        validators: [Validators.required, Validators.maxLength(150)],
        updateOn: 'blur'
      }),

      addressLine2: this.fb.control<string | null>(null, {
        validators: [Validators.maxLength(150)]
      }),

      city: this.fb.control<string | null>(null, {
        validators: [Validators.required],
      }),

      stateId: this.fb.control<string>('', {
        nonNullable: true,
        validators: [
          Validators.required,
        ]
      }),
      countryId: this.fb.control<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),

      postalCode: this.fb.control<string | null>(null, {
        validators: [
          Validators.required,
          Validators.pattern(/^[1-9][0-9]{5}$/) // Indian PIN
        ],
        updateOn: 'blur'
      })
    }),

    currentAddress: this.fb.group({
      addressLine1: this.fb.control<string | null>(null, {
        validators: [Validators.required, Validators.maxLength(150)],
        updateOn: 'blur'
      }),

      addressLine2: this.fb.control<string | null>(null, {
        validators: [Validators.maxLength(150)]
      }),

      city: this.fb.control<string | null>(null, {
        validators: [Validators.required],
      }),


      stateId: this.fb.control<string>('', {
        nonNullable: true,
        validators: [
          Validators.required,
        ]
      }),
      countryId: this.fb.control<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),

      postalCode: this.fb.control<string | null>(null, {
        validators: [
          Validators.required,
          Validators.pattern(/^[1-9][0-9]{5}$/)
        ],
        updateOn: 'blur'
      })
    }),

    sameAsPresentAddress: this.fb.control(false),
    // ===== COLLECTIONS =====
    educations: this.fb.array<EducationForm>([]),
    workExperiences: this.fb.array<WorkForm>([])

  });
  // ===== GETTERS =====
  get educations(): FormArray<EducationForm> {
    return this.form.controls.educations;
  }

  get workExperiences(): FormArray<WorkForm> {
    return this.form.controls.workExperiences;
  }



  // ===== Load Emp details for edit =====
  loadEmployee(id: string) {
    const emp = this.empService.getById(id);

    if (!emp) return;

    this.mode.set('edit');
    this.selectedId.set(id);

    // ===== PATCH MAIN =====
    this.form.patchValue({
      employeeCode: emp.employeeCode,
      firstName: emp.firstName,
      lastName: emp.lastName,
      displayName: emp.displayName,
      fatherOrSpouseOrGuardianName: emp.fatherOrSpouseOrGuardianName,
      status: emp.status,

      dateOfBirth: this.toDateInput(emp.dateOfBirth),
      gender: emp.gender,

      personalmobileNumber: emp.personalmobileNumber,
      workPhoneNumber: emp.workPhoneNumber ?? '',
      officialEmail: emp.officialEmail ?? null,
      personalEmail: emp.personalEmail ?? null,

      departmentId: emp.departmentId,
      designationId: emp.designationId,
      dateOfJoining: this.toDateInput(emp.dateOfJoining),
      employmentType: emp.employmentType,

      bankAccountNumber: emp.bankAccountNumber,
      bankName: emp.bankName,
      ifscCode: emp.ifscCode,
      panNumber: emp.panNumber,
      aadhaarNumber: emp.aadhaarNumber,
      micrNumber: emp.micrNumber,
      uanNumber: emp.uanNumber,
      esiNumber: emp.esiNumber,

      basicSalary: emp.basicSalary,
      paymentMode: emp.paymentMode ?? null,

      sameAsPresentAddress: emp.sameAsPresentAddress ?? false,
      probationEndDate: this.toDateInput(emp.probationEndDate),
      bloodGroup: emp.bloodGroup ?? '',
    });

    // ===== PATCH ADDRESS =====
    this.form.controls.permanentAddress.patchValue({
      addressLine1: emp.permanentAddress?.addressLine1 ?? null,
      addressLine2: emp.permanentAddress?.addressLine2 ?? null,
      city: emp.permanentAddress?.city ?? null,
      stateId: emp.permanentAddress?.stateId ?? '',
      countryId: emp.permanentAddress?.countryId ?? '',
      postalCode: emp.permanentAddress?.postalCode ?? null
    });

    this.form.controls.currentAddress.patchValue({
      addressLine1: emp.currentAddress?.addressLine1 ?? null,
      addressLine2: emp.currentAddress?.addressLine2 ?? null,
      city: emp.currentAddress?.city ?? null,
      stateId: emp.permanentAddress?.stateId ?? '',
      countryId: emp.permanentAddress?.countryId ?? '',
      postalCode: emp.currentAddress?.postalCode ?? null
    });

    // ===== CLEAR ARRAYS =====
    this.educations.clear();
    this.workExperiences.clear();

    this.upiIds.clear();

    emp.upiIds?.forEach(u => {
      this.upiIds.push(
        this.fb.control(u, { nonNullable: true })
      );
    });

    // ===== PATCH EDUCATION =====
    emp.educations?.forEach(e => {
      this.educations.push(this.fb.group({
        degree: this.fb.control(e.degree ?? '', { nonNullable: true }),
        specialization: this.fb.control(e.specialization ?? '', { nonNullable: true }),
        instituteName: this.fb.control(e.instituteName ?? '', { nonNullable: true }),
        dateOfCompletion: this.fb.control(this.toDateInput(e.dateOfCompletion))
      }));
    });

    // ===== PATCH WORK =====
    emp.workExperiences?.forEach(w => {
      this.workExperiences.push(this.fb.group({
        companyName: this.fb.control(w.companyName ?? '', { nonNullable: true }),
        jobTitle: this.fb.control(w.jobTitle ?? '', { nonNullable: true }),
        fromDate: this.fb.control(this.toDateInput(w.fromDate)),
        toDate: this.fb.control(this.toDateInput(w.toDate))
      }));
    });
  }



  // ===== CREATE ROWS =====
  createEducation(): EducationForm {
    return this.fb.group({
      degree: this.fb.control('', { nonNullable: true }),
      specialization: this.fb.control('', { nonNullable: true }),
      instituteName: this.fb.control('', { nonNullable: true }),
      dateOfCompletion: this.fb.control<string | null>(null)
    });
  }

  createWork(): WorkForm {
    return this.fb.group({
      companyName: this.fb.control('', { nonNullable: true }),
      jobTitle: this.fb.control('', { nonNullable: true }),
      fromDate: this.fb.control<string | null>(null),
      toDate: this.fb.control<string | null>(null)
    });
  }

copyAddress() {
  const same = this.form.controls.sameAsPresentAddress.value;

  const permanent = this.form.controls.permanentAddress;
  const current = this.form.controls.currentAddress;

  if (same) {
    const currentValue = current.getRawValue();

    permanent.patchValue(currentValue);

    permanent.disable(); // 
  } else {
    permanent.enable();
    permanent.reset();
  }
}

  get upiIds(): FormArray<FormControl<string>> {
    return this.form.controls.upiIds;
  }

  addUpi() {
    this.upiIds.push(
      this.fb.control('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.pattern(/^[\w.-]+@[\w]+$/) // basic UPI format
        ]
      })
    );
  }

  removeUpi(i: number) {
    this.upiIds.removeAt(i);
  }


  // ===== ACTIONS =====
  addEducation() {
    this.educations.push(this.createEducation());
  }

  removeEducation(i: number) {
    this.educations.removeAt(i);
  }

  addWork() {
    this.workExperiences.push(this.createWork());
  }

  removeWork(i: number) {
    this.workExperiences.removeAt(i);
  }

  save() {

    if (this.form.invalid) {

      const same = this.form.controls.sameAsPresentAddress.value;

      if (!same) {

   const hasCurrent = this.hasCurrentData();

  const permanentValid = this.isPermanentAddressValid();

  if (hasCurrent && !permanentValid) {
    this.toast.error('Please fill Permanent Address');

    this.activeAddressTab.set('permanent');
    this.form.controls.permanentAddress.markAllAsTouched();

    setTimeout(() => {
      document.querySelector('#permanentAddressSection')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    });

    return;
        }
      }
      this.form.markAllAsTouched();
      this.toast.error('Please fix validation errors');
      return;
    }
    const data = this.form.getRawValue();

    // ===== Convert Dates =====
    const dob = data.dateOfBirth ? new Date(data.dateOfBirth) : null;
    const doj = data.dateOfJoining ? new Date(data.dateOfJoining) : null;
    const probation = data.probationEndDate ? new Date(data.probationEndDate) : null;



    // ===== DOB VALIDATION =====
    if (!dob) {
      this.toast.error('Date of Birth is required');
      return;
    }

    const age = this.calculateAge(dob);

    if (age < 18) {
      this.toast.error('Employee must be at least 18 years old');
      return;
    }


    //  Only validate DOJ IF it exists
    if (doj) {

      if (doj < dob) {
        this.toast.error('Date of Joining cannot be before Date of Birth');
        return;
      }

      if (probation && probation < doj) {
        this.toast.error('Probation end date must be after joining date');
        return;
      }

    }




    const payload: Employee = {
      // ===== CORE =====
      employeeId: this.selectedId() ?? undefined,
      employeeCode: data.employeeCode,
      employeeName: `${data.firstName} ${data.lastName}`,
      status: data.status,

      // ===== PERSONAL =====
      firstName: data.firstName,
      lastName: data.lastName,
      displayName: data.displayName,
      fatherOrSpouseOrGuardianName: data.fatherOrSpouseOrGuardianName,

      dateOfBirth: data.dateOfBirth
        ? new Date(data.dateOfBirth)
        : new Date(),

      gender: data.gender || Gender.Other,
      bloodGroup: data.bloodGroup || undefined,

      personalmobileNumber: data.personalmobileNumber,
      workPhoneNumber: data.workPhoneNumber,

      officialEmail: data.officialEmail ?? undefined,
      personalEmail: data.personalEmail ?? undefined,

      // ===== JOB =====
      departmentId: data.departmentId,
      designationId: data.designationId,

      dateOfJoining: data.dateOfJoining
        ? new Date(data.dateOfJoining)
        : new Date(),

      employmentType: data.employmentType,
      // workLocation: data.workLocation ?? undefined,
      // shiftType: data.shiftType ?? undefined,

      probationEndDate: data.probationEndDate
        ? new Date(data.probationEndDate)
        : undefined,

      // ===== BANK =====
      bankAccountNumber: data.bankAccountNumber,
      bankName: data.bankName,
      ifscCode: data.ifscCode,
      panNumber: data.panNumber,
      aadhaarNumber: data.aadhaarNumber,
      micrNumber: data.micrNumber,
      uanNumber: data.uanNumber,
      esiNumber: data.esiNumber,
      upiIds: data.upiIds ?? [],

      // ===== SALARY =====
      basicSalary: data.basicSalary,
      paymentMode: data.paymentMode ?? PaymentMode.BankTransfer,

      // ===== ADDRESS =====
      sameAsPresentAddress: data.sameAsPresentAddress ?? false,

      permanentAddress: {
        addressLine1: data.permanentAddress?.addressLine1 ?? undefined,
        addressLine2: data.permanentAddress?.addressLine2 ?? undefined,
        city: data.permanentAddress?.city ?? undefined,
        stateId: data.permanentAddress?.stateId || undefined,
        countryId: data.permanentAddress?.countryId || undefined,
        postalCode: data.permanentAddress?.postalCode ?? undefined
      },

      currentAddress: {
        addressLine1: data.currentAddress?.addressLine1 ?? undefined,
        addressLine2: data.currentAddress?.addressLine2 ?? undefined,
        city: data.currentAddress?.city ?? undefined,
        stateId: data.currentAddress?.stateId || undefined,
        countryId: data.currentAddress?.countryId || undefined,
        postalCode: data.currentAddress?.postalCode ?? undefined
      },

      // ===== COLLECTIONS =====
      educations: (data.educations ?? []).map(e => ({
        ...e,
        dateOfCompletion: e.dateOfCompletion
          ? new Date(e.dateOfCompletion)
          : undefined
      })),

      workExperiences: (data.workExperiences ?? []).map(w => ({
        ...w,
        fromDate: w.fromDate ? new Date(w.fromDate) : undefined,
        toDate: w.toDate ? new Date(w.toDate) : undefined
      }))
    };

    if (this.mode() === 'create') {
      this.empService.add(payload);
      this.toast.success('Employee added successfully');
      this.reset();
      this.router.navigate(['/employees']);
    } else {
      this.empService.update(payload);
      this.toast.success('Employee updated successfully');
      this.reset();
      this.router.navigate(['/employees']);

    }
  }

  reset() {
    this.form.reset();
    this.educations.clear();
    this.workExperiences.clear();

    this.addEducation();
    this.addWork();

    this.mode.set('create');
    this.selectedId.set(null);
  }

  // ======== helpers //
  private toDateInput(date?: Date | null): string | null {
    if (!date) return null;

    const d = new Date(date);
    return d.toISOString().split('T')[0]; // yyyy-MM-dd
  }

  formatEnum(value: string) {
    return value.replace(/([A-Z])/g, ' $1').trim();
  }

  hasError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  hasErrorPath(path: string): boolean {
    const control = this.form.get(path);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  private calculateAge(dob: Date): number {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age;
  }



  hasCurrentData(): boolean {
  const c = this.form.controls.currentAddress.value;

  return !!(
    c.addressLine1 ||
    c.city ||
    c.stateId ||
    c.countryId ||
    c.postalCode
  );
}

isPermanentAddressValid(): boolean {
  return this.form.controls.permanentAddress.valid;
}


}