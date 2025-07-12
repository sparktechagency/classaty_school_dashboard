/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditOutlined } from "@ant-design/icons";
import { Collapse, Space, Table, Tooltip, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  useDeleteExamMutation,
  useGetAllExamsQuery,
} from "../../redux/features/exam/examApi";
import {
  useDeleteTermMutation,
  useGetAllTermsQuery,
} from "../../redux/features/terms/termsApi";
import ReuseButton from "../../ui/Button/ReuseButton";
import DeleteModal from "../../ui/Modal/DeleteModal";
import AddExamModal from "../../ui/Modal/Exam/AddExamModal";
import AddExamTermModal from "../../ui/Modal/Exam/AddExamTermModal";
import EditExamModal from "../../ui/Modal/Exam/EditExamModal";
import EditExamTermModal from "../../ui/Modal/Exam/EditExamTermModal";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const { Panel } = Collapse;

// Interfaces
interface ITerm {
  _id: string;
  termsName: string;
}

interface IExam {
  _id: string;
  subjectName: string;
  details: string;
  className: string;
  date: string;
  startTime: string;
  classRoom: string;
  duration: string;
  teacherName: string;
  instruction: string;
}

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
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isEditExamModalVisible, setIsEditExamModalVisible] = useState(false);
  const [isAddTermModalVisible, setIsAddTermModalVisible] = useState(false);
  const [isAddExamModalVisible, setIsAddExamModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<ITerm | null>(null);
  const [activeKey, setActiveKey] = useState<string[]>([]);

  const { data: terms } = useGetAllTermsQuery({});
  const [deleteTerm] = useDeleteTermMutation();
  const [deleteExam] = useDeleteExamMutation();

  useEffect(() => {
    if (terms?.data?.length) {
      setActiveKey([terms.data[0]._id]);
    }
  }, [terms]);

  const { data: exams, isFetching } = useGetAllExamsQuery(
    {
      termsId: activeKey?.[0],
      page: 1,
      limit: 1000,
    },
    {
      skip: !activeKey?.length,
    }
  );

  const showAddTermModal = () => setIsAddTermModalVisible(true);
  const showAddExamModal = () => setIsAddExamModalVisible(true);

  const showEditExamModal = (record: IExam | any) => {
    setCurrentRecord(record);
    setIsEditExamModalVisible(true);
  };

  const showEditModal = (record: ITerm) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
  };

  const showDeleteModal = (record: ITerm) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsEditModalVisible(false);
    setIsAddTermModalVisible(false);
    setIsAddExamModalVisible(false);
    setIsDeleteModalVisible(false);
    setIsEditExamModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDelete = async (record: ITerm) => {
    handleCancel();
    const res = await tryCatchWrapper(
      deleteTerm,
      { params: record._id },
      "Deleting..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };

  const handleExamDelete = async (record: ITerm) => {
    handleCancel();
    const res = await tryCatchWrapper(
      deleteExam,
      { params: record._id },
      "Deleting..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };

  const columns = [
    {
      title: "Subject Name",
      dataIndex: "subjectName",
      key: "subject",
      fixed: "left",
    },
    {
      title: "Exam Details",
      dataIndex: "details",
      width: 400,
      key: "examDetails",
    },
    { title: "Class", dataIndex: "className", key: "class" },
    {
      title: "Date",
      dataIndex: "date",
      render: (date: string) => dayjs(date).format("D MMMM, YY"),
      key: "date",
    },
    { title: "Start Time", dataIndex: "startTime", key: "startTime" },
    { title: "Class Room", dataIndex: "classRoom", key: "classRoom" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    { title: "Assigned Teacher", dataIndex: "teacherName", key: "teacherName" },
    {
      title: "Instruction",
      dataIndex: "instruction",
      width: 400,
      key: "instruction",
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: (_: any, record: IExam | any) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <EditOutlined
              onClick={() => showEditExamModal(record)}
              style={{ cursor: "pointer", color: "#1890ff" }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <RiDeleteBin6Line
              onClick={() => showDeleteModal(record)}
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
          Exam
        </p>
        <ReuseButton
          variant="secondary"
          className="!py-4.5 w-fit"
          onClick={showAddTermModal}
        >
          <FiPlus className="!text-base" /> Add New Term
        </ReuseButton>
      </div>

      {/* Modals */}
      <AddExamTermModal
        isAddModalVisible={isAddTermModalVisible}
        handleCancel={handleCancel}
      />
      <EditExamTermModal
        isEditModalVisible={isEditModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <AddExamModal
        isAddExamModalVisible={isAddExamModalVisible}
        handleCancel={handleCancel}
        activeKey={activeKey}
      />
      <EditExamModal
        isEditExamModalVisible={isEditExamModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleDelete={handleDelete}
        description="Are you sure you want to delete this?"
      />

      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleDelete={handleExamDelete}
        description="Are you sure you want to delete this?"
      />

      {/* Collapse Panel */}
      <Collapse
        accordion
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        bordered={false}
        expandIconPosition="right"
        style={{ backgroundColor: "#ffffff" }}
      >
        {terms?.data?.map((term: ITerm) => (
          <Panel
            key={term._id}
            header={
              <MyPanelHeader
                title={term.termsName}
                onEdit={() => showEditModal(term)}
                onDelete={() => showDeleteModal(term)}
              />
            }
          >
            {activeKey.includes(term._id) ? (
              <>
                <Table
                  columns={columns}
                  dataSource={exams?.data?.result}
                  pagination={false}
                  loading={isFetching}
                  rowKey="_id"
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
            ) : (
              <div className="flex flex-col">
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
    </div>
  );
};

export default ExamPage;
