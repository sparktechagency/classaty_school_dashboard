import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "../../utils/ReuseTable";
import { IAttendence } from "../../types/AttendenceTable";

// Define the type for the props
interface AttendenceTableProps {
  data: IAttendence[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: IAttendence) => void; // Function to handle viewing a user
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
}

const AttendenceTable: React.FC<AttendenceTableProps> = ({
  data,
  loading,
  showViewModal,
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
      title: "Total Student",
      dataIndex: "TotalStudent",
      key: "TotalStudent",
    },
    {
      title: "Present",
      dataIndex: "Present",
      key: "Present",
    },
    {
      title: "Absent",
      dataIndex: "Absent",
      key: "Absent",
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IAttendence) => (
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

export default AttendenceTable;
