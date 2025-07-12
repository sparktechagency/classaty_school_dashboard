/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Modal, Table, Typography } from "antd";
import { useGetResultBaseOnTermsAndStudentIdQuery } from "../../../redux/features/school/schoolApi";
import { useGetAllTermsQuery } from "../../../redux/features/terms/termsApi";

interface ResultViewProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any; // your IParents type or appropriate type
}

const columns = [
  {
    title: "Subject Name",
    dataIndex: "subjectName",
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

const ResultView: React.FC<ResultViewProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [termsId, setTermsId] = useState<string>("");
  const { data: terms } = useGetAllTermsQuery({});
  const { data } = useGetResultBaseOnTermsAndStudentIdQuery(
    {
      termsId: termsId,
      studentId: currentRecord?.studentId,
    },
    {
      skip: !currentRecord,
    }
  );
  const [activeTerm, setActiveTerm] = useState<string>(
    terms?.data[0]?.termsName
  );

  useEffect(() => {
    setActiveTerm(terms?.data[0]?.termsName);
    setTermsId(terms?.data[0]?._id);
  }, [terms]);

  const onTabChange = (key: any) => {
    setActiveTerm(key?.termsName);
    setTermsId(key?._id);
  };

  console.log(data?.data, "data =============>");

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
        {terms?.data?.map((term: any, index: number) => {
          return (
            <button
              key={index}
              onClick={() => onTabChange(term)}
              className={`text-lg font-medium py-2 ${
                activeTerm === term?.termsName
                  ? "bg-secondary-color text-primary-color rounded-2xl "
                  : "text-secondary-color cursor-pointer rounded-2xl"
              }`}
            >
              <span className="px-4">{term?.termsName}</span>
            </button>
          );
        })}
      </div>
      <Table
        dataSource={data?.data?.result}
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
              <div className="text-center">
                {data?.data?.thisTermGpa
                  ? Number(data?.data?.thisTermGpa?.toFixed(2))
                  : "00.00"}
              </div>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
        style={{ borderRadius: 8, overflow: "hidden" }}
      />
    </Modal>
  );
};

export default ResultView;
