import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { CgUnblock } from "react-icons/cg";
import { MdBlock } from "react-icons/md";
import ReuseTable from "../../utils/ReuseTable";
import { ISchool } from "../../types";

// Define the type for the props
interface AllSchoolTableProps {
  data: ISchool[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: ISchool) => void; // Function to handle viewing a user
  showBlockModal: (record: ISchool) => void; // Function to handle blocking a user
  showUnblockModal: (record: ISchool) => void; // Function to handle unblocking a user
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
  showFilter?: boolean;
}

const AllSchoolTable: React.FC<AllSchoolTableProps> = ({
  data,
  loading,
  showViewModal,
  showBlockModal,
  showUnblockModal,
  setPage,
  page,
  total,
  limit,
  showFilter = true,
}) => {
  const columns = [
    {
      title: "#UID",
      render: (_: unknown, __: unknown, index: number) => index + 1,
      key: "_id",
    },
    {
      title: "School Name",
      dataIndex: "SchoolName", // Data key for SchoolName
      key: "SchoolName",
    },
    {
      title: "Total Student",
      dataIndex: "TotalStudent", // Data key for TotalStudent
      key: "TotalStudent",
      sorter: showFilter ? true : null,
    },
    {
      title: "Parents",
      dataIndex: "Parents", // Data key for Parents
      key: "Parents",
      sorter: showFilter ? true : null,
    },
    {
      title: "TotalTeacher",
      dataIndex: "TotalTeacher", // Data key for TotalTeacher
      key: "TotalTeacher",
      sorter: showFilter ? true : null,
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: ISchool) => (
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

          <Tooltip placement="left" title="Unblock">
            <button
              className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer hidden"
              onClick={() => showUnblockModal(record)}
            >
              <CgUnblock style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>

          <Tooltip placement="left" title="Block">
            <button
              className="!p-0 !bg-transparent !border-none !text-error-color cursor-pointer"
              onClick={() => showBlockModal(record)}
            >
              <MdBlock style={{ fontSize: "24px" }} />
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

export default AllSchoolTable;
