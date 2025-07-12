/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import BlockModal from "../../ui/Modal/BlockModal";
import UnblockModal from "../../ui/Modal/UnblockModal";

import { FiPlus } from "react-icons/fi";
import { useGetAllManagersQuery } from "../../redux/features/manager/managerApi";
import ReuseButton from "../../ui/Button/ReuseButton";
import DeleteModal from "../../ui/Modal/DeleteModal";
import AddSchoolAdminAllManager from "../../ui/Modal/SchoolAdminAllManager/AddSchoolAdminAllManager";
import EditSchoolAdminAllManager from "../../ui/Modal/SchoolAdminAllManager/EditSchoolAdminAllManager";
import ViewSchoolAdminAllManager from "../../ui/Modal/SchoolAdminAllManager/ViewSchoolAdminAllManager";
import SchoolAdminAllManagerTable from "../../ui/Tables/SchoolAdminAllManagerTable";
import { useUserActionMutation } from "../../redux/features/student/studentAPi";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const SchoolAdminAllManager = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const limit = 12;

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const { data: managers, isFetching } = useGetAllManagersQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  const [userAction] = useUserActionMutation();

  const showAddModal = () => {
    setIsAddModalVisible(true);
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

  const handleBlock = async (record: any) => {
    const res = await tryCatchWrapper(
      userAction,
      {
        body: {
          userId: record?.userId,
          action: "blocked",
        },
      },
      "Blocking..."
    );

    if (res?.statusCode === 200) {
      handleCancel();
    }
  };
  const handleUnblock = async (record: any) => {
    const res = await tryCatchWrapper(
      userAction,
      {
        body: {
          userId: record?.userId,
          action: "active",
        },
      },
      "Unblocking..."
    );

    if (res?.statusCode === 200) {
      handleCancel();
    }
  };

  const handleDelete = (record: any) => {
    handleCancel();
    console.log(record);
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-secondary-color font-bold">
          All Managers
        </p>
        <div className="h-fit">
          <ReuseButton
            variant="secondary"
            className="!py-4.5"
            onClick={showAddModal}
          >
            <FiPlus className="!text-bas" /> Add New Manager
          </ReuseButton>
        </div>
      </div>
      <div className="flex justify-end items-center mb-5">
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search Manager..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>
      <div className="border-2 border-[#e1e1e1] rounded-xl rounded-tr-xl">
        <SchoolAdminAllManagerTable
          data={managers?.data?.result}
          loading={isFetching}
          showViewModal={showViewUserModal}
          showEditModal={showEditModal}
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
          setPage={setPage}
          page={page}
          total={managers?.data?.meta?.total}
          limit={limit}
        />
      </div>

      <EditSchoolAdminAllManager
        isEditModalVisible={isEditModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <AddSchoolAdminAllManager
        isAddModalVisible={isAddModalVisible}
        handleCancel={handleCancel}
      />

      <ViewSchoolAdminAllManager
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
        description=" Are You Sure You want to Block This Manager ?"
      />
      <UnblockModal
        isUnblockModalVisible={isUnblockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleUnblock={handleUnblock}
        description=" Are You Sure You want to Unblock This Manager ?"
      />
      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        handleCancel={handleDeleteCancel}
        currentRecord={currentRecord}
        handleDelete={handleDelete}
        description=" Are You Sure You want to Delete This Manager ?"
      />
    </div>
  );
};

export default SchoolAdminAllManager;
