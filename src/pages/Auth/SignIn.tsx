/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import { AllImages } from "../../../public/images/AllImages";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseButton from "../../ui/Button/ReuseButton";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { Form, Input, Typography } from "antd";
import Cookies from "js-cookie";

import { Select } from "antd";

// Country codes
const countryCodes = [
  { name: "+965", code: "965" },
  { name: "+973", code: "973" },
  { name: "+974", code: "974" },
  { name: "+966", code: "966" },
  { name: "+971", code: "971" },
  { name: "+968", code: "968" },
];

const SignIn = () => {
  const [form] = Form.useForm();
  const router = useNavigate();
  const [login] = useLoginMutation();

  const onFinish = async (values: any) => {
    const fullPhoneNumber = `${values.countryCode}${values.phoneNumber}`;
    console.log(fullPhoneNumber, "fullPhoneNumber");
    const res = await tryCatchWrapper(
      login,
      { body: { phoneNumber: fullPhoneNumber } },
      "Signing In..."
    );

    if (res?.data?.signInToken) {
      Cookies.set("classaty_signInToken", res?.data?.signInToken, {
        path: "/",
        expires: 1,
      });
      Cookies.set("classaty_phoneNumber", fullPhoneNumber, {
        path: "/",
        expires: 1,
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
              <Typography.Title
                level={5}
                className="!text-base-color !font-bold"
              >
                Phone Number
              </Typography.Title>
              <Form.Item>
                <Input.Group compact>
                  <Form.Item
                    name="countryCode"
                    noStyle
                    initialValue="+965"
                    rules={[
                      { required: true, message: "Country code is required" },
                    ]}
                  >
                    <Select
                      style={{
                        width: 90,
                        height: 45,
                      }}
                      className="!border-0 hover:outline-0 hover:ring-0 focus:outline-0 focus:ring-0 "
                    >
                      {countryCodes.map((c) => (
                        <Select.Option key={c.code} value={c.code}>
                          {c.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="phoneNumber"
                    noStyle
                    rules={[
                      { required: true, message: "Phone number is required" },
                    ]}
                  >
                    <Input
                      className="!text-lg !bg-[#EFEFEF] !border !border-[#EFEFEF] !text-base-color !ring-0"
                      style={{
                        width: "calc(100% - 90px)",
                        height: 45,
                        borderRadius: "0 8px 8px 0",
                      }}
                      placeholder="Enter your phone number"
                    />
                  </Form.Item>
                </Input.Group>
              </Form.Item>

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
