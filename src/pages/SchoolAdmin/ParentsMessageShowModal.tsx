import { Modal } from "antd";
import { CiCircleAlert } from "react-icons/ci";

interface IProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  parentsMessage: string;
}

const ParentsMessageShowModal: React.FC<IProps> = ({
  isViewModalVisible,
  handleCancel,
  parentsMessage,
}) => {
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[400px]"
    >
      <div className="py-5 text-base-color">
        <h3 className="text-lg font-bold text-center mb-4">
          Note From Parents
        </h3>
        <p className="bg-[#F1F8FD] p-4 rounded-lg border border-[#28314E] flex gap-2">
          <CiCircleAlert className="text-2xl font-medium text-[#E53935]" />
          <span>{parentsMessage}</span>
        </p>
      </div>
    </Modal>
  );
};

export default ParentsMessageShowModal;
