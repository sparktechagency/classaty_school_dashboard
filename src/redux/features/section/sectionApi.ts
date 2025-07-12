import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const section_url = "/class";

const sectionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSection: build.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: `${section_url}/school/section`,
          method: "GET",
          params: {
            page,
            limit,
            searchTerm,
          },
        };
      },
      providesTags: [tagTypes.section],
    }),
    
    getSectionByClassId: build.query({
      query: ({ page, limit, searchTerm, classId }) => {
        return {
          url: `${section_url}/school/section/${classId}`,
          method: "GET",
          params: {
            page,
            limit,
            searchTerm,
          },
        };
      },
      providesTags: [tagTypes.section],
    }),
  }),
});

export const { useGetSectionQuery, useGetSectionByClassIdQuery } = sectionApi;

export default sectionApi;
