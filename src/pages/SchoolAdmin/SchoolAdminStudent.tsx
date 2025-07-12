/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import BlockModal from "../../ui/Modal/BlockModal";
import UnblockModal from "../../ui/Modal/UnblockModal";

import { FiPlus } from "react-icons/fi";
import { MdDownload, MdFileUpload } from "react-icons/md";
import { useGetAllStudentsQuery } from "../../redux/features/school/schoolApi";
import {
  useDeleteStudentMutation,
  useUserActionMutation
} from "../../redux/features/student/studentAPi";
import ReuseButton from "../../ui/Button/ReuseButton";
import DeleteModal from "../../ui/Modal/DeleteModal";
import AddSchoolAdminStudent from "../../ui/Modal/SchoolAdminStudent/AddSchoolAdminStudent";
import EditSchoolAdminStudent from "../../ui/Modal/SchoolAdminStudent/EditSchoolAdminStudent";
import SendNotification from "../../ui/Modal/SchoolAdminStudent/SendNotification";
import ViewSchoolAdminStudent from "../../ui/Modal/SchoolAdminStudent/ViewSchoolAdminStudent";
import SchoolAdminStudentTable from "../../ui/Tables/SchoolAdminStudentTable";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const SchoolAdminStudent = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  const limit = 12;

  const { data: studentData, isFetching } = useGetAllStudentsQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  const [isSendModalVisible, setIsSendModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const [userAction] = useUserActionMutation();
  const [deleteStudent] = useDeleteStudentMutation();

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const showSendModal = (record: any) => {
    setCurrentRecord(record);
    setIsSendModalVisible(true);
  };

  const showEditModal = (record: any) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
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
    setIsSendModalVisible(false);
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
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
    handleCancel();

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
  };

  const handleUnblock = (record: any) => {
    tryCatchWrapper(
      userAction,
      {
        body: {
          userId: record?.userId,
          action: "active",
        },
      },
      "Blocking..."
    );
    handleCancel();
  };

  const handleDelete = (record: any) => {
    handleCancel();
    tryCatchWrapper(
      deleteStudent,
      {
        params: record?._id,
      },
      "Deleting..."
    );
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-secondary-color font-bold">
          Student
        </p>
        <div className="h-fit flex items-center gap-2">
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
            <FiPlus className="!text-bas" /> Add New Student
          </ReuseButton>
        </div>
      </div>
      <div className="flex justify-end items-center mb-5">
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search Student.."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>
      <div className="border-2 border-[#e1e1e1] rounded-xl rounded-tr-xl">
        <SchoolAdminStudentTable
          data={studentData?.data?.result}
          loading={isFetching}
          showEditModal={showEditModal}
          showViewModal={showViewUserModal}
          showSendModal={showSendModal}
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
          setPage={setPage}
          page={page}
          total={studentData?.data?.meta?.total}
          limit={limit}
        />
      </div>

      <AddSchoolAdminStudent
        isAddModalVisible={isAddModalVisible}
        handleCancel={handleCancel}
      />
      <EditSchoolAdminStudent
        isEditModalVisible={isEditModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <SendNotification
        isSendModalVisible={isSendModalVisible}
        handleCancel={handleCancel}
      />

      <ViewSchoolAdminStudent
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        showDeleteModal={showDeleteModal}
        setIsSendModalVisible={setIsSendModalVisible}
      />
      <BlockModal
        isBlockModalVisible={isBlockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleBlock={handleBlock}
        description=" Are You Sure You want to Block This ?"
      />
      <UnblockModal
        isUnblockModalVisible={isUnblockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleUnblock={handleUnblock}
        description=" Are You Sure You want to Unblock This ?"
      />
      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        handleCancel={handleDeleteCancel}
        currentRecord={currentRecord}
        handleDelete={handleDelete}
        description=" Are You Sure You want to Delete This ?"
      />
    </div>
  );
};

export default SchoolAdminStudent;
