import RecentNotification from "../../Components/Dashboard/Overview/Admin/RecentNotification";
import AttendenceOverview from "../../Components/Dashboard/Overview/SchoolAdmin/AttendenceOverview";
import RecentStudent from "../../Components/Dashboard/Overview/SchoolAdmin/RecentStudent";
import SchoolAdminOverviewCard from "../../Components/Dashboard/Overview/SchoolAdmin/SchoolAdminOverviewCard";
const SchoolAdminOVerview = () => {
  return (
    <div>
      <>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8">
          <div>
            <SchoolAdminOverviewCard />
            <AttendenceOverview />
          </div>
          <RecentNotification />
        </div>
        <div>
          <RecentStudent />
        </div>
      </>
    </div>
  );
};

export default SchoolAdminOVerview;
