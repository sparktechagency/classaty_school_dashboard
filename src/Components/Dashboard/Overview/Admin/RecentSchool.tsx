/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import BlockModal from "../../../../ui/Modal/BlockModal";
import UnblockModal from "../../../../ui/Modal/UnblockModal";
import UserModal from "../../../../ui/Modal/User/SchoolModal";
import SchoolsData from "../../../../../public/data/SchoolData";
import DeleteModal from "../../../../ui/Modal/DeleteModal";
import AllSchoolTable from "../../../../ui/Tables/SchoolTable";
import EditSchoolModal from "../../../../ui/Modal/User/EditSchoolModal";

const RecentSchool = () => {
  const recentUserData: any[] = SchoolsData.slice(0, 6);

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
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

  const handleBlock = (data: any) => {
    console.log("block", data);
  };
  const handleUnblock = (data: any) => {
    console.log("unblock", data);
  };

  const handleDelete = (record: any) => {
    handleCancel();
    console.log(record);
  };
  return (
    <div className="mt-10 rounded-xl">
      <div className="flex justify-between items-center py-2">
        <p className="text-2xl text-base-color lg:text-3xl font-bold mb-5">
          Recent Added School
        </p>
      </div>
      <div className="border-2 border-[#e1e1e1] rounded-tl-xl rounded-tr-xl">
        <AllSchoolTable
          data={recentUserData}
          loading={false}
          showViewModal={showViewUserModal}
          showBlockModal={showBlockModal}
          showEditModal={showEditModal}
          showUnblockModal={showUnblockModal}
          showFilter={false}
        />
      </div>
      <EditSchoolModal
        isEditModalVisible={isEditModalVisible}
        handleCancel={handleCancel}
      />
      <UserModal
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
        description=" Are You Sure You want to Block This School?"
      />
      <UnblockModal
        isUnblockModalVisible={isUnblockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleUnblock={handleUnblock}
        description=" Are You Sure You want to Unblock This School?"
      />
      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        handleCancel={handleDeleteCancel}
        currentRecord={currentRecord}
        handleDelete={handleDelete}
        description=" Are You Sure You want to Delete This School ?"
      />
    </div>
  );
};

export default RecentSchool;
