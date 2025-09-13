/* eslint-disable @typescript-eslint/no-explicit-any */
import { Upload, UploadProps } from "antd";
import Cookies from "js-cookie";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { MdDownload, MdFileUpload } from "react-icons/md";
import { toast } from "sonner";
import { getBaseUrl } from "../../helpers/config/envConfig";
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
import EditStudent from "../../ui/Modal/Student/EditStudent";

const AdminAllStudent = () => {
  const token = Cookies.get("classaty_accessToken");

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
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IStudentData | null>(null);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const showEditModal = (record: IStudentData) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
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

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "../../file/Student.xlsx"; // Your file URL (can be relative or absolute)
    link.download = "Student-Format.xlsx"; // Desired download filename
    link.click();
  };

  // useEffect(() => {
  //   if (xlFile && !hasSubmittedRef.current) {
  //     hasSubmittedRef.current = true;
  //     handleSubmitXm()
  //       .catch(console.error)
  //       .finally(() => {
  //         hasSubmittedRef.current = false; // reset if you want to allow future submissions
  //       });
  //   }
  // }, [xlFile]);

  const toastState = {
    id: null as any,
  };

  const props: UploadProps = {
    name: "file",
    action: `${getBaseUrl()}/student/create_student_using_xlsx`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    onChange(info) {
      console.log(info.file.status);

      if (info.file.status === "uploading") {
        if (!toastState.id) {
          toastState.id = toast.loading("Uploading file...", {
            duration: Infinity, // keep loading until updated
          });
        }
      }

      if (info.file.status === "done") {
        if (toastState.id) {
          toast.success(`${info.file.name} file uploaded successfully`, {
            id: toastState.id,
            duration: 2000,
          });
        }
        toastState.id = null;
      } else if (info.file.status === "error") {
        const errorMsg =
          info.file.response?.message ||
          info.file.error?.message ||
          `${info.file.name} file upload failed.`;

        if (toastState.id) {
          toast.error(errorMsg, {
            id: toastState.id,
            duration: 2000,
          });
        }
        toastState.id = null;
      }
    },
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-start mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-secondary-color font-bold">
          Student List
        </p>
        <div className="h-fit flex items-start gap-2">
          <div>
            <ReuseButton
              // onClick={handleSubmitXm}
              variant="primary"
              className="!py-4.5"
            >
              <Upload
                {...props}
                // customRequest={(options) => {
                //   setTimeout(() => {
                //     if (options.onSuccess) {
                //       options.onSuccess("ok");
                //     }
                //   }, 1000);
                // }}
                // onChange={(e) => setXlFile(e)}
                maxCount={1}
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                className="text-start "
                showUploadList={false}
              >
                <div className="!flex !items-center !gap-2 text-lg">
                  <MdFileUpload className="!text-bas" />{" "}
                  <span>Upload From Excel/CSV</span>
                </div>
              </Upload>
            </ReuseButton>
          </div>
          <ReuseButton
            onClick={handleDownload}
            variant="primary"
            className="!py-4.5"
          >
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
          showEditModal={showEditModal}
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
      <EditStudent
        isEditModalVisible={isEditModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
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
