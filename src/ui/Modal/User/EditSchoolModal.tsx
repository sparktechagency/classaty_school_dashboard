/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import { RiShieldUserFill, RiSchoolFill } from "react-icons/ri";
import { FaPhone } from "react-icons/fa6";
import ReuseButton from "../../Button/ReuseButton";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useUpdateSchoolMutation } from "../../../redux/features/school/schoolApi";
import { ISchoolDetails } from "../../../types";
import { useEffect } from "react";

interface EditSchoolModalProps {
  isEditModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: ISchoolDetails | null;
}

const inputStructure = [
  {
    name: "schoolName",
    type: "text",
    inputType: "normal",
    label: "School Name",
    placeholder: "Enter School Name",
    labelClassName: "!font-bold",
    prefix: <RiSchoolFill className="mr-1 text-secondary-color" />,
    rules: [{ required: true, message: "School Name is required" }],
  },
  {
    name: "schoolAddress",
    type: "text",
    inputType: "normal",
    label: "School Address",
    placeholder: "Enter School Address",
    labelClassName: "!font-bold",
    prefix: <RiSchoolFill className="mr-1 text-secondary-color" />,
    rules: [{ required: true, message: "School Address is required" }],
  },
  {
    name: "phoneNumber",
    type: "text",
    inputType: "normal",
    label: "Phone Number",
    placeholder: "Enter Phone Number",
    labelClassName: "!font-bold",
    prefix: <FaPhone className="mr-1 text-secondary-color" />,
    rules: [{ required: true, message: "Phone Number is required" }],
  },
  {
    name: "adminName",
    type: "text",
    inputType: "normal",
    label: "Admin Name",
    placeholder: "Enter Admin Name",
    labelClassName: "!font-bold",
    prefix: <RiShieldUserFill className="mr-1 text-secondary-color" />,
    rules: [{ required: true, message: "Admin Phone Number is required" }],
  },
];

const EditSchoolModal: React.FC<EditSchoolModalProps> = ({
  isEditModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [form] = Form.useForm();
  const [updateSchool] = useUpdateSchoolMutation();

  useEffect(() => {
    if (currentRecord) {
      form.setFieldsValue({
        schoolName: currentRecord?.school?.schoolName,
        schoolAddress: currentRecord?.school?.schoolAddress,
        phoneNumber: currentRecord?.phoneNumber,
        adminName: currentRecord?.school?.adminName,
      });
    }
  }, [currentRecord, form]);

  const handleSubmit = async (values: any) => {
    const res = await tryCatchWrapper(
      updateSchool,
      {
        body: {
          ...values,
        },
        params: currentRecord?.school?._id,
      },
      "Updating School..."
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
            Update School
          </h3>

          <div className="mt-5">
            <ReusableForm form={form} handleFinish={handleSubmit}>
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
                Update School
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditSchoolModal;
