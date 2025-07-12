import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const student_url = "/student";

const studentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addStudent: build.mutation({
      query: (req) => ({
        url: `${student_url}/create`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.student],
    }),

    getStudent: build.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: `${student_url}/student_list`,
          method: "GET",
          params: {
            page,
            limit,
            searchTerm,
          },
        };
      },
      providesTags: [tagTypes.student],
    }),

    editStudentInfo: build.mutation({
      query: (req) => {
        return {
          url: `${student_url}/edit_student/${req?.params?.studentId}`,
          method: "PATCH",
          body: req?.body,
        }
      },
      invalidatesTags: [tagTypes.student],
    }),

    userAction : build.mutation({
      query: (req) => {
        return {
          url: `/users/action`,
          method: "PATCH",
          body: req?.body,
        }
      },
      invalidatesTags: [tagTypes.student, tagTypes.parent, tagTypes.teacher , tagTypes.manager],
    }),

    deleteStudent: build.mutation({
      query: (req) => ({
        url: `${student_url}/delete_student/${req?.params}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.student],
    }),
  }),
});

export const {
  useAddStudentMutation,
  useGetStudentQuery,
  useDeleteStudentMutation,
  useUserActionMutation,
  useEditStudentInfoMutation,
} = studentApi;

export default studentApi;
