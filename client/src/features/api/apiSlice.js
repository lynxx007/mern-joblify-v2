import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1'
    }),
    tagTypes: ['Jobs', 'Users'],
    endpoints: builder => ({
        register: builder.mutation({
            query: data => ({
                url: '/auth/register',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Users']
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
        addJob: builder.mutation({
            query: (data) => ({
                url: '/jobs',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Jobs']
        }),
        getJobs: builder.query({
            query: () => ({
                url: '/jobs',
                method: 'GET'
            }),
            providesTags: ['Jobs']
        }),
        getJob: builder.query({
            query: (id) => ({
                url: `/jobs/${id}`,
                method: 'GET'
            }),
            providesTags: ['Jobs']
        }),
        editJob: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/jobs/${id}`,
                method: 'PATCH',
                body: patch
            }),
            invalidatesTags: ['Jobs']
        }),
        deleteJob: builder.mutation({
            query: (id) => ({
                url: `/jobs/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Jobs']
        }),
        getAppStats: builder.query({
            query: () => ({
                url: '/users/admin/app-stats',
                method: 'GET'
            }),
            providesTags: ['Users', 'Jobs']
        })
    })
})

export const { useRegisterMutation,
    useLoginMutation,
    useGetCurrentUserQuery,
    useLogoutQuery,
    useAddJobMutation,
    useGetJobsQuery,
    useEditJobMutation,
    useGetJobQuery,
    useDeleteJobMutation,
    useGetAppStatsQuery } = apiSlice

