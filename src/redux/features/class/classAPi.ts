import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const class_url = "/class";

const classApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getClass: build.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: `${class_url}/school`,
          method: "GET",
          params: {
            page,
            limit,
            searchTerm,
          },
        };
      },
      providesTags: [tagTypes.class],
    }),
    getClassBySchoolId: build.query({
      query: ({ page, limit, searchTerm, schoolId }) => {
        return {
          url: `${class_url}/school`,
          method: "GET",
          params: {
            page,
            limit,
            searchTerm,
            schoolId,
          },
        };
      },
      providesTags: [tagTypes.class],
    }),
    getClassByLevelId: build.query({
      query: ({ page, limit, searchTerm, levelId }) => {
        return {
          url: `${class_url}/${levelId}`,
          method: "GET",
          params: {
            page,
            limit,
            searchTerm,
          },
        };
      },
      providesTags: [tagTypes.class],
    }),
    addClass: build.mutation({
      query: (req) => ({
        url: `${class_url}/create`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.class],
    }),
    updateClass: build.mutation({
      query: (req) => ({
        url: `${class_url}/${req?.params}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.class],
    }),
    deleteClass: build.mutation({
      query: (req) => ({
        url: `${class_url}/${req?.params}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.class],
    }),
  }),
});

export const {
  useGetClassQuery,
  useGetClassBySchoolIdQuery,
  useGetClassByLevelIdQuery,
  useAddClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
} = classApi;

export default classApi;
