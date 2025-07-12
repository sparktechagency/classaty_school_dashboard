import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const exam_url = "/exam";

const examApi = baseApi.injectEndpoints({
    endpoints: (build) => ({


        createExam: build.mutation({
            query: (req) => ({
                url: `${exam_url}/create`,
                method: "POST",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.exam],
        }),


        getAllExams: build.query({
            query: ({ page, limit, searchTerm, termsId }) => {
                return {
                    url: `${exam_url}/${termsId}`,
                    method: "GET",
                    params: {
                        page,
                        limit,
                        searchTerm,
                    },
                };
            },
            providesTags: [tagTypes.exam],
        }),

        updateExam: build.mutation({
            query: (req) => ({
                url: `${exam_url}/${req?.params}`,
                method: "PATCH",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.exam],
        }),

        deleteExam: build.mutation({
            query: (req) => ({
                url: `${exam_url}/${req?.params}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.exam],
        }),
    }),
});

export const {
    useGetAllExamsQuery,
    useCreateExamMutation,
    useUpdateExamMutation,
    useDeleteExamMutation,
} = examApi;

export default examApi;
