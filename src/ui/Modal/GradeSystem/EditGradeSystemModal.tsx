/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import { RiSchoolFill } from "react-icons/ri";
import { useUpdateGradeSystemMutation } from "../../../redux/features/gradeSystem/gradeSystemApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import ReuseButton from "../../Button/ReuseButton";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
interface EditGradeSystemProps {
  isEditModalVisible: boolean;
  handleCancel: () => void;
  currentRecord?: any;
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
  },
  {
    name: "grade",
    type: "text",
    inputType: "normal",
    label: "Grade",
    placeholder: "Enter Grade",
    labelClassName: "!font-bold",
    prefix: <RiSchoolFill className="mr-1 text-secondary-color" />,
  },
];

const EditGradeSystem: React.FC<EditGradeSystemProps> = ({
  isEditModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [form] = Form.useForm();
  const [updateGradeSystem] = useUpdateGradeSystemMutation();

  const handleFinish = async (values: any) => {
    const res = await tryCatchWrapper(
      updateGradeSystem,
      { body: values, params: currentRecord?._id },
      "Editing Grade System..."
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
            Edit Announcement
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
                />
              ))}

              <ReuseButton
                htmlType="submit"
                variant="secondary"
                className="w-full mt-4"
              >
                Edit Grade System
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditGradeSystem;
