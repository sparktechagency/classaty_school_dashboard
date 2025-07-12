/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import ReuseTable from "../../utils/ReuseTable";
import ReuseButton from "../Button/ReuseButton";
import { ResultType } from "../../types/ResultType";
import { MdEdit } from "react-icons/md";

// Define the type for the props
interface ResultTableProps {
  data: ResultType[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: ResultType) => void; // Function to handle viewing a user
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
}

const ResultTable: React.FC<ResultTableProps> = ({
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
      title: "Student Name",
      dataIndex: "name",
      key: "StudentName",
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "Class",
    },
    {
      title: "1st Term",
      dataIndex: "firstTerm",
      key: "FirstTerm",
    },
    {
      title: "2nd Term",
      dataIndex: "secondTerm",
      key: "SecondTerm",
    },
    {
      title: "Mid Term",
      dataIndex: "midTerm",
      key: "MidTerm",
    },
    {
      title: "Overall",
      dataIndex: "overall",
      key: "Overall",
    },
    {
      title: "Subject Wise Mark",
      key: "subjectWiseMark",
      render: (_: any, record: ResultType) => (
        <ReuseButton variant="secondary" onClick={() => showViewModal(record)}>
          View
        </ReuseButton>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: ResultType) => (
        <Space size="middle">
          {/* View Details Tooltip */}
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => showViewModal(record)}
            >
              <MdEdit style={{ fontSize: "24px" }} />
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

export default ResultTable;
