import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const teacher_url = "/teacher";

const teacherApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addTeacher: build.mutation({
      query: (req) => ({
        url: `${teacher_url}/create`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.teacher],
    }),
    getTeacher: build.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: `${teacher_url}/teacher_list`,
          method: "GET",
          params: {
            page,
            limit,
            searchTerm,
          },
        };
      },
      providesTags: [tagTypes.teacher],
    }),
    updateTeacher: build.mutation({
      query: (req) => ({
        url: `${teacher_url}/edit_teacher/${req?.params}`,
        method: "PATCH",
        body: req?.body,
      }),
      invalidatesTags: [tagTypes.teacher],
    }),
    deleteTeacher: build.mutation({
      query: (req) => ({
        url: `${teacher_url}/delete_teacher/${req?.params}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.teacher],
    }),
  }),
});

export const {
  useAddTeacherMutation,
  useGetTeacherQuery,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} = teacherApi;

export default teacherApi;
