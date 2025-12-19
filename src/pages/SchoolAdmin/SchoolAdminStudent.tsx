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
  useUserActionMutation,
} from "../../redux/features/student/studentAPi";
import ReuseButton from "../../ui/Button/ReuseButton";
import DeleteModal from "../../ui/Modal/DeleteModal";
import AddSchoolAdminStudent from "../../ui/Modal/SchoolAdminStudent/AddSchoolAdminStudent";
import EditSchoolAdminStudent from "../../ui/Modal/SchoolAdminStudent/EditSchoolAdminStudent";
import SendNotification from "../../ui/Modal/SchoolAdminStudent/SendNotification";
import ViewSchoolAdminStudent from "../../ui/Modal/SchoolAdminStudent/ViewSchoolAdminStudent";
import SchoolAdminStudentTable from "../../ui/Tables/SchoolAdminStudentTable";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { getBaseUrl } from "../../helpers/config/envConfig";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { Upload } from "antd";
import * as XLSX from "xlsx";

const SchoolAdminStudent = () => {
  const token = Cookies.get("classaty_accessToken");

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

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "../../file/Student.xlsx"; // Your file URL (can be relative or absolute)
    link.download = "Student-Format.xlsx"; // Desired download filename
    link.click();
  };

  const handleExcelUpload = async (file: File) => {
    const toastId = toast.loading("Uploading file...", { duration: Infinity });
    const workbook = XLSX.read(await file.arrayBuffer(), { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    // Convert sheet to JSON
    let rows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    // Remove empty rows
    rows = rows.filter((row) =>
      Object.values(row).some((v) => v && v.toString().trim() !== "")
    );

    // Convert back to XLSX in memory
    const newSheet = XLSX.utils.json_to_sheet(rows);
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, newSheet, "Sheet1");

    const wbout = XLSX.write(newWorkbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a new File object
    const cleanedFile = new File([blob], file.name, { type: file.type });

    // Upload using FormData
    const formData = new FormData();
    formData.append("file", cleanedFile);

    const res = await fetch(
      `${getBaseUrl()}/student/create_student_using_xlsx`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );

    const json = await res.json();
    console.log(json);

    if (!res.ok) {
      console.log(res);
      toast.error(json?.message, {
        id: toastId,
        duration: 2000,
      });
      throw new Error("Failed to upload file");
    }
    toast.success("File uploaded successfully! 🎉", {
      id: toastId,
      duration: 2000,
    });
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-secondary-color font-bold">
          Student
        </p>
        <div className="h-fit flex items-center gap-2">
          <div>
            <ReuseButton
              // onClick={handleSubmitXm}
              variant="primary"
              className="!py-4.5"
            >
              <Upload
                beforeUpload={(file) => {
                  handleExcelUpload(file);
                  return false; // ❗STOP auto upload
                }}
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
        currentRecord={currentRecord}
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
