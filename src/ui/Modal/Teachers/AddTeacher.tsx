/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import { RiSchoolFill } from "react-icons/ri";
import { FaPhone } from "react-icons/fa6";
import ReuseButton from "../../Button/ReuseButton";
import { MdSchool } from "react-icons/md";

interface AddTeacherProps {
  isAddModalVisible: boolean;
  handleCancel: () => void;
}

const inputStructure = [
  {
    name: "teacherlName",
    type: "text",
    inputType: "normal",
    label: "Teacher Name",
    placeholder: "Enter Teacher Name",
    labelClassName: "!font-bold",
    prefix: <MdSchool className="mr-1 text-secondary-color" />,
    rules: [{ required: true, message: "Teacher Name is required" }],
  },
  {
    name: "schoolPhoneNumber",
    type: "text",
    inputType: "normal",
    label: "School Phone Number",
    placeholder: "Enter School Phone Number",
    labelClassName: "!font-bold",
    prefix: <RiSchoolFill className="mr-1 text-secondary-color" />,
    rules: [{ required: true, message: "Phone Number is required" }],
  },
  {
    name: "adminPhoneNumber",
    type: "text",
    inputType: "normal",
    label: "Admin Phone Number",
    placeholder: "Enter Admin Phone Number",
    labelClassName: "!font-bold",
    prefix: <FaPhone className="mr-1 text-secondary-color" />,
    rules: [{ required: true, message: "Admin Phone Number is required" }],
  },
];

const AddTeacher: React.FC<AddTeacherProps> = ({
  isAddModalVisible,
  handleCancel,
}) => {
  const [form] = Form.useForm();
  const handleFinish = (values: any) => {
    console.log(values);
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
            Add Teacher
          </h3>

          <div className="mt-5">
            <ReusableForm form={form} handleFinish={handleFinish}>
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
              <ReuseButton
                htmlType="submit"
                variant="secondary"
                className="w-full mt-4"
              >
                Add Teacher
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddTeacher;
