import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserChart: builder.query({
      query: ({ role }) => ({
        url: `/users/user_overview?role=${role}`,
        method: "GET",
        // params: { role },
      }),
      providesTags: [tagTypes.adminOverview, tagTypes.user],
    }),
    getCounts: builder.query({
      query: () => ({
        url: `/users/count_total`,
        method: "GET",
      }),
      providesTags: [tagTypes.adminOverview],
    }),

    createStaticContent: builder.mutation({
      query: (req) => ({
        url: `/static_content/create`,
        method: "POST",
        body: req,
      }),
      invalidatesTags: [tagTypes.staticContent],
    }),
    getStaticContent: builder.query({
      query: ({ type }) => ({
        url: `/static_content?type=${type}`,
        method: "GET",
      }),
      providesTags: [tagTypes.staticContent],
    }),
  }),
});

export const {
  useGetUserChartQuery,
  useGetCountsQuery,
  useGetStaticContentQuery,
  useCreateStaticContentMutation,
} = overviewApi;
