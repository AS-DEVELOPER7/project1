import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { options } from "../pages/api";
export const dummyApi = createApi({
  reducerPath: "dummyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyapi.io/data/v1/",
  }),
  tagTypes:['comments'],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => ({
        url: "post?limit=10",
        method: "GET",
       headers: options,
      }),
    }),
    getComments:builder.query({
      query:(postId)=>({
        url:`post/${postId}/comment`,
        method:'GET',
        headers:options,
        
      }),
      providesTags:['comments']
    
    }),
    postComment:builder.mutation({
      query:(info)=>({
        url:'comment/create',
        method:'POST',
        body:info,
        headers:options
      }),
      invalidatesTags:['comments']
    }),
    deleteComments:builder.mutation({
      query:(commentId)=>({
        url:`comment/${commentId}`,
        method:'DELETE',
        headers:options
      }),
      invalidatesTags:['comments']
    })
  }),
});
export const { useGetAllPostsQuery ,useGetCommentsQuery,usePostCommentMutation,useDeleteCommentsMutation} = dummyApi;
