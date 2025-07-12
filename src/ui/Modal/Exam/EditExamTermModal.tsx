/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";
import { GiClassicalKnowledge } from "react-icons/gi";
import { useUpdateTermMutation } from "../../../redux/features/terms/termsApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

interface EditExamTermModalProps {
  isEditModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any;
}

const inputStructure = [
  {
    name: "termsName",
    type: "text",
    inputType: "normal",
    label: "Term Name",
    placeholder: "Enter Term Name",
    labelClassName: "!font-bold",
    prefix: <GiClassicalKnowledge className="mr-1 text-secondary-color" />,
    rules: [{ required: true, message: "Term Name is required" }],
  },
];

const EditExamTermModal: React.FC<EditExamTermModalProps> = ({
  isEditModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [form] = Form.useForm();

  const [updateTerm] = useUpdateTermMutation();

  const handleFinish = async (values: any) => {
    const res = await tryCatchWrapper(
      updateTerm,
      { body: values, params: currentRecord?._id },
      "Updating Term..."
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
            Edit Term
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
                Edit Term
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditExamTermModal;
