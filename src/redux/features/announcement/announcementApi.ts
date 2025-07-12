import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";
 
const announcement_url = "/announcement";
 
const announcementApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
 
 
        createAnnouncement: build.mutation({
            query: (req) => ({
                url: `${announcement_url}/create`,
                method: "POST",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.announcement],
        }),
 
 
        getAllAnnouncements: build.query({
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
 
        updateAnnouncement: build.mutation({
            query: (req) => ({
                url: `${announcement_url}/${req?.params}`,
                method: "PATCH",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.announcement],
        }),
 
        deleteAnnouncement: build.mutation({
            query: (req) => ({
                url: `${announcement_url}/${req?.params}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.announcement],
        }),
    }),
});
 
export const {
    useGetAllAnnouncementsQuery,
    useCreateAnnouncementMutation,
    useUpdateAnnouncementMutation,
    useDeleteAnnouncementMutation,
} = announcementApi;
 
export default announcementApi;