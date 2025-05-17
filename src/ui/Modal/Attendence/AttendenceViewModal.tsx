import { Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { IAttendence } from "../../../types/AttendenceTable";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface Student {
  name: string;
  school: string;
  viewed: boolean;
  approved: boolean;
}

interface AttendenceViewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IAttendence | null;
  studentList?: Student[]; // You can pass the student list as prop or define inside component
}

const AttendenceViewModal: React.FC<AttendenceViewModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
  studentList = [
    { name: "Fahad Al-Sabah", school: "", viewed: true, approved: true },
    { name: "Sara Al-Mansoori", school: "", viewed: true, approved: false },
    { name: "Hassan Al-Rashid", school: "", viewed: true, approved: true },
    { name: "Layla Al-Khalid", school: "", viewed: true, approved: false },
    { name: "Omar Al-Jabri", school: "", viewed: true, approved: true },
    { name: "Maya Al-Farsi", school: "", viewed: true, approved: false },
    { name: "Zainab Al-Hamadi", school: "", viewed: true, approved: true },
    { name: "Ali Al-Mutairi", school: "", viewed: true, approved: false },
    { name: "Noura Al-Qadi", school: "", viewed: true, approved: true },
    { name: "Tariq Al-Saleh", school: "", viewed: true, approved: false },
    { name: "Amina Al-Mubarak", school: "", viewed: true, approved: true },
    { name: "Khaled Al-Zahrani", school: "", viewed: true, approved: false },
    { name: "Fatima Al-Ali", school: "", viewed: true, approved: true },
    { name: "Adnan Al-Saleh", school: "", viewed: true, approved: false },
    { name: "Rasha Al-Badawi", school: "", viewed: true, approved: true },
    { name: "Sami Al-Hassan", school: "", viewed: true, approved: false },
    { name: "Hala Al-Saadi", school: "", viewed: true, approved: true },
    { name: "Yasmin Al-Qattan", school: "", viewed: true, approved: false },
    { name: "Bader Al-Sheikh", school: "", viewed: true, approved: true },
    { name: "Nadia Al-Khalif", school: "", viewed: true, approved: false },
    { name: "Salim Al-Dahash", school: "", viewed: true, approved: true },
  ],
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
      <div className="py-5 text-base-color">
        <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-center mb-4">
          Attendence
        </h3>

        <ul className="list-none max-h-[400px] overflow-auto px-4">
          {studentList.map((student, index) => (
            <li
              key={index}
              className="flex items-center justify-between border-b border-gray-200 py-2"
            >
              <div className="flex items-center gap-2 text-lg ">
                <span className="font-semibold">{index + 1}.</span>
                <span className="font-semibold">{student.name}</span>
                <EyeOutlined className="text-gray-600" />
              </div>
              <div className="flex items-center gap-3">
                {student.approved ? (
                  <IoCheckmarkCircleOutline className="text-green-600 text-2xl cursor-pointer" />
                ) : (
                  <IoIosCloseCircleOutline className="text-red-600 text-2xl cursor-pointer" />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default AttendenceViewModal;
