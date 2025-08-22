/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Modal, Table, Typography, InputNumber, Button } from "antd";
import { useGetResultBaseOnTermsAndStudentIdQuery } from "../../../redux/features/school/schoolApi";
import { useGetAllTermsQuery } from "../../../redux/features/terms/termsApi";

interface ResultEditProps {
  isEditModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any; // replace with proper type
}

const ResultEdit: React.FC<ResultEditProps> = ({
  isEditModalVisible,
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

  const [activeTerm, setActiveTerm] = useState<string>("");
  const [tableData, setTableData] = useState<any[]>([]);

  // Sync API data into table state
  useEffect(() => {
    if (terms?.data?.length) {
      setActiveTerm(terms.data[0].termsName);
      setTermsId(terms.data[0]._id);
    }
  }, [terms]);

  useEffect(() => {
    if (data?.data?.result) {
      setTableData(
        data.data.result.map((item: any, index: number) => ({
          ...item,
          key: index,
        }))
      );
    }
  }, [data]);

  const onTabChange = (term: any) => {
    setActiveTerm(term?.termsName);
    setTermsId(term?._id);
  };

  const handleMarkChange = (value: number | null, record: any) => {
    const newData = [...tableData];
    const index = newData.findIndex(
      (item) => item.subjectName === record.subjectName
    );
    if (index > -1) {
      newData[index].mark = value || 0;
      setTableData(newData);
    }
  };

  const handleSave = () => {
    console.log("Updated Marks Data:", tableData);
    // 🔥 TODO: Call your API mutation here to update the marks
  };

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
      render: (_: any, record: any) => (
        <InputNumber
          min={0}
          max={100}
          value={record.mark}
          onChange={(value) => handleMarkChange(value, record)}
        />
      ),
    },
    {
      title: "GPA",
      dataIndex: "gpa",
      key: "gpa",
      align: "center" as const,
    },
  ];

  return (
    <Modal
      open={isEditModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-center mb-4">
        Edit Result
      </h3>

      {/* Terms Tabs */}
      <div className="flex w-fit mt-5 bg-[#EFEFEF] p-2 rounded-2xl mb-5">
        {terms?.data?.map((term: any, index: number) => {
          return (
            <button
              key={index}
              onClick={() => onTabChange(term)}
              className={`text-lg font-medium py-2 ${
                activeTerm === term?.termsName
                  ? "bg-secondary-color text-primary-color rounded-2xl"
                  : "text-secondary-color cursor-pointer rounded-2xl"
              }`}
            >
              <span className="px-4">{term?.termsName}</span>
            </button>
          );
        })}
      </div>

      {/* Editable Table */}
      <Table
        dataSource={tableData}
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

      {/* Save Button */}
      <div className="flex justify-end mt-4">
        <Button
          type="primary"
          className="!bg-secondary-color !text-primary-color border !border-secondary-color"
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </div>
    </Modal>
  );
};

export default ResultEdit;
