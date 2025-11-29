/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { BsInfoCircle } from "react-icons/bs";

interface ViewStudentMessageModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any | null;
}
const ViewStudentMessageModal: React.FC<ViewStudentMessageModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
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
          <h3 className="text-lg sm:text-xl lg:text-2xl  font-bold text-base-color text-center">
            Note From Parents for {currentRecord?.userId?.name}{" "}
          </h3>
          <div className="mt-10 p-4 rounded-lg bg-[#F1F8FD] border border-secondary-color flex gap-2">
            <div className="rounded-full">
              <BsInfoCircle className="size-7 text-error-color" />
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-secondary-color">
              {currentRecord?.parentsMessage || "No message"}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewStudentMessageModal;
