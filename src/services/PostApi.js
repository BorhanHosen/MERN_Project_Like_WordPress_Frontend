import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PostApi = createApi({
  reducerPath: "Post",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/post/" }),
  endpoints: (builder) => ({
    CreatePost: builder.mutation({
      query: ({ token, formData }) => {
        return {
          url: "createpost",
          method: "POST",
          body: formData,
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const { useCreatePostMutation } = PostApi;
