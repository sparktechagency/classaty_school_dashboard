import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import ReuseTable from "../../utils/ReuseTable";
import { IAnounceType } from "../../types";
import dayjs from "dayjs";

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

const AnouncemantTable: React.FC<AnouncemantTableProps> = ({
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
      title: "UID",
      dataIndex: "UID",
      render: (_: unknown, __: unknown, index: number) => index + 1,
      key: "UID",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 400,
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (description: string) => {
        return <div dangerouslySetInnerHTML={{ __html: description }} />;
      },
      key: "description",
      width: 600,
    },
    {
      title: "Announce To ",
      dataIndex: "announcementTo",
      render: (announcementTo: string) => {
        return <p className="capitalize">{announcementTo}</p>;
      },
      key: "announcementTo",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (date: string) => dayjs(date).format("D MMMM, YY"),
      key: "Date",
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
              <GoEye style={{ fontSize: "24px" }} />
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

export default AnouncemantTable;
