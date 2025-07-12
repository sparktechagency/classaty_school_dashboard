/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import BlockModal from "../../ui/Modal/BlockModal";
import UnblockModal from "../../ui/Modal/UnblockModal";

import { FiPlus } from "react-icons/fi";
import { useGetTeacherQuery } from "../../redux/features/teacher/teacherApi";
import ReuseButton from "../../ui/Button/ReuseButton";
import DeleteModal from "../../ui/Modal/DeleteModal";
import AddSchoolAdminTeacher from "../../ui/Modal/SchoolAdminTeacher/AddSchoolAdminTeacher";
import SchoolAdminTeacherView from "../../ui/Modal/SchoolAdminTeacher/SchoolAdminTeacherView";
import SchoolAdminTeacherTable from "../../ui/Tables/SchoolAdminTeacherTable";
import { useUserActionMutation } from "../../redux/features/student/studentAPi";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const SchoolAdminTeachers = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const limit = 12;

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const [userAction] = useUserActionMutation();

  const { data: teacherData, isFetching } = useGetTeacherQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showBlockModal = (record: any) => {
    setCurrentRecord(record);
    setIsBlockModalVisible(true);
  };
  const showUnblockModal = (record: any) => {
    setCurrentRecord(record);
    setIsUnblockModalVisible(true);
  };

  const showDeleteModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsViewModalVisible(false);
    setIsBlockModalVisible(false);
    setIsUnblockModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    // setCurrentRecord(null);
  };

  const handleBlock = (record: any) => {
    tryCatchWrapper(
      userAction,
      {
        body: {
          userId: record?.userId,
          action: "blocked",
        },
      },
      "Blocking..."
    );
    handleCancel();
  };
  const handleUnblock = (record: any) => {
    handleCancel();
    tryCatchWrapper(
      userAction,
      {
        body: {
          userId: record?.userId,
          action: "active",
        },
      },
      "Unblocking..."
    );
  };

  const handleDelete = (record: any) => {
    handleCancel();
    console.log(record);
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-secondary-color font-bold">
          Teacher
        </p>
        <div className="h-fit">
          <ReuseButton
            variant="secondary"
            className="!py-4.5"
            onClick={showAddModal}
          >
            <FiPlus className="!text-bas" /> Add New Teacher
          </ReuseButton>
        </div>
      </div>
      <div className="flex justify-end items-center mb-5">
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search Teacher..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>
      <div className="border-2 border-[#e1e1e1] rounded-xl rounded-tr-xl">
        <SchoolAdminTeacherTable
          data={teacherData?.data?.result}
          loading={isFetching}
          showViewModal={showViewUserModal}
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
          setPage={setPage}
          page={page}
          total={teacherData?.data?.meta?.total}
          limit={limit}
        />
      </div>

      <AddSchoolAdminTeacher
        isAddModalVisible={isAddModalVisible}
        handleCancel={handleCancel}
      />

      <SchoolAdminTeacherView
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        showDeleteModal={showDeleteModal}
      />
      <BlockModal
        isBlockModalVisible={isBlockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleBlock={handleBlock}
        description=" Are You Sure You want to Block This Teacher ?"
      />
      <UnblockModal
        isUnblockModalVisible={isUnblockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleUnblock={handleUnblock}
        description=" Are You Sure You want to Unblock This Teacher ?"
      />
      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        handleCancel={handleDeleteCancel}
        currentRecord={currentRecord}
        handleDelete={handleDelete}
        description=" Are You Sure You want to Delete This Teacher ?"
      />
    </div>
  );
};

export default SchoolAdminTeachers;
