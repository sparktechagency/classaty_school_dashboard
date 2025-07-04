/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { MdModeEditOutline } from "react-icons/md";
import ReuseTable from "../../utils/ReuseTable";

// Define the type for the props
interface AllSchoolTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showEditModal: (record: any) => void;
  showViewModal: (record: any) => void; // Function to handle viewing a user
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const AllSchoolTable: React.FC<AllSchoolTableProps> = ({
  data,
  loading,
  showEditModal,
  showViewModal,
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
      title: "School Name",
      dataIndex: ["school", "schoolName"], // Data key for SchoolName
      key: "SchoolName",
    },
    {
      title: "Total Student",
      dataIndex: "students", // Data key for students
      key: "students",
      // sorter: true,
    },
    {
      title: "Parents",
      dataIndex: "parents", // Data key for Parents
      key: "parents",
      // sorter: true,
    },
    {
      title: "TotalTeacher",
      dataIndex: "teachers", // Data key for teachers
      key: "teachers",
      // sorter: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: any) => (
        <Space size="middle">
          {/* View Details Tooltip */}
          <Tooltip placement="right" title="Edit">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => showEditModal(record)}
            >
              <MdModeEditOutline style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => showViewModal(record)}
            >
              <GoEye style={{ fontSize: "24px" }} />
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

export default AllSchoolTable;
