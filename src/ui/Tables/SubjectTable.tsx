/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import ReuseTable from "../../utils/ReuseTable";
import { ISubject } from "../../types";

// Define the type for the props
interface SubjectTableProps {
  data: ISubject[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showDeleteModal: (record: ISubject) => void; // Function to handle blocking a user
  showUpdateModal: (record: ISubject) => void;
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const SubjectTable: React.FC<SubjectTableProps> = ({
  data,
  loading,
  showDeleteModal,
  showUpdateModal,
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
      align: "center",
      key: "_id",
    },
    {
      title: "Subject",
      dataIndex: "subjectName",
      align: "center",
      key: "subjectName",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: ISubject) => (
        <Space size="middle">
          <Tooltip placement="right" title="Edit">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => showUpdateModal(record)}
            >
              <MdModeEditOutline style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
          <Tooltip placement="left" title="Delete">
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
      keyValue={"_id"}
    />
  );
};

export default SubjectTable;
