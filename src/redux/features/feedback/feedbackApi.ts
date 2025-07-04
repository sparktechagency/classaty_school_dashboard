import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const feedback_url = "/feedback";

const feedbackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFeedback: build.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: `${feedback_url}/feedback_list`,
          method: "GET",
          params: {
            page,
            limit,
            searchTerm,
          },
        };
      },
      providesTags: [tagTypes.payment],
    }),
  }),
});

export const { useGetFeedbackQuery } = feedbackApi;

export default feedbackApi;
