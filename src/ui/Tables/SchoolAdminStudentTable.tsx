/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Tooltip } from "antd";
import React from "react";
import { BsFillSendFill } from "react-icons/bs";
import { CgUnblock } from "react-icons/cg";
import { GoEye } from "react-icons/go";
import { MdBlock, MdModeEditOutline } from "react-icons/md";
import ReuseTable from "../../utils/ReuseTable";
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
  console.log(data);

  const columns = [
    {
      title: "ID",
      dataIndex: "uid",
      render: (_: unknown, record: any) => {
        return <p>{record.uid ? record.uid : "-"}</p>;
      },
      align: "center",
      key: "uid",
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      align: "center",
      render: (_: unknown, record: any) => {
        return <p>{record.studentName ? record.studentName : "-"}</p>;
      },
      key: "studentName",
    },
    {
      title: "Student Contact No",
      dataIndex: "phoneNumber",
      render: (_: unknown, record: any) => {
        return <p>{record.phoneNumber ? record.phoneNumber : "-"}</p>;
      },
      align: "center",
      key: "phoneNumber",
    },
    {
      title: "Father Contact No",
      dataIndex: "fatherPhoneNumber",
      align: "center",
      key: "fatherPhoneNumber",
    },
    {
      title: "Mother Contact No",
      dataIndex: "motherPhoneNumber",
      align: "center",
      key: "motherPhoneNumber",
    },
    {
      title: "Class",
      dataIndex: "className",
      align: "center",
      key: "className",
    },
    {
      title: "Attendance Rate",
      dataIndex: "attendanceRate",
      align: "center",
      render: (_: unknown, record: any) => {
        return <p>{record.attendanceRate ? record.attendanceRate : "-"}</p>;
      },
      key: "attendanceRate",
    },
    {
      title: "Result",
      dataIndex: "averageGPA",
      align: "center",
      render: (_: unknown, record: any) => {
        return <p>{record.averageGPA ? record.averageGPA : "-"}</p>;
      },
      key: "averageGPA",
    },
    {
      title: "Send Notification",
      dataIndex: "send-notification",
      align: "center",
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

          {record?.status === "active" ? (
            <Tooltip placement="left" title="Block">
              <button
                className="!p-0 !bg-transparent !border-none !text-error-color cursor-pointer"
                onClick={() => showBlockModal(record)}
              >
                <MdBlock style={{ fontSize: "24px" }} />
              </button>
            </Tooltip>
          ) : (
            <Tooltip placement="left" title="Unblock">
              <button
                className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
                onClick={() => showUnblockModal(record)}
              >
                <CgUnblock style={{ fontSize: "24px" }} />
              </button>
            </Tooltip>
          )}
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
      scroll={{ x: "max-content" }}
    />
  );
};

export default SchoolAdminStudentTable;
