import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const earning_url = "/payment";

const earningApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getEarning: build.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: `${earning_url}/payment_list`,
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

export const { useGetEarningQuery } = earningApi;

export default earningApi;
