/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import { AllImages } from "../../../public/images/AllImages";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseButton from "../../ui/Button/ReuseButton";
import { FaPhone } from "react-icons/fa6";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { Form } from "antd";
import Cookies from "js-cookie";

const inputStructure = [
  {
    name: "phoneNumber",
    inputType: "email",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    labelClassName: "!font-bold",
    prefix: <FaPhone className="mr-1" />,

    rules: [{ required: true, message: "Phone Number is required" }],
  },
];

const SignIn = () => {
  const [form] = Form.useForm();
  const router = useNavigate();
  const [login] = useLoginMutation();

  const onFinish = async (values: any) => {
    const res = await tryCatchWrapper(login, { body: values }, "Signing In...");

    console.log("res", res);

    if (res?.data?.signInToken) {
      Cookies.set("classaty_signInToken", res?.data?.signInToken, {
        path: "/",
        expires: 1,
        secure: false,
      });
      Cookies.set("classaty_phoneNumber", values.phoneNumber, {
        path: "/",
        expires: 1,
        secure: false,
      });

      form.resetFields();
      router("/sign-in/verify-otp", { replace: true });
    }
  };
  return (
    <div className="!bg-primary-color">
      <Container>
        <div className="min-h-screen flex flex-col justify-center items-center w-full sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[40%] mx-auto">
          <img
            src={AllImages.loginLogo}
            alt="logo"
            className="w-auto h-32 object-cover"
          />
          <div className="w-full sm:w-[70%] lg:w-full mx-auto">
            {/* -------- Sign In Page Header ------------ */}
            <div className="flex flex-col justify-center items-center mb-7">
              <div className="text-center mt-5">
                <h1 className="text-3xl lg:text-4xl font-bold text-base-color mb-5">
                  Sign in Your Account
                </h1>
              </div>
            </div>
            {/* -------- Form Start ------------ */}
            <ReusableForm form={form} handleFinish={onFinish}>
              {inputStructure.map((input, index) => (
                <ReuseInput
                  key={index}
                  name={input.name}
                  Typolevel={4}
                  prefix={input.prefix}
                  inputType={input.inputType}
                  label={input.label}
                  placeholder={input.placeholder}
                  labelClassName={input.labelClassName}
                  rules={input.rules}
                />
              ))}

              <ReuseButton
                variant="secondary"
                htmlType="submit"
                className="!py-6 !px-9 !font-bold !text-base sm:!text-lg lg:!text-xl !rounded-3xl"
                // icon={allIcons.arrowRight}
              >
                Verify OTP
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default SignIn;
