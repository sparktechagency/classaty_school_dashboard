import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { CgUnblock } from "react-icons/cg";
import { MdBlock } from "react-icons/md";
import ReuseTable from "../../utils/ReuseTable";
import { IParents } from "../../types/Parents.Type";

// Define the type for the props
interface AllParentsTableProps {
  data: IParents[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: IParents) => void; // Function to handle viewing a user
  showBlockModal: (record: IParents) => void; // Function to handle blocking a user
  showUnblockModal: (record: IParents) => void; // Function to handle unblocking a user
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const AllParentsTable: React.FC<AllParentsTableProps> = ({
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
      title: "#UID",
      dataIndex: "_id",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
      key: "_id",
    },
    {
      title: "Parents Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Contact No",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Children Name",
      dataIndex: ["parents", "studentUser", "name"],
      key: "name",
    },
    {
      title: "Children School",
      dataIndex: ["parents", "student", "schoolName"],
      key: "schoolName",
    },
    {
      title: "Class",
      dataIndex: ["parents", "student", "className"],
      key: "className",
    },
    {
      title: "Subscription",
      dataIndex: ["subscriptionDetails", "planName"],
      key: "SubscriptionPlan",
      render: (text: string) => <div className="capitalize">{text}</div>,
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IParents) => (
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

          {record?.status !== "blocked" ? (
            <Tooltip placement="left" title="Block">
              <button
                className="!p-0 !bg-transparent !border-none !text-error-color cursor-pointer"
                onClick={() => showBlockModal(record)}
              >
                <MdBlock style={{ fontSize: "24px" }} />
              </button>
            </Tooltip>
          ) : (
            <Tooltip placement="left" title="Unblock">
              <button
                className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
                onClick={() => showUnblockModal(record)}
              >
                <CgUnblock style={{ fontSize: "24px" }} />
              </button>
            </Tooltip>
          )}
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

export default AllParentsTable;
