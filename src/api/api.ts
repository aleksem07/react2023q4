import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const heroesApi = createApi({
  reducerPath: 'heroesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/people' }),
  endpoints: (builder) => ({
    getHeroes: builder.query({
      query: ({ page }) => `?page=${page}`,
    }),
  }),
});

export default heroesApi;
