import { Space, Tooltip } from "antd";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { IAnounceType } from "../../types";
import ReuseTable from "../../utils/ReuseTable";

// Define the type for the props
interface AnouncemantTableProps {
  data: IAnounceType[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: IAnounceType) => void; // Function to handle viewing a user
  showDeleteModal: (record: IAnounceType) => void; // Function to handle blocking a user
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
}

const GradeSystemTable: React.FC<AnouncemantTableProps> = ({
  data,
  loading,
  showViewModal,
  showDeleteModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "Marks",
      dataIndex: "mark",
      key: "mark",
      align: "center",
      width: 400,
    },
    {
      title: "Grade",
      dataIndex: "grade",
      render: (description: string) => {
        return <div dangerouslySetInnerHTML={{ __html: description }} />;
      },
      align: "center",
      key: "grade",
      width: 600,
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IAnounceType) => (
        <Space size="middle">
          {/* View Details Tooltip */}
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => showViewModal(record)}
            >
              <FiEdit style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>

          {/* Block User Tooltip */}

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

export default GradeSystemTable;
