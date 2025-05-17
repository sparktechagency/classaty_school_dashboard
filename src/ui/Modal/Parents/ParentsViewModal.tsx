import { Modal } from "antd";
import { AllImages } from "../../../../public/images/AllImages";
import { IParents } from "../../../types/ParentsType";

interface ParentsViewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IParents | null;
}
const ParentsViewModal: React.FC<ParentsViewModalProps> = ({
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
          <h3 className="text-lg sm:text-2xl lg:text-3xl  font-bold text-base-color text-center">
            Parent Information
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-center mt-2 text-[#989898]">
            See all details about {currentRecord?.ParentsName}
          </p>
          <div className="flex flex-col justify-center items-center gap-2 mt-5">
            {/* Avatar */}
            <img
              src={AllImages.profile}
              alt={currentRecord?.ParentsName}
              className="w-40 h-40 object-cover rounded"
            />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold ">
              {currentRecord?.ParentsName}
            </h2>
          </div>

          <div className="mt-5">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold underline">
              Children's :
            </h2>
            <ul className="mt-2 list-decimal list-inside text-base sm:text-lg lg:text-xl">
              <li className=" font-semibold">
                Ali Al-Fahad (Bright Future Academy)
              </li>
              <li className=" font-semibold">
                Fatimah Al-Sabah (Al-Ahmadi High School)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ParentsViewModal;
