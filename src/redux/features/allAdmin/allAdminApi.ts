import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const allAdmin_url = "/users";

const allAdminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addAdmin: build.mutation({
      query: (req) => ({
        url: `${allAdmin_url}/create_admin`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.allAdmin],
    }),
    getAdmin: build.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: `${allAdmin_url}`,
          method: "GET",
          params: {
            page,
            limit,
            searchTerm,
          },
        };
      },
      providesTags: [tagTypes.allAdmin],
    }),
    updateAdmin: build.mutation({
      query: (req) => ({
        url: `${allAdmin_url}/${req?.params}`,
        method: "PATCH",
        body: req?.body,
      }),
      invalidatesTags: [tagTypes.allAdmin],
    }),
    deleteAdmin: build.mutation({
      query: (req) => ({
        url: `${allAdmin_url}/${req?.params}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.allAdmin],
    }),
  }),
});

export const {
  useAddAdminMutation,
  useGetAdminQuery,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = allAdminApi;

export default allAdminApi;
