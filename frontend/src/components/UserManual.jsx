import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const manualContent = {
  '/': 'Welcome to the dashboard! Use the navigation bar to access different features.',
  '/login': 'Enter your credentials to log in. If you forgot your password, use the reset link.',
  '/faculty/FacultyDashboard': 'This is the Faculty Dashboard. Here you can view your assigned courses, duties, and more.',
  '/hod/HODDashboard': 'This is the HOD Dashboard. Approve QP orders, assign duties, and manage faculty here.',
  '/student-input': `This page is used to enter the student strength for each course and category. It is the first step before generating Question Paper (QP) orders and claim letters.\nSelect Specialization and Course Code\n→ Course name auto-fills.\n\nEnter CEG & MIT student counts\n→ Regular + Arrear\n\nTotals auto-calculate:\n\nTotal CEG\n\nTotal MIT\n\nTotal Regular, Arrear, Students\n\nClick Submit to save.\nUsed for QP order, seating, script request & claims.`,
  '/assign-qpsetter': `Select Subject\n→ Choose the subject for which a question paper needs to be set.\n\nSelect Faculty\n→ Pick a faculty member from the dropdown to assign as QP setter.\n\nClick Assign\n→ Saves the assignment in the system.\n→ Used for generating QP order and setting claim letters.`,
  '/hod/assign-qpsetter': `Approve or Reject
→ Only HOD can Approve or Reject (mark as Bunk) the assignment.

Save Changes
→ Finalized decisions reflect in QP orders and claims.

👨‍🏫 Access restricted to HOD only.`,
  '/dashboard/seating-arrangement': `Select Date\n→ Choose the exam date for which seating needs to be arranged.\n\nSelect Session\n→ Pick the session (FN / AN / FN+AN) for that date.\n\nClick \"Generate Arrangement\"\n→ Auto-generates room-wise seating based on student count.\n→ Used for printing hall allotment sheets.\n\n📌 Coordinator-only access.\n✅ Make sure student input and timetable are added before this.`,
  '/duties': `Select Date & Session\n→ Choose the exam date and session (FN/AN).\n\nSelect Room\n→ Pick a room to view or assign duty.\n\nView Assigned Duties\n→ See which faculty is assigned to which room, along with date, session, and status.\n\n📌 Used for managing invigilation.\n👤 Only Coordinator has access to this page.`,
  '/claims': `Search Faculty\n→ Use Faculty ID or Name to filter claim records.\n\nView Claims\n→ Lists duty type (QP setting, Evaluation, Invigilation), amount, and status.\n\nGenerate Settlement\n→ Click \"Generate Settlement PDF\" to download claim report for ACOE submission.\n\n🧾 Used for preparing financial settlement letters.\n👤 Access restricted to Coordinator only.`,
  '/letters': `This page is used to generate official letters required for PG examinations.\n\nAnswer Sheet Request Letter\n→ Click Generate PDF to create request based on student data.\n\nAdvance Claim Letter\n→ Click Generate & Forward to HoD to raise fund request.\n\nEvaluation Letter\n→ Generate evaluator assignment letter.\n→ Options: Generate, Forward to HoD, Download PDF\n\nAdvance Requisition for PG Claims\n→ Generate fund requisition for overall PG exam claims.\n\n📌 Coordinator role only.\n✅ Make sure student input and QP order are completed before generating letters.`,
  '/sessions': `Upload Timetable File First (Excel/CSV)
→ Session data will be extracted from this file.

View Exam Sessions
→ Shows date-wise & session-wise exam schedule (FN / AN).
→ Includes course code, name, and specialization.

Edit if Required
→ Update session details in case of timetable changes.

📌 Base for QP orders, seating, invigilation & letter generation.`,
  '/coordinator/reset-password': `Enter Current Password
→ Required for verification.

Enter New Password
→ Choose a strong new password.

Confirm New Password
→ Must match the new password exactly.

Click "Reset"
→ Updates your login password securely.

✅ Only the logged-in coordinator can use this page.`,
  '/faculty/assigned-courses': `View Assigned Courses
→ Displays only the course codes and names assigned to the logged-in faculty.

Read-Only Access
→ Faculty can view but cannot edit assigned subjects.

Used For:

Identifying QP setting responsibilities

Reference for evaluation or invigilation duties

👨‍🏫 Accessible only to faculty after login.`,
  '/faculty/qp-orders': `View Assigned QP Orders
→ Shows question paper orders related to your assigned subjects.

Download QP Order Letters
→ Click Download to get the official QP order in PDF format.

For Faculty Reference
→ Use this for question paper preparation and setting claims.

👨‍🏫 Access limited to the logged-in faculty only.`,
  '/faculty/invigilation-duty': `View Assigned Duties
→ Shows your invigilation dates, sessions (FN/AN), and room numbers.

Duty Details
→ Each entry includes exam date, session, and hall assigned.

Read-Only Access
→ For faculty to refer their official exam duty.

👨‍🏫 Only accessible to the respective faculty after login.`,
  '/faculty/update-profile': `Faculty must update profile before submitting any exam-related claims.`,
  '/hod/consolidated-sessions': `View All Exam Sessions
→ Displays date-wise and session-wise list of all PG exams.
Used For:

Monitoring exam schedule

👨‍🏫 Access restricted to HOD only.`,
  '/hod/letters': `Evaluation Letter
→ View evaluator details
→ Approve or Reject the assignment

Advance Requisition for PG Claims
→ View fund request details
→ Approve or Reject as needed

Release Advance Claim Letter
→ View finalized claim
→ Download PDF for records or submission

🧾 HOD is the final authority for approval of all letters before submission to ACOE.

Let me know if you want approval status color codes or auto email alerts added!`,
  '/hod/reset-password': `Enter Current Password
→ For verification and security.

Enter New Password
→ Choose a strong new password.

Confirm New Password
→ Must match the new password.

Click "Reset"
→ Updates your login credentials.

👨‍🏫 Only the logged-in HOD can reset their own password.`,
  // Add more routes and their manual content as needed
};

// Pages where User Manual button should be hidden
const hiddenPages = [
  '/',
  '/about', 
  '/faculty/login',
  '/faculty/dashboard',
  '/hod/login',
  '/hod/dashboard',
  '/coordinator/reset-password',
  '/dashboard',
  '/login'
];

const UserManual = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const content = manualContent[location.pathname] || 'User manual for this page is coming soon.';
  
  // Hide the component entirely on specified pages
  if (hiddenPages.includes(location.pathname)) {
    return null;
  }

  return (
    <>
      {/* Slide-up panel */}
      <div
        className={`fixed left-0 right-0 bottom-0 z-50 transition-transform duration-300 ease-in-out bg-white shadow-2xl border-t border-gray-200 max-h-[60vh] overflow-y-auto px-6 py-4
          ${open ? 'translate-y-0' : 'translate-y-full'}
        `}
        style={{ pointerEvents: open ? 'auto' : 'none' }}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">User Manual</h2>
          <button
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold focus:outline-none"
            onClick={() => setOpen(false)}
            aria-label="Close user manual"
          >
            &times;
          </button>
        </div>
        <div className="text-gray-700 whitespace-pre-line">{content}</div>
      </div>
      {/* Open button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        onClick={() => setOpen(true)}
        style={{ display: open ? 'none' : 'block' }}
        aria-label="Open user manual"
      >
        User Manual
      </button>
    </>
  );
};

export default UserManual; 