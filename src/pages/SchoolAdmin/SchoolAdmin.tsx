/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Upload } from "antd";
import { useEffect, useState } from "react";
import { FaImage, FaPhone } from "react-icons/fa6";
import { IoCameraOutline, IoLocationSharp } from "react-icons/io5";
import { RiSchoolFill, RiShieldUserFill } from "react-icons/ri";
import { toast } from "sonner";
import { AllImages } from "../../../public/images/AllImages";
import { getImageUrl } from "../../helpers/config/envConfig";
import {
  useGetSchoolProfileQuery,
  useUpdateSchoolProfileMutation,
} from "../../redux/features/school/schoolApi";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import Loading from "../../ui/Loading";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

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

  const [updateSchoolProfile] = useUpdateSchoolProfileMutation();
  const { data, isLoading } = useGetSchoolProfileQuery({});

  const profile = data?.data;

  console.log(profile);

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        schoolName: profile?.schoolName,
        schoolAddress: profile?.schoolAddress,
        adminName: profile?.adminName,
        adminPhone: profile?.adminPhone,
      });
    }
  }, [profile, form]);

  const handleFinish = async (values: Record<string, any>) => {
    const formdata = new FormData();

    console.log("School Image", values?.schoolImage?.file?.originFileObj);
    console.log("Cover Image", values?.coverImage?.file?.originFileObj);
    formdata.append("schoolImage", values?.schoolImage?.file?.originFileObj);
    formdata.append("coverImage", values?.coverImage?.file?.originFileObj);

    formdata.append("data", JSON.stringify(values));

    const res = await tryCatchWrapper(
      updateSchoolProfile,
      { body: formdata },
      "Updating Profile..."
    );

    if (res?.statusCode === 200) {
      form.resetFields();
      toast.success(res?.message);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="mt-5 flex flex-col justify-center items-start gap-x-4">
        <ReusableForm form={form} handleFinish={handleFinish}>
          <div className=" relative">
            <img
              className="w-screen h-[500px] relative rounded-xl "
              src={
                profile?.coverImage
                  ? getImageUrl() + `/${profile?.coverImage}`
                  : imageUrl
              }
              alt=""
            />
            <div className="absolute right-3 bottom-3">
              {" "}
              <Form.Item className="" name="coverImage">
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
                  src={
                    profile?.coverImage
                      ? getImageUrl() + `/${profile?.schoolImage}`
                      : logoUrl
                  }
                  alt=""
                />
                <Form.Item name="schoolImage">
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
                {profile?.schoolName}
              </h2>
            </div>
            <div className="lg:col-span-2">
              <ReuseInput
                name="schoolName"
                label="School Name"
                inputClassName="!py-2 !w-full"
                placeholder={profile?.schoolName}
                prefix={<RiSchoolFill className="mr-1 text-secondary-color" />}
              />
              <ReuseInput
                inputType="normal"
                name="schoolAddress"
                label="Address"
                placeholder="Address"
                inputClassName="!py-2 !w-full"
                prefix={
                  <IoLocationSharp className="mr-1 text-secondary-color" />
                }
              />
              <ReuseInput
                name="adminName"
                label="Admin Name"
                placeholder="Admin Name"
                inputClassName="!py-2 !w-full"
                prefix={
                  <RiShieldUserFill className="mr-1 text-secondary-color" />
                }
              />
              <ReuseInput
                name="adminPhone"
                label="Admin Phone"
                placeholder="Admin Phone"
                inputClassName="!py-2 !w-full"
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
