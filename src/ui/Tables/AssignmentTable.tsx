import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import ReuseButton from "../Button/ReuseButton";
import { IAssignment } from "../../types/AssignmentType";

// Define the type for the props
interface AssignmentTableProps {
  data: IAssignment[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
}

const AssignmentTable: React.FC<AssignmentTableProps> = ({
  data,
  loading,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "Assignment Title",
      dataIndex: "AssignmentTitle",
      key: "AssignmentTitle",
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
    },
    {
      title: "Class",
      dataIndex: "Class",
      key: "Class",
    },
    {
      title: "Subject",
      dataIndex: "Subject",
      key: "Subject",
    },
    {
      title: "Due Date",
      dataIndex: "DueDate",
      key: "DueDate",
    },
    {
      title: "Mark",
      dataIndex: "Mark",
      key: "Mark",
    },

    {
      title: "Attachment",
      key: "attachment",
      render: () => (
        <ReuseButton
          className="!w-fit !text-base !py-2 !px-3"
          variant="secondary"
        >
          Download
        </ReuseButton>
      ),
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

export default AssignmentTable;
