/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Rate } from "antd";
import { AllImages } from "../../../../public/images/AllImages";

interface FeedbackViewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any;
}

const FeedbackViewModal: React.FC<FeedbackViewModalProps> = ({
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
      <div className="p-5">
        <div className="">
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-color text-center">
            User Feedback
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-center mt-2">
            See full details feedback from {currentRecord?.user?.name}
          </p>
          <div className="flex justify-center items-center gap-1 mt-5">
            {/* Avatar */}
            <img
              src={currentRecord?.user?.image || AllImages.profile}
              alt={currentRecord?.user?.name}
              className="w-12 h-12 object-cover rounded-full"
            />
            <div className="text-base sm:text-lg lg:text-xl font-semibold ">
              {currentRecord?.user?.name}
            </div>
          </div>

          <div className="mt-3">
            <div className="text-lg  ">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">Name: </span>
                <span className="text-secondary-color">
                  {currentRecord?.user?.name}
                </span>
              </div>

              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Rating :</span>
                <span className="text-justify pt-0 flex items-center">
                  <Rate
                    disabled
                    allowHalf
                    defaultValue={currentRecord?.ratings}
                  />
                  <span className="text-secondary-color">
                    ({currentRecord?.ratings})
                  </span>
                </span>
              </div>

              <div className="flex items-start  gap-2 mb-2">
                <span className="font-medium text-nowrap">Feedback :</span>
                <span className="text-justify pt-0 ">
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

export default FeedbackViewModal;
