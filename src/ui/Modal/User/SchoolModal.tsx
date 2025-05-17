import { Modal } from "antd";
import { AllImages } from "../../../../public/images/AllImages";
import ReuseButton from "../../Button/ReuseButton";
import { ISchool } from "../../../types";
interface SchoolModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: ISchool | null;
  showDeleteModal: (record: ISchool) => void;
}
const SchoolModal: React.FC<SchoolModalProps> = ({
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
            School Details
          </h3>

          <div className="flex flex-col justify-center items-center gap-2 mt-3">
            {/* Avatar */}
            <img
              src={AllImages.cover}
              alt={currentRecord?.SchoolName}
              className="w-full h-60 object-cover rounded"
            />
            <img
              src={AllImages.schoolProfile}
              alt={currentRecord?.SchoolName}
              className="w-auto h-28 object-cover rounded -mt-16"
            />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-secondary-color mt-5">
              {currentRecord?.SchoolName}
            </h2>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-secondary-color mt-2">
              <span className="font-bold">Added Date:</span> 24 May 2023
            </h2>

            <div className="mt-5">
              <ReuseButton
                variant="error"
                onClick={() => showDeleteModal(currentRecord as ISchool)}
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

export default SchoolModal;
