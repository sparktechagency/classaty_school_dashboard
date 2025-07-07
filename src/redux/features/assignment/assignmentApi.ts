import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const assignment_url = "/assignment";

const assignmentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllAssignment: build.query({
            query: ({ page, limit, searchTerm, schoolId }) => {
                return {
                    url: `${assignment_url}/all_assignment`,
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

export const {
    useGetAllAssignmentQuery,
} = assignmentApi;

export default assignmentApi;
