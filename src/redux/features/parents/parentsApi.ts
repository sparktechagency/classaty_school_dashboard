import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const parents_url = "/student";

const parentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getParents: build.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: `${parents_url}/parents_list`,
          method: "GET",
          params: {
            page,
            limit,
            searchTerm,
          },
        };
      },
      providesTags: [tagTypes.parent],
    }),
    getParantDetails: build.query({
      query: ({ id }) => ({
        url: `${parents_url}/parents_details/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.parent],
    }),
    blockUser: build.mutation({
      query: (req) => ({
        url: `/users/action`,
        method: "PATCH",
        body: req?.body,
      }),
      invalidatesTags: [
        tagTypes.parent,
        tagTypes.user,
        tagTypes.teacher,
        tagTypes.student,
      ],
    }),
  }),
});

export const {
  useGetParentsQuery,
  useGetParantDetailsQuery,
  useBlockUserMutation,
} = parentsApi;

export default parentsApi;
