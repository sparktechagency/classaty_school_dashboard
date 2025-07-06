import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { MdDownload, MdFileUpload } from "react-icons/md";
import { useBlockUserMutation } from "../../redux/features/parents/parentsApi";
import {
  useDeleteStudentMutation,
  useGetStudentQuery,
} from "../../redux/features/student/studentAPi";
import { IStudentData } from "../../types";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import BlockModal from "../../ui/Modal/BlockModal";
import DeleteModal from "../../ui/Modal/DeleteModal";
import AddStudent from "../../ui/Modal/Student/AddStudent";
import ViewStudentModal from "../../ui/Modal/Student/ViewStudentModal";
import UnblockModal from "../../ui/Modal/UnblockModal";
import StudentTable from "../../ui/Tables/StudentTable";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const AdminAllStudent = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  const limit = 12;

  const { data, isFetching } = useGetStudentQuery({
    page,
    limit,
    searchTerm: searchText,
  });
  const [deleteStudent] = useDeleteStudentMutation();
  const [userAction] = useBlockUserMutation();

  const schoolData: IStudentData[] = data?.data?.result;
  const schoolPagination = data?.data?.meta;

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IStudentData | null>(null);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const showViewUserModal = (record: IStudentData) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showBlockModal = (record: IStudentData) => {
    setCurrentRecord(record);
    setIsBlockModalVisible(true);
  };
  const showUnblockModal = (record: IStudentData) => {
    setCurrentRecord(record);
    setIsUnblockModalVisible(true);
  };

  const showDeleteModal = (record: IStudentData) => {
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

  const handleBlock = async (data: IStudentData) => {
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
  const handleUnblock = async (data: IStudentData) => {
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

  const handleDelete = async (record: IStudentData) => {
    const res = await tryCatchWrapper(
      deleteStudent,
      { params: record?.student?._id },
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
          Student List
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
            placeholder="Search Student ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>
      <div className="border-2 border-[#e1e1e1] rounded-xl rounded-tr-xl">
        <StudentTable
          data={schoolData}
          loading={isFetching}
          showViewModal={showViewUserModal}
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
          setPage={setPage}
          page={page}
          total={schoolPagination?.total}
          limit={limit}
        />
      </div>

      <AddStudent
        isAddModalVisible={isAddModalVisible}
        handleCancel={handleCancel}
      />

      <ViewStudentModal
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
        description=" Are You Sure You want to Block This Student ?"
      />
      <UnblockModal
        isUnblockModalVisible={isUnblockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleUnblock={handleUnblock}
        description=" Are You Sure You want to Unblock This Student ?"
      />
      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        handleCancel={handleDeleteCancel}
        currentRecord={currentRecord}
        handleDelete={handleDelete}
        description=" Are You Sure You want to Delete This Student ?"
      />
    </div>
  );
};

export default AdminAllStudent;
