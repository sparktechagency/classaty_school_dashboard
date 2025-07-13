//* ------------------ICONS------------------
import dashboardLogo from "../../public/images/dashboard-logo/dashboard.svg";
import settingLogo from "../../public/images/dashboard-logo/setting.svg";
import classLogo from "../../public/images/dashboard-logo/class.svg";
import scheduleLogo from "../../public/images/dashboard-logo/schedule.svg";
import subjectLogo from "../../public/images/dashboard-logo/subject.svg";
import schoolLogo from "../../public/images/dashboard-logo/school.svg";
import teacherLogo from "../../public/images/dashboard-logo/teacher.svg";
import messageLogo from "../../public/images/dashboard-logo/message.svg";
import assignmentLogo from "../../public/images/dashboard-logo/assignment.svg";
import examLogo from "../../public/images/dashboard-logo/exam.svg";
import resultLogo from "../../public/images/dashboard-logo/result.svg";
import atendenceLogo from "../../public/images/dashboard-logo/atendence.svg";
import anounceLogo from "../../public/images/dashboard-logo/anounce.svg";
import alarmsLogo from "../../public/images/dashboard-logo/alarms.svg";
import managerLogo from "../../public/images/dashboard-logo/manager.svg";
import profileLogo from "../../public/images/dashboard-logo/profile.svg";
import gradeLogo from "../../public/images/dashboard-logo/grade.svg";

//* ------------------IMPORT COMPONENTS------------------
import Notifications from "../pages/Common/Notifications";
import SchoolAdmin from "../pages/SchoolAdmin/SchoolAdmin";
import AlarmsPage from "../pages/SchoolAdmin/Alarms";
import AnouncementPage from "../pages/SchoolAdmin/Anouncement";
import AttendencePage from "../pages/SchoolAdmin/AttendancePage";
import ResultPage from "../pages/SchoolAdmin/ResultPage";
import AssignmentPage from "../pages/SchoolAdmin/AssignmentPage";
import SchoolAdminTeachers from "../pages/SchoolAdmin/SchoolAdminTeachers";
import SchoolAdminStudent from "../pages/SchoolAdmin/SchoolAdminStudent";
import SubjectPage from "../pages/SchoolAdmin/Subject";
import ClassSchedulePage from "../pages/SchoolAdmin/ClassSchedulePage";
import ClassPage from "../pages/SchoolAdmin/Class";
import SchoolAdminOVerview from "../pages/SchoolAdmin/SchoolAdminOVerview";
import ExamPage from "../pages/SchoolAdmin/Exam";
import Profile from "../pages/Common/settings/Profile";
import SchoolAdminAllManager from "../pages/SchoolAdmin/SchoolAdminAllManager";
import GradeSystem from "../pages/SchoolAdmin/GradeSystem";
import ConversationPage from "../pages/Common/ConversationPage";

export const schoolAdminPaths = [
  {
    path: "overview",
    element: <SchoolAdminOVerview />,
    key: "overview",
    name: "Overview",
    icon: dashboardLogo,
  },
  {
    path: "notifications",
    element: <Notifications />,
    key: "notifications",
  },
  {
    path: "class",
    element: <ClassPage />,
    key: "class",
    name: "Class",
    icon: classLogo,
  },
  {
    path: "schedule",
    element: <ClassSchedulePage />,
    key: "schedule",
    name: "Schedule",
    icon: scheduleLogo,
  },
  {
    path: "subject",
    element: <SubjectPage />,
    key: "subject",
    name: "Subjects",
    icon: subjectLogo,
  },
  {
    path: "student",
    element: <SchoolAdminStudent />,
    key: "student",
    name: "Students",
    icon: schoolLogo,
  },
  {
    path: "teacher",
    element: <SchoolAdminTeachers />,
    key: "teacher",
    name: "Teachers",
    icon: teacherLogo,
  },
  {
    path: "message",
    element: <ConversationPage />,
    key: "message",
    name: "Messages",
    icon: messageLogo,
  },
  {
    path: "assignment",
    element: <AssignmentPage />,
    key: "assignment",
    name: "Assignment",
    icon: assignmentLogo,
  },
  {
    path: "exam",
    element: <ExamPage />,
    key: "exam",
    name: "Exam",
    icon: examLogo,
  },
  {
    path: "grade",
    element: <GradeSystem />,
    key: "grade",
    name: "Grade System",
    icon: gradeLogo,
  },
  {
    path: "result",
    element: <ResultPage />,
    key: "result",
    name: "Result",
    icon: resultLogo,
  },
  {
    path: "attendence",
    element: <AttendencePage />,
    key: "attendence",
    name: "Attendence",
    icon: atendenceLogo,
  },
  {
    path: "anouncement",
    element: <AnouncementPage />,
    key: "anouncement",
    name: "Anouncement",
    icon: anounceLogo,
  },

  {
    path: "alarms",
    element: <AlarmsPage />,
    key: "alarms",
    name: "Alarms",
    icon: alarmsLogo,
  },
  {
    path: "all-manager",
    element: <SchoolAdminAllManager />,
    key: "all-manager",
    name: "All Manager",
    icon: managerLogo,
  },
  {
    key: "settings",
    name: "Settings",
    icon: settingLogo,
    children: [
      {
        key: "school-profile",
        path: "settings/school-profile",
        name: "School Profile",
        icon: schoolLogo,
        element: <SchoolAdmin />,
      },
      {
        key: "manager-profile",
        path: "settings/manager-profile",
        name: "Manager Profile",
        icon: profileLogo,
        element: <Profile />,
      },
    ],
  },
];
