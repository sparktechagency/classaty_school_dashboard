/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Form } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseSelect from "../../Form/ReuseSelect";
import ReuseButton from "../../Button/ReuseButton";
import SpinLoader from "../../Spiner";
import {
  useAddSupervisorMutation,
  useAllTeacherQuery,
} from "../../../redux/features/classRoutine/classRoutineApi";
import useUserData from "../../../hooks/useUserData";
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
  }[];
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

  const [form] = Form.useForm();

  // Previous supervisors (existing + newly added)
  const [prevSelected, setPrevSelected] = useState<string[]>(
    supervisor?.map((s) => s.teacherId) || []
  );

  // Track removed supervisors
  const [removedSupervisors, setRemovedSupervisors] = useState<string[]>([]);

  // Track newly added supervisors
  const [newlyAdded, setNewlyAdded] = useState<string[]>([]);

  // Pre-fill selected supervisors
  useEffect(() => {
    if (!supervisor || !allTeacher) return;

    const initialIds = supervisor.map((s) => s.teacherId);
    form.setFieldsValue({ supervisors: initialIds });
    setPrevSelected(initialIds);
  }, [form, supervisor, allTeacher]);

  // Track selection changes
  const handleSelectChange = (currentSelected: string[]) => {
    // Multiple removed
    const removed = prevSelected.filter((id) => !currentSelected.includes(id));
    if (removed.length) {
      setRemovedSupervisors((prev) => [...prev, ...removed]);
    }

    // Multiple newly added
    const added = currentSelected.filter((id) => !prevSelected.includes(id));
    setNewlyAdded((prev) => [...prev, ...added]);

    // Update prevSelected for next comparison
    setPrevSelected(currentSelected);
  };

  // Handle submit
  const handleSubmit = () => {
    const superVisorsArray = newlyAdded.map((id) => {
      const teacher = allTeacher.find((t: any) => t.userId === id);
      return { teacherId: id, teacherName: teacher?.name };
    });

    tryCatchWrapper(
      addSupervisor,
      {
        body: {
          classId,
          className: classname,
          section,
          superVisors: superVisorsArray, // Only newly added
          removeSupervisors: removedSupervisors, // All removed
        },
      },
      "Updating Supervisors..."
    );
  };

  if (isTeacherFetching) return <SpinLoader />;

  return (
    <div>
      <h3 className="text-3xl font-bold text-secondary-color mb-5 mt-10">
        Supervisor
      </h3>
      <ReusableForm form={form} handleFinish={handleSubmit}>
        <ReuseSelect
          placeholder="Select Supervisors"
          label="Supervisors"
          name="supervisors"
          options={teacherOptions}
          mode="multiple"
          onChange={handleSelectChange}
          rules={[{ required: true, message: "Supervisors are required" }]}
        />
        <ReuseButton variant="secondary" htmlType="submit" className="w-fit">
          Add/Update Supervisors
        </ReuseButton>
      </ReusableForm>
    </div>
  );
};

export default SupervisorSection;
