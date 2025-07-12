/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker, Form, Modal, TimePicker, Typography } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";
import ReuseSelect from "../../Form/ReuseSelect";
import dayjs from "dayjs";
import { useGetSubjectBySchoolIdQuery } from "../../../redux/features/subject/subjectApi";
import { useGetClassBySchoolIdQuery } from "../../../redux/features/class/classAPi";
import { useGetTeacherQuery } from "../../../redux/features/teacher/teacherApi";
import { useCreateExamMutation } from "../../../redux/features/exam/examApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

interface AddExamModalProps {
  isAddExamModalVisible: boolean;
  handleCancel: () => void;
  activeKey: string[];
}

const AddExamModal: React.FC<AddExamModalProps> = ({
  isAddExamModalVisible,
  handleCancel,
  activeKey,
}) => {
  const [form] = Form.useForm();

  const { data: subject } = useGetSubjectBySchoolIdQuery(
    {
      page: 1,
      limit: 10000,
    },
    {
      skip: !isAddExamModalVisible,
    }
  );

  const { data: classes } = useGetClassBySchoolIdQuery(
    {
      page: 1,
      limit: 10000,
    },
    {
      skip: !isAddExamModalVisible,
    }
  );

  const { data: teachers } = useGetTeacherQuery(
    {
      page: 1,
      limit: 10000,
    },
    {
      skip: !isAddExamModalVisible,
    }
  );

  const [createExam] = useCreateExamMutation();

  const handleFinish = async (values: any) => {
    const subjectName = subject?.data?.result?.find(
      (subject: any) => subject._id === values.subjectId
    );

    const className = classes?.data?.find(
      (cls: any) => cls._id === values.classId
    );

    const assignedTeacher = teachers?.data?.result?.find(
      (teacher: any) => teacher._id === values.teacherId
    );

    const isoDate = dayjs(values.date).toISOString();
    values.date = isoDate;

    const finalPayload = {
      subjectId: values.subjectId,
      classId: values.classId,
      details: values.details,
      passGrade: Number(values.passGrade),
      className: className?.className,
      date: values.date,
      startTime: dayjs(values.startTime).format("HH:mm:ss"),
      classRoom: values.classRoom,
      duration: Number(values.duration),
      assignedTeacher: assignedTeacher?.name,
      teacherId: values.teacherId,
      termsId: activeKey?.[0],
      instruction: values.instruction,
      totalMarks: values.totalMarks,
      subjectName: subjectName?.subjectName,
    };

    const res = await tryCatchWrapper(
      createExam,
      { body: finalPayload },
      "Adding Exam..."
    ) as any;

    if (res?.statusCode === 201) {
      form.resetFields();
      handleCancel();
    }
  };
  return (
    <Modal
      open={isAddExamModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <div className="py-5">
        <div className="text-base-color">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary-color text-center">
            Add Exam
          </h3>

          <div className="mt-5">
            <ReusableForm form={form} handleFinish={handleFinish}>
              <ReuseSelect
                Typolevel={5}
                label="Subject"
                name="subjectId"
                placeholder="Select Subject"
                labelClassName="!font-bold"
                options={subject?.data?.result?.map((subject: any) => ({
                  value: subject._id,
                  label: subject.subjectName,
                }))}
                rules={[{ required: true, message: "Subject is required" }]}
              />
              <ReuseInput
                inputType="textarea"
                rows={4}
                Typolevel={5}
                label="Exam Details"
                name="details"
                placeholder="Enter Exam Details"
                rules={[
                  { required: true, message: "Exam Details is required" },
                ]}
              />
              <ReuseSelect
                Typolevel={5}
                label="Class"
                name="classId"
                placeholder="Select Class"
                labelClassName="!font-bold"
                options={classes?.data?.map((classData: any) => ({
                  value: classData._id,
                  label: classData.className,
                }))}
                rules={[{ required: true, message: "Class is required" }]}
              />

              <ReuseInput
                inputType="normal"
                rows={4}
                type="number"
                Typolevel={5}
                label="Total Mark"
                name="totalMarks"
                placeholder="Enter Required Pass Grader"
                rules={[
                  {
                    required: true,
                    message: "Required Pass Grader is required",
                  },
                ]}
              />

              <ReuseInput
                inputType="normal"
                rows={4}
                type="number"
                Typolevel={5}
                label="Required Pass Grade"
                name="passGrade"
                placeholder="Enter Required Pass Grader"
                rules={[
                  {
                    required: true,
                    message: "Required Pass Grader is required",
                  },
                ]}
              />
              <Typography.Title level={5} className="mb-1">
                Date
              </Typography.Title>
              <Form.Item name="date" rules={[{ required: true }]}>
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

              <Typography.Title level={5} className="mb-1">
                Start Time
              </Typography.Title>
              <Form.Item name="startTime" rules={[{ required: true }]}>
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

              <ReuseInput
                Typolevel={5}
                label="Class Room"
                name="classRoom"
                placeholder="Enter Class Room"
                rules={[{ required: true, message: "Class Room is required" }]}
              />
              <ReuseInput
                Typolevel={5}
                label="Exam Duration"
                name="duration"
                type="number"
                placeholder="Enter Exam Duration"
                rules={[
                  { required: true, message: "Exam Duration is required" },
                ]}
              />
              <ReuseSelect
                Typolevel={5}
                label="Teacher"
                name="teacherId"
                labelClassName="!font-bold"
                placeholder="Select Teacher"
                options={teachers?.data?.result?.map((teacher: any) => ({
                  value: teacher._id,
                  label: teacher.name,
                }))}
                rules={[{ required: true, message: "Teacher is required" }]}
              />

              <ReuseInput
                inputType="textarea"
                rows={4}
                Typolevel={5}
                label="Instruction"
                name="instruction"
                placeholder="Enter instruction"
                rules={[{ required: true, message: "instruction is required" }]}
              />

              <ReuseButton
                htmlType="submit"
                variant="secondary"
                className="w-full mt-4"
              >
                Add Exam
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddExamModal;
