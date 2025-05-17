import { useState } from "react";
import AttendanceData from "../../../public/data/AttendenceData";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import AttendenceTable from "../../ui/Tables/AttendenceTable";
import { IAttendence } from "../../types/AttendenceTable";
import AttendenceViewModal from "../../ui/Modal/Attendence/AttendenceViewModal";

const AttendencePage = () => {
  const data: IAttendence[] = AttendanceData;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  const limit = 12;
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IAttendence | null>(null);

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
          data={data}
          loading={false}
          showViewModal={showViewUserModal}
          setPage={setPage}
          page={page}
          total={data.length}
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
