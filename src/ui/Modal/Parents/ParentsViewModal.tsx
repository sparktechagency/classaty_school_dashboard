import { Modal } from "antd";
import { AllImages } from "../../../../public/images/AllImages";
import { IParents } from "../../../types/Parents.Type";
import { useGetParantDetailsQuery } from "../../../redux/features/parents/parentsApi";
import { FadeLoader } from "react-spinners";

interface IParentInfo {
  _id: string;
  phoneNumber: string;
  role: "parents";
  status: "active" | "inactive" | string; // extend as needed
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  parentsId: string;
  name: string;
  image?: string;
}

interface IStudent {
  _id: string;
  parentsInfo: IParentInfo;
  studentName: string;
  studentClass: string;
  studentSection: string;
  studentSchoolName: string;
}

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
  const { data: parentDetails, isFetching } = useGetParantDetailsQuery(
    {
      id: currentRecord?._id,
    },
    {
      skip: !currentRecord?._id || !isViewModalVisible,
      refetchOnMountOrArgChange: true,
    }
  );

  const studentList: IStudent[] = parentDetails?.data;
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      {isFetching ? (
        <div className="flex justify-center items-center h-full">
          <FadeLoader color="#28314E" />
        </div>
      ) : (
        <div className="py-5">
          <div className="text-base-color">
            <h3 className="text-lg sm:text-2xl lg:text-3xl  font-bold text-base-color text-center">
              Parent Information
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-center mt-2 text-[#989898]">
              See all details about {currentRecord?.name}
            </p>
            <div className="flex flex-col justify-center items-center gap-2 mt-5">
              {/* Avatar */}
              <img
                src={studentList?.[0]?.parentsInfo?.image || AllImages.profile}
                alt={currentRecord?.name}
                className="w-40 h-40 object-cover rounded"
              />
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold ">
                {currentRecord?.name}
              </h2>
            </div>

            <div className="mt-5">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold underline">
                Children's :
              </h2>
              <ul className="mt-2 list-decimal list-inside text-base sm:text-lg lg:text-xl">
                {studentList?.map((student: IStudent) => (
                  <li className=" font-semibold">
                    {student?.studentName} - {student?.studentSchoolName} (
                    {student?.studentClass}-{student?.studentSection})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ParentsViewModal;
