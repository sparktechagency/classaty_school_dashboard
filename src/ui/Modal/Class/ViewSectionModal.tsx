import { Modal } from "antd";
import { Link } from "react-router-dom";
interface ClassData {
  _id?: string; // optional for edit
  className: string;
  section: string[];
  levelId: string;
}

interface ViewSectionModalProps {
  isViewSectionModalVisible: boolean;
  handleCancel: () => void;
  currentRecord?: ClassData | null;
}

const ViewSectionModal: React.FC<ViewSectionModalProps> = ({
  isViewSectionModalVisible,
  handleCancel,
  currentRecord = null,
}) => {
  return (
    <Modal
      open={isViewSectionModalVisible}
      onCancel={handleCancel}
      footer={null}
      className="w-60 md:w-96"
      centered
      destroyOnClose
    >
      <div className="pt-8">
        {currentRecord?.section?.map((section, index) => (
          <Link
            to={`/school/class/${currentRecord?._id}/${currentRecord?.className}/${section}`}
            key={index}
            className="text-xl text-center border-b border-[#e1e1e1] py-2 cursor-pointer hover:bg-[#e1e1e1] block !text-secondary-color"
          >
            {section}
          </Link>
        ))}
      </div>
    </Modal>
  );
};

export default ViewSectionModal;
