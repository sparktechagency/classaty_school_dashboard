/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { IAttendence } from "../../../types/AttendenceTable";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useGetAttendanceDetailsQuery } from "../../../redux/features/attendance/attendanceApi";
import Loading from "../../Loading";
import { useState } from "react";
import ParentsMessageShowModal from "../../../pages/SchoolAdmin/ParentsMessageShowModal";

interface AttendenceViewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentRecord: IAttendence | null | any;
}

const AttendenceViewModal: React.FC<AttendenceViewModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [parentsMessage, setParentsMessage] = useState<string>("");

  const { data: attendanceDetails, isFetching } = useGetAttendanceDetailsQuery(
    {
      id: currentRecord?._id,
    },
    {
      skip: !currentRecord,
    }
  );

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
          {isFetching ? (
            <div className="flex justify-center items-center h-full">
              <Loading />
            </div>
          ) : (
            <>
              {attendanceDetails?.data?.[0]?.student?.map(
                (student: any, index: number) => {
                  return (
                    <li
                      key={index}
                      className="flex items-center justify-between border-b border-gray-200 py-2"
                    >
                      <div className="flex items-center gap-2 text-lg ">
                        <span className="font-semibold">{index + 1}.</span>
                        <span className="font-semibold">{student.name}</span>
                        {student?.parentsMessage && (
                          <EyeOutlined
                            onClick={() =>
                              setParentsMessage(student.parentsMessage)
                            }
                            className="text-gray-600"
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        {student.status === "present" ? (
                          <IoCheckmarkCircleOutline className="text-green-600 text-2xl cursor-pointer" />
                        ) : (
                          <IoIosCloseCircleOutline className="text-red-600 text-2xl cursor-pointer" />
                        )}
                      </div>
                    </li>
                  );
                }
              )}
            </>
          )}
        </ul>
        <ParentsMessageShowModal
          isViewModalVisible={parentsMessage !== ""}
          handleCancel={() => setParentsMessage("")}
          parentsMessage={parentsMessage}
        />
      </div>
    </Modal>
  );
};

export default AttendenceViewModal;
