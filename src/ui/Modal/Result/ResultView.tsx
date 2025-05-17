/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Modal, Table, Typography } from "antd";

interface ResultViewProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any; // your IParents type or appropriate type
}

const data1stTerm = [
  { key: "1", subject: "Arabic Language Arts", mark: 85, gpa: 3.0 },
  { key: "2", subject: "Mathematics", mark: 88, gpa: 3.0 },
  { key: "3", subject: "Science", mark: 92, gpa: 4.0 },
  { key: "4", subject: "Social Studies", mark: 80, gpa: 3.0 },
  { key: "5", subject: "English Language", mark: 76, gpa: 2.0 },
  { key: "6", subject: "Art Education", mark: 89, gpa: 3.0 },
  { key: "7", subject: "Physical Education", mark: 91, gpa: 4.0 },
  { key: "8", subject: "Computer Science", mark: 84, gpa: 3.0 },
];

const columns = [
  {
    title: "Subject Name",
    dataIndex: "subject",
    key: "subject",
    render: (text: string) => <Typography.Text>{text}</Typography.Text>,
  },
  {
    title: "Mark",
    dataIndex: "mark",
    key: "mark",
    align: "center" as const,
  },
  {
    title: "GPA",
    dataIndex: "gpa",
    key: "gpa",
    align: "center" as const,
  },
];

const termGPA = {
  "1st Term": 3.0,
  "2nd Term": 3.2,
  "Mid Term": 3.1,
};

type TermKey = "1st Term" | "2nd Term" | "Mid Term";

const ResultView: React.FC<ResultViewProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  console.log(currentRecord);
  const [activeTerm, setActiveTerm] = useState<TermKey>("1st Term");

  const onTabChange = (key: string) => {
    setActiveTerm(key as TermKey);
  };

  // For demo, using same data for all terms — replace with real data as needed
  const dataSource = data1stTerm;

  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-center mb-4">
        Result List
      </h3>
      <div className="flex w-fit mt-5 bg-[#EFEFEF] p-2 rounded-2xl mb-5">
        {/* 1st Term Tab */}
        <button
          onClick={() => onTabChange("1st Term")}
          className={`text-lg font-medium py-2 ${
            activeTerm === "1st Term"
              ? "bg-secondary-color text-primary-color rounded-2xl "
              : "text-secondary-color cursor-pointer rounded-2xl"
          }`}
        >
          <span className="px-4">1st Term</span>
        </button>

        {/* 2nd Term Tab */}
        <button
          onClick={() => onTabChange("2nd Term")}
          className={`text-lg font-medium py-2 ${
            activeTerm === "2nd Term"
              ? "bg-secondary-color text-primary-color rounded-2xl "
              : "text-secondary-color cursor-pointer rounded-2xl"
          }`}
        >
          <span className="px-4">2nd Term</span>
        </button>
        {/* 3rd Term Tab */}
        <button
          onClick={() => onTabChange("Mid Term")}
          className={`text-lg font-medium py-2 ${
            activeTerm === "Mid Term"
              ? "bg-secondary-color text-primary-color rounded-2xl "
              : "text-secondary-color cursor-pointer rounded-2xl"
          }`}
        >
          <span className="px-4">Mid Term</span>
        </button>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
        summary={() => (
          <Table.Summary.Row
            style={{
              backgroundColor: "#1f2937",
              color: "#fff",
            }}
          >
            <Table.Summary.Cell index={0} colSpan={2}>
              GPA :
            </Table.Summary.Cell>
            <Table.Summary.Cell index={2}>
              <div className="text-center"> {termGPA[activeTerm]}</div>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
        style={{ borderRadius: 8, overflow: "hidden" }}
      />
    </Modal>
  );
};

export default ResultView;
