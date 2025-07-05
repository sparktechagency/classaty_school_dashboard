/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { MdDelete } from "react-icons/md";
import ReuseButton from "../../Button/ReuseButton";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useUpdateClassMutation } from "../../../redux/features/class/classAPi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

interface ClassData {
  _id?: string; // optional for edit
  className: string;
  section: string[];
  levelId: string;
}

interface EditClassModalProps {
  isEditClassModalVisible: boolean;
  handleCancel: () => void;
  currentRecord?: ClassData | null;
}

const EditClassModal: React.FC<EditClassModalProps> = ({
  isEditClassModalVisible,
  handleCancel,
  currentRecord = null,
}) => {
  const [activeKey, setActiveKey] = useState<string[]>(["0"]);
  const [form] = Form.useForm();
  const [updateClass] = useUpdateClassMutation();

  useEffect(() => {
    if (currentRecord) {
      const splitSections =
        currentRecord.section?.[0]?.includes("/") &&
        currentRecord.section.length === 1
          ? currentRecord.section[0].split("/").map((s) => s.trim())
          : currentRecord.section;

      form.setFieldsValue({
        className: currentRecord.className,
        sections: splitSections?.length ? splitSections : [""],
      });

      setActiveKey(["0"]);
    } else {
      form.resetFields();
      setActiveKey(["0"]);
    }
  }, [currentRecord, form, isEditClassModalVisible]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        className: values.className.trim(),
        section: values.sections.map((s: string) => s.trim()),
      };
      const res = await tryCatchWrapper(
        updateClass,
        { body: payload, params: currentRecord?._id },
        "Updating Level..."
      );

      if (res?.statusCode === 201) {
        form.resetFields();
        handleCancel();
      }

      form.resetFields();
      handleCancel();
    } catch (error: any) {
      console.error("Validation failed:", error);
      const firstError =
        error?.errorFields?.[0]?.errors?.[0] || "Validation failed";
      toast.error(firstError);
    }
  };

  return (
    <Modal
      open={isEditClassModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      destroyOnClose
    >
      <Form form={form} layout="vertical" className="p-4">
        <Typography.Title level={5} className="mb-2">
          Class Name
        </Typography.Title>
        <Form.Item
          name="className"
          rules={[{ required: true, message: "Please enter class name" }]}
        >
          <Input
            placeholder="Class Name"
            className="h-12 rounded-md border border-gray-300"
            autoComplete="off"
          />
        </Form.Item>

        <Typography.Title level={5}>Section</Typography.Title>
        <Form.List
          name="sections"
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 1) {
                  return Promise.reject(
                    new Error("At least one section is required")
                  );
                }
                if (names.some((name: string) => !name?.trim())) {
                  return Promise.reject(
                    new Error("All sections must be filled")
                  );
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <>
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
                  className="!border-none mb-4"
                  accordion
                  activeKey={activeKey}
                  onChange={(key) =>
                    setActiveKey(Array.isArray(key) ? key : [key])
                  }
                >
                  {fields.map(({ key, name, ...restField }, idx) => (
                    <Collapse.Panel
                      header={`Section ${idx + 1}`}
                      key={String(key)}
                      extra={
                        fields.length > 1 ? (
                          <MdDelete
                            className="text-red-600 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              remove(name);
                              // Adjust active key if needed after removal
                              setTimeout(() => {
                                setActiveKey(
                                  fields.length > 2
                                    ? [String(idx === 0 ? 0 : idx - 1)]
                                    : ["0"]
                                );
                              }, 100);
                            }}
                            size={22}
                          />
                        ) : null
                      }
                    >
                      <Form.Item
                        {...restField}
                        name={name}
                        rules={[
                          {
                            required: true,
                            message: "Please enter section name",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Type Section"
                          className="h-12 rounded-md border border-gray-300"
                          autoComplete="off"
                        />
                      </Form.Item>
                    </Collapse.Panel>
                  ))}
                </Collapse>
              </ConfigProvider>

              <ReuseButton
                icon={<PlusOutlined />}
                variant="outline"
                onClick={async () => {
                  try {
                    // Validate all existing sections before adding a new one
                    const values = await form.validateFields(["sections"]);
                    const lastIndex = fields.length;

                    add("");
                    form.setFieldsValue({
                      sections: [...values.sections, ""],
                    });

                    setActiveKey([String(lastIndex)]);

                    setTimeout(() => {
                      document
                        .querySelector(`[data-node-key="${lastIndex}"]`)
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                    }, 100);
                  } catch {
                    toast.error("Please fill out all existing sections first.");
                  }
                }}
                className="!w-fit"
              >
                Add More Section
              </ReuseButton>
            </>
          )}
        </Form.List>

        <div className="mt-5">
          <Form.Item className="mt-6">
            <Button
              type="primary"
              block
              size="large"
              onClick={handleSave}
              className="!bg-[#28314E] border-[#28314E]"
            >
              {currentRecord ? "Update Class" : "Add Class"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default EditClassModal;
