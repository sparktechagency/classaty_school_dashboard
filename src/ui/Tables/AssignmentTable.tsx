/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import ReuseButton from "../Button/ReuseButton";
import { IAssignment } from "../../types/AssignmentType";
import { getImageUrl } from "../../helpers/config/envConfig";
import dayjs from "dayjs";
 
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
  const handleDownload = async (record: any) => {
    const fileUrl = `${getImageUrl()}/${record.fileUrl}`;
    const response = await fetch(fileUrl, {
      method: "GET",
    });
 
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = record.fileUrl; // or your desired filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
 
  const columns = [
    {
      title: "Assignment Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      align: "center",
      key: "description",
    },
    {
      title: "Class",
      dataIndex: "className",
      align: "center",
      key: "className",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      align: "center",
      key: "subject",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      align: "center",
      render: (date: string) => dayjs(date).format("D MMMM, YY"),
      key: "dueDate",
    },
    {
      title: "Mark",
      dataIndex: "marks",
      align: "center",
      key: "marks",
    },
 
    {
      title: "Attachment",
      key: "attachment",
      align: "center",
      render: (_: any, record: any) => (
        <ReuseButton
          className="!w-fit !text-base !py-2 !px-3"
          variant="secondary"
          onClick={() => handleDownload(record)}
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