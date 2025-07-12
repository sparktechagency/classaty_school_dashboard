/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import {
  useDeleteGradeSystemMutation,
  useGetAllGradeSystemsQuery,
} from "../../redux/features/gradeSystem/gradeSystemApi";
import { IAnounceType } from "../../types";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import DeleteModal from "../../ui/Modal/DeleteModal";
import AddGradeSystemModal from "../../ui/Modal/GradeSystem/AddGradeSystemModal";
import GradeSystemTable from "../../ui/Tables/GradeSystemTable";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import EditGradeSystem from "../../ui/Modal/GradeSystem/EditGradeSystemModal";

const GradeSystem = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const limit = 12;
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IAnounceType | null>(null);

  const { data: gradeSystem, isFetching } = useGetAllGradeSystemsQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  const [deleteGradeSystem] = useDeleteGradeSystemMutation();

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const showViewUserModal = (record: IAnounceType) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
  };

  const showDeleteModal = (record: IAnounceType) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDelete = async (record: any) => {
    const res = await tryCatchWrapper(
      deleteGradeSystem,
      {
        params: record?._id,
      },
      "Deleting..."
    );

    if (res.statusCode === 200) {
      handleCancel();
    }
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-secondary-color font-bold">
          Grade System
        </p>
        <div className="h-fit">
          <div className="h-fit">
            <ReuseButton
              variant="secondary"
              className="!py-4.5"
              onClick={showAddModal}
            >
              <FiPlus className="!text-bas" /> Add New Grade System
            </ReuseButton>
          </div>
        </div>
      </div>
      <div className="h-fit flex justify-end">
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search Grade System ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>
      <AddGradeSystemModal
        isAddModalVisible={isAddModalVisible}
        handleCancel={handleCancel}
      />
      <div className="border-2 border-[#e1e1e1] rounded-xl rounded-tr-xl">
        <GradeSystemTable
          data={gradeSystem?.data?.result}
          loading={isFetching}
          showViewModal={showViewUserModal}
          showDeleteModal={showDeleteModal}
          setPage={setPage}
          page={page}
          total={gradeSystem?.data?.meta.total}
          limit={limit}
        />
      </div>
      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleDelete={handleDelete}
        description=" Are You Sure You want to Delete This  ?"
      />

      <EditGradeSystem
        isEditModalVisible={isEditModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default GradeSystem;
