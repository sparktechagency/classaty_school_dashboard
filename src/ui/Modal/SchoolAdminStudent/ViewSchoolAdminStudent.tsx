/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { IStudentData } from "../../../types";
import ReuseButton from "../../Button/ReuseButton";
import { AllImages } from "../../../../public/images/AllImages";

interface ViewSchoolAdminStudentProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IStudentData | null | any;
  showDeleteModal: (record: IStudentData | any) => void;
  setIsSendModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const ViewSchoolAdminStudent: React.FC<ViewSchoolAdminStudentProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
  showDeleteModal,
  setIsSendModalVisible,
}) => {
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <div className="py-5">
        <div className="text-base-color">
          <h3 className="text-lg sm:text-2xl lg:text-3xl  font-bold text-base-color text-center">
            Student Information
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-center mt-2 text-[#989898]">
            See all details about {currentRecord?.studentName}
          </p>
          <div className="flex flex-col justify-center items-center gap-2 mt-5">
            {/* Avatar */}
            <img
              src={
                currentRecord?.image
                  ? `${getImageUrl()}/${currentRecord?.image}`
                  : AllImages.profile
              }
              alt={currentRecord?.studentName}
              className="w-40 h-40 object-cover rounded"
            />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold ">
              {currentRecord?.studentName}
            </h2>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-secondary-color mt-5">
              Note From Parents
            </h2>
            <div className="rounded-lg border bg-[#F1F8FD] border-secondary-color p-3 text-secondary-color text-base sm:text-lg lg:text-xl font-semibold text-center mt-5">
              {currentRecord?.parentsMessage || "No message"}
            </div>
          </div>

          <div className="mt-5 flex justify-center">
            <ReuseButton
              className="!w-fit"
              variant="secondary"
              onClick={() => setIsSendModalVisible(true)}
            >
              Send Notification
            </ReuseButton>
          </div>

          <div className="mt-5 flex justify-center">
            <ReuseButton
              variant="error"
              onClick={() => showDeleteModal(currentRecord as IStudentData)}
            >
              Remove
            </ReuseButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewSchoolAdminStudent;
