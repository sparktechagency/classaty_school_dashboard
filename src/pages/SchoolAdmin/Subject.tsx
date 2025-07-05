import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import DeleteModal from "../../ui/Modal/DeleteModal";
import ReuseButton from "../../ui/Button/ReuseButton";
import { FiPlus } from "react-icons/fi";
import AddSubject from "../../ui/Modal/Subject/AddSubject";
import SubjectTable from "../../ui/Tables/SubjectTable";
import {
  useDeleteSubjectMutation,
  useGetSubjectBySchoolIdQuery,
} from "../../redux/features/subject/subjectApi";
import { ISubject } from "../../types";
import EditSubject from "../../ui/Modal/Subject/EditSubject";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const SubjectPage = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const limit = 12;

  const [deleteSubject] = useDeleteSubjectMutation();
  const { data, isFetching } = useGetSubjectBySchoolIdQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  const subjectData: ISubject[] = data?.data?.result;

  const subjectPagination = data?.data?.meta;

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<ISubject | null>(null);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const showUpdateModal = (record: ISubject) => {
    setCurrentRecord(record);
    setIsUpdateModalVisible(true);
  };

  const showDeleteModal = (record: ISubject) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsDeleteModalVisible(false);
    setIsUpdateModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDelete = async (record: ISubject) => {
    const res = await tryCatchWrapper(
      deleteSubject,
      { params: record?._id },
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
          Subject
        </p>
        <div className="h-fit">
          <div className="h-fit">
            <ReuseButton
              variant="secondary"
              className="!py-4.5"
              onClick={showAddModal}
            >
              <FiPlus className="!text-bas" /> Add New Subject
            </ReuseButton>
          </div>
        </div>
      </div>
      <div className="h-fit flex justify-end">
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search Subject ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>
      <AddSubject
        isAddModalVisible={isAddModalVisible}
        handleCancel={handleCancel}
      />
      <div className="border-2 border-[#e1e1e1] rounded-xl rounded-tr-xl mt-5">
        <SubjectTable
          data={subjectData}
          loading={isFetching}
          showDeleteModal={showDeleteModal}
          showUpdateModal={showUpdateModal}
          setPage={setPage}
          page={page}
          total={subjectPagination?.total}
          limit={limit}
        />
      </div>

      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleDelete={handleDelete}
        description=" Are You Sure You want to Delete This ?"
      />
      <EditSubject
        isUpdateModalVisible={isUpdateModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default SubjectPage;
