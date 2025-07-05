import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const assignment_url = "/assignment";

const assignmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAssignment: build.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: `${assignment_url}/all_assignment`,
          method: "GET",
          params: {
            page,
            limit,
            searchTerm,
          },
        };
      },
      providesTags: [tagTypes.assignment],
    }),
  }),
});

export const { useGetAssignmentQuery } = assignmentApi;

export default assignmentApi;
