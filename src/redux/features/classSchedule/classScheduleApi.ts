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
        }),

        editClassSchedule: build.mutation({
            query: (req) => ({
                url: `${class_schedule_api}/update/${req?.params}`,
                method: "PATCH",
                body: req.body,
            }),
            invalidatesTags: [tagTypes.classSchedule],
        }),

        deleteClassSchedule: build.mutation({
            query: (req) => ({
                url: `${class_schedule_api}/delete/${req?.params}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.classSchedule],
        }),
    }),
});

export const { useGetAllClassScheduleQuery, useCreateClassScheduleMutation, useEditClassScheduleMutation, useDeleteClassScheduleMutation } = classScheduleApi;

export default classScheduleApi;
