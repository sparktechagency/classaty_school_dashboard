/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Upload } from "antd";
import { useState } from "react";
import { FaImage } from "react-icons/fa6";
import { IoCameraOutline } from "react-icons/io5";
import { AllImages } from "../../../public/images/AllImages";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseButton from "../../ui/Button/ReuseButton";
import { RiShieldUserFill, RiSchoolFill } from "react-icons/ri";
import { FaPhone } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";

const SchoolAdmin = () => {
  const [form] = Form.useForm();
  const coverImage = AllImages.cover;
  const logoImage = AllImages.schoolProfile;

  const [imageUrl, setImageUrl] = useState(coverImage);
  const [logoUrl, setLogoUrl] = useState(logoImage);

  const handleImageUpload = (info: any) => {
    if (info.file.status === "removed") {
      setImageUrl(coverImage); // Reset to null or fallback image
    } else {
      const file = info.file.originFileObj || info.file; // Handle the file object safely
      if (file) {
        setImageUrl(URL.createObjectURL(file)); // Set the preview URL of the selected image
      } else {
        console.error("No file selected or file object missing");
      }
    }
  };

  const handleLogoUpload = (info: any) => {
    if (info.file.status === "removed") {
      setLogoUrl(logoImage); // Reset to null or fallback image
    } else {
      const file = info.file.originFileObj || info.file; // Handle the file object safely
      if (file) {
        setLogoUrl(URL.createObjectURL(file)); // Set the preview URL of the selected image
      } else {
        console.error("No file selected or file object missing");
      }
    }
  };

  const handleFinish = (values: Record<string, any>) => {
    console.log(values);
  };
  return (
    <div>
      <div className="mt-5 flex flex-col justify-center items-start gap-x-4">
        <ReusableForm form={form} handleFinish={handleFinish}>
          <div className=" relative">
            <img
              className="w-screen h-[500px] relative rounded-xl "
              src={imageUrl}
              alt=""
            />
            <div className="absolute right-3 bottom-3">
              {" "}
              <Form.Item className="" name="image">
                <Upload
                  customRequest={(options) => {
                    setTimeout(() => {
                      if (options.onSuccess) {
                        options.onSuccess("ok");
                      }
                    }, 1000);
                  }}
                  onChange={handleImageUpload}
                  maxCount={1}
                  accept="image/*"
                  className=" text-start"
                  style={{
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                  listType="picture"
                >
                  <button
                    type="button"
                    style={{
                      zIndex: 1,
                    }}
                    className="mt-2 !bg-primary-color !text-secondary-color px-6 py-3 w-fit h-fit !border-none flex items-center gap-2 rounded-full cursor-pointer !text-base font-bold"
                  >
                    <FaImage className="size-5" /> Change Cover Image
                  </button>
                </Upload>
              </Form.Item>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10">
            <div
              className="bg-white flex flex-col justify-center items-center p-4 gap-2 rounded-lg"
              style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}
            >
              <div className=" relative ">
                <img
                  className="h-40 w-40 mx-auto relative rounded-full border border-secondary-color object-contain "
                  src={logoUrl}
                  alt=""
                />
                <Form.Item name="image">
                  <Upload
                    customRequest={(options) => {
                      setTimeout(() => {
                        if (options.onSuccess) {
                          options.onSuccess("ok");
                        }
                      }, 1000);
                    }}
                    onChange={handleLogoUpload}
                    maxCount={1}
                    accept="image/*"
                    className=" text-center flex flex-col justify-center items-center"
                    style={{
                      width: "100%",
                      height: "100%",
                      opacity: 0,
                      cursor: "pointer",
                    }}
                    listType="text"
                  >
                    <button
                      type="button"
                      style={{
                        zIndex: 1,
                      }}
                      className="bg-secondary-color  p-2 w-fit h-fit !border-none rounded-full absolute -top-12 ml-10 cursor-pointer shadow-lg"
                    >
                      <IoCameraOutline className="w-6 h-6 !text-primary-color" />
                    </button>
                  </Upload>
                </Form.Item>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-center font-semibold text-secondary-color ">
                International School of Kuwait
              </h2>
            </div>
            <div className="lg:col-span-2">
              <ReuseInput
                name="name"
                label=" Name"
                placeholder=" Name"
                inputClassName="!py-2 !w-full"
                rules={[{ required: true, message: "Name is required" }]}
                prefix={<RiSchoolFill className="mr-1 text-secondary-color" />}
              />
              <ReuseInput
                inputType="normal"
                name="address"
                label="Address"
                placeholder="Address"
                inputClassName="!py-2 !w-full"
                rules={[{ required: true, message: "Address is required" }]}
                prefix={
                  <IoLocationSharp className="mr-1 text-secondary-color" />
                }
              />
              <ReuseInput
                name="adminName"
                label="Admin Name"
                placeholder="Admin Name"
                inputClassName="!py-2 !w-full"
                rules={[{ required: true, message: "Admin Name is required" }]}
                prefix={
                  <RiShieldUserFill className="mr-1 text-secondary-color" />
                }
              />
              <ReuseInput
                name="adminPhone"
                label="Admin Phone"
                placeholder="Admin Phone"
                inputClassName="!py-2 !w-full"
                rules={[{ required: true, message: "Admin Phone is required" }]}
                prefix={<FaPhone className="mr-1 text-secondary-color" />}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <ReuseButton
              htmlType="submit"
              variant="secondary"
              className="mt-5 w-fit"
            >
              Save
            </ReuseButton>
          </div>
        </ReusableForm>
      </div>
    </div>
  );
};

export default SchoolAdmin;
