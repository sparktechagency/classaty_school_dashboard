import { Modal } from "antd";
import { AllImages } from "../../../../public/images/AllImages";
import ReuseButton from "../../Button/ReuseButton";
import { ISchoolDetails } from "../../../types";
import { formetDateAndTime } from "../../../utils/dateFormet";
interface SchoolModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: ISchoolDetails | null;
  showDeleteModal: (record: ISchoolDetails) => void;
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
              src={
                currentRecord?.school?.coverImage || AllImages.defaultCoverPhoto
              }
              alt={currentRecord?.school?.schoolName}
              className="w-full h-60 object-cover rounded"
            />
            <img
              src={currentRecord?.school?.schoolImage || AllImages.profile}
              alt={currentRecord?.school?.schoolName}
              className="w-auto h-28 object-cover rounded-full -mt-16"
            />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-secondary-color mt-5">
              {currentRecord?.school?.schoolName}
            </h2>
            <div>
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-secondary-color mt-2">
                <span className="font-bold">Phone Number:</span>{" "}
                {currentRecord?.phoneNumber}
              </h2>
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-secondary-color mt-2">
                <span className="font-bold">Admin Name:</span>{" "}
                {currentRecord?.school?.adminName}
              </h2>
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-secondary-color mt-2">
                <span className="font-bold">Added Date:</span>{" "}
                {formetDateAndTime(currentRecord?.createdAt)}
              </h2>
            </div>
            <div className="mt-5">
              <ReuseButton
                variant="error"
                onClick={() => showDeleteModal(currentRecord as ISchoolDetails)}
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
