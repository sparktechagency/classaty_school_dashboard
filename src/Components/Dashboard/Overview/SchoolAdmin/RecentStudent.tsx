/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { useGetAllStudentsQuery } from "../../../../redux/features/school/schoolApi";
import BlockModal from "../../../../ui/Modal/BlockModal";
import DeleteModal from "../../../../ui/Modal/DeleteModal";
import EditSchoolAdminStudent from "../../../../ui/Modal/SchoolAdminStudent/EditSchoolAdminStudent";
import SendNotification from "../../../../ui/Modal/SchoolAdminStudent/SendNotification";
import ViewSchoolAdminStudent from "../../../../ui/Modal/SchoolAdminStudent/ViewSchoolAdminStudent";
import UnblockModal from "../../../../ui/Modal/UnblockModal";
import SchoolAdminStudentTable from "../../../../ui/Tables/SchoolAdminStudentTable";

const RecentStudent = () => {
  const [isSendModalVisible, setIsSendModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const { data: studentData } = useGetAllStudentsQuery({
    page: 1,
    limit: 6,
  });

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showSendModal = (record: any) => {
    setCurrentRecord(record);
    setIsSendModalVisible(true);
  };

  const showEditModal = (record: any) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
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
    setIsViewModalVisible(false);
    setIsBlockModalVisible(false);
    setIsUnblockModalVisible(false);
    setIsDeleteModalVisible(false);
    setIsEditModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    // setCurrentRecord(null);
  };

  const handleBlock = (record: any) => {
    handleCancel();
    console.log(record);
  };
  const handleUnblock = (record: any) => {
    handleCancel();
    console.log(record);
  };

  const handleDelete = (record: any) => {
    handleCancel();
    console.log(record);
  };

  return (
    <div className=" bg-primary-color rounded-xl  mt-10">
      <div className="flex justify-between items-center py-2">
        <p className="text-2xl text-base-color lg:text-3xl font-bold mb-5">
          Recent Students
        </p>
      </div>
      <div className="border-2 border-[#e1e1e1] rounded-xl rounded-tr-xl">
        <SchoolAdminStudentTable
          data={studentData?.data?.result}
          loading={false}
          showSendModal={showSendModal}
          showViewModal={showViewUserModal}
          showEditModal={showEditModal}
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
        />
      </div>

      <SendNotification
        isSendModalVisible={isSendModalVisible}
        handleCancel={handleCancel}
      />
      <EditSchoolAdminStudent
        isEditModalVisible={isEditModalVisible}
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
        description=" Are You Sure You want to Block This  ?"
      />
      <UnblockModal
        isUnblockModalVisible={isUnblockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleUnblock={handleUnblock}
        description=" Are You Sure You want to Unblock This  ?"
      />
      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        handleCancel={handleDeleteCancel}
        currentRecord={currentRecord}
        handleDelete={handleDelete}
        description=" Are You Sure You want to Delete This  ?"
      />
    </div>
  );
};

export default RecentStudent;
