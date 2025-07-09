/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
// import { RiShieldUserFill, RiSchoolFill } from "react-icons/ri";
// import { FaPhone } from "react-icons/fa6";
import ReuseButton from "../../Button/ReuseButton";
import { useUpdateManagerMutation } from "../../../redux/features/manager/managerApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

interface EditSchoolAdminAllManagerProps {
  isEditModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any;
}

const inputStructure = [
  {
    name: "name",
    type: "text",
    inputType: "normal",
    label: "Manager Name",
    placeholder: "Enter Full Name",
    labelClassName: "!font-bold",
  },
  {
    name: "phoneNumber",
    type: "text",
    inputType: "normal",
    label: "Phone Number",
    placeholder: "Enter Phone Number",
    labelClassName: "!font-bold",
  },
  {
    name: "managerRole",
    type: "text",
    inputType: "normal",
    label: "Manager Role",
    placeholder: "Manager Role",
    labelClassName: "!font-bold",
  },
];

const EditSchoolAdminAllManager: React.FC<EditSchoolAdminAllManagerProps> = ({
  isEditModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [form] = Form.useForm();

  const [updateManager] = useUpdateManagerMutation();

  const handleFinish = async (values: any) => {
    const res = await tryCatchWrapper(
      updateManager,
      { body: values, params: currentRecord?._id },
      "Updating Manager..."
    );

    if (res?.statusCode === 200) {
      form.resetFields();
      handleCancel();
    }
  };

  console.log(currentRecord, "currentRecord in edit manager");

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
            Edit Manager
          </h3>

          <div className="mt-5">
            <ReusableForm form={form} handleFinish={handleFinish}>
              {inputStructure.map((input, index) => (
                <ReuseInput
                  key={index}
                  name={input.name}
                  Typolevel={5}
                  // prefix={input.prefix}
                  inputType={input.inputType}
                  type={input.type}
                  label={input.label}
                  placeholder={input.placeholder}
                  labelClassName={input.labelClassName}
                />
              ))}

              <ReuseButton
                htmlType="submit"
                variant="secondary"
                className="w-full mt-4"
              >
                Edit Manager
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditSchoolAdminAllManager;
