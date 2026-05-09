// ── Employee Detail Print Template ───────────────────────────
// Generates the HTML content for printing an Employee Profile.
// Design follows the teacher_detail.html reference template.

import { Employee } from '../../feature/employee/employee';
import { COMPANY_INFO } from './company-info';
import { PROFILE_PRINT_CSS } from './profile-print-styles';
import { formatPrintDate } from './number-to-words';

/**
 * Builds the full HTML document string for an Employee Profile print page.
 *
 * @param emp - The Employee data object to print.
 * @returns   A complete HTML document string.
 */
export function buildEmployeePrintHtml(emp: Employee): string {

  const company = COMPANY_INFO;
  const today = formatPrintDate(new Date().toISOString());

  const fullName = `${emp.firstName} ${emp.lastName}`;
  const initials = `${emp.firstName?.[0] ?? ''}${emp.lastName?.[0] ?? ''}`;

  const dob = formatPrintDate(emp.dateOfBirth?.toString());
  const doj = formatPrintDate(emp.dateOfJoining?.toString());

  // Compute age
  const birthYear = emp.dateOfBirth ? new Date(emp.dateOfBirth).getFullYear() : 0;
  const age = birthYear ? (new Date().getFullYear() - birthYear) + ' Years' : '—';

  // Address helper
  const formatAddr = (addr?: any) => {
    if (!addr) return '—';
    const parts = [
      addr.addressLine1, addr.addressLine2, addr.city,
      addr.stateId, addr.countryId, addr.postalCode
    ].filter(Boolean);
    return parts.join(', ') || '—';
  };

  // Education rows
  const educationRows = (emp.educations ?? []).map(edu => `
    <tr>
      <td>${edu.degree ?? '—'}</td>
      <td>${edu.specialization ?? '—'}</td>
      <td>${edu.instituteName ?? '—'}</td>
      <td class="center">${formatPrintDate(edu.dateOfCompletion?.toString())}</td>
    </tr>
  `).join('');

  // Work experience rows
  const workRows = (emp.workExperiences ?? []).map(w => `
    <tr>
      <td>${w.companyName ?? '—'}</td>
      <td>${w.jobTitle ?? '—'}</td>
      <td class="center">${formatPrintDate(w.fromDate?.toString())}</td>
      <td class="center">${formatPrintDate(w.toDate?.toString())}</td>
    </tr>
  `).join('');

  // Status badge class
  const statusClass = emp.status === 'Active' ? 'badge-active'
    : emp.status === 'Inactive' ? 'badge-danger'
    : emp.status === 'Resigned' ? 'badge-warning'
    : 'badge-dark';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Employee Profile - ${emp.employeeCode}</title>
  <style>${PROFILE_PRINT_CSS}</style>
</head>
<body onload="window.print();">
<div class="page">

  <!-- ═══ Header ═══ -->
  <div class="header">
    <div>
      <div class="company-name">${company.name}</div>
      <div class="company-sub">${company.addressLine1}</div>
      <div class="company-sub">${company.addressLine2} | Ph: ${company.phone}</div>
    </div>
    <div>
      <div class="report-title">Employee Profile</div>
      <div class="report-date">${today}</div>
    </div>
  </div>

  <!-- ═══ Hero ═══ -->
  <div class="hero">
    <div class="avatar">${initials}</div>
    <div>
      <div class="name">${fullName}</div>
      <div class="meta">
        <span class="code">${emp.employeeCode}</span>
        <span class="dot"></span>
        <span class="role">${emp.designationId ?? '—'}</span>
        <span class="dot"></span>
        <span class="badge badge-dept">${emp.departmentId ?? '—'}</span>
        <span class="badge ${statusClass}">${emp.status}</span>
      </div>
    </div>
  </div>

  <!-- ═══ KPI Stats ═══ -->
  <div class="stat-cards">
    <div class="stat-card">
      <div class="stat-card-label">Employment Type</div>
      <div class="stat-card-value accent">${emp.employmentType ?? '—'}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Date of Joining</div>
      <div class="stat-card-value">${doj}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Total Experience</div>
      <div class="stat-card-value">${emp.totalExperience ?? 0} Yrs</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Basic Salary</div>
      <div class="stat-card-value green">₹${(emp.basicSalary ?? 0).toLocaleString('en-IN')}</div>
    </div>
  </div>

  <!-- ═══ Personal Information ═══ -->
  <div class="section-title">Personal Information</div>
  <div class="field-grid">
    <div class="field"><div class="field-label">Full Name</div><div class="field-value">${fullName}</div></div>
    <div class="field"><div class="field-label">Display Name</div><div class="field-value">${emp.displayName ?? '—'}</div></div>
    <div class="field"><div class="field-label">Date of Birth</div><div class="field-value">${dob}</div></div>
    <div class="field"><div class="field-label">Age</div><div class="field-value">${age}</div></div>
    <div class="field"><div class="field-label">Gender</div><div class="field-value">${emp.gender ?? '—'}</div></div>
    <div class="field"><div class="field-label">Blood Group</div><div class="field-value">${emp.bloodGroup ?? '—'}</div></div>
    <div class="field"><div class="field-label">Marital Status</div><div class="field-value">${emp.maritalStatus ?? '—'}</div></div>
    <div class="field"><div class="field-label">Father / Spouse</div><div class="field-value">${emp.fatherOrSpouseOrGuardianName ?? '—'}</div></div>
  </div>

  <!-- ═══ Contact Details ═══ -->
  <div class="section-title">Contact Details</div>
  <div class="field-grid">
    <div class="field"><div class="field-label">Personal Mobile</div><div class="field-value">${emp.personalmobileNumber ?? '—'}</div></div>
    <div class="field"><div class="field-label">Work Phone</div><div class="field-value">${emp.workPhoneNumber ?? '—'} ${emp.extension ? '(Ext: ' + emp.extension + ')' : ''}</div></div>
    <div class="field"><div class="field-label">Personal Email</div><div class="field-value link">${emp.personalEmail ?? '—'}</div></div>
    <div class="field"><div class="field-label">Official Email</div><div class="field-value link">${emp.officialEmail ?? '—'}</div></div>
    <div class="field"><div class="field-label">Permanent Address</div><div class="field-value">${formatAddr(emp.permanentAddress)}</div></div>
    <div class="field"><div class="field-label">Current Address</div><div class="field-value">${emp.sameAsPresentAddress ? 'Same as Permanent' : formatAddr(emp.currentAddress)}</div></div>
  </div>

  <!-- ═══ Job Information ═══ -->
  <div class="section-title">Job Information</div>
  <div class="field-grid">
    <div class="field"><div class="field-label">Employee Code</div><div class="field-value mono">${emp.employeeCode}</div></div>
    <div class="field"><div class="field-label">Department</div><div class="field-value">${emp.departmentId ?? '—'}</div></div>
    <div class="field"><div class="field-label">Designation</div><div class="field-value">${emp.designationId ?? '—'}</div></div>
    <div class="field"><div class="field-label">Role</div><div class="field-value">${emp.role ?? '—'}</div></div>
    <div class="field"><div class="field-label">Work Location</div><div class="field-value">${emp.workLocation ?? '—'}</div></div>
    <div class="field"><div class="field-label">Shift Type</div><div class="field-value">${emp.shiftType ?? '—'}</div></div>
    <div class="field"><div class="field-label">Source of Hire</div><div class="field-value">${emp.sourceOfHire ?? '—'}</div></div>
    <div class="field"><div class="field-label">Reporting Manager</div><div class="field-value">${emp.reportingManagerId ?? '—'}</div></div>
  </div>

  <!-- ═══ Bank & Identity ═══ -->
  <div class="section-title">Bank & Statutory Details</div>
  <div class="field-grid">
    <div class="field"><div class="field-label">PAN</div><div class="field-value mono">${emp.panNumber ?? '—'}</div></div>
    <div class="field"><div class="field-label">Aadhaar</div><div class="field-value mono">${emp.aadhaarNumber ?? '—'}</div></div>
    <div class="field"><div class="field-label">UAN (PF)</div><div class="field-value mono">${emp.uanNumber ?? '—'}</div></div>
    <div class="field"><div class="field-label">ESI Number</div><div class="field-value mono">${emp.esiNumber ?? '—'}</div></div>
    <div class="field"><div class="field-label">Bank Name</div><div class="field-value">${emp.bankName ?? '—'}</div></div>
    <div class="field"><div class="field-label">Account Number</div><div class="field-value mono">${emp.bankAccountNumber ?? '—'}</div></div>
    <div class="field"><div class="field-label">IFSC Code</div><div class="field-value mono">${emp.ifscCode ?? '—'}</div></div>
    <div class="field"><div class="field-label">Branch</div><div class="field-value">${emp.branchName ?? '—'}</div></div>
  </div>

  ${(emp.educations?.length ?? 0) > 0 ? `
  <!-- ═══ Education ═══ -->
  <div class="section-title">Academic Qualifications</div>
  <table class="detail-table">
    <thead>
      <tr>
        <th>Degree</th>
        <th>Specialization</th>
        <th>Institute</th>
        <th class="center">Completed</th>
      </tr>
    </thead>
    <tbody>${educationRows}</tbody>
  </table>` : ''}

  ${(emp.workExperiences?.length ?? 0) > 0 ? `
  <!-- ═══ Work Experience ═══ -->
  <div class="section-title">Work Experience</div>
  <table class="detail-table">
    <thead>
      <tr>
        <th>Company</th>
        <th>Job Title</th>
        <th class="center">From</th>
        <th class="center">To</th>
      </tr>
    </thead>
    <tbody>${workRows}</tbody>
  </table>` : ''}

  <!-- ═══ Salary ═══ -->
  <div class="section-title">Salary Details</div>
  <div class="stat-cards-3">
    <div class="stat-card">
      <div class="stat-card-label">Basic Salary</div>
      <div class="stat-card-value">₹${(emp.basicSalary ?? 0).toLocaleString('en-IN')}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Payment Mode</div>
      <div class="stat-card-value">${emp.paymentMode ?? '—'}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Status</div>
      <div class="stat-card-value accent">${emp.status}</div>
    </div>
  </div>

  <!-- ═══ Footer ═══ -->
  <div class="footer">
    <span>Printed by: Admin | SofaCraft ERP</span>
    <span>Confidential — For internal use only</span>
  </div>

</div>
</body>
</html>`;
}
