import { apiSlice } from "../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    users: builder.query({
      query: () => "/users",
      invalidatesTags: ["Users"],
      providesTags: ["Users"],
    }),

    getUser: builder.query({
      query: (id) => `/users/${id}`,
      invalidatesTags: ["Users"],
      providesTags: ["Users"],
    }),

    getProfile: builder.query({
      query: () => "/users/profile",
      invalidatesTags: ["Users"],
      providesTags: ["Users"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/users/update-profile",
        method: "PUT",
        body: { ...data },
      }),
      invalidatesTags: ["Users"],
      providesTags: ["Users"],
    }),

    updateRoleUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/update-role/${id}`,
        method: "PUT",
        body: { ...data },
      }),
      invalidatesTags: ["Users"],
      providesTags: ["Users"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useUsersQuery,
  useGetUserQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateRoleUserMutation,
  useDeleteUserMutation,
} = userApiSlice;
