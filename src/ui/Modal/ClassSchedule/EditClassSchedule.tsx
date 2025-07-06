/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker, Form, Modal, TimePicker, Typography } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useGetClassQuery } from "../../../redux/features/class/classAPi";
import { useEditClassScheduleMutation } from "../../../redux/features/classSchedule/classScheduleApi";
import { useGetSectionByClassIdQuery } from "../../../redux/features/section/sectionApi";
import { useGetSubjectBySchoolIdQuery } from "../../../redux/features/subject/subjectApi";
import { useGetTeacherQuery } from "../../../redux/features/teacher/teacherApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import ReuseButton from "../../Button/ReuseButton";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseSelect from "../../Form/ReuseSelect";

interface AddClassScheduleProps {
  isAddModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any;
}

const EditClassSchedule: React.FC<AddClassScheduleProps> = ({
  isAddModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [form] = Form.useForm();
  const [classId, setClassId] = useState<string>("");

  const { data: classData, isFetching: classFetching } = useGetClassQuery(
    {},
    {
      skip: !isAddModalVisible,
    }
  );
  const allClass = classData?.data;
  const { data: subjectData, isFetching: subjectFetching } =
    useGetSubjectBySchoolIdQuery(
      {
        page: 1,
        limit: 1000,
      },
      {
        skip: !isAddModalVisible,
      }
    );
  const { data: teachers, isFetching: teacherFetching } = useGetTeacherQuery(
    {
      page: 1,
      limit: 1000,
    },
    {
      skip: !isAddModalVisible,
    }
  );
  const { data: section } = useGetSectionByClassIdQuery(
    {
      classId: classId,
      page: 1,
      limit: 1000,
    },
    {
      skip: !classId || !isAddModalVisible,
    }
  );

  const [editClassSchedule] = useEditClassScheduleMutation();

  const handleValuesChange = (changedValues: any) => {
    if (changedValues?.classId) {
      const selectedClass = changedValues.classId;
      console.log(selectedClass, "selectedClass");
      setClassId(selectedClass);
    }

    if (changedValues?.classId) {
      const selectedClass = changedValues.classId;
      setClassId(selectedClass);
    }
  };

  const handleFinish = async (values: any) => {
    const isoDate = dayjs(values.date).toISOString();
    values.date = isoDate;
    values.selectTime = dayjs(values.selectTime).format("HH:mm:ss");
    values.endTime = dayjs(values.endTime).format("HH:mm:ss");

    const res = await tryCatchWrapper(
      editClassSchedule,
      { body: values, params: currentRecord?._id },
      "Adding Class Schedule..."
    );

    if (res?.statusCode === 200) {
      form.resetFields();
      handleCancel();
    }
  };

    
    console.log(currentRecord, "currentRecord");
    
  return (
    <Modal
      open={isAddModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <div className="py-5">
        <div className="text-base-color">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary-color text-center">
            Edit Class Schedule
          </h3>

          <div className="mt-5">
            <ReusableForm
              onValuesChange={handleValuesChange}
              form={form}
              handleFinish={handleFinish}
            >
              <ReuseSelect
                Typolevel={5}
                label="Class"
                name="classId"
                labelClassName="!font-bold"
                placeholder="Select Class"
                options={allClass?.map((item: any) => ({
                  value: item._id,
                  label: item.className,
                }))}
                disabled={classFetching}
              />
              <ReuseSelect
                Typolevel={5}
                label="Section"
                name="section"
                labelClassName="!font-bold"
                placeholder="Select Section"
                options={section?.data?.map((item: any) => ({
                  value: item,
                  label: item,
                }))}
                disabled={classId === ""}
              />
              <ReuseSelect
                Typolevel={5}
                label="Subject"
                name="subjectId"
                labelClassName="!font-bold"
                placeholder="Select Subject"
                options={subjectData?.data?.result?.map((item: any) => ({
                  value: item._id,
                  label: item.subjectName,
                }))}
                disabled={subjectFetching}
              />
              <ReuseInput
                Typolevel={5}
                label="Period"
                name="period"
                placeholder="Enter Period"
              />
              <ReuseInput
                inputType="textarea"
                rows={4}
                Typolevel={5}
                label="Description"
                name="description"
                placeholder="Enter Description"
              />
              <ReuseSelect
                Typolevel={5}
                label="Teacher"
                name="teacherId"
                labelClassName="!font-bold"
                placeholder="Select Teacher"
                options={teachers?.data?.result?.map((item: any) => ({
                  value: item._id,
                  label: item.name,
                }))}
                disabled={teacherFetching}
              />
              <Typography.Title level={5} className="mb-1">
                Start Time
              </Typography.Title>
              <Form.Item name="selectTime">
                <TimePicker
                  className="w-full !py-2 !px-3 !rounded-lg !text-lg !bg-[#EFEFEF] !border !border-[#EFEFEF] !text-base-color"
                  placeholder="Select Time"
                  size="large"
                  disabledDate={(current) => {
                    // Disable all dates before today
                    return current && current < dayjs().startOf("day");
                  }}
                />
              </Form.Item>
              <Typography.Title level={5} className="mb-1">
                End Time
              </Typography.Title>

              <Form.Item name="endTime">
                <TimePicker
                  className="w-full !py-2 !px-3 !rounded-lg !text-lg !bg-[#EFEFEF] !border !border-[#EFEFEF] !text-base-color"
                  placeholder="End Time"
                  size="large"
                  disabledDate={(current) => {
                    // Disable all dates before today
                    return current && current < dayjs().startOf("day");
                  }}
                />
              </Form.Item>

              <ReuseSelect
                Typolevel={5}
                label="Days"
                name="days"
                labelClassName="!font-bold"
                placeholder="Select Days"
                options={[
                  { value: "saturday", label: "Saturday" },
                  { value: "sunday", label: "Sunday" },
                  { value: "monday", label: "Monday" },
                  { value: "tuesday", label: "Tuesday" },
                  { value: "wednesday", label: "Wednesday" },
                  { value: "thursday", label: "Thursday" },
                  { value: "friday", label: "Friday" },
                ]}
              />

              <Typography.Title level={5} className="mb-1">
                Date
              </Typography.Title>

              <Form.Item name="date">
                <DatePicker
                  className="w-full !py-2 !px-3 !rounded-lg !text-lg !bg-[#EFEFEF] !border !border-[#EFEFEF] !text-base-color"
                  placeholder="Select Date"
                  size="large"
                  disabledDate={(current) => {
                    // Disable all dates before today
                    return current && current < dayjs().startOf("day");
                  }}
                />
              </Form.Item>
              <ReuseInput
                Typolevel={5}
                label="Room No"
                name="roomNo"
                placeholder="Enter Room No"
              />

              <ReuseButton
                htmlType="submit"
                variant="secondary"
                className="w-full mt-4"
              >
                Edit Schedule
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditClassSchedule;
