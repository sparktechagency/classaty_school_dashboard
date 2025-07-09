/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import { RiSchoolFill } from "react-icons/ri";
import { useCreateGradeSystemMutation } from "../../../redux/features/gradeSystem/gradeSystemApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import ReuseButton from "../../Button/ReuseButton";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
interface AddGradeSystemModalProps {
  isAddModalVisible: boolean;
  handleCancel: () => void;
}

const inputStructure = [
  {
    name: "mark",
    type: "text",
    inputType: "normal",
    label: "Make",
    placeholder: "Enter Make",
    labelClassName: "!font-bold",
    prefix: <RiSchoolFill className="mr-1 text-secondary-color" />,
    rules: [{ required: true, message: "Make is required" }],
  },
  {
    name: "grade",
    type: "text",
    inputType: "normal",
    label: "Grade",
    placeholder: "Enter Grade",
    labelClassName: "!font-bold",
    prefix: <RiSchoolFill className="mr-1 text-secondary-color" />,
    rules: [{ required: true, message: "Grade is required" }],
  },
];

const AddGradeSystemModal: React.FC<AddGradeSystemModalProps> = ({
  isAddModalVisible,
  handleCancel,
}) => {
  const [form] = Form.useForm();
  const [createGradeSystem] = useCreateGradeSystemMutation();

  const handleFinish = async (values: any) => {
    const res = await tryCatchWrapper(
      createGradeSystem,
      { body: values },
      "Adding Grade System..."
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
                Add Grade System
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddGradeSystemModal;
