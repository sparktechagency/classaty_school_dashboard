/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import { useState } from "react";
import { FaDoorClosed, FaPhone } from "react-icons/fa6";
import { IoMaleFemale } from "react-icons/io5";
import { MdOutlineClass } from "react-icons/md";
import { RiSchoolFill } from "react-icons/ri";
import { useGetClassQuery } from "../../../redux/features/class/classAPi";
import { useGetSectionByClassIdQuery } from "../../../redux/features/section/sectionApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import ReuseButton from "../../Button/ReuseButton";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseSelect from "../../Form/ReuseSelect";
import { useEditStudentInfoMutation } from "../../../redux/features/student/studentAPi";
interface EditSchoolAdminStudentProps {
  isEditModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any;
}

const inputStructure = [
  {
    name: "name",
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
    type: "number",
    inputType: "number",
    label: "Student Contact No ( Optional )",
    placeholder: "Enter Student Contact No",
    labelClassName: "!font-bold",
    prefix: <FaPhone className="mr-1 text-secondary-color" />,
  },
  {
    name: "fatherPhoneNumber",
    type: "number",
    inputType: "number",
    label: "Father Contact No ",
    placeholder: "Enter Father Contact No",
    labelClassName: "!font-bold",
    prefix: <FaPhone className="mr-1 text-secondary-color" />,
  },
  {
    name: "motherPhoneNumber",
    type: "number",
    inputType: "number",
    label: "Mother Contact No ",
    placeholder: "Enter Mother Contact No",
    labelClassName: "!font-bold",
    prefix: <FaPhone className="mr-1 text-secondary-color" />,
  },
];

const EditSchoolAdminStudent: React.FC<EditSchoolAdminStudentProps> = ({
  isEditModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [form] = Form.useForm();
  const [classId, setClassId] = useState<string>("");
  const [editStudent] = useEditStudentInfoMutation();

  const { data: classData, isFetching: isClassFetching } = useGetClassQuery(
    {},
    {
      skip: !isEditModalVisible,
    }
  );
  const allClass = classData?.data;

  const { data: section, isFetching: isSectionFetching } =
    useGetSectionByClassIdQuery(
      {
        classId: classId,
        page: 1,
        limit: 1000,
      },
      {
        skip: !classId || !isEditModalVisible,
      }
    );

  const handleValuesChange = (changedValues: any) => {
    if (changedValues?.classId) {
      const selectedClass = changedValues.classId;
      console.log(selectedClass, "selectedClass");
      setClassId(selectedClass);
    }
  };

  const handleFinish = async (values: any) => {
    const selectedClass = allClass.find(
      (cls: any) => cls?._id === values.classId
    );

    const payload = {
      classId: values.classId,
      section: values.section,
      name: values.name,
      phoneNumber: values.phoneNumber,
      fatherPhoneNumber: values.fatherPhoneNumber,
      motherPhoneNumber: values.motherPhoneNumber,
      className: selectedClass?.className,
    };

    const res = await tryCatchWrapper(
      editStudent,
      { body: payload, params: { studentId: currentRecord?._id } },
      "Adding Student..."
    );

    if (res?.statusCode === 200) {
      form.resetFields();
      handleCancel();
    }
  };

  console.log(currentRecord, "currentRecord");

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
            Edit Student
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
                prefix={
                  <MdOutlineClass className="mr-1 text-secondary-color" />
                }
                name="classId"
                loading={isClassFetching}
                Typolevel={5}
                label="Class"
                placeholder="Select Class"
                labelClassName="!font-bold"
                options={allClass?.map((cls: any) => ({
                  value: cls?._id,
                  label: cls?.className,
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
                prefix={<FaDoorClosed className="mr-1 text-secondary-color" />}
                name="section"
                loading={isSectionFetching}
                Typolevel={5}
                label="Section"
                labelClassName="!font-bold"
                options={section?.data?.map((sec: string) => ({
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

export default EditSchoolAdminStudent;
