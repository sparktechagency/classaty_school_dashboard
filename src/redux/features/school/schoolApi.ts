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
  useUpdateSchoolMutation,
  useDeleteSchoolMutation,
} = schoolApi;

export default schoolApi;
