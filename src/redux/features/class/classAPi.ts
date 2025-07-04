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
  }),
});

export const { useGetClassQuery, useGetClassBySchoolIdQuery } = classApi;

export default classApi;
