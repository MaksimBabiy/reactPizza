import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type FetchPizzasType = {
  currentPage: number;
  category: string;
  search: string;
  sortBy: string;
  sortVectorURL: string;
};

export const pizzaApi = createApi({
  reducerPath: "pizzaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://63d025cde52f587829ad02f3.mockapi.io/",
  }),
  endpoints: (builder) => ({
    getPizzas: builder.query<any, FetchPizzasType>({
      query: ({ currentPage, category, search, sortBy, sortVectorURL }) => {
        return {
          url: `items?page=${currentPage}&limit=4&${category}&${search}&sortBy=${sortBy}&order=${sortVectorURL}`,
        };
      },
    }),
    getPizza: builder.query<any, string>({
      query: (id) => {
        return {
          url: `items/${id}`,
        };
      },
    }),
  }),
});

export const { useGetPizzasQuery, useGetPizzaQuery } = pizzaApi;
