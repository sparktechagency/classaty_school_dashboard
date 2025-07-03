import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import AllSchoolTable from "../../ui/Tables/SchoolTable";
import SchoolModal from "../../ui/Modal/User/SchoolModal";
import DeleteModal from "../../ui/Modal/DeleteModal";
import ReuseButton from "../../ui/Button/ReuseButton";
import { FiPlus } from "react-icons/fi";
import AddSchoolModal from "../../ui/Modal/User/AddSchoolModal";
import EditSchoolModal from "../../ui/Modal/User/EditSchoolModal";
import {
  useDeleteSchoolMutation,
  useGetSchoolQuery,
} from "../../redux/features/school/schoolApi";
import { ISchoolDetails } from "../../types";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const AdminAllSchools = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const limit = 12;

  const { data, isFetching } = useGetSchoolQuery({
    page,
    limit,
    searchTerm: searchText,
  });
  const [deleteSchool] = useDeleteSchoolMutation();
  const schoolData: ISchoolDetails[] = data?.data?.result;
  const schoolPagination = data?.data?.meta;

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<ISchoolDetails | null>(
    null
  );

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const showEditModal = (record: ISchoolDetails) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
  };

  const showViewUserModal = (record: ISchoolDetails) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showDeleteModal = (record: ISchoolDetails) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
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
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-secondary-color font-bold">
          School List
        </p>
        <div className="h-fit">
          <ReuseButton
            variant="secondary"
            className="!py-4.5"
            onClick={showAddModal}
          >
            <FiPlus className="!text-bas" /> Add New School
          </ReuseButton>
        </div>
      </div>
      <div className="flex justify-end items-center mb-5">
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search School..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>
      <div className="border-2 border-[#e1e1e1] rounded-xl rounded-tr-xl">
        <AllSchoolTable
          data={schoolData}
          loading={isFetching}
          showViewModal={showViewUserModal}
          showEditModal={showEditModal}
          setPage={setPage}
          page={page}
          total={schoolPagination?.total}
          limit={limit}
        />
      </div>

      <EditSchoolModal
        isEditModalVisible={isEditModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <AddSchoolModal
        isAddModalVisible={isAddModalVisible}
        handleCancel={handleCancel}
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

export default AdminAllSchools;
