import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { CgUnblock } from "react-icons/cg";
import { MdBlock } from "react-icons/md";
import ReuseTable from "../../utils/ReuseTable";
import { IStudentData } from "../../types";

// Define the type for the props
interface StudentTableProps {
  data: IStudentData[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: IStudentData) => void; // Function to handle viewing a user
  showBlockModal: (record: IStudentData) => void; // Function to handle blocking a user
  showUnblockModal: (record: IStudentData) => void; // Function to handle unblocking a user
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const StudentTable: React.FC<StudentTableProps> = ({
  data,
  loading,
  showViewModal,
  showBlockModal,
  showUnblockModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "#UID",
      dataIndex: "_id",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
      key: "_id",
    },
    {
      title: "Student Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Student Contact No",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (phoneNumber: string) => (
        <div>{phoneNumber ? phoneNumber : "-"}</div>
      ),
    },
    {
      title: "Father Contact No",
      dataIndex: ["student", "fatherPhoneNumber"],
      key: "fatherPhoneNumber",
    },
    {
      title: "Mother Contact No",
      dataIndex: ["student", "motherPhoneNumber"],
      key: "motherPhoneNumber",
    },
    {
      title: "Class",
      dataIndex: ["student", "className"],
      key: "Class",
    },
    {
      title: "Section",
      dataIndex: ["student", "section"],
      key: "Section",
    },
    {
      title: "School Name",
      dataIndex: ["student", "school", "schoolName"],
      key: "SchoolName",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IStudentData) => (
        <Space size="middle">
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

          {record?.status !== "blocked" ? (
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
      keyValue={"_id"}
    />
  );
};

export default StudentTable;
