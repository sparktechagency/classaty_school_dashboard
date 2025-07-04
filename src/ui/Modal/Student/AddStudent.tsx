/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import { RiSchoolFill } from "react-icons/ri";
import { FaDoorClosed, FaPhone } from "react-icons/fa6";
import ReuseButton from "../../Button/ReuseButton";
import ReuseSelect from "../../Form/ReuseSelect";
import { useGetSchoolQuery } from "../../../redux/features/school/schoolApi";
import { useState } from "react";
import { IClass, ISchoolDetails } from "../../../types";
import { useGetClassBySchoolIdQuery } from "../../../redux/features/class/classAPi";
import { IoMaleFemale } from "react-icons/io5";
import { MdOutlineClass } from "react-icons/md";
import { useGetSectionByClassIdQuery } from "../../../redux/features/section/sectionApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useAddStudentMutation } from "../../../redux/features/student/studentAPi";
interface AddStudentProps {
  isAddModalVisible: boolean;
  handleCancel: () => void;
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
    label: "Father Contact No ",
    placeholder: "Enter Father Contact No",
    labelClassName: "!font-bold",
    prefix: <FaPhone className="mr-1 text-secondary-color" />,
    rules: [{ required: true }],
  },
  {
    name: "motherPhoneNumber",
    type: "text",
    inputType: "normal",
    label: "Mother Contact No ",
    placeholder: "Enter Mother Contact No",
    labelClassName: "!font-bold",
    prefix: <FaPhone className="mr-1 text-secondary-color" />,
    rules: [{ required: true }],
  },
];

const AddStudent: React.FC<AddStudentProps> = ({
  isAddModalVisible,
  handleCancel,
}) => {
  const [form] = Form.useForm();
  const [schoolId, setSchoolId] = useState<string | undefined>(undefined);
  const [classId, setClassId] = useState<string | undefined>(undefined);

  const [addStudent] = useAddStudentMutation();

  const { data, isFetching } = useGetSchoolQuery(
    {
      page: 1,
      limit: 999999,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !isAddModalVisible,
    }
  );
  const { data: classData, isFetching: isClassFetching } =
    useGetClassBySchoolIdQuery(
      {
        page: 1,
        limit: 999999,
        schoolId: schoolId,
      },
      {
        refetchOnMountOrArgChange: true,
        skip: !isAddModalVisible || !schoolId,
      }
    );
  const { data: sectionData, isFetching: isSectionFetching } =
    useGetSectionByClassIdQuery(
      {
        page: 1,
        limit: 999999,
        classId: classId,
      },
      {
        refetchOnMountOrArgChange: true,
        skip: !isAddModalVisible || !schoolId || !classId,
      }
    );

  const allSchool: ISchoolDetails[] = data?.data?.result || [];
  const allClass: IClass[] = classData?.data || [];
  const allSection: string[] = sectionData?.data || [];

  const handleValuesChange = (changedValues: any) => {
    if (changedValues?.school) {
      const selectedSchool = changedValues.school;
      setSchoolId(selectedSchool);
      form.setFieldsValue({ class: undefined }); // reset subject field
      form.setFieldsValue({ section: undefined });
    }

    if (changedValues?.class) {
      const selectedClass = changedValues.class;
      setClassId(selectedClass);
      form.setFieldsValue({ section: undefined }); // reset subject field
    }
  };

  const handleFinish = async (values: any) => {
    const selectedSchool = allSchool.find(
      (school) => school?.school?._id === values.school
    );

    const selectedClass = allClass.find((cls) => cls?._id === values.class);

    const payload = {
      schoolId: schoolId,
      classId: classId,
      section: values.section,
      name: values.studentName,
      phoneNumber: values.phoneNumber,
      fatherPhoneNumber: values.fatherPhoneNumber,
      motherPhoneNumber: values.motherPhoneNumber,
      schoolName: selectedSchool?.school?.schoolName,
      className: selectedClass?.className,
    };

    const res = await tryCatchWrapper(
      addStudent,
      { body: payload },
      "Adding Student..."
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
            Add Student
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
                showSearch={true}
                filterOption={(input, option) =>
                  (option?.children ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
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
                rules={[{ required: true, message: "School is required" }]}
                options={allClass?.map((cls) => ({
                  value: cls?._id,
                  label: cls?.className,
                }))}
                disabled={!schoolId}
              />
              <ReuseSelect
                showSearch={true}
                filterOption={(input, option) =>
                  (option?.children ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                optionFilterProp="children"
                prefix={<FaDoorClosed className="mr-1 text-secondary-color" />}
                name="section"
                loading={isSectionFetching}
                Typolevel={5}
                label="Section"
                labelClassName="!font-bold"
                rules={[{ required: true, message: "School is required" }]}
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
                Add Student
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddStudent;
