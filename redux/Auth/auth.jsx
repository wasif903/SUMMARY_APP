import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../Config";

const auth = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (date) => ({
        url: "/auth/login",
        method: "POST",
        body: date,
      }),
    }),
    sign_up: builder.mutation({
      query: (date) => ({
        url: "/auth//sign-up",
        method: "POST",
        body: date,
      }),
    }),
    contact: builder.mutation({
      query: (data) => {
        //  const  {query, email, firstName, lastName} = data
        console.log(data);
        return {
          url: "/api/contact",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});
export const { useLoginMutation, useSign_upMutation, useContactMutation } =
  auth;

export default auth;
