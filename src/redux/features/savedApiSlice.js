import { apiSlice } from "../app/api/apiSlice";

export const savedApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Saved"],
  endpoints: (builder) => ({
    saved: builder.query({
      query: () => ({
        url: "/saved",
      }),
      invalidatesTags: ["Saved"],
      providesTags: ["Saved"],
    }),

    addSaved: builder.mutation({
      query: (data) => ({
        url: "/saved/add",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Saved"],
      providesTags: ["Saved"],
    }),

    deleteSaved: builder.mutation({
      query: (id) => ({
        url: `/saved/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Saved"],
      providesTags: ["Saved"],
    }),

    isSaved: builder.query({
      query: (id) => ({
        url: `/saved/is-saved/${id}`,
      }),
      invalidatesTags: ["Saved"],
      providesTags: ["Saved"],
    }),
  }),
});

export const {
  useSavedQuery,
  useAddSavedMutation,
  useDeleteSavedMutation,
  useIsSavedQuery,
} = savedApiSlice;
