import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Collapse,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Radio,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useUpdateSubscriptionMutation } from "../../../redux/features/subscription/subscriptionApi";

const { Panel } = Collapse;

interface Feature {
  feature: string;
}

interface SubscriptionRecord {
  _id?: string;
  planName?: string;
  price?: number;
  duration?: number | string;
  features?: string[];
  timeline?: number;
  numberOfChildren?: number;
}

interface UpdateSubscriptionModalProps {
  isUpdateModalOpen: boolean;
  handleCancelUpdateModal: () => void;
  currentRecord?: SubscriptionRecord;
}

const UpdateSubscriptionModal: React.FC<UpdateSubscriptionModalProps> = ({
  isUpdateModalOpen,
  handleCancelUpdateModal,
  currentRecord,
}) => {
  const [updateSubscription] = useUpdateSubscriptionMutation();
  const [form] = Form.useForm();
  const [featureList, setFeatureList] = useState<Feature[]>([]);
  const [activeKey, setActiveKey] = useState<string[]>(["0"]);

  useEffect(() => {
    form.setFieldsValue({
      planName: currentRecord?.planName || "",
      monthlyPrice: currentRecord?.price || "",
      duration: currentRecord?.timeline || currentRecord?.duration || "",
      numberOfChildren: currentRecord?.numberOfChildren || "",
    });

    if (currentRecord?.features) {
      setFeatureList(currentRecord.features.map((feature) => ({ feature })));
    }
  }, [currentRecord, form]);

  const handleAddQus = () => {
    const newfeatureList = [...featureList, { feature: "" }];
    setFeatureList(newfeatureList);
    setActiveKey([String(newfeatureList.length - 1)]);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newfeatureList = [...featureList];
    newfeatureList[index].feature = value;
    setFeatureList(newfeatureList);
  };

  const handleRemoveFeature = (index: number) => {
    const newFeatureList = featureList.filter((_, i) => i !== index);
    setFeatureList(newFeatureList);
    if (index === parseInt(activeKey[0])) {
      setActiveKey([String(newFeatureList.length - 1)]);
    }
  };

  const handleSave = async () => {
    const values = await form.validateFields();
    const formattedFeatures = featureList.map((item) => item.feature);

    const updatedSubscription = {
      planName: values.planName,
      price: Number(values.monthlyPrice),
      timeline: values.duration,
      numberOfChildren: values.numberOfChildren, // You can make this dynamic if needed
      features: formattedFeatures,
    };

    const res = await tryCatchWrapper(
      updateSubscription,
      {
        params: currentRecord?._id,
        body: updatedSubscription,
      },
      "Updating Subscription..."
    );

    if (res?.statusCode === 200) {
      handleCancelUpdateModal();
      form.resetFields();
    }
  };

  return (
    <Modal
      open={isUpdateModalOpen}
      onCancel={handleCancelUpdateModal}
      footer={null}
    >
      <Form form={form} layout="vertical" className="p-4 mt-5">
        <Typography.Title level={5}>Plan Name</Typography.Title>
        <Form.Item
          name="planName"
          rules={[{ required: true, message: "Please input the plan name!" }]}
          style={{ fontWeight: "500" }}
        >
          <Input
            placeholder="Enter plan name"
            className="font-medium h-12 !text-base-color placeholder:text-gray-700 border"
          />
        </Form.Item>

        <Typography.Title level={5}>Plan Price (Monthly)</Typography.Title>
        <Form.Item
          name="monthlyPrice"
          rules={[{ required: true, message: "Please input the plan price!" }]}
          style={{ fontWeight: "500" }}
        >
          <Input
            placeholder="Enter plan price"
            type="number"
            className="font-medium h-12 !text-base-color placeholder:text-gray-700 border !border-secondary-color"
          />
        </Form.Item>

        <Typography.Title level={5}>Number of Children</Typography.Title>
        <Form.Item
          name="numberOfChildren"
          rules={[
            { required: true, message: "Please input number of children!" },
          ]}
        >
          <Input
            type="number"
            placeholder="Enter number of children"
            className="h-12 !text-base-color placeholder:text-gray-700 border !border-secondary-color"
          />
        </Form.Item>

        <Typography.Title level={5}>Features</Typography.Title>
        <Form.Item name="features" style={{ fontWeight: "500" }}>
          <ConfigProvider
            theme={{
              components: {
                Collapse: {
                  colorTextHeading: "#222222",
                  colorText: "#222222",
                  borderRadiusLG: 0,
                  headerPadding: "5px 10px",
                  contentBg: "rgb(255,255,255)",
                  headerBg: "rgb(255,255,255)",
                },
              },
            }}
          >
            <Collapse
              accordion
              activeKey={activeKey}
              onChange={(key) =>
                setActiveKey(
                  Array.isArray(key) ? (key as string[]) : [String(key)]
                )
              }
              className="bg-primary-color mb-5"
            >
              {featureList.map((faq, index) => (
                <Panel
                  header={`Feature ${index + 1}`}
                  key={String(index)}
                  className="!text-base-color bg-primary-color flex flex-col gap-1"
                  extra={
                    featureList.length > 1 && (
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveFeature(index)}
                        type="button"
                      >
                        Remove
                      </button>
                    )
                  }
                >
                  <div className="flex flex-col gap-3">
                    <Input
                      value={faq.feature}
                      placeholder="Type your feature"
                      onChange={(e) =>
                        handleFeatureChange(index, e.target.value)
                      }
                      className="h-10 border !text-base-color placeholder:text-gray-600"
                    />
                  </div>
                </Panel>
              ))}
            </Collapse>
          </ConfigProvider>
          <Button
            block
            className="!mt-5"
            onClick={handleAddQus}
            style={{
              padding: "1px",
              fontSize: "16px",
              fontWeight: "500",
              color: "#ffffff",
              background: "#28314E",
              height: "40px",
              border: "1px solid #28314E",
            }}
          >
            <PlusOutlined />
            Add More Features
          </Button>
        </Form.Item>

        <Typography.Title level={5}>Timeline</Typography.Title>
        <Form.Item
          name="duration"
          style={{ fontWeight: "500" }}
          rules={[{ required: true, message: "Please select a timeline!" }]}
        >
          <Radio.Group className="font-normal w-full flex flex-col">
            <Radio value={30}>
              <span className="font-normal text-base-color">30 Days</span>
            </Radio>
            <Radio value={90}>
              <span className="font-normal text-base-color">90 Days</span>
            </Radio>
            <Radio value={180}>
              <span className="font-normal text-base-color">180 Days</span>
            </Radio>
            <Radio value={365}>
              <span className="font-normal text-base-color">1 Year</span>
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button
            onClick={handleSave}
            className="w-full h-12 !bg-secondary-color border !border-secondary-color !text-white text-base sm:text-lg font-bold"
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateSubscriptionModal;
