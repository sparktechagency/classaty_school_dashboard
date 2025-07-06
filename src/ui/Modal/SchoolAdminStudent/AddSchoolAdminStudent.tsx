/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import { FaDoorClosed, FaPhone } from "react-icons/fa6";
import { RiSchoolFill } from "react-icons/ri";
import ReuseButton from "../../Button/ReuseButton";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseSelect from "../../Form/ReuseSelect";
import { useGetSectionByClassIdQuery } from "../../../redux/features/section/sectionApi";
import { useGetClassQuery } from "../../../redux/features/class/classAPi";
import { useState } from "react";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useAddStudentMutation } from "../../../redux/features/student/studentAPi";
import { IoMaleFemale } from "react-icons/io5";
import { MdOutlineClass } from "react-icons/md";

interface AddSchoolAdminStudentProps {
  isAddModalVisible: boolean;
  handleCancel: () => void;
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
    rules: [{ required: true }],
  },
  {
    name: "motherPhoneNumber",
    type: "number",
    inputType: "number",
    label: "Mother Contact No ",
    placeholder: "Enter Mother Contact No",
    labelClassName: "!font-bold",
    prefix: <FaPhone className="mr-1 text-secondary-color" />,
    rules: [{ required: true }],
  },
];

const AddSchoolAdminStudent: React.FC<AddSchoolAdminStudentProps> = ({
  isAddModalVisible,
  handleCancel,
}) => {
  const [form] = Form.useForm();

  const [classId, setClassId] = useState<string>("");
  const [addStudent] = useAddStudentMutation();

  const { data: classData, isFetching: isClassFetching } = useGetClassQuery(
    {},
    {
      skip: !isAddModalVisible,
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
        skip: !classId || !isAddModalVisible,
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
      classId: classId,
      section: values.section,
      name: values.name,
      phoneNumber: values.phoneNumber,
      fatherPhoneNumber: values.fatherPhoneNumber,
      motherPhoneNumber: values.motherPhoneNumber,
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
                prefix={
                  <MdOutlineClass className="mr-1 text-secondary-color" />
                }
                name="classId"
                loading={isClassFetching}
                Typolevel={5}
                label="Class"
                placeholder="Select Class"
                labelClassName="!font-bold"
                rules={[{ required: true, message: "School is required" }]}
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
                rules={[{ required: true, message: "School is required" }]}
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

export default AddSchoolAdminStudent;
