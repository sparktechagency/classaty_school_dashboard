/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import BlockModal from "../../ui/Modal/BlockModal";
import UnblockModal from "../../ui/Modal/UnblockModal";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";

import DeleteModal from "../../ui/Modal/DeleteModal";
import ReuseButton from "../../ui/Button/ReuseButton";
import { FiPlus } from "react-icons/fi";
import AdminAllAdminTable from "../../ui/Tables/AdminAllAdminTable";
import EditAdminModal from "../../ui/Modal/AdminAllAdmin/EditAdminAllAdmin";
import AddAdminModal from "../../ui/Modal/AdminAllAdmin/AddAdminModal";
import ViewAdminModal from "../../ui/Modal/AdminAllAdmin/ViewAdminModal";
import {
  useDeleteAdminMutation,
  useGetAdminQuery,
} from "../../redux/features/allAdmin/allAdminApi";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { useBlockUserMutation } from "../../redux/features/parents/parentsApi";

const AdminAllAdmin = () => {
  const [deleteAdmin] = useDeleteAdminMutation();
  const [userAction] = useBlockUserMutation();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const limit = 12;

  const { data, isFetching } = useGetAdminQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  const allAdminData = data?.data?.result;
  const allAdminPagination = data?.data?.meta;

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

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

  const handleBlock = async (data: any) => {
    const res = await tryCatchWrapper(
      userAction,
      {
        body: {
          userId: data?._id,
          action: "blocked",
        },
      },
      "Blocking..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };
  const handleUnblock = async (data: any) => {
    const res = await tryCatchWrapper(
      userAction,
      {
        body: {
          userId: data?._id,
          action: "active",
        },
      },
      "Unblocking..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };

  const handleDelete = async () => {
    const res = await tryCatchWrapper(
      deleteAdmin,
      { params: currentRecord?._id },
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
          Admin List
        </p>
        <div className="h-fit">
          <ReuseButton
            variant="secondary"
            className="!py-4.5"
            onClick={showAddModal}
          >
            <FiPlus className="!text-bas" /> Add New Admin
          </ReuseButton>
        </div>
      </div>
      <div className="flex justify-end items-center mb-5">
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search Admin..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>
      <div className="border-2 border-[#e1e1e1] rounded-xl rounded-tr-xl">
        <AdminAllAdminTable
          data={allAdminData}
          loading={isFetching}
          showViewModal={showViewUserModal}
          showEditModal={showEditModal}
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
          setPage={setPage}
          page={page}
          total={allAdminPagination?.total}
          limit={limit}
        />
      </div>

      <EditAdminModal
        isEditModalVisible={isEditModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <AddAdminModal
        isAddModalVisible={isAddModalVisible}
        handleCancel={handleCancel}
      />

      <ViewAdminModal
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
        description=" Are You Sure You want to Block This Admin ?"
      />
      <UnblockModal
        isUnblockModalVisible={isUnblockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleUnblock={handleUnblock}
        description=" Are You Sure You want to Unblock This Admin ?"
      />
      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        handleCancel={handleDeleteCancel}
        currentRecord={currentRecord}
        handleDelete={handleDelete}
        description=" Are You Sure You want to Delete This Admin ?"
      />
    </div>
  );
};

export default AdminAllAdmin;
