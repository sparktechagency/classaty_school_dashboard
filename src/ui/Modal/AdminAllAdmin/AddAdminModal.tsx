/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
// import { RiShieldUserFill, RiSchoolFill } from "react-icons/ri";
// import { FaPhone } from "react-icons/fa6";
import ReuseButton from "../../Button/ReuseButton";
import { useAddAdminMutation } from "../../../redux/features/allAdmin/allAdminApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

interface AddAdminModalProps {
  isAddModalVisible: boolean;
  handleCancel: () => void;
}

const inputStructure = [
  {
    name: "name",
    type: "text",
    inputType: "normal",
    label: "Full Name",
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

const AddAdminModal: React.FC<AddAdminModalProps> = ({
  isAddModalVisible,
  handleCancel,
}) => {
  const [addAdmin] = useAddAdminMutation();
  const [form] = Form.useForm();
  const handleFinish = async (values: any) => {
    const res = await tryCatchWrapper(
      addAdmin,
      { body: values },
      "Creating New Admin..."
    );

    if (res?.statusCode === 200) {
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
            Add Admin
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
              <ReuseButton
                htmlType="submit"
                variant="secondary"
                className="w-full mt-4"
              >
                Add Admin
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddAdminModal;
