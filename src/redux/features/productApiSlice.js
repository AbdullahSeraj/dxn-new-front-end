import { apiSlice } from "../app/api/apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    products: builder.query({
      query: () => ({
        url: "/products",
      }),
      invalidatesTags: ["Product"],
      providesTags: ["Product"],
    }),

    product: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
      }),
      invalidatesTags: ["Product"],
      providesTags: ["Product"],
    }),

    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products/create",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Product"],
      providesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/update/${id}`,
        method: "PUT",
        body: { ...data },
      }),
      invalidatesTags: ["Product"],
      providesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useProductsQuery,
  useProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
