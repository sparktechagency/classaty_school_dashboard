/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal, Radio, Space, Typography } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import { RiSchoolFill } from "react-icons/ri";
import { FaPhone } from "react-icons/fa6";
import ReuseButton from "../../Button/ReuseButton";
import ReuseSelect from "../../Form/ReuseSelect";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

interface AddSchoolAdminStudentProps {
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
    name: "studentPhoneNumber",
    type: "text",
    inputType: "normal",
    label: "Student Contact No",
    placeholder: "Enter Student Contact No",
    labelClassName: "!font-bold",
    prefix: <FaPhone className="mr-1 text-secondary-color" />,
    rules: [{ required: true, message: "Phone Number is required" }],
  },
];

const AddSchoolAdminStudent: React.FC<AddSchoolAdminStudentProps> = ({
  isAddModalVisible,
  handleCancel,
}) => {
  const [form] = Form.useForm();
  const [existingId, setExistingId] = useState(null);
  const handleFinish = (values: any) => {
    console.log(values);
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
                label="Class"
                name="class"
                placeholder="Select Class"
                labelClassName="!font-bold"
                rules={[{ required: true, message: "Class is required" }]}
                // prefix={<RiClassFill className="mr-1 text-secondary-color" />}
                options={[
                  {
                    value: "Class1",
                    label: "Class 1",
                  },
                  {
                    value: "Class2",
                    label: "Class 2",
                  },
                  {
                    value: "Class3",
                    label: "Class 3",
                  },
                ]}
              />
              <ReuseSelect
                Typolevel={5}
                label="Section"
                name="section"
                placeholder="Select Section"
                labelClassName="!font-bold"
                rules={[{ required: true, message: "Section is required" }]}
                // prefix={<RiSectionFill SectionName="mr-1 text-secondary-color" />}
                options={[
                  {
                    value: "A",
                    label: "A",
                  },
                  {
                    value: "B",
                    label: "B",
                  },
                  {
                    value: "C",
                    label: "C",
                  },
                ]}
              />
              <Typography.Title level={5}>
                Did the Parent has existing ID?
              </Typography.Title>
              <Form.Item
                name="existingId"
                rules={[
                  {
                    required: true,
                    message: "Please select Yes or No",
                  },
                ]}
              >
                <Radio.Group
                  onChange={(e) => {
                    setExistingId(e.target.value);
                  }}
                >
                  <Space size="large">
                    <Radio value="yes" style={{ fontSize: "16px" }}>
                      Yes
                    </Radio>
                    <Radio value="no" style={{ fontSize: "16px" }}>
                      No
                    </Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
              {existingId === "yes" ? (
                <div>
                  <ReuseInput
                    name="fatherNumber"
                    type="text"
                    Typolevel={5}
                    label="Father Contact No"
                    placeholder="Enter Father Contact No"
                    labelClassName="!font-bold"
                    prefix={<IoSearch className="mr-1 text-secondary-color" />}
                  />
                  <ReuseInput
                    name="motherNumber"
                    type="text"
                    Typolevel={5}
                    label="Mother Contact No"
                    placeholder="Enter Mother Contact No"
                    labelClassName="!font-bold"
                    prefix={<IoSearch className="mr-1 text-secondary-color" />}
                  />
                </div>
              ) : (
                existingId === "no" && (
                  <div>
                    <ReuseInput
                      name="fatherNumber"
                      type="text"
                      Typolevel={5}
                      label="Father Contact No"
                      placeholder="Enter Father Contact No"
                      labelClassName="!font-bold"
                      prefix={<FaPhone className="mr-1 text-secondary-color" />}
                    />
                    <ReuseInput
                      name="motherNumber"
                      type="text"
                      Typolevel={5}
                      label="Mother Contact No"
                      placeholder="Enter Mother Contact No"
                      labelClassName="!font-bold"
                      prefix={<FaPhone className="mr-1 text-secondary-color" />}
                    />
                  </div>
                )
              )}
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
