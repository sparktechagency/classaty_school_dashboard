/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";
import { MdMessage } from "react-icons/md";

interface SendNotificationProps {
  isSendModalVisible: boolean;
  handleCancel: () => void;
}

const inputStructure = [
  {
    name: "message",
    type: "text",
    inputType: "normal",
    label: "Notification Message",
    placeholder: "Enter Notification Message",
    labelClassName: "!font-bold",
    prefix: <MdMessage className="mr-1 text-secondary-color" />,
    rules: [{ required: true, message: "Notification Message is required" }],
  },
];

const SendNotification: React.FC<SendNotificationProps> = ({
  isSendModalVisible,
  handleCancel,
}) => {
  const [form] = Form.useForm();
  const handleFinish = (values: any) => {
    console.log(values);
    handleCancel();
  };
  return (
    <Modal
      open={isSendModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <div className="py-5">
        <div className="text-base-color">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary-color text-center">
            Send Notification
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
                Send Notification
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SendNotification;
