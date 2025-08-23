/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";
import { useUpdateResultMutation } from "../../../redux/features/school/schoolApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

interface ResultEditProps {
  isEditModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any; // replace with proper type
}

const ResultEdit: React.FC<ResultEditProps> = ({
  isEditModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [form] = Form.useForm();
  const [updateResult] = useUpdateResultMutation();

  useEffect(() => {
    if (isEditModalVisible && currentRecord) {
      form.setFieldsValue({
        mark: currentRecord.mark,
      });
    }
  }, [isEditModalVisible, currentRecord, form]);

  const handleFinish = async (values: any) => {
    const mark = Number(values.mark);

    const res = await tryCatchWrapper(
      updateResult,
      {
        body: {
          termsId: currentRecord?.termsId,
          resultId: currentRecord?._id,
          mark: mark,
        },
      },
      "Updating Result..."
    );

    if (res?.statusCode === 200) {
      form.resetFields();
      handleCancel();
    }
  };

  return (
    <Modal
      open={isEditModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-center mb-4">
        Edit Result - {currentRecord?.studentName}
      </h3>

      <ReusableForm form={form} handleFinish={handleFinish}>
        <ReuseInput
          type="number"
          name="mark"
          label={currentRecord?.subjectName + " - " + currentRecord?.activeTerm}
          placeholder="Enter Mark"
        />
        <ReuseButton variant="secondary" htmlType="submit">
          Submit
        </ReuseButton>
      </ReusableForm>
    </Modal>
  );
};

export default ResultEdit;
