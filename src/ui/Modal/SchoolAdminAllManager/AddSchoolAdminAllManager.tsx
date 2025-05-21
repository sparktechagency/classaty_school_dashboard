/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
// import { RiShieldUserFill, RiSchoolFill } from "react-icons/ri";
// import { FaPhone } from "react-icons/fa6";
import ReuseButton from "../../Button/ReuseButton";
import ReuseSelect from "../../Form/ReuseSelect";

interface AddSchoolAdminAllManagerProps {
  isAddModalVisible: boolean;
  handleCancel: () => void;
}

const inputStructure = [
  {
    name: "fullName",
    type: "text",
    inputType: "normal",
    label: "Manager Name",
    placeholder: "Enter Full Name",
    labelClassName: "!font-bold",
    // prefix: <RiSchoolFill className="mr-1 text-secondary-color" />,
    rules: [{ required: true, message: "Full Name is required" }],
  },
  {
    name: "phoneNumber",
    type: "text",
    inputType: "normal",
    label: "Phone Number",
    placeholder: "Enter Phone Number",
    labelClassName: "!font-bold",
    // prefix: <RiShieldUserFill className="mr-1 text-secondary-color" />,
    rules: [{ required: true, message: "Admin Phone Number is required" }],
  },
];

const AddSchoolAdminAllManager: React.FC<AddSchoolAdminAllManagerProps> = ({
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
            Add Manager
          </h3>

          <div className="mt-5">
            <ReusableForm form={form} handleFinish={handleFinish}>
              {inputStructure.map((input, index) => (
                <ReuseInput
                  key={index}
                  name={input.name}
                  Typolevel={5}
                  //   prefix={input.prefix}
                  inputType={input.inputType}
                  type={input.type}
                  label={input.label}
                  placeholder={input.placeholder}
                  labelClassName={input.labelClassName}
                  rules={input.rules}
                />
              ))}
              <ReuseSelect
                Typolevel={5}
                name="role"
                label="Manager Role"
                placeholder="Select Role"
                options={[
                  { label: "Manager", value: "manager" },
                  { label: "Admin", value: "admin" },
                ]}
                rules={[{ required: true, message: "Role is required" }]}
              />
              <ReuseButton
                htmlType="submit"
                variant="secondary"
                className="w-full mt-4"
              >
                Add Manager
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddSchoolAdminAllManager;
