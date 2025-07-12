import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const school_url = "/school";

const schoolApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addSchool: build.mutation({
      query: (req) => ({
        url: `${school_url}/create`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.school],
    }),

    getSchool: build.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: `${school_url}/school_list`,
          method: "GET",
          params: {
            page,
            limit,
            searchTerm,
          },
        };
      },
      providesTags: [tagTypes.school],
    }),

    getAttendanceChartData: build.query({
      query: ({ year }) => {

        console.log(year, "year in redux");
        return {
          url: `/overview/student_attendance`,
          method: "GET",
          params: {
            year,
          },
        };
      },
      providesTags: [tagTypes.school],
    }),

    getTotalOfOverview: build.query({
      query: () => {
        return {
          url: `/users/count_total`,
          method: "GET"
        };
      },
      providesTags: [tagTypes.school],
    }),

    getAllStudents: build.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: `${school_url}/all_students`,
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

    getResultOfStudent: build.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: `${school_url}/result_of_students`,
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

    getResultBaseOnTermsAndStudentId: build.query({
      query: ({ page, limit, searchTerm, termsId, studentId }) => {
        return {
          url: `/terms/result/get_result_based_on_terms/${termsId}`,
          method: "GET",
          params: {
            page,
            limit,
            searchTerm,
            studentId
          },
        };
      },
      providesTags: [tagTypes.student],
    }),

    getNotification: build.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: `/notification`,
          method: "GET",
          params: {
            page,
            limit,
            searchTerm,
          },
        };
      },
      providesTags: [tagTypes.school],
    }),

    updateSchool: build.mutation({
      query: (req) => ({
        url: `${school_url}/edit_school/${req?.params}`,
        method: "PATCH",
        body: req?.body,
      }),
      invalidatesTags: [tagTypes.school],
    }),

    deleteSchool: build.mutation({
      query: (req) => ({
        url: `${school_url}/delete_school/${req?.params}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.school],
    }),
  }),
});

export const {
  useAddSchoolMutation,
  useGetSchoolQuery,
  useGetAttendanceChartDataQuery,
  useGetResultOfStudentQuery,
  useUpdateSchoolMutation,
  useGetResultBaseOnTermsAndStudentIdQuery,
  useGetNotificationQuery,
  useGetAllStudentsQuery,
  useGetTotalOfOverviewQuery,
  useDeleteSchoolMutation,
} = schoolApi;

export default schoolApi;
