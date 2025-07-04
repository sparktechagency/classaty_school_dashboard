/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rate, Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { FC } from "react";
import ReuseTable from "../../utils/ReuseTable";
import { formetDateAndTime } from "../../utils/dateFormet";

// Define the row type for feedback/report
export interface ReportRow {
  _id?: string;
  reportedBy: string;
  feedback: string;
  rating: number;
  date: string;
  email?: string;
  [key: string]: any; // for flexibility
}

interface FeedbackTableProps {
  data: ReportRow[];
  loading: boolean;
  showViewModal: (record: ReportRow) => void;
  setPage: (page: number) => void;
  page: number;
  total: number;
  limit: number;
  // showFilters?: boolean;
}

const FeedbackTable: FC<FeedbackTableProps> = ({
  data,
  loading,
  showViewModal,
  setPage,
  page,
  total,
  limit,
  // showFilters = true,
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
      title: "Name",
      dataIndex: ["user", "name"],
      key: "name",
    },
    {
      title: "Feedback",
      dataIndex: "review",
      key: "review",
      render: (feedback: string) => (
        <div className="max-w-[200px] truncate">{feedback}</div>
      ),
    },
    {
      title: "Rating",
      dataIndex: "ratings",
      key: "ratings",
      render: (ratings: number) => (
        <div className="flex items-center">
          <Rate allowHalf disabled defaultValue={ratings} />
          <span className="ml-2">{ratings}</span>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => formetDateAndTime(createdAt),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: ReportRow) => (
        <Space size="middle">
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => showViewModal(record)}
              type="button"
            >
              <GoEye style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
        </Space>
      ),
      align: "center" as const,
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

export default FeedbackTable;
