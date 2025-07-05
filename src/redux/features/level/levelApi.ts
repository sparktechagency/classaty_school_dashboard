import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const level_url = "/level";

const levelApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getLevel: build.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: `${level_url}`,
          method: "GET",
          params: {
            page,
            limit,
            searchTerm,
          },
        };
      },
      providesTags: [tagTypes.level],
    }),
    addLevel: build.mutation({
      query: (req) => ({
        url: `${level_url}/create`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.level],
    }),
    updateLevel: build.mutation({
      query: (req) => ({
        url: `${level_url}/${req?.params}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.level],
    }),
    deleteLevel: build.mutation({
      query: (req) => ({
        url: `${level_url}/${req?.params}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.level],
    }),
  }),
});

export const {
  useGetLevelQuery,
  useAddLevelMutation,
  useUpdateLevelMutation,
  useDeleteLevelMutation,
} = levelApi;

export default levelApi;
