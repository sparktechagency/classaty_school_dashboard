/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { CgUnblock } from "react-icons/cg";
import { MdBlock } from "react-icons/md";
import ReuseTable from "../../utils/ReuseTable";

// Define the type for the props
interface SchoolAdminTeacherTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: any) => void; // Function to handle viewing a user
  showBlockModal: (record: any) => void; // Function to handle blocking a user
  showUnblockModal: (record: any) => void; // Function to handle unblocking a user
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const SchoolAdminTeacherTable: React.FC<SchoolAdminTeacherTableProps> = ({
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
      title: "UID",
      dataIndex: "uid",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
      align: "center",
      key: "uid",
    },
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
      key: "name",
    },
    {
      title: "Subject",
      dataIndex: "subjectName",
      align: "center",
      key: "subjectName",
    },
    {
      title: "Contact No",
      dataIndex: "phoneNumber",
      align: "center",
      key: "phoneNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" },
      ],
      align: "center",
      onFilter: (value: string, record: any) => record.Status === value,
      render: (status: string) => (
        <span
          className="capitalize"
          style={{ color: status === "active" ? "green" : "red" }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: any) => (
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
    />
  );
};

export default SchoolAdminTeacherTable;
