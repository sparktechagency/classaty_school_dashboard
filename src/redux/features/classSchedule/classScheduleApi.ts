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
            providesTags: [tagTypes.payment],
        }),
    }),
});

export const { useGetAllClassScheduleQuery } = classScheduleApi;

export default classScheduleApi;
