/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Collapse, Table, Typography, Space, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import ReuseButton from "../../ui/Button/ReuseButton";
import DeleteModal from "../../ui/Modal/DeleteModal";
import AddExamTermModal from "../../ui/Modal/Exam/AddExamTermModal";
import EditExamTermModal from "../../ui/Modal/Exam/EditExamTermModal";
import AddExamModal from "../../ui/Modal/Exam/AddExamModal";

const { Panel } = Collapse;

const examData = [
  {
    key: "1",
    subject: "Mathematics",
    examDetails: "-",
    class: "7",
    date: "24 Apr, 25",
    startTime: "10:00 AM",
    classRoom: "7A-2C",
    duration: "2 Hr",
    assignedTeacher: "Aman Islam",
    instruction: "-",
  },
];

const MyPanelHeader = ({
  title,
  onEdit,
  onDelete,
}: {
  title: string;
  onEdit: () => void;
  onDelete: () => void;
}) => (
  <div className="flex justify-between items-center gap-3 bg-secondary-color px-5 py-1 rounded-t-md">
    <Typography.Text
      style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
    >
      {title}
    </Typography.Text>
    <Space>
      <Tooltip title="Edit Section">
        <EditOutlined
          onClick={onEdit}
          style={{ color: "white", cursor: "pointer" }}
        />
      </Tooltip>
      <Tooltip title="Delete Section">
        <RiDeleteBin6Line
          onClick={onDelete}
          style={{ color: "red", cursor: "pointer" }}
        />
      </Tooltip>
    </Space>
  </div>
);

const ExamPage = () => {
  const [activeKey, setActiveKey] = useState<string[]>(["1st Term"]);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isAddExamModalVisible, setIsAddExamModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };
  const showAddExamModal = () => {
    setIsAddExamModalVisible(true);
  };
  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const showDeleteModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddExamModalVisible(false);
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDelete = (record: any) => {
    handleCancel();
    console.log(record);
  };

  const columns = [
    { title: "Subject Name", dataIndex: "subject", key: "subject" },
    { title: "Exam Details", dataIndex: "examDetails", key: "examDetails" },
    { title: "Class", dataIndex: "class", key: "class" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Start Time", dataIndex: "startTime", key: "startTime" },
    { title: "Class Room", dataIndex: "classRoom", key: "classRoom" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    {
      title: "Assigned Teacher",
      dataIndex: "assignedTeacher",
      key: "assignedTeacher",
    },
    { title: "Instruction", dataIndex: "instruction", key: "instruction" },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: () => (
        <Space size="middle">
          <Tooltip title="Edit">
            <EditOutlined
              onClick={showAddExamModal}
              style={{ cursor: "pointer", color: "#1890ff" }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <RiDeleteBin6Line
              onClick={() => showDeleteModal(currentRecord)}
              style={{ cursor: "pointer", color: "red", fontSize: 18 }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-secondary-color font-bold">
          Class
        </p>
        <div className="h-fit">
          <div className="h-fit">
            <ReuseButton
              variant="secondary"
              className="!py-4.5"
              onClick={showAddModal}
            >
              <FiPlus className="!text-base" /> Add New Term
            </ReuseButton>
          </div>
        </div>
      </div>

      <AddExamTermModal
        isAddModalVisible={isAddModalVisible}
        handleCancel={handleCancel}
      />
      <EditExamTermModal
        isEditModalVisible={isEditModalVisible}
        handleCancel={handleCancel}
      />
      <AddExamModal
        isAddExamModalVisible={isAddExamModalVisible}
        handleCancel={handleCancel}
      />
      <Collapse
        activeKey={activeKey}
        onChange={(key) => setActiveKey(Array.isArray(key) ? key : [key])}
        bordered={false}
        expandIconPosition="right"
        style={{ backgroundColor: "#ffffff" }}
      >
        {["1st Term", "2nd Term", "Mid Term"].map((term) => (
          <Panel
            key={term}
            header={
              <MyPanelHeader
                title={term}
                onEdit={showEditModal}
                onDelete={() => showDeleteModal(term)}
              />
            }
          >
            {term === "1st Term" && (
              <>
                <Table
                  columns={columns}
                  dataSource={examData}
                  pagination={false}
                  rowKey="key"
                  scroll={{ x: "max-content" }}
                  bordered
                  size="middle"
                />
                <ReuseButton
                  onClick={showAddExamModal}
                  variant="outline"
                  className="!text-secondary-color !mt-5 !w-fit !border-0 !px-1"
                >
                  <FiPlus className="!text-base !text-secondary-color" />
                  Add Exam
                </ReuseButton>
              </>
            )}
            {term !== "1st Term" && (
              <div className="flex flex-col ">
                <Typography.Title
                  level={4}
                  className="!text-secondary-color !text-center"
                >
                  No exams scheduled yet.
                </Typography.Title>
                <ReuseButton
                  onClick={showAddExamModal}
                  variant="outline"
                  className="!text-secondary-color !mt-5 !w-fit !border-0 !px-1"
                >
                  <FiPlus className="!text-base !text-secondary-color" />
                  Add Exam
                </ReuseButton>
              </div>
            )}
          </Panel>
        ))}
      </Collapse>
      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleDelete={handleDelete}
        description=" Are You Sure You want to Delete This ?"
      />
    </div>
  );
};

export default ExamPage;
