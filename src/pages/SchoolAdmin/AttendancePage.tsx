import { useState } from "react";
import { useGetAllAttendancesQuery } from "../../redux/features/attendance/attendanceApi";
import { IAttendence } from "../../types/AttendenceTable";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import AttendenceViewModal from "../../ui/Modal/Attendence/AttendenceViewModal";
import AttendenceTable from "../../ui/Tables/AttendenceTable";

const AttendencePage = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const limit = 12;
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IAttendence | null>(null);

  const { data: attendanceData , isFetching} = useGetAllAttendancesQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  const showViewUserModal = (record: IAttendence) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
  };


  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-secondary-color font-bold">
          Attendance
        </p>
        <div className="h-fit">
          <div className="h-fit">
            <ReuseSearchInput
              placeholder="Search Attendence ..."
              setSearch={setSearchText}
              setPage={setPage}
            />
          </div>
        </div>
      </div>

      <div className="border-2 border-[#e1e1e1] rounded-xl rounded-tr-xl">
        <AttendenceTable
          data={attendanceData?.data?.result}
          loading={isFetching}
          showViewModal={showViewUserModal}
          setPage={setPage}
          page={page}
          total={attendanceData?.data?.meta?.total}
          limit={limit}
        />
      </div>
      <AttendenceViewModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default AttendencePage;
