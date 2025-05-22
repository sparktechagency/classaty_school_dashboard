/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import { MdDelete, MdEdit } from "react-icons/md";
import ReuseTable from "../../utils/ReuseTable";

// Define the type for the props
interface ClassScheduleTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showDeleteModal: (record: any) => void; // Function to handle blocking a user
  ShowAddModal: () => void;
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
}

const ClassScheduleTable: React.FC<ClassScheduleTableProps> = ({
  data,
  loading,
  showDeleteModal,
  ShowAddModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "Class",
      dataIndex: "Class",
      key: "Class",
    },
    {
      title: "Subject",
      dataIndex: "Subject",
      key: "Subject",
    },
    { title: "Period", dataIndex: "Period", key: "Period" },
    {
      title: "Teacher",
      dataIndex: "Teacher",
      key: "Teacher",
    },
    { title: "Start Time", dataIndex: "StartTime", key: "StartTime" },
    { title: "End Time", dataIndex: "EndTime", key: "EndTime" },
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
    },
    { title: "Room", dataIndex: "Room", key: "Room" },
    {
      title: "Active Student",
      dataIndex: "ActiveStudent",
      key: "ActiveStudent",
      align: "center",
    },

    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: any) => (
        <Space size="middle">
          <Tooltip placement="left" title="Edit">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={ShowAddModal}
            >
              <MdEdit style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>

          <Tooltip placement="left" title="Block">
            <button
              className="!p-0 !bg-transparent !border-none !text-error-color cursor-pointer"
              onClick={() => showDeleteModal(record)}
            >
              <MdDelete style={{ fontSize: "24px" }} />
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

export default ClassScheduleTable;
