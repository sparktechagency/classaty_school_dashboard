import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const announcement_url = "/announcement";

const announcementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addAnnouncement: build.mutation({
      query: (req) => ({
        url: `${announcement_url}/create`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.announcement],
    }),
    getAnnouncement: build.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: `${announcement_url}`,
          method: "GET",
          params: {
            page,
            limit,
            searchTerm,
          },
        };
      },
      providesTags: [tagTypes.announcement],
    }),
  }),
});

export const { useAddAnnouncementMutation, useGetAnnouncementQuery } =
  announcementApi;

export default announcementApi;
