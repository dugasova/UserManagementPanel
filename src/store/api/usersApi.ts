import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User, UserResponse } from '../../types/types';

const API_URL = `https://dummyjson.com/users`;

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getUsers: builder.query<UserResponse, void>({
      query: () => '/',
    }),
    getUserDetails: builder.query<User, number>({
      query: (id) => `/${id}`,
    }),
    updateUserStatus: builder.mutation<User, { id: number; status: 'Active' | 'Blocked' }>({
      query: ({ id, status }) => ({
        url: `/${id}`,
        method: 'PUT', // dummyjson.com supports PUT for updating users
        body: { status },
      }),
      // Optimistic update: update the cached data immediately
      async onQueryStarted({ id, status }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
            const user = draft.users.find((user) => user.id === id);
            if (user) {
              user.status = status;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    updateUser: builder.mutation<User, Partial<User> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: patch,
      }),
      // Invalidate the cache for user details and users list after update
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        // Optimistic update for the specific user details
        const patchResultDetails = dispatch(
          usersApi.util.updateQueryData('getUserDetails', id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        // Optimistic update for the users list
        const patchResultUsers = dispatch(
          usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
            const user = draft.users.find((user) => user.id === id);
            if (user) {
              Object.assign(user, patch);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResultDetails.undo();
          patchResultUsers.undo();
        }
      },
    }),
  }),
});

export const { useGetUsersQuery, useGetUserDetailsQuery, useUpdateUserStatusMutation, useUpdateUserMutation } = usersApi;
