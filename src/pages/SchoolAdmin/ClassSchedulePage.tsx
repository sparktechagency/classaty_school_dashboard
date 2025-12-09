/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import ClassRoutineTable from "../../ui/Modal/ClassSchedule/ClassRoutineTable";
import {
  useGetAllSujectAndTeacherQuery,
  useGetClassRoutineQuery,
  useSpecificStudentsQuery,
} from "../../redux/features/classRoutine/classRoutineApi";
import { FadeLoader } from "react-spinners";
import ClassStudentTable from "../../ui/Tables/ClassStudentTable";
import { useState } from "react";
import ViewStudentMessageModal from "../../ui/Modal/ClassSchedule/ViewStudentMessageModal";
import SupervisorSection from "../../ui/Modal/ClassSchedule/SupervisorSection";

interface User {
  _id: string;
  name: string;
  phoneNumber: string;
  role: string;
}

interface Teacher {
  _id: string;
  userId: User;
  subjectId: string;
  subjectName: string;
}

export interface ISubjectTeacher {
  subjectId: string;
  subjectName: string;
  schoolId: string;
  schoolName: string;
  teachers: Teacher[];
}

const ClassSchedulePage = () => {
  const [isViewModal, setIsViewModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const setViewModal = (data: any) => {
    setIsViewModal(true);
    setCurrentRecord(data);
  };

  const handleCloseModal = () => {
    setIsViewModal(false);
    setCurrentRecord(null);
  };

  const { classId, classname, section } = useParams<{
    classId: string;
    section: string;
    classname: string;
  }>();

  const { data: classRoutine, isFetching: isClassRoutineFetching } =
    useGetClassRoutineQuery(
      { classId, section },
      {
        skip: !classId || !section,
      }
    );

  const routine = classRoutine?.data?.routine;

  const supervisor = classRoutine?.data?.supervisors;

  const { data: subjects, isFetching: isSubjectFetching } =
    useGetAllSujectAndTeacherQuery(
      {},
      {
        skip: !routine,
      }
    );

  const allSubjectAndTeacher: ISubjectTeacher[] = subjects?.data;

  const { data: students, isFetching: isStudentFetching } =
    useSpecificStudentsQuery({ classId, section });

  const allStudent = students?.data;

  if (isClassRoutineFetching || isSubjectFetching) {
    return (
      <div className="flex justify-center items-center h-[90vh]">
        <FadeLoader color="#28314E" />
      </div>
    );
  }
  return (
    <div className="min-h-[90vh] mt-10">
      <ClassRoutineTable
        initialData={routine}
        allSubjectAndTeacher={allSubjectAndTeacher}
        classId={classId as string}
        section={section as string}
        className={classname as string}
      />
      <SupervisorSection
        supervisor={supervisor}
        classId={classId as string}
        classname={classname as string}
        section={section as string}
      />
      <h3 className="text-3xl font-bold text-secondary-color mb-5 mt-10">
        Students
      </h3>
      <ClassStudentTable
        data={allStudent}
        loading={isStudentFetching}
        showViewModal={setViewModal}
        limit={allStudent?.length}
      />
      <ViewStudentMessageModal
        isViewModalVisible={isViewModal}
        handleCancel={handleCloseModal}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default ClassSchedulePage;
