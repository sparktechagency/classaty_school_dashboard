/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { CgUnblock } from "react-icons/cg";
import { MdBlock, MdModeEditOutline } from "react-icons/md";
import ReuseTable from "../../utils/ReuseTable";
import { BsFillSendFill } from "react-icons/bs";
import ReuseButton from "../Button/ReuseButton";

// Define the type for the props
interface SchoolAdminStudentTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: any) => void; // Function to handle viewing a user
  showBlockModal: (record: any) => void; // Function to handle blocking a user
  showSendModal: (record: any) => void;
  showEditModal: (record: any) => void;
  showUnblockModal: (record: any) => void; // Function to handle unblocking a user
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
}

const SchoolAdminStudentTable: React.FC<SchoolAdminStudentTableProps> = ({
  data,
  loading,
  showViewModal,
  showBlockModal,
  showSendModal,
  showEditModal,
  showUnblockModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Student Name",
      dataIndex: "StudentName",
      key: "StudentName",
    },
    {
      title: "Student Contact No",
      dataIndex: "StudentContactNo",
      key: "StudentContactNo",
    },
    {
      title: "Father Contact No",
      dataIndex: "FatherContactNo",
      key: "FatherContactNo",
    },
    {
      title: "Mother Contact No",
      dataIndex: "MotherContactNo",
      key: "MotherContactNo",
    },
    {
      title: "Class",
      dataIndex: "Class",
      key: "Class",
    },
    {
      title: "Attendance Rate",
      dataIndex: "AttendanceRate",
      key: "AttendanceRate",
    },
    {
      title: "Result",
      dataIndex: "Result",
      key: "Result",
    },
    {
      title: "Send Notification",
      dataIndex: "send-notification",
      key: "send-notification",
      render: (_: unknown, record: any) => (
        <ReuseButton
          onClick={() => showSendModal(record)}
          className="!text-lg !px-3 !py-1.5"
          variant="secondary"
        >
          {" "}
          <BsFillSendFill style={{ fontSize: "18px" }} /> Send Notification
        </ReuseButton>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: any) => (
        <Space size="middle">
          <Tooltip placement="right" title="Edit">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => showEditModal(record)}
            >
              <MdModeEditOutline style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
          {/* View Details Tooltip */}
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => showViewModal(record)}
            >
              <GoEye style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>

          {/* Block User Tooltip */}

          <Tooltip placement="left" title="Unblock">
            <button
              className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer hidden"
              onClick={() => showUnblockModal(record)}
            >
              <CgUnblock style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>

          <Tooltip placement="left" title="Block">
            <button
              className="!p-0 !bg-transparent !border-none !text-error-color cursor-pointer"
              onClick={() => showBlockModal(record)}
            >
              <MdBlock style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
        </Space>
      ),
      align: "center",
    },
  ];

  return (
    <ReuseTable
      columns={columns}
      data={data}
      loading={loading}
      setPage={setPage}
      total={total}
      limit={limit}
      page={page}
      keyValue={"email"}
    />
  );
};

export default SchoolAdminStudentTable;
