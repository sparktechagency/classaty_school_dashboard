/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker, Form, Modal, Typography } from "antd";
import dayjs from "dayjs";
import { RiSchoolFill } from "react-icons/ri";
import ReuseButton from "../../Button/ReuseButton";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import ReuseSelect from "../../Form/ReuseSelect";
import { useCreateAnnouncementMutation } from "../../../redux/features/announcement/announcementApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
interface AddAnouncementModalProps {
  isAddModalVisible: boolean;
  handleCancel: () => void;
}

const inputStructure = [
  {
    name: "title",
    type: "text",
    inputType: "normal",
    label: "Announcement Title",
    placeholder: "Enter Announcement Title",
    labelClassName: "!font-bold",
    prefix: <RiSchoolFill className="mr-1 text-secondary-color" />,
    rules: [{ required: true, message: "Announcement Title is required" }],
  },
];

const AddAnouncementModal: React.FC<AddAnouncementModalProps> = ({
  isAddModalVisible,
  handleCancel,
}) => {
  const [form] = Form.useForm();

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [createAnnouncement] = useCreateAnnouncementMutation();

  const handleFinish = async (values: any) => {
    const finalPayload = {
      ...values,
      description: content,
    };

    const res = await tryCatchWrapper(
      createAnnouncement,
      { body: finalPayload },
      "Adding Announcement..."
    );

    if (res?.statusCode === 201) {
      form.resetFields();
      handleCancel();
    }
  };

  return (
    <Modal
      open={isAddModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <div className="py-5">
        <div className="text-base-color">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary-color text-center">
            Add Announcement
          </h3>

          <div className="mt-5">
            <ReusableForm form={form} handleFinish={handleFinish}>
              <Typography.Title level={5} className="mb-1">
                Select Date
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

              {inputStructure.map((input, index) => (
                <ReuseInput
                  key={index}
                  name={input.name}
                  Typolevel={5}
                  prefix={input.prefix}
                  inputType={input.inputType}
                  type={input.type}
                  label={input.label}
                  placeholder={input.placeholder}
                  labelClassName={input.labelClassName}
                  rules={input.rules}
                />
              ))}
              <ReuseSelect
                label="Announcement To "
                name="announcementTo"
                labelClassName="!font-bold"
                options={[
                  { value: "parents", label: "Parents" },
                  { value: "teacher", label: "Teachers" },
                  { value: "student", label: "Students" },
                ]}
              />

              <Typography.Title level={5} className="mb-1">
                Description
              </Typography.Title>
              <JoditEditor
                ref={editor}
                value={content}
                config={{ height: 350, theme: "light", readonly: false }}
                onBlur={(newContent) => setContent(newContent)}
              />

              <ReuseButton
                htmlType="submit"
                variant="secondary"
                className="w-full mt-4"
              >
                Add Student
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddAnouncementModal;
