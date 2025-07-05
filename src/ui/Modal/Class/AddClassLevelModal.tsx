/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";
import { GiClassicalKnowledge } from "react-icons/gi";
import { useAddLevelMutation } from "../../../redux/features/level/levelApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

interface AddClassLevelModalProps {
  isAddModalVisible: boolean;
  handleCancel: () => void;
}

const inputStructure = [
  {
    name: "levelName",
    type: "text",
    inputType: "normal",
    label: "Level Name",
    placeholder: "Enter Level Name",
    labelClassName: "!font-bold",
    prefix: <GiClassicalKnowledge className="mr-1 text-secondary-color" />,
    rules: [{ required: true, message: "Level Name is required" }],
  },
];

const AddClassLevelModal: React.FC<AddClassLevelModalProps> = ({
  isAddModalVisible,
  handleCancel,
}) => {
  const [addClassLevel] = useAddLevelMutation();
  const [form] = Form.useForm();
  const handleFinish = async (values: any) => {
    const res = await tryCatchWrapper(
      addClassLevel,
      { body: values },
      "Adding Level..."
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
            Add Level
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
                Add Level
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddClassLevelModal;
