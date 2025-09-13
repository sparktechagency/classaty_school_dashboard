/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import { FaPhone } from "react-icons/fa6";
import { MdSchool } from "react-icons/md";
import { useGetSubjectBySchoolIdQuery } from "../../../redux/features/subject/subjectApi";
import { useUpdateTeacherMutation } from "../../../redux/features/teacher/teacherApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import ReuseButton from "../../Button/ReuseButton";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseSelect from "../../Form/ReuseSelect";
import React from "react";

interface EditSchollAdminTeacherProps {
  isEditModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any;
}

const inputStructure = [
  {
    name: "name",
    type: "text",
    inputType: "normal",
    label: "Teacher Name",
    placeholder: "Enter Teacher Name",
    labelClassName: "!font-bold",
    prefix: <MdSchool className="mr-1 text-secondary-color" />,
    rules: [{ required: true, message: "Teacher Name is required" }],
  },
  {
    name: "phoneNumber",
    type: "number",
    inputType: "normal",
    label: "Teacher Phone Number",
    placeholder: "Enter Teacher Phone Number",
    labelClassName: "!font-bold",
    prefix: <FaPhone className="mr-1 text-secondary-color" />,
    rules: [{ required: true, message: "Teacher Phone Number is required" }],
  },
];

const EditSchollAdminTeacher: React.FC<EditSchollAdminTeacherProps> = ({
  isEditModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [form] = Form.useForm();

  // Fetch subjects for current school
  const { data: subjects, isFetching: isSubjectFetching } =
    useGetSubjectBySchoolIdQuery(
      {
        page: 1,
        limit: 10000,
        schoolId: currentRecord?.schoolId || "",
      },
      { skip: !isEditModalVisible || !currentRecord?.schoolId }
    );

  const [updateTeacher] = useUpdateTeacherMutation();

  // Prefill form when modal opens
  React.useEffect(() => {
    if (isEditModalVisible && currentRecord) {
      form.setFieldsValue({
        name: currentRecord.name,
        phoneNumber: currentRecord.phoneNumber,
        subjectId: currentRecord.subjectId,
      });
    }
  }, [isEditModalVisible, currentRecord, form]);

  const handleFinish = async (values: any) => {
    const selectedSubjectName = subjects?.data?.result?.find(
      (subject: any) => subject._id === values.subjectId
    )?.subjectName;

    const finalPayload = {
      ...values,
      subjectName: selectedSubjectName,
      teacherId: currentRecord?._id,
      schoolId: currentRecord?.schoolId,
      schoolName: currentRecord?.schoolName,
    };

    const res = await tryCatchWrapper(
      updateTeacher,
      { body: finalPayload, params: currentRecord?.userId },
      "Updating Teacher..."
    );

    if (res?.statusCode === 200) {
      handleCancel();
      form.resetFields();
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
            Edit Teacher
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

              <ReuseSelect
                Typolevel={5}
                label="Select Subject"
                name="subjectId"
                labelClassName="!font-bold"
                loading={isSubjectFetching}
                options={subjects?.data?.result?.map((subject: any) => ({
                  label: subject.subjectName,
                  value: subject._id,
                }))}
                rules={[{ required: true, message: "Subject is required" }]}
              />

              <ReuseButton
                htmlType="submit"
                variant="secondary"
                className="w-full mt-4"
              >
                Update Teacher
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditSchollAdminTeacher;
