/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import { RiSchoolFill } from "react-icons/ri";
import { FaDoorClosed, FaPhone } from "react-icons/fa6";
import ReuseButton from "../../Button/ReuseButton";
import ReuseSelect from "../../Form/ReuseSelect";
import { useGetSchoolQuery } from "../../../redux/features/school/schoolApi";
import { useEffect, useState } from "react";
import { IClass, ISchoolDetails } from "../../../types";
import { useGetClassBySchoolIdQuery } from "../../../redux/features/class/classAPi";
import { IoMaleFemale } from "react-icons/io5";
import { MdOutlineClass } from "react-icons/md";
import { useGetSectionByClassIdQuery } from "../../../redux/features/section/sectionApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useEditStudentInfoMutation } from "../../../redux/features/student/studentAPi";

interface EditStudentProps {
  isEditModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any;
}

const inputStructure = [
  {
    name: "studentName",
    type: "text",
    inputType: "normal",
    label: "Student Name",
    placeholder: "Enter Student Name",
    labelClassName: "!font-bold",
    prefix: <RiSchoolFill className="mr-1 text-secondary-color" />,
    rules: [{ required: true, message: "Student Name is required" }],
  },
  {
    name: "phoneNumber",
    type: "text",
    inputType: "normal",
    label: "Student Contact No (Optional)",
    placeholder: "Enter Student Contact No",
    labelClassName: "!font-bold",
    prefix: <FaPhone className="mr-1 text-secondary-color" />,
    rules: [{ required: false }],
  },
  {
    name: "fatherPhoneNumber",
    type: "text",
    inputType: "normal",
    label: "Father Contact No (Optional)",
    placeholder: "Enter Father Contact No",
    labelClassName: "!font-bold",
    prefix: <FaPhone className="mr-1 text-secondary-color" />,
    rules: [{ required: false }],
  },
  {
    name: "motherPhoneNumber",
    type: "text",
    inputType: "normal",
    label: "Mother Contact No (Optional)",
    placeholder: "Enter Mother Contact No",
    labelClassName: "!font-bold",
    prefix: <FaPhone className="mr-1 text-secondary-color" />,
    rules: [{ required: false }],
  },
];

const EditStudent: React.FC<EditStudentProps> = ({
  isEditModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [form] = Form.useForm();
  const [schoolId, setSchoolId] = useState<string | undefined>(undefined);
  const [classId, setClassId] = useState<string | undefined>(undefined);

  const [editStudent] = useEditStudentInfoMutation();

  const { data, isFetching } = useGetSchoolQuery(
    { page: 1, limit: 999999 },
    {
      refetchOnMountOrArgChange: true,
      skip: !isEditModalVisible,
    }
  );
  const { data: classData, isFetching: isClassFetching } =
    useGetClassBySchoolIdQuery(
      { page: 1, limit: 999999, schoolId: schoolId },
      {
        refetchOnMountOrArgChange: true,
        skip: !isEditModalVisible || !schoolId,
      }
    );
  const { data: sectionData, isFetching: isSectionFetching } =
    useGetSectionByClassIdQuery(
      { page: 1, limit: 999999, classId: classId },
      {
        refetchOnMountOrArgChange: true,
        skip: !isEditModalVisible || !schoolId || !classId,
      }
    );

  const allSchool: ISchoolDetails[] = data?.data?.result || [];
  const allClass: IClass[] = classData?.data || [];
  const allSection: string[] = sectionData?.data || [];

  // 🟢 Pre-fill form values when modal opens
  useEffect(() => {
    if (currentRecord && isEditModalVisible) {
      setSchoolId(currentRecord?.student?.schoolId);
      setClassId(currentRecord?.student?.classId);

      form.setFieldsValue({
        studentName: currentRecord?.name,
        phoneNumber: currentRecord?.phoneNumber,
        fatherPhoneNumber: currentRecord?.student?.fatherPhoneNumber,
        motherPhoneNumber: currentRecord?.student?.motherPhoneNumber,
        gender: currentRecord?.student?.gender, // only if exists
        school: currentRecord?.student?.schoolId,
        class: currentRecord?.student?.classId,
        section: currentRecord?.student?.section,
      });
    }
  }, [currentRecord, isEditModalVisible, form]);

  const handleValuesChange = (changedValues: any) => {
    if (changedValues?.school) {
      const selectedSchool = changedValues.school;
      setSchoolId(selectedSchool);
      form.setFieldsValue({ class: undefined, section: undefined });
    }
    if (changedValues?.class) {
      const selectedClass = changedValues.class;
      setClassId(selectedClass);
      form.setFieldsValue({ section: undefined });
    }
  };

  const handleFinish = async (values: any) => {
    const selectedSchool = allSchool.find(
      (school) => school?.school?._id === values.school
    );
    const selectedClass = allClass.find((cls) => cls?._id === values.class);

    const payload = {
      studentId: currentRecord?.student?._id, // ✅ include studentId for editing
      schoolId: schoolId,
      classId: classId,
      section: values.section,
      name: values.studentName,
      phoneNumber: values.phoneNumber,
      gender: values.gender,
      fatherPhoneNumber: values.fatherPhoneNumber,
      motherPhoneNumber: values.motherPhoneNumber,
      schoolName: selectedSchool?.school?.schoolName,
      className: selectedClass?.className,
    };

    const res = await tryCatchWrapper(
      editStudent,
      { body: payload, params: { studentId: currentRecord?.student?._id } },
      "Updating Student..."
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
            Update Student
          </h3>

          <div className="mt-5">
            <ReusableForm
              form={form}
              handleFinish={handleFinish}
              onValuesChange={handleValuesChange}
            >
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
                name="gender"
                Typolevel={5}
                label="Gender"
                placeholder="Select Gender"
                labelClassName="!font-bold"
                prefix={<IoMaleFemale className="mr-1 text-secondary-color" />}
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                ]}
              />

              <ReuseSelect
                showSearch={true}
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
                showSearch={true}
                optionFilterProp="children"
                prefix={
                  <MdOutlineClass className="mr-1 text-secondary-color" />
                }
                name="class"
                loading={isClassFetching}
                Typolevel={5}
                label="Class"
                placeholder="Select Class"
                labelClassName="!font-bold"
                rules={[{ required: true, message: "Class is required" }]}
                options={allClass?.map((cls) => ({
                  value: cls?._id,
                  label: cls?.className,
                }))}
                disabled={!schoolId}
              />

              <ReuseSelect
                showSearch={true}
                optionFilterProp="children"
                prefix={<FaDoorClosed className="mr-1 text-secondary-color" />}
                name="section"
                loading={isSectionFetching}
                Typolevel={5}
                label="Section"
                labelClassName="!font-bold"
                rules={[{ required: true, message: "Section is required" }]}
                options={allSection?.map((sec) => ({
                  value: sec,
                  label: sec,
                }))}
                disabled={!classId}
              />

              <ReuseButton
                htmlType="submit"
                variant="secondary"
                className="w-full mt-4"
              >
                Update Student
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditStudent;
