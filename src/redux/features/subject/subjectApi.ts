import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const subject_url = "/subject";

const subjectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSubject: build.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: `${subject_url}`,
          method: "GET",
          params: {
            page,
            limit,
            searchTerm,
          },
        };
      },
      providesTags: [tagTypes.subject],
    }),
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
  }),
});

export const { useGetSubjectQuery, useGetSubjectBySchoolIdQuery } = subjectApi;

export default subjectApi;
