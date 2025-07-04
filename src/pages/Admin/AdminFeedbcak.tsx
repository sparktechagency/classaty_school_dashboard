/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import FeedbackTable from "../../ui/Tables/FeedbackTable";
import FeedbackViewModal from "../../ui/Modal/Feedback/FeedbackViewModal";
import { useGetFeedbackQuery } from "../../redux/features/feedback/feedbackApi";

// Define the type for a report row (customize fields as needed)

const limit = 12;

const AdminFeedback: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  const [isViewModalVisible, setIsViewModalVisible] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const { data, isFetching } = useGetFeedbackQuery({ page, limit });

  const FeedbackData: any[] = data?.data?.result;

  const FeedbackPagination = data?.data?.meta;

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
  };

  return (
    <div>
      <div className="mt-5 bg-primary-color rounded-xl px-4">
        <div className="bg-primary-color w-full p-4 rounded-tl-xl rounded-tr-xl">
          <div className="flex items-center justify-between my-5">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-secondary-color font-semibold">
              Feedback
            </p>
          </div>
        </div>
        <FeedbackTable
          data={FeedbackData}
          loading={isFetching}
          showViewModal={showViewUserModal}
          setPage={setPage}
          page={page}
          total={FeedbackPagination?.total}
          limit={limit}
        />
        <FeedbackViewModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default AdminFeedback;
