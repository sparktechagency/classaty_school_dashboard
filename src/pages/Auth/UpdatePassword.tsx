/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { IoMdUnlock } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseButton from "../../ui/Button/ReuseButton";
import { FormInstance } from "antd";
import { RiLockPasswordFill } from "react-icons/ri";

const inputStructure = [
  {
    name: "password",
    type: "password",
    inputType: "password",
    label: "Password",
    placeholder: "Enter your password",
    prefix: <RiLockPasswordFill className="mr-1" />,
    labelClassName: "!font-medium",
    inputClassName:
      "!py-3 !rounded-xl !text-lg !text-[#40140F] !bg-[#FBE7E5] !border-none",
    rules: [{ required: true, message: "Password is required" }],
  },
  {
    name: "confirmPassword",
    type: "password",
    inputType: "password",
    label: "Confirm Password",
    placeholder: "Confirm your password",
    prefix: <RiLockPasswordFill className="mr-1" />,
    labelClassName: "!font-medium",
    inputClassName:
      "!py-3 !rounded-xl !text-lg !text-[#40140F] !bg-[#FBE7E5] !border-none",
    rules: [
      { required: true, message: "Confirm Password is required" },
      ({
        getFieldValue,
      }: {
        getFieldValue: FormInstance["getFieldValue"];
      }) => ({
        validator(_: unknown, value: string) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error("Password does not match!"));
        },
      }),
    ],
  },
];

const UpdatePassword = () => {
  const router = useNavigate();
  const onFinish = (values: any) => {
    console.log("Received values of update form:", values);
    router("/sign-in");
  };

  return (
    <div>
      <Container>
        <div className="min-h-screen flex justify-center items-center">
          <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto  p-6 rounded-2xl">
            {/* -------- update Password Page Header ------------ */}
            <div className="flex flex-col justify-center items-center">
              <div className="text-center mt-5 mb-5">
                <IoMdUnlock className="size-10 mb-4 text-base-color mx-auto" />
                <h1 className="text-3xl sm:text-4xl font-semibold text-base-color mb-5">
                  Reset Your Password
                </h1>
              </div>
            </div>
            {/* -------- Form Start ------------ */}
            <ReusableForm handleFinish={onFinish}>
              {inputStructure.map((input, index) => (
                <ReuseInput
                  key={index}
                  name={input.name}
                  Typolevel={4}
                  inputType={input.inputType}
                  type={input.type}
                  prefix={input.prefix}
                  label={input.label}
                  placeholder={input.placeholder}
                  labelClassName={input.labelClassName}
                  inputClassName={input.inputClassName}
                  rules={input.rules}
                />
              ))}

              <ReuseButton
                variant="secondary"
                htmlType="submit"
                className="!py-6 !px-9 !font-bold !text-base sm:!text-lg lg:!text-xl !rounded-3xl"
                // icon={allIcons.arrowRight}
              >
                Change Password
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default UpdatePassword;
