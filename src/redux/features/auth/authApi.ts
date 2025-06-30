import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const auth_url = "/auth";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (req) => {
        return {
          url: `${auth_url}/login`,
          method: "POST",
          body: req.body,
        };
      },
      invalidatesTags: [tagTypes.auth],
    }),
    otpVerify: build.mutation({
      query: (req) => {
        return {
          url: `${auth_url}/verify_otp`,
          method: "POST",
          body: req.body,
        };
      },
      invalidatesTags: [tagTypes.auth],
    }),
    resendOTP: build.mutation({
      query: () => {
        return {
          url: `${auth_url}/resend_otp`,
          method: "POST",
        };
      },
      invalidatesTags: [tagTypes.auth],
    }),
  }),
});

export const { useLoginMutation, useOtpVerifyMutation, useResendOTPMutation } =
  authApi;

export default authApi;
