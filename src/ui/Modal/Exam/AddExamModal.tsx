/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker, Form, Modal, TimePicker, Typography } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";
import ReuseSelect from "../../Form/ReuseSelect";
import dayjs from "dayjs";

interface AddExamModalProps {
  isAddExamModalVisible: boolean;
  handleCancel: () => void;
}

const AddExamModal: React.FC<AddExamModalProps> = ({
  isAddExamModalVisible,
  handleCancel,
}) => {
  const [form] = Form.useForm();
  const handleFinish = (values: any) => {
    console.log(values);
  };
  return (
    <Modal
      open={isAddExamModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <div className="py-5">
        <div className="text-base-color">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary-color text-center">
            Add Exam
          </h3>

          <div className="mt-5">
            <ReusableForm form={form} handleFinish={handleFinish}>
              <ReuseSelect
                Typolevel={5}
                label="Subject"
                name="subject"
                placeholder="Select Subject"
                options={[
                  { value: "Subject 1", label: "Subject 1" },
                  { value: "Subject 2", label: "Subject 2" },
                  { value: "Subject 3", label: "Subject 3" },
                ]}
                rules={[{ required: true, message: "Subject is required" }]}
              />
              <ReuseInput
                inputType="textarea"
                rows={4}
                Typolevel={5}
                label="Exam Details"
                name="examDetails"
                placeholder="Enter Exam Details"
                rules={[
                  { required: true, message: "Exam Details is required" },
                ]}
              />
              <ReuseSelect
                Typolevel={5}
                label="Class"
                name="class"
                placeholder="Select Class"
                options={[
                  { value: "Class 1", label: "Class 1" },
                  { value: "Class 2", label: "Class 2" },
                  { value: "Class 3", label: "Class 3" },
                ]}
                rules={[{ required: true, message: "Class is required" }]}
              />

              <Typography.Title level={5} className="mb-1">
                Date
              </Typography.Title>
              <Form.Item name="date" rules={[{ required: true }]}>
                <DatePicker
                  className="w-full !py-2 !px-3 !rounded-lg !text-lg !bg-[#EFEFEF] !border !border-[#EFEFEF] !text-base-color"
                  placeholder="Select Date"
                  size="large"
                  disabledDate={(current) => {
                    // Disable all dates before today
                    return current && current < dayjs().startOf("day");
                  }}
                />
              </Form.Item>

              <Typography.Title level={5} className="mb-1">
                Start Time
              </Typography.Title>
              <Form.Item name="startTime" rules={[{ required: true }]}>
                <TimePicker
                  className="w-full !py-2 !px-3 !rounded-lg !text-lg !bg-[#EFEFEF] !border !border-[#EFEFEF] !text-base-color"
                  placeholder="Select Time"
                  size="large"
                  disabledDate={(current) => {
                    // Disable all dates before today
                    return current && current < dayjs().startOf("day");
                  }}
                />
              </Form.Item>
              <Typography.Title level={5} className="mb-1">
                End Time
              </Typography.Title>

              <Form.Item name="endTime" rules={[{ required: true }]}>
                <TimePicker
                  className="w-full !py-2 !px-3 !rounded-lg !text-lg !bg-[#EFEFEF] !border !border-[#EFEFEF] !text-base-color"
                  placeholder="End Time"
                  size="large"
                  disabledDate={(current) => {
                    // Disable all dates before today
                    return current && current < dayjs().startOf("day");
                  }}
                />
              </Form.Item>

              <ReuseInput
                Typolevel={5}
                label="Class Room"
                name="classRoom"
                placeholder="Enter Class Room"
                rules={[{ required: true, message: "Class Room is required" }]}
              />
              <ReuseInput
                Typolevel={5}
                label="Exam Duration"
                name="examDuration"
                placeholder="Enter Exam Duration"
                rules={[
                  { required: true, message: "Exam Duration is required" },
                ]}
              />
              <ReuseSelect
                Typolevel={5}
                label="Teacher"
                name="teacher"
                placeholder="Select Teacher"
                options={[
                  { value: "Teacher 1", label: "Teacher 1" },
                  { value: "Teacher 2", label: "Teacher 2" },
                  { value: "Teacher 3", label: "Teacher 3" },
                ]}
                rules={[{ required: true, message: "Teacher is required" }]}
              />

              <ReuseInput
                inputType="textarea"
                rows={4}
                Typolevel={5}
                label="Description"
                name="description"
                placeholder="Enter Description"
                rules={[{ required: true, message: "Description is required" }]}
              />

              <ReuseButton
                htmlType="submit"
                variant="secondary"
                className="w-full mt-4"
              >
                Add Exam
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddExamModal;
