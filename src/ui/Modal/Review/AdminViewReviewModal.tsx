/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Rate } from "antd";
import { AllImages } from "../../../../public/images/AllImages";

interface AdminViewReviewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any | null;
}

const AdminViewReviewModal: React.FC<AdminViewReviewModalProps> = ({
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
      <div className="">
        <div className="">
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-secondary-color text-center">
            Customer Review
          </h3>

          <div className="mt-3">
            <div className="text-lg  ">
              <img
                src={AllImages.cover}
                alt="quote"
                className="w-full h-auto mx-auto"
              />
              <div className="flex items-center justify-center  gap-2 mb-2 mt-5">
                <Rate disabled defaultValue={currentRecord?.rating} />
              </div>

              <div className="flex items-start  gap-2 mb-2">
                <span className="text-justify pt-0 ">
                  {currentRecord?.review} {""}
                  {currentRecord?.review}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdminViewReviewModal;
