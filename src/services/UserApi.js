import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserApi = createApi({
  reducerPath: "User",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/user/" }),
  endpoints: (builder) => ({
    Register: builder.mutation({
      query: (body) => {
        return {
          url: "register",
          method: "POST",
          body: body,
          headers: {
            "content-type": "application/json",
          },
        };
      },
    }),
    Login: builder.mutation({
      query: (body) => {
        return {
          url: "login",
          method: "POST",
          body: body,
          headers: {
            "content-type": "application/json",
          },
        };
      },
    }),
    GetUser: builder.query({
      query: (token) => {
        return {
          url: "profile",
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    UpdateProfilePic: builder.mutation({
      query: ({ token, formData }) => {
        console.log(formData);
        return {
          url: "updateprofilepic",
          method: "PUT",
          body: formData,
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserQuery,
  useUpdateProfilePicMutation,
} = UserApi;
