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
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useAddSubscriptionMutation } from "../../../redux/features/subscription/subscriptionApi";

interface Feature {
  feature: string;
}

interface AddSubscriptionModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const AddSubscriptionModal: React.FC<AddSubscriptionModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [addSubscription] = useAddSubscriptionMutation();
  const { Panel } = Collapse;
  const [form] = Form.useForm();
  const [featureList, setFeatureList] = useState<Feature[]>([{ feature: "" }]);
  const [activeKey, setActiveKey] = useState<string[]>(["0"]);

  const handleAddQus = () => {
    const newfeatureList = [...featureList, { feature: "" }];
    setFeatureList(newfeatureList);
    setActiveKey([String(newfeatureList.length - 1)]);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatureList = [...featureList];
    newFeatureList[index].feature = value;
    setFeatureList(newFeatureList);
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

    const newSubscription = {
      planName: values.planName,
      price: parseInt(values.price),
      timeline: parseInt(values.timeline),
      numberOfChildren: parseInt(values.numberOfChildren),
      features: formattedFeatures,
    };

    const res = await tryCatchWrapper(
      addSubscription,
      { body: newSubscription },
      "Adding Subscription..."
    );

    if (res.statusCode === 200) {
      form.resetFields();
      setIsModalOpen(false);
      setFeatureList([{ feature: "" }]);
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <Form form={form} layout="vertical" className="p-4 mt-5">
        <Typography.Title level={5}>Plan Name</Typography.Title>
        <Form.Item
          name="planName"
          rules={[{ required: true, message: "Please input the plan name!" }]}
        >
          <Input
            placeholder="Enter plan name"
            className="h-12 !text-base-color placeholder:text-gray-700 border !border-secondary-color"
          />
        </Form.Item>

        <Typography.Title level={5}>Plan Price</Typography.Title>
        <Form.Item
          name="price"
          rules={[{ required: true, message: "Please input the plan price!" }]}
        >
          <Input
            type="number"
            placeholder="Enter plan price"
            className="h-12 !text-base-color placeholder:text-gray-700 border !border-secondary-color"
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
        <Form.Item name="features">
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
              onChange={setActiveKey}
              className="bg-primary-color mb-5"
            >
              {featureList.map((faq, index) => (
                <Panel
                  header={`Feature ${index + 1}`}
                  key={String(index)}
                  className="!text-base-color bg-primary-color"
                  extra={
                    featureList.length > 1 && (
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveFeature(index)}
                      >
                        <MdDelete className="size-4" />
                      </button>
                    )
                  }
                >
                  <Input
                    value={faq.feature}
                    placeholder="Type your feature"
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="h-10 border !border-secondary-color !text-base-color placeholder:text-gray-600"
                  />
                </Panel>
              ))}
            </Collapse>
          </ConfigProvider>

          <Button
            block
            onClick={handleAddQus}
            className="!mt-5"
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
            <PlusOutlined /> Add More Features
          </Button>
        </Form.Item>

        <Typography.Title level={5}>Timeline</Typography.Title>
        <Form.Item
          name="timeline"
          rules={[{ required: true, message: "Please select a timeline!" }]}
        >
          <Radio.Group className="w-full flex flex-col">
            <Radio value={30}>30 Days</Radio>
            <Radio value={90}>90 Days</Radio>
            <Radio value={180}>180 Days</Radio>
            <Radio value={365}>1 Year</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button
            onClick={handleSave}
            className="w-full !h-12 !bg-secondary-color border !border-secondary-color !text-white text-base sm:!text-lg font-bold"
          >
            Add
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddSubscriptionModal;
