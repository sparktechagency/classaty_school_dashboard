import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import ReuseButton from "../Button/ReuseButton";
import { IAssignment } from "../../types/AssignmentType";
import { formetDateAndTime } from "../../utils/dateFormet";
import { getImageUrl } from "../../helpers/config/envConfig";

// Define the type for the props
interface AssignmentTableProps {
  data: IAssignment[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const AssignmentTable: React.FC<AssignmentTableProps> = ({
  data,
  loading,
  setPage,
  page,
  total,
  limit,
}) => {
  const serverUrl = getImageUrl();
  const handleDownload = (fileUrl: string) => {
    const link = document.createElement("a");
    link.href = `${serverUrl}/download/${fileUrl}`; // call your backend download endpoint
    link.setAttribute("download", ""); // this tells browser to download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    {
      title: "#UID",
      dataIndex: "_id",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
      key: "_id",
    },
    {
      title: "Assignment Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Class",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (dueDate: string) => formetDateAndTime(dueDate),
    },
    {
      title: "Mark",
      dataIndex: "marks",
      key: "marks",
    },

    {
      title: "Attachment",
      dataIndex: "fileUrl",
      key: "fileUrl",
      render: (fileUrl: string) => (
        <ReuseButton
          onClick={() => handleDownload(fileUrl)}
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
      keyValue={"_id"}
    />
  );
};

export default AssignmentTable;
