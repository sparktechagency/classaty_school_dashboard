import { Modal } from "antd";
import { IAnounceType } from "../../../types";

interface AnouncementViewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IAnounceType | null;
}
const AnouncementViewModal: React.FC<AnouncementViewModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  console.log(currentRecord);
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <div className="py-5 px-6 text-base-color">
        <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-center mb-4">
          Parents Meeting
        </h3>
        <p className="text-center text-sm sm:text-base lg:text-lg text-[#989898] mb-6">
          April 24, 2025
        </p>

        <p className="text-base sm:text-lg lg:text-xl mb-4">Dear Parents,</p>

        <p className="mb-4 text-base sm:text-lg lg:text-xl leading-relaxed">
          We would like to remind you about the Parents Meeting scheduled for
          April 24 at 4 PM. It will be held in the conference room.
        </p>

        <p className="mb-4 text-base sm:text-lg lg:text-xl leading-relaxed">
          Please make sure to attend and join us for important discussions. We
          look forward to seeing you there!
        </p>

        <p className="text-base sm:text-lg lg:text-xl font-semibold">
          Thank you!
        </p>
      </div>
    </Modal>
  );
};

export default AnouncementViewModal;
