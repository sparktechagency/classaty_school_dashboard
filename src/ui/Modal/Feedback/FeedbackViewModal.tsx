import { Modal, Rate } from "antd";
import { AllImages } from "../../../../public/images/AllImages";

interface FeedbackViewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: {
    name: string;
    email: string;
    rating: number;
  } | null;
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
      className="lg:!w-[450px]"
    >
      <div className="p-5">
        <div className="">
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-color text-center">
            User Feedback
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-center mt-2">
            See full details feedback from {currentRecord?.name}
          </p>
          <div className="flex justify-center items-center gap-1 mt-5">
            {/* Avatar */}
            <img
              src={AllImages.profile}
              alt={currentRecord?.name}
              className="w-12 h-12 object-cover rounded-full"
            />
            <div className="text-base sm:text-lg lg:text-xl font-semibold ">
              {currentRecord?.name}
            </div>
          </div>

          <div className="mt-3">
            <div className="text-lg  ">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">Name: </span>
                <span className="text-secondary-color">
                  {currentRecord?.name}
                </span>
              </div>

              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Email:</span>
                <span>{currentRecord?.email}</span>
              </div>

              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Rating :</span>
                <span className="text-justify pt-0 ">
                  <Rate disabled defaultValue={currentRecord?.rating} />
                </span>
              </div>

              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Platform :</span>
                <span className="text-justify pt-0 ">App</span>
              </div>
              <div className="flex items-start  gap-2 mb-2">
                <span className="font-medium">Feedback :</span>
                <span className="text-justify pt-0 ">
                  This app is a treasure for memory enthusiasts! With diverse
                  genres, seamless navigation, and personalized recommendations,
                  it’s a delight. The audio narration is immersive, and offline
                  mode ensures you’re always connected to unforgettable tales.
                  It’s a perfect escape into captivating worlds—highly
                  recommended for anyone who cherishes memories!
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
