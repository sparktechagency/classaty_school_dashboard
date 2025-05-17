import AdminOverviewCard from "../../Components/Dashboard/Overview/Admin/AdminOverviewCard";
import RecentSchool from "../../Components/Dashboard/Overview/Admin/RecentSchool";
import UserOverview from "../../Components/Dashboard/Overview/Admin/UserOverview";
import IncomeOverview from "../../Components/Dashboard/Overview/IncomeOverview";
const AdminDashboard = () => {
  return (
    <div>
      <>
        <div className="my-5">
          <AdminOverviewCard />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8">
          <UserOverview />
          <IncomeOverview />
        </div>
        <div>
          <RecentSchool />
        </div>
      </>
    </div>
  );
};

export default AdminDashboard;
