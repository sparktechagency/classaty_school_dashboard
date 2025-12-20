/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useMemo, memo, useRef } from "react";
import {
  TimePicker,
  Button,
  Popconfirm,
  Form,
  Modal,
  Input,
  Switch,
} from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import clsx from "clsx";
import ReusableForm from "../../Form/ReuseForm";
import ReuseSelect from "../../Form/ReuseSelect";
import { FadeLoader } from "react-spinners";
import { ISubjectTeacher } from "../../../pages/SchoolAdmin/ClassSchedulePage";
import useUserData from "../../../hooks/useUserData";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import {
  useAddClassRoutineMutation,
  useRemoveAPeriodMutation,
} from "../../../redux/features/classRoutine/classRoutineApi";
import ReuseButton from "../../Button/ReuseButton";

const DAYS_ORDER = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
] as const;

interface Period {
  periodNumber: number;
  name: string;
  startTime: string;
  endTime: string;
  isBreak: boolean;
}

interface RoutineData {
  _id: string;
  section: string;
  periods: Period[];
  routines: Array<{ day: string; periods: any[] }>;
}

interface Props {
  initialData: RoutineData;
  allSubjectAndTeacher: ISubjectTeacher[];
  classId: string;
  className: string;
  section: string;
}

// Memoized TimePicker cell
const TimeCell = memo(
  ({
    period,
    field,
    updateTime,
  }: {
    period: Period;
    field: "startTime" | "endTime";
    updateTime: (
      periodNumber: number,
      field: "startTime" | "endTime",
      time: dayjs.Dayjs | null
    ) => void;
  }) => (
    <TimePicker
      format="HH:mm"
      value={dayjs(period[field], "HH:mm")}
      onChange={(t) => updateTime(period.periodNumber, field, t)}
      size="small"
      className="w-24"
    />
  )
);

// Memoized Subject Select cell
const SubjectCell = memo(
  ({
    fieldName,
    isBreak,
    onSubjectChange,
    options,
  }: {
    fieldName: string;
    isBreak: boolean;
    options: { value: string; label: string }[];
    onSubjectChange: (value: string | null) => void;
  }) =>
    isBreak ? (
      <span className="text-5xl text-gray-400 select-none">—</span>
    ) : (
      <ReuseSelect
        name={fieldName}
        options={options}
        placeholder="Select Subject"
        fromItemClass="!mb-0"
        onChange={(val) => onSubjectChange(val)}
      />
    )
);

export default function ClassRoutineTable({
  initialData,
  allSubjectAndTeacher,
  classId,
  className,
  section,
}: Props) {
  const [removePeriod] = useRemoveAPeriodMutation();
  const [updateClassRoutine] = useAddClassRoutineMutation();
  const user = useUserData();
  const [periods, setPeriods] = useState<Period[]>([]);
  const [form] = Form.useForm();
  const [selectedSubjects, setSelectedSubjects] = useState<
    { value: string; label: string }[]
  >([]);
  const [subjectTeacherMap, setSubjectTeacherMap] = useState<
    Record<string, { teacherId: string; teacherName: string } | null>
  >({});
  const [isLoading, setIsLoading] = useState(true);

  // Refs to track initial state
  const initialValuesRef = useRef<Record<string, string>>({});
  const initialTeacherMapRef = useRef<typeof subjectTeacherMap>({});
  const initialPeriodsRef = useRef<Period[]>([]);

  // Subject options from allSubjectAndTeacher
  const SUBJECT_OPTIONS = useMemo(
    () =>
      allSubjectAndTeacher?.map((s) => ({
        value: s.subjectId,
        label: s.subjectName,
      })),
    [allSubjectAndTeacher]
  );

  // Prepare initial form values including teachers
  const initialValues = useMemo(() => {
    const values: Record<string, string> = {};
    if (!initialData) return values;

    DAYS_ORDER.forEach((day) => {
      const routine = initialData.routines?.find(
        (r) => r.day.toLowerCase() === day
      );
      if (routine) {
        routine.periods.forEach((p) => {
          if (!p.isBreak && p.subjectId) {
            const fieldName = `${day}_period_${p.periodNumber}`;
            values[fieldName] = p.subjectId;

            // include teacherId if available
            if (p?.teacherId) {
              values[fieldName + "_teacher"] = p?.teacherId;
            }
          }
        });
      }
    });
    return values;
  }, [initialData]);

  useEffect(() => {
    if (!initialData) return;

    setPeriods(initialData.periods);
    initialPeriodsRef.current = initialData.periods;

    // Set initial form values
    form.setFieldsValue(initialValues);
    initialValuesRef.current = initialValues;

    // Build unique subjects for teacher selects
    const uniqueSubjects: { value: string; label: string }[] = [];
    Object.keys(initialValues).forEach((key) => {
      if (!key.endsWith("_teacher")) {
        const subjectId = initialValues[key];
        if (!uniqueSubjects.find((s) => s.value === subjectId)) {
          const option = SUBJECT_OPTIONS.find((o) => o.value === subjectId);
          if (option) uniqueSubjects.push(option);
        }
      }
    });
    setSelectedSubjects(uniqueSubjects);

    // Map subjectId → teacherId for teacher select
    const teacherMap: typeof subjectTeacherMap = {};
    Object.keys(initialValues).forEach((key) => {
      if (key.endsWith("_teacher")) {
        const subjectKey = key.replace("_teacher", "");
        const subjectId = initialValues[subjectKey];
        const teacherId = initialValues[key];
        const teacherName =
          allSubjectAndTeacher
            .find((s) => s.subjectId === subjectId)
            ?.teachers.find((t) => t?.userId?._id === teacherId)?.userId.name ||
          "";
        teacherMap[subjectId] = { teacherId, teacherName };
      }
    });
    setSubjectTeacherMap(teacherMap);
    initialTeacherMapRef.current = teacherMap;

    setIsLoading(false);
  }, [initialData, form, initialValues, SUBJECT_OPTIONS, allSubjectAndTeacher]);

  // Set teacher initial values in form
  useEffect(() => {
    const teacherValues: Record<string, string | null> = {};
    selectedSubjects.forEach((subject) => {
      const teacherId = subjectTeacherMap[subject.value]?.teacherId || null;
      teacherValues[subject.value + "_teacher"] = teacherId;
    });
    form.setFieldsValue(teacherValues);
  }, [selectedSubjects, subjectTeacherMap, form]);

  // Update period times
  const updateTime = (
    periodNumber: number,
    field: "startTime" | "endTime",
    time: dayjs.Dayjs | null
  ) => {
    if (!time) return;
    setPeriods((prev) =>
      prev?.map((p) =>
        p.periodNumber === periodNumber
          ? { ...p, [field]: time.format("HH:mm") }
          : p
      )
    );
  };

  // === Modal state for Add Period ===
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPeriodData, setNewPeriodData] = useState({
    name: "__",
    startTime: "08:00",
    endTime: "08:40",
    isBreak: false,
  });

  const openAddPeriodModal = () => {
    setNewPeriodData({
      name: "",
      startTime: "08:00",
      endTime: "08:40",
      isBreak: false,
    });
    setIsModalOpen(true);
  };

  const handleAddPeriod = () => {
    let periodNumber: number;
    if (!newPeriodData.isBreak) {
      // sequential normal periods
      periodNumber = periods.filter((p) => !p.isBreak).length + 1;
      newPeriodData.name = newPeriodData.name
        ? newPeriodData.name
        : `Period ${periodNumber}`;
    } else {
      // break periods: 00, 000, 0000 ...
      const breakCount = periods.filter((p) => p.isBreak).length;
      periodNumber = parseInt("0".repeat(breakCount + 2));
      newPeriodData.name = `Break ${breakCount + 1}`;
    }

    const newPeriod: Period = {
      periodNumber,
      ...newPeriodData,
    };

    console.log(newPeriod);

    setPeriods((prev) => [...prev, newPeriod]);
    setIsModalOpen(false);
  };

  const deletePeriod = async (periodNumber: number) => {
    const res = await tryCatchWrapper(
      removePeriod,
      {
        body: {
          classId: classId,
          section: section,
          periodNumber: periodNumber,
        },
      },
      "Deleting period..."
    );
    if (res?.statusCode === 200) {
      setPeriods((prev) => prev.filter((p) => p.periodNumber !== periodNumber));
    }
  };

  // Subject select handler
  const handleSubjectChange = (val: string | null) => {
    if (!val) return;
    const option = SUBJECT_OPTIONS.find((o) => o.value === val);
    if (!option) return;
    setSelectedSubjects((prev) => {
      const exists = prev.find((s) => s.value === val);
      if (exists) return prev;
      return [...prev, option];
    });
    setSubjectTeacherMap((prev) => ({
      ...prev,
      [val]: prev[val] || null,
    }));
  };

  // Save handler (same as before)
  const handleSave = () => {
    const values = form.getFieldsValue();
    console.log(values);

    const changedSubjects: Record<string, string> = {};
    Object.keys(values).forEach((key) => {
      if (
        !key.endsWith("_teacher") &&
        values[key] !== initialValuesRef.current[key]
      ) {
        changedSubjects[key] = values[key];
      }
    });

    const changedTeachers: Record<string, (typeof subjectTeacherMap)[string]> =
      {};
    Object.keys(subjectTeacherMap).forEach((subId) => {
      const initialTeacher = initialTeacherMapRef.current[subId];
      const currentTeacher = subjectTeacherMap[subId];
      if (JSON.stringify(initialTeacher) !== JSON.stringify(currentTeacher)) {
        changedTeachers[subId] = currentTeacher;
      }
    });

    const changedPeriods = periods.filter((p, i) => {
      const initial = initialPeriodsRef.current[i];
      return (
        !initial ||
        p.name !== initial.name ||
        p.startTime !== initial.startTime ||
        p.endTime !== initial.endTime ||
        p.isBreak !== initial.isBreak
      );
    });

    const routinePayload = DAYS_ORDER.flatMap((day) => {
      const dayRoutine = initialData.routines.find(
        (r) => r.day.toLowerCase() === day
      )?.periods;

      return periods
        .map((p) => {
          const fieldName = `${day}_period_${p.periodNumber}`;
          const subjectId = values[fieldName];

          // skip if subject is not selected
          if (!subjectId) return null;

          const teacherId = values[`${subjectId}_teacher`] || null;
          const teacherName = subjectTeacherMap[subjectId]?.teacherName;

          // skip if teacherName is missing
          if (!teacherName) return null;

          const initialPeriod = dayRoutine?.find(
            (ip) => ip.periodNumber === p.periodNumber
          );

          // skip if nothing changed
          if (
            initialPeriod &&
            initialPeriod.subjectId === subjectId &&
            initialPeriod.teacherId === teacherId
          ) {
            return null;
          }

          return {
            day,
            periodNumber: p.periodNumber,
            subjectId,
            subjectName: teacherName, // assign teacherName as subjectName if needed
            teacherId,
            teacherName,
          };
        })
        .filter(Boolean);
    });

    console.log(routinePayload);

    const payload = {
      schoolId: user?.schoolId,
      classId,
      className,
      section,
      periods: changedPeriods?.map((p) => ({
        periodNumber: p.periodNumber,
        periodName: p.name,
        startTime: p.startTime,
        endTime: p.endTime,
        isBreak: p.isBreak,
      })),
      routine: routinePayload,
      addedStudents: [],
      superVisor: null,
    };

    tryCatchWrapper(updateClassRoutine, { body: payload }, "Updating...");
  };

  if (!initialData) return null;
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[90vh]">
        <FadeLoader color="#28314E" />
      </div>
    );
  }

  return (
    <div>
      <ReusableForm form={form} handleFinish={handleSave}>
        {/* === Table === */}
        <h3 className="text-3xl font-bold text-secondary-color mb-5 mt-10">
          Class Timeline
        </h3>
        <div className="overflow-x-auto rounded-xl border border-gray-300 bg-white">
          <table className="min-w-max">
            <thead>
              <tr className="bg-secondary-color text-white">
                <th
                  rowSpan={2}
                  className="sticky -left-0.5 z-20 w-40 px-8 py-6 text-left font-bold border-r-4 border-[#002140] bg-secondary-color"
                >
                  Day
                </th>
                {periods?.map((p) => (
                  <th
                    key={p.periodNumber}
                    className={clsx(
                      "px-6 py-4 text-center font-bold border-r border-gray-600",
                      p.isBreak && "bg-gray-700"
                    )}
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-lg">
                        {p?.isBreak ? "Break" : p.name}
                      </span>
                      <Popconfirm
                        title="Delete?"
                        onConfirm={() => deletePeriod(p.periodNumber)}
                      >
                        <Button
                          type="text"
                          danger
                          size="small"
                          icon={<DeleteOutlined />}
                          className="text-white"
                        />
                      </Popconfirm>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <TimeCell
                        period={p}
                        field="startTime"
                        updateTime={updateTime}
                      />
                      <span className="text-gray-400">–</span>
                      <TimeCell
                        period={p}
                        field="endTime"
                        updateTime={updateTime}
                      />
                    </div>
                  </th>
                ))}
                <th rowSpan={2} className="w-52 bg-secondary-color px-6 py-6">
                  <Button
                    icon={<PlusOutlined />}
                    onClick={openAddPeriodModal}
                    className="bg-green-600 hover:bg-green-700 border-none"
                  >
                    Add Period
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {DAYS_ORDER?.map((day) => (
                <tr key={day} className="border-b hover:bg-gray-50">
                  <td className="sticky left-0 z-10 w-40 px-8 py-6 font-bold text-gray-800 bg-gray-100 border-r-4 border-gray-300">
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </td>
                  {periods?.map((p) => {
                    const fieldName = `${day}_period_${p.periodNumber}`;
                    return (
                      <td
                        key={p.periodNumber}
                        className={clsx(
                          "px-6 py-5 text-center border-r border-gray-300",
                          p.isBreak && "bg-gray-100"
                        )}
                      >
                        <SubjectCell
                          fieldName={fieldName}
                          isBreak={p.isBreak}
                          onSubjectChange={handleSubjectChange}
                          options={SUBJECT_OPTIONS}
                        />
                      </td>
                    );
                  })}
                  <td className="w-52" />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* === Selected Subjects + Teachers === */}
        {selectedSubjects?.length > 0 && (
          <h3 className="text-3xl font-bold text-secondary-color mb-5 mt-10">
            Subject Teacher
          </h3>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {selectedSubjects?.map((subject) => {
            const teacherOptions =
              allSubjectAndTeacher
                .find((s) => s.subjectId === subject.value)
                ?.teachers?.map((t) => ({
                  value: t.userId._id,
                  label: t.userId.name,
                })) || [];
            return (
              <div key={subject.value}>
                <strong>{subject.label}:</strong>
                <ReuseSelect
                  name={subject.value + "_teacher"}
                  options={teacherOptions}
                  placeholder="Select Teacher"
                  onChange={(val) => {
                    const teacher = teacherOptions.find((t) => t.value === val);
                    setSubjectTeacherMap((prev) => ({
                      ...prev,
                      [subject.value]: teacher
                        ? {
                            teacherId: teacher?.value,
                            teacherName: teacher?.label,
                          }
                        : null,
                    }));
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* === Save Button === */}
        <div className="mt-8 text-center">
          <ReuseButton
            variant="secondary"
            icon={<SaveOutlined />}
            htmlType="submit"
          >
            Save Routine
          </ReuseButton>
        </div>
      </ReusableForm>

      {/* === Add Period Modal === */}
      <Modal
        title="Add Period"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleAddPeriod}
      >
        <Form layout="vertical">
          <Form.Item label="Period Name" rules={[{ required: true }]}>
            <Input
              value={newPeriodData.name}
              onChange={(e) =>
                setNewPeriodData({ ...newPeriodData, name: e.target.value })
              }
            />
          </Form.Item>
          <div className="flex items-center gap-5">
            <Form.Item label="Start Time">
              <TimePicker
                value={dayjs(newPeriodData.startTime, "HH:mm")}
                showSecond={false} // seconds hide korar jonne
                onChange={(t) =>
                  t &&
                  setNewPeriodData({
                    ...newPeriodData,
                    startTime: t.format("HH:mm"),
                  })
                }
              />
            </Form.Item>
            <Form.Item label="End Time">
              <TimePicker
                value={dayjs(newPeriodData.endTime, "HH:mm")}
                showSecond={false} // seconds hide korar jonne
                onChange={(t) =>
                  t &&
                  setNewPeriodData({
                    ...newPeriodData,
                    endTime: t.format("HH:mm"),
                  })
                }
              />
            </Form.Item>
          </div>
          <Form.Item label="Is Break">
            <Switch
              checked={newPeriodData.isBreak}
              onChange={(checked) =>
                setNewPeriodData({ ...newPeriodData, isBreak: checked })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
