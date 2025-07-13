/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import DeleteModal from "../../../../ui/Modal/DeleteModal";
import AllSchoolTable from "../../../../ui/Tables/SchoolTable";
import EditSchoolModal from "../../../../ui/Modal/User/EditSchoolModal";
import SchoolModal from "../../../../ui/Modal/User/SchoolModal";
import tryCatchWrapper from "../../../../utils/tryCatchWrapper";
import { ISchoolDetails } from "../../../../types";
import {
  useDeleteSchoolMutation,
  useGetSchoolQuery,
} from "../../../../redux/features/school/schoolApi";

const RecentSchool = () => {
  const { data, isFetching } = useGetSchoolQuery({
    page: 1,
    limit: 6,
    searchTerm: "",
  });
  const [deleteSchool] = useDeleteSchoolMutation();
  const schoolData: ISchoolDetails[] = data?.data?.result;
  const schoolPagination = data?.data?.meta;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showEditModal = (record: any) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
  };

  const showDeleteModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    // setCurrentRecord(null);
  };

  const handleDelete = async (data: ISchoolDetails) => {
    const res = await tryCatchWrapper(
      deleteSchool,
      { params: data?.school?._id },
      "Deleting..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };
  return (
    <div className="mt-10 rounded-xl">
      <div className="flex justify-between items-center py-2">
        <p className="text-2xl text-base-color lg:text-3xl font-bold mb-5">
          Recent Added School
        </p>
      </div>
      <div className="border-2 border-[#e1e1e1] rounded-xl rounded-tr-xl">
        <AllSchoolTable
          data={schoolData}
          loading={isFetching}
          showViewModal={showViewUserModal}
          showEditModal={showEditModal}
          setPage={undefined}
          page={1}
          total={schoolPagination?.total}
          limit={6}
        />
      </div>

      <EditSchoolModal
        isEditModalVisible={isEditModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />

      <SchoolModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        showDeleteModal={showDeleteModal}
      />

      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        handleCancel={handleDeleteCancel}
        currentRecord={currentRecord}
        handleDelete={handleDelete}
        description=" Are You Sure You want to Delete This School ?"
      />
    </div>
  );
};

export default RecentSchool;
