/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Upload } from "antd";
import { useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import ReusableForm from "../../../ui/Form/ReuseForm";
import ReuseInput from "../../../ui/Form/ReuseInput";
import ReuseButton from "../../../ui/Button/ReuseButton";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../redux/features/profile/profileApi";
import { FadeLoader } from "react-spinners";
import { getImageUrl } from "../../../helpers/config/envConfig";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

const inputStructure = [
  {
    name: "name",
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
    name: "phoneNumber",
    type: "text",
    inputType: "tel",
    label: "Contact number",
    placeholder: "Enter your contact number",
    labelClassName: "!font-medium",
    inputClassName: "!py-2 !w-full",
    rules: [{ required: true, message: "Contact number is required" }],
    disable: true,
  },
];

const EditProfile = () => {
  const serverUrl = getImageUrl();
  const [form] = Form.useForm();
  const [updateProfile] = useUpdateProfileMutation();
  const { data, isFetching } = useGetProfileQuery({});
  const profileData = data?.data;
  const profileImage = serverUrl + profileData?.image;

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

  const onFinish = async (values: any) => {
    const formData = new FormData();
    if (values?.image?.file?.originFileObj) {
      formData.append("image", values?.image?.file?.originFileObj);
    }
    const data = {
      name: values?.name,
    };
    formData.append("data", JSON.stringify(data));
    await tryCatchWrapper(
      updateProfile,
      { body: formData },
      "Updating Profile..."
    );
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-[88vh]">
        <FadeLoader color="#28314E" />
      </div>
    );
  }

  return (
    <div className=" mt-10  rounded-xl">
      <h1 className="text-3xl font-bold text-secondary-color">Edit Profile</h1>
      <div className=" flex justify-start items-center">
        <ReusableForm
          form={form}
          handleFinish={onFinish}
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
                    className="!bg-base-color/70 p-2 w-fit h-fit !border-none absolute -top-12 left-[115px] rounded-full cursor-pointer shadow-lg"
                  >
                    <IoCameraOutline className="w-6 h-6 !text-primary-color" />
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
