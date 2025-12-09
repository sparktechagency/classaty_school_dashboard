import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const classRoutineApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllSujectAndTeacher: build.query({
      query: () => {
        return {
          url: `/subject/with_teachers`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.classSchedule],
    }),
    getClassRoutine: build.query({
      query: ({ classId, section }) => {
        return {
          url: `/class_routine/Specific_class_section`,
          method: "GET",
          params: {
            classId,
            section,
          },
        };
      },
      providesTags: [tagTypes.classSchedule],
    }),
    addClassRoutine: build.mutation({
      query: (req) => ({
        url: `/class_routine/add-or-update-many`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.classSchedule],
    }),
    removeAPeriod: build.mutation({
      query: (req) => ({
        url: `/class_routine/remove`,
        method: "DELETE",
        body: req.body,
      }),
    }),
    specificStudents: build.query({
      query: ({ classId, section }) => {
        return {
          url: `/student/specefic_student_list`,
          method: "GET",
          params: {
            classId,
            section,
          },
        };
      },
    }),
    allTeacher: build.query({
      query: ({ id }) => {
        return {
          url: `/teacher/all/${id}`,
          method: "GET",
        };
      },
    }),
    addSupervisor: build.mutation({
      query: (req) => ({
        url: `/class_section_supervisor/add-many`,
        method: "POST",
        body: req.body,
      }),
    }),
  }),
});

export const {
  useGetAllSujectAndTeacherQuery,
  useGetClassRoutineQuery,
  useAddClassRoutineMutation,
  useRemoveAPeriodMutation,
  useSpecificStudentsQuery,
  useAllTeacherQuery,
  useAddSupervisorMutation,
} = classRoutineApi;

export default classRoutineApi;
