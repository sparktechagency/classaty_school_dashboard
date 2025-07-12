/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import ReuseButton from "../../Button/ReuseButton";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { AllImages } from "../../../../public/images/AllImages";
interface ViewSchoolAdminAllManagerProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any | null;
  showDeleteModal: (record: any) => void;
}
const ViewSchoolAdminAllManager: React.FC<ViewSchoolAdminAllManagerProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
  showDeleteModal,
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
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary-color text-center">
            Manager Details
          </h3>

          <div className="flex flex-col justify-center items-center gap-2 mt-3">
            {/* Avatar */}
            <img
              src={
                currentRecord?.image
                  ? `${getImageUrl()}/${currentRecord?.image}`
                  : AllImages.profile
              }
              alt={currentRecord?.name}
              className="w-20 h-20 object-cover rounded"
            />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-secondary-color mt-5">
              {currentRecord?.name}
            </h2>

            <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-secondary-color mt-1">
              Phone Number: {currentRecord?.phoneNumber}
            </h2>
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-secondary-color mt-1">
              Status: {currentRecord?.status}
            </h2>
            <div className="mt-5">
              <ReuseButton
                variant="error"
                onClick={() => showDeleteModal(currentRecord as any)}
              >
                Remove
              </ReuseButton>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewSchoolAdminAllManager;
