import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const conversation_url = "/conversation";

const conversationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getConversationList: build.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: `${conversation_url}`,
          method: "GET",
          params: {
            page,
            limit,
            searchTerm,
          },
        };
      },
      providesTags: [tagTypes.conversation],
    }),
    getConversationMessageList: build.query({
      query: ({ id }) => ({
        url: `${conversation_url}/messages/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.conversation],
    }),
  }),
});

export const {
  useGetConversationListQuery,
  useGetConversationMessageListQuery,
} = conversationApi;

export default conversationApi;
