import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const attendance_url = "/attendance";

const attendanceApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        getAllAttendances: build.query({
            query: ({ page, limit, searchTerm }) => {
                return {
                    url: `${attendance_url}/history`,
                    method: "GET",
                    params: {
                        page,
                        limit,
                        searchTerm,
                    },
                };
            },
            providesTags: [tagTypes.attendance],
        }),

        getAttendanceDetails: build.query({
            query: ({ id }) => ({
                url: `${attendance_url}/details/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.attendance],
        }),

    }),
});

export const {
    useGetAllAttendancesQuery,
    useGetAttendanceDetailsQuery
} = attendanceApi;

export default attendanceApi;
