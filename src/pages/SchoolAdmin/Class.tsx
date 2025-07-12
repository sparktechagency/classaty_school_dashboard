/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import DeleteModal from "../../ui/Modal/DeleteModal";
import ReuseButton from "../../ui/Button/ReuseButton";
import { Collapse as AntdCollapse, Table, Space, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import AddClassLevelModal from "../../ui/Modal/Class/AddClassLevelModal";
import EditClassLevelModal from "../../ui/Modal/Class/EditClassLevelModal";
import AddClassModal from "../../ui/Modal/Class/AddClassModal";
import {
  useDeleteLevelMutation,
  useGetLevelQuery,
} from "../../redux/features/level/levelApi";
import {
  useDeleteClassMutation,
  useGetClassByLevelIdQuery,
} from "../../redux/features/class/classAPi";
import { IClass } from "../../types";
import { FadeLoader } from "react-spinners";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import EditClassModal from "../../ui/Modal/Class/EditClassModal";

const { Panel } = AntdCollapse;

const MyPanelHeader: React.FC<{
  level: any;
  title: string;
  showDeleteModal: (record: any) => void;
  showEditModal: (record: any) => void;
}> = ({ level, title, showDeleteModal, showEditModal }) => (
  <div className="flex justify-between items-center gap-5 px-5 bg-secondary-color py-1">
    <h2 className="text-lg sm:text-xl lg:text-2xl text-primary-color font-bold">
      {title}
    </h2>
    <Space size="middle">
      <Tooltip title="Edit">
        <EditOutlined
          onClick={(e) => {
            e.stopPropagation(); // prevent collapse
            showEditModal(level);
          }}
          style={{ fontSize: "16px", cursor: "pointer" }}
        />
      </Tooltip>

      <Tooltip title="Delete">
        <RiDeleteBin6Line
          onClick={(e) => {
            e.stopPropagation(); // prevent collapse
            showDeleteModal(title);
          }}
          style={{ fontSize: "16px", color: "red", cursor: "pointer" }}
        />
      </Tooltip>
    </Space>
  </div>
);

const ClassPage = () => {
  // const [searchText, setSearchText] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<any>(null);

  const [deleteLevel] = useDeleteLevelMutation();
  const [deleteClass] = useDeleteClassMutation();
  const { data, isFetching } = useGetLevelQuery({});
  const levelData: any = data?.data;

  const { data: classData, isFetching: isFetchingClass } =
    useGetClassByLevelIdQuery(
      {
        levelId: selectedLevel?.[0],
      },
      {
        skip: !selectedLevel?.[0],
      }
    );

  const allClass: IClass[] = classData?.data;

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isAddClassModalVisible, setIsAddClassModalVisible] = useState(false);
  const [isEditClassModalVisible, setIsEditClassModalVisible] = useState(false);
  const [isDeleteClassModalVisible, setIsDeleteClassModalVisible] =
    useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };
  const showAddClassModal = () => {
    setIsAddClassModalVisible(true);
  };
  const showEditModal = (record: any) => {
    setIsEditModalVisible(true);
    setCurrentRecord(record);
  };

  const showEditClassModal = (record: any) => {
    setIsEditClassModalVisible(true);
    setCurrentRecord(record);
  };

  const showDeleteModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const showDeleteClassModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeleteClassModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddClassModalVisible(false);
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setIsEditClassModalVisible(false);
    setIsDeleteModalVisible(false);
    setIsDeleteClassModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDelete = async (record: any) => {
    const res = await tryCatchWrapper(
      deleteLevel,
      { params: record?._id },
      "Deleting..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };
  const handleClassDelete = async (record: any) => {
    const res = await tryCatchWrapper(
      deleteClass,
      { params: record?._id },
      "Deleting..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };

  const columns = [
    {
      title: "#UID",
      dataIndex: "_id",
      render: (_: unknown, __: unknown, index: number) => index + 1,
      align: "center" as const,
      key: "_id",
    },
    {
      title: "Class",
      dataIndex: "className",
      align: "center" as const,
      key: "className",
    },
    {
      title: "Section",
      dataIndex: "section",
      align: "center" as const,
      key: "section",
    },
    {
      title: "Action",
      key: "action",
      align: "center" as const,
      render: (_: unknown, currentRecord: any) => (
        <Space size="middle">
          <Tooltip title="Delete">
            <RiDeleteBin6Line
              onClick={() => showDeleteClassModal(currentRecord)}
              style={{ color: "red", cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <EditOutlined
              onClick={() => showEditClassModal(currentRecord)}
              style={{ color: "#1890ff", cursor: "pointer" }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-[90vh]">
        <FadeLoader color="#28314E" />
      </div>
    );
  }

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
      {/* <div className="h-fit flex justify-end">
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search Class ..."
            setSearch={setSearchText}
            setPage={() => {}}
          />
        </div>
      </div> */}
      <AddClassLevelModal
        isAddModalVisible={isAddModalVisible}
        handleCancel={handleCancel}
      />
      <EditClassLevelModal
        isEditModalVisible={isEditModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <AddClassModal
        selectedLevel={selectedLevel}
        isAddClassModalVisible={isAddClassModalVisible}
        handleCancel={handleCancel}
      />
      <EditClassModal
        isEditClassModalVisible={isEditClassModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <div className="!mt-5">
        <AntdCollapse
          accordion
          bordered={false}
          style={{ backgroundColor: "#ffffff" }}
          onChange={(key) => {
            console.log("Collapse key:", key);
            setSelectedLevel(key); // this is the full ID
          }}
        >
          {levelData?.map((level: any) => (
            <Panel
              key={level._id.toString()}
              header={
                <MyPanelHeader
                  level={level}
                  title={level.levelName}
                  showEditModal={(level: any) => {
                    showEditModal(level);
                  }}
                  showDeleteModal={() => {
                    setCurrentRecord(level);
                    showDeleteModal(level);
                  }}
                />
              }
            >
              <Table
                dataSource={allClass}
                columns={columns}
                pagination={false}
                loading={isFetchingClass}
                size="small"
                rowKey="_id"
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
          ))}
        </AntdCollapse>
      </div>

      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleDelete={handleDelete}
        description=" Are You Sure You want to Delete This ?"
      />
      <DeleteModal
        isDeleteModalVisible={isDeleteClassModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleDelete={handleClassDelete}
        description=" Are You Sure You want to Delete This ?"
      />
    </div>
  );
};

export default ClassPage;
