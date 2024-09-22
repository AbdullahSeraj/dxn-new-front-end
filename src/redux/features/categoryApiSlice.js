import { apiSlice } from "../app/api/apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    categories: builder.query({
      query: () => ({
        url: "/categories",
      }),
      invalidatesTags: ["Category"],
      providesTags: ["Category"],
    }),

    addCategory: builder.mutation({
      query: (data) => ({
        url: "/categories/add",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Category"],
      providesTags: ["Category"],
    }),

    removeCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useCategoriesQuery,
  useAddCategoryMutation,
  useRemoveCategoryMutation,
} = categoryApiSlice;
