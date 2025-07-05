/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import { RiSchoolFill } from "react-icons/ri";
import ReuseButton from "../../Button/ReuseButton";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useUpdateSubjectMutation } from "../../../redux/features/subject/subjectApi";
import { ISubject } from "../../../types";
import { useEffect } from "react";

interface EditSubjectProps {
  isUpdateModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: ISubject | null;
}

const inputStructure = [
  {
    name: "subjectName",
    type: "text",
    inputType: "normal",
    label: "Subject Name",
    placeholder: "Enter Subject Name",
    labelClassName: "!font-bold",
    prefix: <RiSchoolFill className="mr-1 text-secondary-color" />,
    rules: [{ required: true, message: "Subject Name is required" }],
  },
];

const EditSubject: React.FC<EditSubjectProps> = ({
  isUpdateModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [updateSubject] = useUpdateSubjectMutation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentRecord) {
      form.setFieldsValue({
        subjectName: currentRecord?.subjectName,
      });
    }
  }, [currentRecord, form]);

  const handleFinish = async (values: any) => {
    const res = await tryCatchWrapper(
      updateSubject,
      { body: { ...values, subjectId: currentRecord?._id } },
      "Updating School..."
    );

    if (res?.statusCode === 200) {
      form.resetFields();
      handleCancel();
    }
  };
  return (
    <Modal
      open={isUpdateModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <div className="py-5">
        <div className="text-base-color">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary-color text-center">
            Update Subject
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
                Update Subject
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditSubject;
