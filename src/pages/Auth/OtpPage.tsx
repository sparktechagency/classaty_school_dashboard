"use client";
import { Form } from "antd";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { MdVerifiedUser } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReuseButton from "../../ui/Button/ReuseButton";

const OTPVerify = () => {
  const router = useNavigate();
  const [otp, setOtp] = useState("");

  const handleOTPSubmit = () => {
    if (otp.length === 6) {
      console.log("OTP:", otp);
      if (window?.location?.pathname === "/sign-up/otp-verify") {
        router("/");
      } else {
        router("/update-password");
      }
    }
  };

  return (
    <div className="text-base-color">
      <Container>
        <div className="min-h-screen flex justify-center items-center text-center">
          <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto  p-6 rounded-2xl">
            <div className="mb-8">
              <MdVerifiedUser className="size-10 mb-4 text-base-color mx-auto" />
              <h1 className="text-2xl sm:text-3xl font-semibold text-base-color mb-2">
                Code has been sent to
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 text-base-color">
                user@example.com
              </p>
            </div>

            <Form layout="vertical" className="bg-transparent w-full">
              <Form.Item className="">
                <div className="flex justify-center items-center">
                  <OTPInput
                    inputStyle="!w-[40px] !h-[50px] md:!w-[60px] md:!h-[50px] lg:!h-[70px] text-[20px] sm:text-[30px] !bg-secondary-color/10 border-2 !border-secondary-color
                      rounded-lg mr-[10px] sm:mr-[20px] !text-base-color "
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => <input {...props} required />}
                  />
                </div>
              </Form.Item>

              <ReuseButton
                htmlType="submit"
                variant="secondary"
                className="!py-6 !px-9 !font-bold !text-base sm:!text-lg lg:!text-xl !rounded-3xl"
                onClick={handleOTPSubmit}
              >
                Verify OTP
              </ReuseButton>
            </Form>
            <div className="flex justify-center gap-2 py-1 mt-5">
              <p>Didn’t receive code?</p>
              <p className="!text-base-color !underline font-semibold cursor-pointer">
                Click to resend
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default OTPVerify;
