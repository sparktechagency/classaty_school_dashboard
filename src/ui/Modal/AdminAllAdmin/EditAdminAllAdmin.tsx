/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
// import { RiShieldUserFill, RiSchoolFill } from "react-icons/ri";
// import { FaPhone } from "react-icons/fa6";
import ReuseButton from "../../Button/ReuseButton";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useUpdateAdminMutation } from "../../../redux/features/allAdmin/allAdminApi";
import { useEffect } from "react";

interface EditAdminModalProps {
  isEditModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any;
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

const EditAdminModal: React.FC<EditAdminModalProps> = ({
  isEditModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [editAdmin] = useUpdateAdminMutation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(currentRecord);
  }, [currentRecord, form]);

  const handleFinish = async (values: any) => {
    const res = await tryCatchWrapper(
      editAdmin,
      {
        body: { ...values, userId: currentRecord?._id },
      },
      "Updating Admin..."
    );

    if (res?.statusCode === 200) {
      form.resetFields();
      handleCancel();
    }
  };
  return (
    <Modal
      open={isEditModalVisible}
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
            <ReusableForm
              defaultValues={currentRecord}
              form={form}
              handleFinish={handleFinish}
            >
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
                Update Admin
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditAdminModal;
