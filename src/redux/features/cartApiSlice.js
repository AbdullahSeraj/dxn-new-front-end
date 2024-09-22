import { apiSlice } from "../app/api/apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: "/cart",
      }),
      invalidatesTags: ["Cart"],
      providesTags: ["Cart"],
    }),

    addCart: builder.mutation({
      query: (data) => ({
        url: "/cart/add",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Cart"],
      providesTags: ["Cart"],
    }),

    deleteCart: builder.mutation({
      query: (id) => ({
        url: `/cart/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
      providesTags: ["Cart"],
    }),

    clearCart: builder.mutation({
      query: () => ({
        url: "/cart/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
      providesTags: ["Cart"],
    }),

    updateCart: builder.mutation({
      query: ({ id, data }) => ({
        url: `/cart/update/${id}`,
        method: "PUT",
        body: { ...data },
      }),
      invalidatesTags: ["Cart"],
      providesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddCartMutation,
  useDeleteCartMutation,
  useClearCartMutation,
  useUpdateCartMutation,
} = cartApiSlice;
