import { useState } from "react";
import BlockModal from "../../ui/Modal/BlockModal";
import UnblockModal from "../../ui/Modal/UnblockModal";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import DeleteModal from "../../ui/Modal/DeleteModal";
import ReuseButton from "../../ui/Button/ReuseButton";
import { FiPlus } from "react-icons/fi";
import { ITeacherData } from "../../types";
import AddTeacher from "../../ui/Modal/Teachers/AddTeacher";
import AllTeacherTable from "../../ui/Tables/TeacherTable";
import ViewTeachersModal from "../../ui/Modal/Teachers/ViewTeachersModal";
import {
  useDeleteTeacherMutation,
  useGetTeacherQuery,
} from "../../redux/features/teacher/teacherApi";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { useBlockUserMutation } from "../../redux/features/parents/parentsApi";

const AdminAllTeacher = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const [deleteTeacher] = useDeleteTeacherMutation();

  const limit = 12;
  const { data, isFetching } = useGetTeacherQuery({
    page,
    limit,
    searchTerm: searchText,
  });
  const teacherData: ITeacherData[] = data?.data?.result;
  const teacherPagination = data?.data?.meta;

  const [userAction] = useBlockUserMutation();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<ITeacherData | null>(null);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const showViewUserModal = (record: ITeacherData) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showBlockModal = (record: ITeacherData) => {
    setCurrentRecord(record);
    setIsBlockModalVisible(true);
  };
  const showUnblockModal = (record: ITeacherData) => {
    setCurrentRecord(record);
    setIsUnblockModalVisible(true);
  };

  const showDeleteModal = (record: ITeacherData) => {
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

  const handleBlock = async (data: ITeacherData) => {
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
  const handleUnblock = async (data: ITeacherData) => {
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
  const handleDelete = async (data: ITeacherData) => {
    const res = await tryCatchWrapper(
      deleteTeacher,
      { params: data?._id },
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
          Teacher List
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
        <AllTeacherTable
          data={teacherData}
          loading={isFetching}
          showViewModal={showViewUserModal}
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
          setPage={setPage}
          page={page}
          total={teacherPagination?.total}
          limit={limit}
        />
      </div>

      <AddTeacher
        isAddModalVisible={isAddModalVisible}
        handleCancel={handleCancel}
      />

      <ViewTeachersModal
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

export default AdminAllTeacher;
