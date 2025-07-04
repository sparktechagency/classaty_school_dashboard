import { Modal } from "antd";
import { AllImages } from "../../../../public/images/AllImages";
import ReuseButton from "../../Button/ReuseButton";
import { IStudentData } from "../../../types";

interface ViewStudentModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IStudentData | null;
  showDeleteModal: (record: IStudentData) => void;
}
const ViewStudentModal: React.FC<ViewStudentModalProps> = ({
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
          <h3 className="text-lg sm:text-2xl lg:text-3xl  font-bold text-base-color text-center">
            Student Information
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-center mt-2 text-[#989898]">
            See all details about {currentRecord?.name}
          </p>
          <div className="flex flex-col justify-center items-center gap-2 mt-5">
            {/* Avatar */}
            <img
              src={currentRecord?.image || AllImages.profile}
              alt={currentRecord?.name}
              className="w-40 h-40 object-cover rounded"
            />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold ">
              {currentRecord?.name}
            </h2>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-secondary-color mt-5">
              {currentRecord?.student?.school?.schoolName}
            </h2>
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

export default ViewStudentModal;
