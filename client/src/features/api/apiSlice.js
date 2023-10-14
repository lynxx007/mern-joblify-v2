import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1'
    }),
    endpoints: builder => ({
        register: builder.mutation({
            query: data => ({
                url: '/auth/register',
                method: 'POST',
                body: data
            })
        }),
        login: builder.mutation({
            query: data => ({
                url: '/auth/login',
                method: 'POST',
                body: data
            })
        }),
        logout: builder.query({
            query: () => ({
                url: '/auth/logout',
                method: 'GET'
            })
        }),
        getCurrentUser: builder.query({
            query: () => ({
                url: '/users/current-user',
                method: 'GET'
            })
        }),
    })
})

export const { useRegisterMutation, useLoginMutation, useGetCurrentUserQuery, useLogoutQuery } = apiSlice

