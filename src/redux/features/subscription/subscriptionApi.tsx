import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscription: builder.query({
      query: () => ({
        url: `/subscription`,
        method: "GET",
      }),
      providesTags: [tagTypes.subscription],
    }),
    addSubscription: builder.mutation({
      query: (req) => ({
        url: `/subscription/create`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.subscription],
    }),
    updateSubscription: builder.mutation({
      query: (req) => ({
        url: `/subscription/${req?.params}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.subscription],
    }),
    deleteSubscription: builder.mutation({
      query: (req) => ({
        url: `/subscription/${req?.params}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.subscription],
    }),
  }),
});

export const {
  useGetSubscriptionQuery,
  useAddSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
} = subscriptionApi;
