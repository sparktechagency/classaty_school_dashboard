import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const grade_system_url = "/grade_system";

const gradeSystemApi = baseApi.injectEndpoints({
    endpoints: (build) => ({


        createGradeSystem: build.mutation({
            query: (req) => ({
                url: `${grade_system_url}/create`,
                method: "POST",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.gradeSystem],
        }),


        getAllGradeSystems: build.query({
            query: ({ page, limit, searchTerm }) => {
                return {
                    url: `${grade_system_url}`,
                    method: "GET",
                    params: {
                        page,
                        limit,
                        searchTerm,
                    },
                };
            },
            providesTags: [tagTypes.gradeSystem],
        }),

        updateGradeSystem: build.mutation({
            query: (req) => ({
                url: `${grade_system_url}/update/${req?.params}`,
                method: "PATCH",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.gradeSystem],
        }),

        deleteGradeSystem: build.mutation({
            query: (req) => ({
                url: `${grade_system_url}/${req?.params}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.gradeSystem],
        }),
    }),
});

export const {
    useGetAllGradeSystemsQuery,
    useCreateGradeSystemMutation,
    useUpdateGradeSystemMutation,
    useDeleteGradeSystemMutation,
} = gradeSystemApi;

export default gradeSystemApi;
