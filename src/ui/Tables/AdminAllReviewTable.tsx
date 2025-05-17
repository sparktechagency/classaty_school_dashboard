/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rate, Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "../../utils/ReuseTable";
import { MdDelete } from "react-icons/md";

interface AdminAllReviewTableProps {
  data: any[];
  loading: boolean;
  showViewModal: (record: any) => void;
  showDeleteModal: (record: any) => void;
  setPage: (page: number) => void;
  page: number;
  total: number;
  limit: number;
  type?: string;
}

// Explicitly define AdminAllReviewTable as a functional component
const AdminAllReviewTable: React.FC<AdminAllReviewTableProps> = ({
  data,
  loading,
  showViewModal,
  showDeleteModal,
  setPage,
  page,
  total,
  limit,
  type = "resturant",
}) => {
  const columns = [
    {
      title: "#UID",
      render: (_: unknown, __: unknown, index: number) => index + 1,
      key: "_id",
    },
    type === "resturant"
      ? {
          title: "Customer Name",
          dataIndex: "fullName",
          key: "fullName",
        }
      : {
          title: "Dish Name",
          dataIndex: "dishName",
          key: "dishName",
        },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => (
        <Rate allowHalf value={rating} className="!text-[#FFA500]" disabled />
      ),
      sorter: (a: any, b: any) => a.rating - b.rating,
    },
    {
      title: "Feedback",
      dataIndex: "review",
      key: "review",
      render: (text: string) => (
        <div className="max-w-[200px] truncate">{text.slice(0, 100)}</div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: any) => (
        <Space size="middle">
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => showViewModal(record)}
            >
              <GoEye style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
          <Tooltip placement="left" title="Block this User">
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
  ].filter(Boolean); // This removes 'false' from the array

  return (
    <ReuseTable
      columns={columns}
      data={data}
      loading={loading}
      setPage={setPage}
      total={total}
      limit={limit}
      page={page}
      scroll={{ x: "max-content", y: 55 * 13 }}
      keyValue={"UID"}
    />
  );
};

export default AdminAllReviewTable;
