/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import { MdDelete, MdEdit } from "react-icons/md";
import ReuseTable from "../../utils/ReuseTable";
import dayjs from "dayjs";

// Define the type for the props
interface ClassScheduleTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showDeleteModal: (record: any) => void; // Function to handle blocking a user
  ShowAddModal: () => void;
  showEditModal: (record: any) => void;
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
}

const ClassScheduleTable: React.FC<ClassScheduleTableProps> = ({
  data,
  loading,
  showDeleteModal,
  showEditModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "Class",
      key: "className",
      render: (_: any, record: any) => (
        <div className="capitalize">
          {record.className} - {record.section}
        </div>
      ),
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    { title: "Period", dataIndex: "period", key: "period" },
    {
      title: "Teacher",
      dataIndex: "teacherName",
      key: "teacherName",
    },
    { title: "Start Time", dataIndex: "selectTime", key: "selectTime" },
    { title: "End Time", dataIndex: "endTime", key: "endTime" },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_: any, record: any) => (
        <p>{dayjs(record.date).format("DD MMMM")}</p>
      ),
    },
    { title: "Room", dataIndex: "roomNo", key: "roomNo" },
    {
      title: "Active Student",
      dataIndex: "totalStudent",
      key: "totalStudent",
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
              onClick={() => showEditModal(record)}
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
