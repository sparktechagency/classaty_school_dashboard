import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { CgUnblock } from "react-icons/cg";
import { MdBlock } from "react-icons/md";
import ReuseTable from "../../utils/ReuseTable";
import { ITeacherData } from "../../types";

// Define the type for the props
interface AllTeacherTableProps {
  data: ITeacherData[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: ITeacherData) => void; // Function to handle viewing a user
  showBlockModal: (record: ITeacherData) => void; // Function to handle blocking a user
  showUnblockModal: (record: ITeacherData) => void; // Function to handle unblocking a user
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
}

const AllTeacherTable: React.FC<AllTeacherTableProps> = ({
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
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Teacher Name",
      dataIndex: "TeacherName",
      key: "TeacherName",
    },
    {
      title: "School Name",
      dataIndex: "SchoolName",
      key: "SchoolName",
    },
    {
      title: "Contact No",
      dataIndex: "ContactNo",
      key: "ContactNo",
    },
    {
      title: "Join Date",
      dataIndex: "JoinDate",
      key: "JoinDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: ITeacherData) => (
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

export default AllTeacherTable;
