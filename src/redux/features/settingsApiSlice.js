import { MdOtherHouses } from "react-icons/md";
import { apiSlice } from "../app/api/apiSlice";

export const savedApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Settings"],
  endpoints: (builder) => ({
    settings: builder.query({
      query: () => ({
        url: "/settings",
      }),
      invalidatesTags: ["Settings"],
      providesTags: ["Settings"],
    }),

    updateSettings: builder.mutation({
      query: (data) => ({
        url: "/settings/update",
        method: "PUT",
        body: { ...data },
      }),
      invalidatesTags: ["Settings"],
      providesTags: ["Settings"],
    }),
  }),
});

export const { useSettingsQuery, useUpdateSettingsMutation } = savedApiSlice;
