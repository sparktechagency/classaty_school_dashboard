import { useState } from "react";
import { useGetResultOfStudentQuery } from "../../redux/features/school/schoolApi";
import { ResultType } from "../../types/ResultType";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ResultView from "../../ui/Modal/Result/ResultView";
import ResultTable from "../../ui/Tables/ResultTable";
import ResultEdit from "../../ui/Modal/Result/ResultEdit";

const ResultPage = () => {
  // const data: ResultType[] = ResultData;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  const limit = 12;
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<ResultType | null>(null);
  const [editRecord, setEditRecord] = useState<ResultType | null>(null);

  console.log("currentRecord", currentRecord);
  console.log("editRecord", editRecord);

  const { data, isFetching } = useGetResultOfStudentQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  const showViewUserModal = (record: ResultType) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showEditModal = (record: ResultType) => {
    setEditRecord(record);
    setIsEditModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setEditRecord(null);
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-secondary-color font-bold">
          Result
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
        <ResultTable
          data={data?.data?.result}
          loading={isFetching}
          showViewModal={showViewUserModal}
          setPage={setPage}
          page={page}
          total={data?.data?.meta?.total}
          limit={limit}
        />
      </div>
      <ResultView
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        showEditModal={showEditModal}
        currentRecord={currentRecord}
      />
      <ResultEdit
        isEditModalVisible={isEditModalVisible}
        handleCancel={handleEditCancel}
        currentRecord={editRecord}
      />
    </div>
  );
};

export default ResultPage;
