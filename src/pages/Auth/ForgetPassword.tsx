/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseButton from "../../ui/Button/ReuseButton";
import { MdEmail, MdLock } from "react-icons/md";

const inputStructure = [
  {
    name: "email",
    type: "email",
    inputType: "email",
    label: "Email",
    placeholder: "Enter your email",
    labelClassName: "!font-bold",
    prefix: <MdEmail className="mr-1" />,
    inputClassName:
      "!py-3 !rounded-xl !text-lg !text-[#40140F] !bg-[#FBE7E5] !border-none",
    rules: [{ required: true, message: "Email is required" }],
  },
];

const SignIn = () => {
  const router = useNavigate();
  const onFinish = (values: any) => {
    const data = {
      ...values,
    };
    console.log(data);
    router("/forgot-password/verify-otp");
  };
  return (
    <div className="!bg-[#FDF4F3]">
      <Container>
        <div className="min-h-screen flex flex-col justify-center items-center w-full sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[40%] mx-auto">
          <div className="w-full sm:w-[70%] lg:w-full mx-auto">
            {/* -------- Sign In Page Header ------------ */}
            <div className="flex flex-col justify-center items-center">
              <div className="text-center mt-5 mb-10">
                <MdLock className="text-3xl md:text-4xl lg:text-5xl mb-4 text-secondary-color text-center mx-auto" />
                <h1 className="text-3xl lg:text-4xl font-bold text-base-color mb-5">
                  Forgot Password?
                </h1>
                <p className="text-sm lg:text-xl font-semibold mb-2 text-base-color/90">
                  Enter your email to reset your password.
                </p>
              </div>
            </div>
            {/* -------- Form Start ------------ */}
            <ReusableForm handleFinish={onFinish}>
              {inputStructure.map((input, index) => (
                <ReuseInput
                  key={index}
                  name={input.name}
                  Typolevel={4}
                  prefix={input.prefix}
                  inputType={input.inputType}
                  type={input.type}
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
                className="!py-6 !px-9 !font-bold !text-base sm:!text-lg lg:!text-xl !rounded-3xl mt-5"
                // icon={allIcons.arrowRight}
              >
                Send OTP
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default SignIn;
