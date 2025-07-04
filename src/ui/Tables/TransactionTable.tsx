import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "../../utils/ReuseTable";
import { IEarning } from "../../types";
import { formetDateAndTime } from "../../utils/dateFormet";

// Define the type for the props
interface TransactionTableProps {
  data: IEarning[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: IEarning) => void; // Function to handle viewing a user
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
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
      title: "#UID",
      dataIndex: "_id",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: ["user", "name"], // Data key for name
      key: "name",
    },
    {
      title: "Phone Number",
      dataIndex: ["user", "phoneNumber"], // Data key for email
      key: "phoneNumber",
    },
    {
      title: "Date",
      dataIndex: "createdAt", // Data key for date
      key: "createdAt",
      render: (createdAt: string) => formetDateAndTime(createdAt),
    },
    {
      title: "Plan",
      dataIndex: ["subscription", "planName"], // Data key for plan
      key: "plan",
    },
    {
      title: "Amount",
      dataIndex: "amount", // Data key for amount
      key: "amount",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IEarning) => (
        <Space size="middle">
          {/* View Details Tooltip */}
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
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

export default TransactionTable;
