import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Collapse,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Typography,
} from "antd";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import ReuseButton from "../../Button/ReuseButton";

interface Section {
  name: string;
}

interface AddClassModalProps {
  isAddClassModalVisible: boolean;
  handleCancel: () => void;
}

const AddClassModal: React.FC<AddClassModalProps> = ({
  isAddClassModalVisible,
  handleCancel,
}) => {
  const { Panel } = Collapse;
  const [form] = Form.useForm();

  const [sectionList, setSectionList] = useState<Section[]>([{ name: "" }]);
  const [activeKey, setActiveKey] = useState<string[]>(["0"]);

  const handleAddSection = () => {
    setSectionList([...sectionList, { name: "" }]);
    setActiveKey([String(sectionList.length)]); // Open the newly added panel
  };

  const handleRemoveSection = (index: number) => {
    const newList = sectionList.filter((_, i) => i !== index);
    setSectionList(newList);
    if (activeKey[0] === String(index)) {
      setActiveKey([newList.length ? "0" : ""]);
    }
  };

  const handleSectionChange = (index: number, value: string) => {
    const newList = [...sectionList];
    newList[index].name = value;
    setSectionList(newList);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      console.log("Class Name:", values.className);
      console.log("Sections:", sectionList);
      // Submit your data here
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  return (
    <Modal
      open={isAddClassModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <Form form={form} layout="vertical" className="p-4">
        {/* Class Name Input */}
        <Typography.Title level={5} className="mb-2">
          Class Name
        </Typography.Title>
        <Form.Item
          name="className"
          rules={[{ required: true, message: "Please enter class name" }]}
          style={{ marginBottom: 24 }}
        >
          <Input
            placeholder="Class Name"
            className="h-12 rounded-md border border-gray-300"
            autoComplete="off"
          />
        </Form.Item>

        {/* Sections Collapse */}
        <Typography.Title level={5}>Section</Typography.Title>
        <Form.Item>
          <ConfigProvider
            theme={{
              components: {
                Collapse: {
                  contentBg: "#ffffff",
                  headerBg: "#ffffff",
                  colorTextHeading: "#111827",
                  colorText: "#374151",
                },
              },
            }}
          >
            <Collapse
              className="!border-none"
              accordion
              activeKey={activeKey}
              onChange={(key) => setActiveKey(Array.isArray(key) ? key : [key])}
            >
              {sectionList.map((section, idx) => (
                <Panel
                  header={`Section ${idx + 1}`}
                  key={String(idx)}
                  extra={
                    sectionList.length > 1 ? (
                      <MdDelete
                        className="text-red-600 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation(); // prevent collapse toggle
                          handleRemoveSection(idx);
                        }}
                        size={22}
                      />
                    ) : null
                  }
                >
                  <Input
                    placeholder="Type Section"
                    value={section.name}
                    onChange={(e) => handleSectionChange(idx, e.target.value)}
                    className="h-12 rounded-md border border-gray-300"
                    autoComplete="off"
                  />
                </Panel>
              ))}
            </Collapse>
          </ConfigProvider>
          <ReuseButton
            icon={<PlusOutlined />}
            variant="secondary"
            onClick={handleAddSection}
            className="!w-fit"
          >
            Add More Section
          </ReuseButton>
        </Form.Item>

        {/* Save Button */}
        <Form.Item>
          <Button
            type="primary"
            block
            size="large"
            onClick={handleSave}
            className="bg-[#28314E] border-[#28314E]"
          >
            Add Class
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddClassModal;
