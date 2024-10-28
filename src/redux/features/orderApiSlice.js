import { apiSlice } from "../app/api/apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    orders: builder.query({
      query: () => ({
        url: "/orders",
      }),
      invalidatesTags: ["Orders"],
      providesTags: ["Orders"],
    }),

    ordersByUserId: builder.query({
      query: () => ({
        url: "/orders/by-user-id",
      }),
      invalidatesTags: ["Orders"],
      providesTags: ["Orders"],
    }),

    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Orders"],
      providesTags: ["Orders"],
    }),
  }),
});

export const {
  useOrdersQuery,
  useOrdersByUserIdQuery,
  useCreateOrderMutation,
} = orderApiSlice;
