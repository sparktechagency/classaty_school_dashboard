/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { MdDownload, MdFileUpload } from "react-icons/md";
import {
  useDeleteClassScheduleMutation,
  useGetAllClassScheduleQuery,
} from "../../redux/features/classSchedule/classScheduleApi";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import AddClassSchedule from "../../ui/Modal/ClassSchedule/AddClassSchedule";
import DeleteModal from "../../ui/Modal/DeleteModal";
import ClassScheduleTable from "../../ui/Tables/ClassScheduleTable";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import EditClassSchedule from "../../ui/Modal/ClassSchedule/EditClassSchedule";

const ClassSchedulePage = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const limit = 12;
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);
  const [deleteClassSchedule] = useDeleteClassScheduleMutation();

  const { data, isFetching } = useGetAllClassScheduleQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  const classScheduleData = data?.data;

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const showEditModal = (record: any) => {
    setIsEditModalVisible(true);
    setCurrentRecord(record);
  };

  const showDeleteModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDelete = async (record: any) => {
    const res = await tryCatchWrapper(
      deleteClassSchedule,
      { params: record?._id },
      "Deleting..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-secondary-color font-bold">
          Class Schedule
        </p>
        <div className="h-fit">
          <div className="h-fit flex items-center gap-3">
            <ReuseButton variant="primary" className="!py-4.5">
              <MdFileUpload className="!text-bas" /> Upload From Excel/CSV
            </ReuseButton>
            <ReuseButton variant="secondary" className="!py-4.5">
              <MdDownload className="!text-bas" /> Download Format
            </ReuseButton>
            <ReuseButton
              variant="secondary"
              className="!py-4.5"
              onClick={showAddModal}
            >
              <FiPlus className="!text-bas" /> Add New Schedule
            </ReuseButton>
          </div>
        </div>
      </div>
      <div className="h-fit flex justify-end">
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search Schedule ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>
      <AddClassSchedule
        isAddModalVisible={isAddModalVisible}
        handleCancel={handleCancel}
      />
      <div className="border-2 border-[#e1e1e1] rounded-xl rounded-tr-xl">
        <ClassScheduleTable
          data={classScheduleData?.result}
          loading={isFetching}
          showDeleteModal={showDeleteModal}
          ShowAddModal={showAddModal}
          showEditModal={showEditModal}
          setPage={setPage}
          page={page}
          total={classScheduleData?.meta?.total}
          limit={limit}
        />
      </div>

      <EditClassSchedule
        isAddModalVisible={isEditModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleDelete={handleDelete}
        description=" Are You Sure You want to Delete This ?"
      />
    </div>
  );
};

export default ClassSchedulePage;
