/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import { RiSchoolFill } from "react-icons/ri";
import { FaPhone } from "react-icons/fa6";
import ReuseButton from "../../Button/ReuseButton";
import { MdSchool } from "react-icons/md";
import ReuseSelect from "../../Form/ReuseSelect";
import { useGetSchoolQuery } from "../../../redux/features/school/schoolApi";
import { ISchoolDetails, ISubject } from "../../../types";
import { useGetSubjectBySchoolIdQuery } from "../../../redux/features/subject/subjectApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useUpdateTeacherMutation } from "../../../redux/features/teacher/teacherApi";

interface EditTeacherProps {
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
    inputType: "number",
    label: "Phone Number",
    placeholder: "Enter Phone Number",
    labelClassName: "!font-bold",
    prefix: <FaPhone className="mr-1 text-secondary-color" />,
    rules: [{ required: true, message: "Phone Number is required" }],
  },
];

const EditTeacher: React.FC<EditTeacherProps> = ({
  isEditModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [form] = Form.useForm();
  const [schoolId, setSchoolId] = useState<string | undefined>(undefined);

  const [updateTeacher] = useUpdateTeacherMutation();

  const { data, isFetching } = useGetSchoolQuery(
    { page: 1, limit: 999999 },
    {
      refetchOnMountOrArgChange: true,
      skip: !isEditModalVisible,
    }
  );

  const { data: subjectData, isFetching: isSubjectFetching } =
    useGetSubjectBySchoolIdQuery(
      { page: 1, limit: 999999, schoolId: schoolId || "" },
      {
        skip: !isEditModalVisible || !schoolId,
        refetchOnMountOrArgChange: true,
      }
    );

  const allSchool: ISchoolDetails[] = React.useMemo(
    () => data?.data?.result || [],
    [data]
  );
  const allSubject: ISubject[] = React.useMemo(
    () => subjectData?.data?.result || [],
    [subjectData]
  );

  // 🔹 Prefill form when modal opens with currentRecord
  useEffect(() => {
    if (isEditModalVisible && currentRecord) {
      setSchoolId(currentRecord?.schoolId);
      form.setFieldsValue({
        name: currentRecord?.name,
        phoneNumber: currentRecord?.phoneNumber,
        school: currentRecord?.schoolId,
        subject: currentRecord?.subjectId,
      });
    }
  }, [isEditModalVisible, currentRecord, form]);

  const handleFinish = async (values: any) => {
    const selectedSchool = allSchool.find(
      (school) => school.school?._id === values.school
    );

    const selectedSubject = allSubject.find(
      (subject) => subject._id === values.subject
    );

    const finalPayload = {
      teacherId: currentRecord?._id, // 🔹 include teacher ID for update
      name: values.name,
      phoneNumber: values.phoneNumber,
      schoolId: selectedSchool?.school?._id || "",
      schoolName: selectedSchool?.school?.schoolName || "",
      subjectId: selectedSubject?._id || "",
      subjectName: selectedSubject?.subjectName || "",
    };

    const res = await tryCatchWrapper(
      updateTeacher,
      { body: finalPayload, params: currentRecord?.userId },
      "Updating Teacher..."
    );

    if (res?.statusCode === 200) {
      form.resetFields();
      handleCancel();
    }
  };

  const handleValuesChange = (changedValues: any) => {
    if (changedValues?.school) {
      const selectedSchool = changedValues.school;
      setSchoolId(selectedSchool);
      form.setFieldsValue({ subject: undefined }); // reset subject field
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
            Update Teacher
          </h3>

          <div className="mt-5">
            <ReusableForm
              form={form}
              handleFinish={handleFinish}
              onValuesChange={handleValuesChange}
            >
              {inputStructure?.map((input, index) => (
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
                showSearch={true}
                filterOption={(input, option) =>
                  (option?.children ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                optionFilterProp="children"
                prefix={<RiSchoolFill className="mr-1 text-secondary-color" />}
                name="school"
                loading={isFetching}
                Typolevel={5}
                label="School"
                placeholder="Select School"
                labelClassName="!font-bold"
                rules={[{ required: true, message: "School is required" }]}
                options={allSchool?.map((school) => ({
                  value: school?.school?._id,
                  label: school.school?.schoolName,
                }))}
              />
              <ReuseSelect
                prefix={<RiSchoolFill className="mr-1 text-secondary-color" />}
                showSearch={true}
                filterOption={(input, option) =>
                  (option?.children ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                optionFilterProp="children"
                name="subject"
                loading={isSubjectFetching}
                Typolevel={5}
                disabled={!schoolId}
                label="Subject"
                placeholder="Select Subject"
                labelClassName="!font-bold"
                rules={[{ required: true, message: "Subject is required" }]}
                options={allSubject.map((subject) => ({
                  value: subject._id,
                  label: subject.subjectName || subject._id,
                }))}
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

export default EditTeacher;
