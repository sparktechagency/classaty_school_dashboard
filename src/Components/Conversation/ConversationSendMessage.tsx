/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Form, Input, Upload } from "antd";
import { BsImage } from "react-icons/bs";
import { FaTelegramPlane, FaTimes } from "react-icons/fa";
import { toast } from "sonner";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import { selectSelectedChatUser } from "../../redux/features/conversation/conversationSlice";
import { useAppSelector } from "../../redux/hooks";
import { getBaseUrl } from "../../helpers/config/envConfig";

const ConversationSendMessage = ({ socket, userData }: any) => {
  const selectedConversation = useAppSelector(selectSelectedChatUser);
  const serverUrl = getBaseUrl();
  const [form] = Form.useForm();
  const [isUploadLoading, setIsUploadLoading] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  // Reset on new conversation
  useEffect(() => {
    setFileList([]);
    setPreviewUrl(null);
    setUploadedImageUrl(null);
    form.setFieldValue("message", "");
  }, [selectedConversation?._id, form]);

  // Handle image selection
  const handleImageChange = ({ fileList: newFileList }: any) => {
    const latestFile = newFileList?.[0];
    setFileList(latestFile ? [latestFile] : []);
    generatePreviewUrl(latestFile);
    if (latestFile) uploadImage(latestFile);
  };

  const generatePreviewUrl = (file: any) => {
    if (file?.originFileObj) {
      const url = URL.createObjectURL(file.originFileObj);
      setPreviewUrl(url);
    }
  };

  const uploadImage = async (file: any) => {
    setIsUploadLoading(true);
    const formData = new FormData();
    formData.append("file", file.originFileObj);

    try {
      const response = await axios.post(
        `${serverUrl}/users/file_upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.data?.file) {
        setUploadedImageUrl(response.data.file);
      }
    } catch (error) {
      toast.error("Failed to upload image");
    }
    setIsUploadLoading(false);
  };

  const handleDeleteImage = () => {
    setFileList([]);
    setPreviewUrl(null);
    setUploadedImageUrl(null);
    setIsUploadLoading(false);
  };

  const handleMessageSend = async (values: any) => {
    const data: any = {
      conversationId: selectedConversation?._id,
      text_message: values?.message,
      sender: userData?.userId,
      receiverId: selectedConversation?.otherUser?._id,
      ...(uploadedImageUrl ? { file: uploadedImageUrl } : {}),
    };

    try {
      socket?.emit("send_message", data, (res: any) => {
        setFileList([]);
        setPreviewUrl(null);
        setUploadedImageUrl(null);
        form.resetFields();
        setTextValue(null);
      });
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.message || "Failed to send message",
        { duration: 2000 }
      );
    }
  };

  return (
    <div>
      <div className="w-full">
        {previewUrl && (
          <div className="absolute bottom-10 !bg-white flex items-center gap-2">
            <div style={{ position: "relative", display: "inline-block" }}>
              <img
                src={previewUrl}
                alt="preview"
                style={{ width: 70, height: 70 }}
              />
              <FaTimes
                className="cursor-pointer text-red-600 bg-white"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 5,
                  fontSize: "20px",
                }}
                onClick={handleDeleteImage}
              />
            </div>
          </div>
        )}

        <Form form={form} onFinish={handleMessageSend}>
          <div className="!bg-white absolute -bottom-5 flex justify-center items-center w-full p-1">
            <div className="w-full rounded-full bg-white border border-[#F88D58] px-4 py-2 flex items-center space-x-4">
              <Form.Item className="w-full !p-0 !m-0" name="message">
                <Input
                  onChange={(e) => setTextValue(e.target.value)}
                  placeholder="Send your message..."
                  className="!border-none !ring-0 !outline-none !bg-transparent text-black"
                />
              </Form.Item>

              <Form.Item className="!p-0 !m-0" name="image">
                <Upload
                  fileList={fileList}
                  onChange={handleImageChange}
                  customRequest={(options) => {
                    setTimeout(() => {
                      if (options.onSuccess) {
                        options.onSuccess("ok");
                      }
                    }, 1000);
                  }}
                  maxCount={1}
                  accept="image/*"
                  showUploadList={false}
                >
                  <BsImage className="cursor-pointer text-xl text-[#F88D58] mt-1" />
                </Upload>
              </Form.Item>
            </div>

            {isUploadLoading ? (
              <FadeLoader className={"w-fit mx-1"} />
            ) : (
              <button
                disabled={!textValue?.length}
                className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                type="submit"
              >
                <FaTelegramPlane className="text-white bg-[#F88D58] rounded-full p-2 text-4xl ms-3" />
              </button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ConversationSendMessage;
