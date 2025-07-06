import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const class_schedule_api = "/class_schedule";

const classScheduleApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllClassSchedule: build.query({
            query: ({ page, limit, searchTerm }) => {
                return {
                    url: `${class_schedule_api}`,
                    method: "GET",
                    params: {
                        page,
                        limit,
                        searchTerm,
                    },
                };
            },
            providesTags: [tagTypes.classSchedule],
        }),

        createClassSchedule: build.mutation({
            query: (req) => ({
                url: `${class_schedule_api}/create`,
                method: "POST",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.classSchedule],
        })
    }),
});

export const { useGetAllClassScheduleQuery, useCreateClassScheduleMutation } = classScheduleApi;

export default classScheduleApi;
