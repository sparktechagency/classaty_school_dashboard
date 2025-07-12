import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const terms_url = "/terms";

const termsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({


        createTerm: build.mutation({
            query: (req) => ({
                url: `${terms_url}/create`,
                method: "POST",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.terms],
        }),


        getAllTerms: build.query({
            query: ({ page, limit, searchTerm }) => {
                return {
                    url: `${terms_url}`,
                    method: "GET",
                    params: {
                        page,
                        limit,
                        searchTerm,
                    },
                };
            },
            providesTags: [tagTypes.terms],
        }),

        updateTerm: build.mutation({
            query: (req) => ({
                url: `${terms_url}/${req?.params}`,
                method: "PATCH",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.terms],
        }),

        deleteTerm: build.mutation({
            query: (req) => ({
                url: `${terms_url}/${req?.params}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.terms],
        }),
    }),
});

export const {
    useGetAllTermsQuery,
    useCreateTermMutation,
    useUpdateTermMutation,
    useDeleteTermMutation,
} = termsApi;

export default termsApi;
