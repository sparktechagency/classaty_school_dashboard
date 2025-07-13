//* ------------------ICONS------------------
import dashboardLogo from "../../public/images/dashboard-logo/dashboard.svg";
import settingLogo from "../../public/images/dashboard-logo/setting.svg";
import profileLogo from "../../public/images/dashboard-logo/profile.svg";
import privacyPolicyLogo from "../../public/images/dashboard-logo/privacyPolicy.svg";
import termsAndConditionLogo from "../../public/images/dashboard-logo/termsAndCondition.svg";
import schoolLogo from "../../public/images/dashboard-logo/school.svg";
import studentLogo from "../../public/images/dashboard-logo/student.svg";
import parentsLogo from "../../public/images/dashboard-logo/parents.svg";
import teacherLogo from "../../public/images/dashboard-logo/teacher.svg";
import messageLogo from "../../public/images/dashboard-logo/message.svg";
import subscriptionLogo from "../../public/images/dashboard-logo/subscription.svg";
import earningLogo from "../../public/images/dashboard-logo/earning.svg";
import feedbackLogo from "../../public/images/dashboard-logo/feedback.svg";
import adminLogo from "../../public/images/dashboard-logo/admin.svg";

//* ------------------IMPORT COMPONENTS------------------
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Profile from "../pages/Common/settings/Profile";
import PrivacyPolicy from "../pages/Common/settings/PrivacyPolicy";
import TermsOfService from "../pages/Common/settings/TermsOfService";
import Notifications from "../pages/Common/Notifications";
import AdminAllSchools from "../pages/Admin/AdminAllSchools";
import AdminAllParents from "../pages/Admin/AdminAllParents";
import AdminAllTeacher from "../pages/Admin/AdminAllTeacher";
import Subscription from "../pages/Admin/AdminSubscription";
import AdminAllTransaction from "../pages/Admin/AdminAllTransaction";
import AdminFeedback from "../pages/Admin/AdminFeedbcak";
import AdminAllStudent from "../pages/Admin/AdminAllStudent";
import AdminAllAdmin from "../pages/Admin/AdmiAllAdmin";
import ConversationPage from "../pages/Common/ConversationPage";

export const adminPaths = [
  {
    path: "overview",
    element: <AdminDashboard />,
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
    path: "school",
    element: <AdminAllSchools />,
    key: "school",
    name: "School List",
    icon: schoolLogo,
  },
  {
    path: "student",
    element: <AdminAllStudent />,
    key: "student",
    name: "Student List",
    icon: studentLogo,
  },
  {
    path: "parents",
    element: <AdminAllParents />,
    key: "parents",
    name: "Parents List",
    icon: parentsLogo,
  },
  {
    path: "teacher",
    element: <AdminAllTeacher />,
    key: "teacher",
    name: "Teachers List",
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
    path: "subscription",
    element: <Subscription />,
    key: "subscription",
    name: "Subscription",
    icon: subscriptionLogo,
  },
  {
    path: "earnings",
    element: <AdminAllTransaction />,
    key: "earnings",
    name: "Earnings",
    icon: earningLogo,
  },
  {
    path: "feedback",
    element: <AdminFeedback />,
    key: "feedback",
    name: "Feedback",
    icon: feedbackLogo,
  },
  {
    path: "all-admin",
    element: <AdminAllAdmin />,
    key: "all-admin",
    name: "All Admin",
    icon: adminLogo,
  },
  {
    key: "settings",
    name: "Settings",
    icon: settingLogo,
    children: [
      {
        key: "profile",
        path: "settings/profile",
        name: "Profile",
        icon: profileLogo,
        element: <Profile />,
      },
      {
        key: "privacy-policy",
        path: "settings/privacy-policy",
        name: "Privacy Policy",
        icon: privacyPolicyLogo,
        element: <PrivacyPolicy />,
      },
      {
        key: "terms-of-service",
        path: "settings/terms-of-service",
        name: "Terms of Service",
        icon: termsAndConditionLogo,
        element: <TermsOfService />,
      },
    ],
  },
];
