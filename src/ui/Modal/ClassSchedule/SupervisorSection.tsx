/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import ReusableForm from "../../Form/ReuseForm";
import ReuseSelect from "../../Form/ReuseSelect";
import { Form } from "antd";
import {
  useAddSupervisorMutation,
  useAllTeacherQuery,
} from "../../../redux/features/classRoutine/classRoutineApi";
import useUserData from "../../../hooks/useUserData";
import SpinLoader from "../../Spiner";
import ReuseButton from "../../Button/ReuseButton";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

const SupervisorSection = ({
  supervisor,
  classId,
  classname,
  section,
}: {
  supervisor: {
    _id: string;
    teacherId: string;
    teacherName: string;
  };
  classId: string;
  classname: string;
  section: string;
}) => {
  const [addSupervisor] = useAddSupervisorMutation();
  const user = useUserData();
  const { data: teachers, isFetching: isTeacherFetching } = useAllTeacherQuery({
    id: user?.schoolId,
  });

  const allTeacher = teachers?.data;

  const teacherOptions = allTeacher?.map((t: any) => ({
    value: t?.userId,
    label: t?.name,
  }));

  console.log(allTeacher);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!supervisor) return;
    form.setFieldsValue({
      supervisor: supervisor.teacherId,
    });
  }, [form, supervisor]);
  const handleSubmit = (values: any) => {
    tryCatchWrapper(
      addSupervisor,
      {
        body: {
          classId: classId,
          className: classname,
          section: section,
          teacherId: values.supervisor,
          teacherName: allTeacher?.find(
            (t: any) => t?.userId === values.supervisor
          )?.name,
        },
      },
      "Adding Supervisor..."
    );
  };

  if (isTeacherFetching) {
    return <SpinLoader />;
  }
  return (
    <div>
      <h3 className="text-3xl font-bold text-secondary-color mb-5 mt-10">
        Supervisor
      </h3>
      <ReusableForm form={form} handleFinish={handleSubmit}>
        <ReuseSelect
          label="Supervisor"
          name="supervisor"
          options={teacherOptions}
          rules={[{ required: true, message: "Supervisor is required" }]}
        />
        <ReuseButton variant="secondary" htmlType="submit" className="w-fit">
          Add Supervisor
        </ReuseButton>
      </ReusableForm>
    </div>
  );
};

export default SupervisorSection;
