/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Upload } from "antd";
import { useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { AllImages } from "../../../../public/images/AllImages";
import ReusableForm from "../../../ui/Form/ReuseForm";
import ReuseInput from "../../../ui/Form/ReuseInput";
import ReuseButton from "../../../ui/Button/ReuseButton";

const inputStructure = [
  {
    name: "email",
    type: "email",
    inputType: "email",
    label: "Email",
    placeholder: "Enter your email",
    labelClassName: "!font-medium",
    inputClassName:
      "!py-2 !w-full disabled:!text-base-color disabled:!border-input-color/60 disabled:!bg-input-color/10",
    rules: [{ required: true, message: "Email is required" }],
    disable: true,
  },
  {
    name: "userName",
    type: "text",
    inputType: "text",
    label: "User name",
    placeholder: "Enter your username",
    labelClassName: "!font-medium",
    inputClassName: "!py-2 !w-full",
    rules: [{ required: true, message: "User name is required" }],
    disable: false,
  },
  {
    name: "contactNumber",
    type: "text",
    inputType: "tel",
    label: "Contact number",
    placeholder: "Enter your contact number",
    labelClassName: "!font-medium",
    inputClassName: "!py-2 !w-full",
    rules: [{ required: true, message: "Contact number is required" }],
    disable: false,
  },
];

const EditProfile = () => {
  const profileData = {
    userName: "James Mitchell",
    email: "emily@gmail.com",
    address: "Vancouver, BC VG1Z4, Canada",
    contactNumber: "+99-01846875456",
  };

  const profileImage = AllImages.profile;

  const [imageUrl, setImageUrl] = useState(profileImage);

  const handleImageUpload = (info: any) => {
    if (info.file.status === "removed") {
      setImageUrl(profileImage); // Reset to null or fallback image
    } else {
      const file = info.file.originFileObj || info.file; // Handle the file object safely
      if (file) {
        setImageUrl(URL.createObjectURL(file)); // Set the preview URL of the selected image
      } else {
        console.error("No file selected or file object missing");
      }
    }
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    console.log(imageUrl);
  };

  return (
    <div className=" mt-10  rounded-xl">
      <div className=" flex justify-start items-center">
        <ReusableForm
          onSubmit={onFinish}
          className="p-10 w-full lg:w-[70%]"
          defaultValues={profileData}
        >
          <div className="mt-5 flex flex-col justify-center items-start gap-x-4">
            <div className=" relative">
              <img
                className="h-40 w-40 relative rounded-full border border-secondary-color object-contain "
                src={imageUrl}
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
                    className="bg-base-color/70 p-2 w-fit h-fit !border-none absolute -top-12 left-[115px] rounded-full cursor-pointer shadow-lg"
                  >
                    <IoCameraOutline className="w-6 h-6 text-primary-color" />
                  </button>
                </Upload>
              </Form.Item>
            </div>
          </div>

          {inputStructure.map((input, index) => (
            <ReuseInput
              key={index}
              name={input.name}
              Typolevel={5}
              inputType={input.inputType}
              type={input.type}
              label={input.label}
              placeholder={input.placeholder}
              labelClassName={input.labelClassName}
              inputClassName={input.inputClassName}
              rules={input.rules}
              disabled={input.disable}
            />
          ))}

          <ReuseButton
            htmlType="submit"
            variant="secondary"
            className="w-full mt-4"
          >
            Submit
          </ReuseButton>

          <div className=" text-white mt-5"></div>
        </ReusableForm>
      </div>
    </div>
  );
};
export default EditProfile;
