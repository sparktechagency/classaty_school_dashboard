import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const manager_url = "/manager";

const managerApi = baseApi.injectEndpoints({
    endpoints: (build) => ({


        createManager: build.mutation({
            query: (req) => ({
                url: `${manager_url}/create_manager`,
                method: "POST",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.manager],
        }),


        getAllManagers: build.query({
            query: ({ page, limit, searchTerm }) => {
                return {
                    url: `${manager_url}/all_manager`,
                    method: "GET",
                    params: {
                        page,
                        limit,
                        searchTerm,
                    },
                };
            },
            providesTags: [tagTypes.manager],
        }),

        updateManager: build.mutation({
            query: (req) => ({
                url: `${manager_url}/update/${req?.params}`,
                method: "PATCH",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.manager],
        }),

        deleteManager: build.mutation({
            query: (req) => ({
                url: `${manager_url}/delete/${req?.params}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.manager],
        }),
    }),
});

export const {
    useGetAllManagersQuery,
    useCreateManagerMutation,
    useUpdateManagerMutation,
    useDeleteManagerMutation,
} = managerApi;

export default managerApi;
