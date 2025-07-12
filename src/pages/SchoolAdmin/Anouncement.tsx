import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useGetAllAnnouncementsQuery } from "../../redux/features/announcement/announcementApi";
import { IAnounceType } from "../../types";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import AddAnouncementModal from "../../ui/Modal/Anouncement/AddAnouncementModal";
import AnouncementViewModal from "../../ui/Modal/Anouncement/AnouncementViewModal";
import DeleteModal from "../../ui/Modal/DeleteModal";
import AnouncemantTable from "../../ui/Tables/AnouncemantTable";
 
const AnnouncementPage = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
 
  const limit = 12;
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IAnounceType | null>(null);
 
  const { data: announcements, isFetching } = useGetAllAnnouncementsQuery({
    page,
    limit,
    searchTerm: searchText,
  });
 
  const showAddModal = () => {
    setIsAddModalVisible(true);
  };
 
  const showViewUserModal = (record: IAnounceType) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };
 
  const showDeleteModal = (record: IAnounceType) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };
 
  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsViewModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };
 
  const handleDelete = (record: IAnounceType) => {
    handleCancel();
    console.log(record);
  };
 
  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-secondary-color font-bold">
          Announcements
        </p>
        <div className="h-fit">
          <div className="h-fit">
            <ReuseButton
              variant="secondary"
              className="!py-4.5"
              onClick={showAddModal}
            >
              <FiPlus className="!text-bas" /> Add New Announcements
            </ReuseButton>
          </div>
        </div>
      </div>
      <div className="h-fit flex justify-end">
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search Announcements ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>
      <AddAnouncementModal
        isAddModalVisible={isAddModalVisible}
        handleCancel={handleCancel}
      />
      <div className="border-2 border-[#e1e1e1] rounded-xl rounded-tr-xl">
        <AnouncemantTable
          data={announcements?.data?.result}
          loading={isFetching}
          showViewModal={showViewUserModal}
          showDeleteModal={showDeleteModal}
          setPage={setPage}
          page={page}
          total={announcements?.data?.meta.total}
          limit={limit}
        />
      </div>
      <AnouncementViewModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleDelete={handleDelete}
        description=" Are You Sure You want to Delete This  ?"
      />
    </div>
  );
};
 
export default AnnouncementPage;