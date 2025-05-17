/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import DeleteModal from "../../ui/Modal/DeleteModal";
import ReuseButton from "../../ui/Button/ReuseButton";
import { Collapse, Table, Typography, Space, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import AddClassLevelModal from "../../ui/Modal/Class/AddClassLevelModal";
import EditClassLevelModal from "../../ui/Modal/Class/EditClassLevelModal";
import AddClassModal from "../../ui/Modal/Class/AddClassModal";

const { Panel } = Collapse;

const primaryData = [
  { key: 1, class: "1", section: "A/B/C/D" },
  { key: 2, class: "2", section: "A/B/C/D" },
];

const MyPanelHeader: React.FC<{
  title: string;
  showDeleteModal: (record: any) => void;
  showEditModal: () => void;
}> = ({ title, showDeleteModal, showEditModal }) => (
  <div className="flex justify-between items-center gap-5 px-5 bg-secondary-color py-1">
    <h2 className="text-lg sm:text-xl lg:text-2xl text-primary-color font-bold">
      {title}
    </h2>
    <Space size="middle">
      <Tooltip title="Edit Section">
        <EditOutlined
          onClick={showEditModal}
          style={{ fontSize: "16px", cursor: "pointer" }}
        />
      </Tooltip>
      <Tooltip title="Delete Section">
        <RiDeleteBin6Line
          onClick={() => showDeleteModal(title)}
          style={{ fontSize: "16px", color: "red", cursor: "pointer" }}
        />
      </Tooltip>
    </Space>
  </div>
);

const ClassPage = () => {
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isAddClassModalVisible, setIsAddClassModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };
  const showAddClassModal = () => {
    setIsAddClassModalVisible(true);
  };
  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const showDeleteModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddClassModalVisible(false);
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
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Section",
      dataIndex: "section",
      key: "section",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Tooltip title="Delete">
            <RiDeleteBin6Line
              onClick={() => showDeleteModal(currentRecord)}
              style={{ color: "red", cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <EditOutlined
              onClick={() => showAddClassModal()}
              style={{ color: "#1890ff", cursor: "pointer" }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
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
              <FiPlus className="!text-base" /> Add New Level
            </ReuseButton>
          </div>
        </div>
      </div>
      <div className="h-fit flex justify-end">
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search Class ..."
            setSearch={setSearchText}
            setPage={() => {}}
          />
        </div>
      </div>
      <AddClassLevelModal
        isAddModalVisible={isAddModalVisible}
        handleCancel={handleCancel}
      />
      <EditClassLevelModal
        isEditModalVisible={isEditModalVisible}
        handleCancel={handleCancel}
      />
      <AddClassModal
        isAddClassModalVisible={isAddClassModalVisible}
        handleCancel={handleCancel}
      />
      <div className="!mt-5">
        <Collapse
          accordion
          bordered={false}
          defaultActiveKey={["primary"]}
          style={{ backgroundColor: "#ffffff" }}
        >
          <Panel
            header={
              <MyPanelHeader
                showEditModal={showEditModal}
                title="Primary"
                showDeleteModal={showDeleteModal}
              />
            }
            key="primary"
          >
            <Table
              dataSource={primaryData}
              columns={columns}
              pagination={false}
              size="small"
              rowKey="key"
            />
            <ReuseButton
              onClick={showAddClassModal}
              variant="outline"
              className="!text-secondary-color !mt-5 !w-fit !border-0 !px-1"
            >
              <FiPlus className="!text-base !text-secondary-color" /> Add New
              Class
            </ReuseButton>
          </Panel>

          <Panel
            header={
              <MyPanelHeader
                showEditModal={showEditModal}
                title="Secondary"
                showDeleteModal={showDeleteModal}
              />
            }
            key="secondary"
          >
            {/* Content for Secondary Section */}
            <Typography.Title
              level={4}
              className="!text-secondary-color !text-center"
              type="secondary"
            >
              No classes added yet.
            </Typography.Title>

            <ReuseButton
              onClick={showAddClassModal}
              variant="outline"
              className="!text-secondary-color !mt-5 !w-fit !border-0 !px-1"
            >
              <FiPlus className="!text-base !text-secondary-color" /> Add New
              Class
            </ReuseButton>
          </Panel>

          <Panel
            header={
              <MyPanelHeader
                showEditModal={showEditModal}
                title="Intermediate"
                showDeleteModal={showDeleteModal}
              />
            }
            key="intermediate"
          >
            {/* Content for Intermediate Section */}
            <Typography.Title
              level={4}
              className="!text-secondary-color !text-center"
              type="secondary"
            >
              No classes added yet.
            </Typography.Title>

            <ReuseButton
              onClick={showAddClassModal}
              variant="outline"
              className="!text-secondary-color !mt-5 !w-fit !border-0 !px-1"
            >
              <FiPlus className="!text-base !text-secondary-color" /> Add New
              Class
            </ReuseButton>
          </Panel>
        </Collapse>
      </div>

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

export default ClassPage;
