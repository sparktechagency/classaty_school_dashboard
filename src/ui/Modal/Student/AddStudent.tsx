/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import { RiSchoolFill } from "react-icons/ri";
import { FaAddressCard, FaPhone } from "react-icons/fa6";
import ReuseButton from "../../Button/ReuseButton";
import ReuseSelect from "../../Form/ReuseSelect";
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

const AddStudent: React.FC<AddStudentProps> = ({
  isAddModalVisible,
  handleCancel,
}) => {
  const [form] = Form.useForm();
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
              <ReuseInput
                name="civilId"
                type="text"
                Typolevel={5}
                label="Civil ID"
                placeholder="Enter Civil ID"
                labelClassName="!font-bold"
                prefix={<FaAddressCard className="mr-1 text-secondary-color" />}
              />
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
                label="School"
                name="school"
                placeholder="Select School"
                labelClassName="!font-bold"
                rules={[{ required: true, message: "School is required" }]}
                prefix={<RiSchoolFill className="mr-1 text-secondary-color" />}
                options={[
                  {
                    value: "school1",
                    label: "School 1",
                  },
                  {
                    value: "school2",
                    label: "School 2",
                  },
                  {
                    value: "school3",
                    label: "School 3",
                  },
                ]}
              />

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
