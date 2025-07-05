import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const subject_url = "/subject";

const subjectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSubjectBySchoolId: build.query({
      query: ({ page, limit, searchTerm, schoolId }) => {
        return {
          url: `${subject_url}`,
          method: "GET",
          params: {
            page,
            limit,
            searchTerm,
            schoolId,
          },
        };
      },
      providesTags: [tagTypes.subject],
    }),
    addSubject: build.mutation({
      query: (req) => ({
        url: `${subject_url}/create`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.subject],
    }),
    updateSubject: build.mutation({
      query: (req) => ({
        url: `${subject_url}/action`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.subject],
    }),
    deleteSubject: build.mutation({
      query: (req) => ({
        url: `subject/${req?.params}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.subject],
    }),
  }),
});

export const {
  useGetSubjectBySchoolIdQuery,
  useAddSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
} = subjectApi;

export default subjectApi;
