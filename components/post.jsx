import React, { useEffect, useState } from 'react'

import {
  DotsHorizontalIcon,
  BookmarkIcon,
  EmojiHappyIcon,
  HeartIcon,
} from '@heroicons/react/outline'
import { useDeleteCommentsMutation, useGetCommentsQuery, usePostCommentMutation } from '../app/services'
import { BeatLoader  } from 'react-spinners'
const post = ({lastName,firstName,profile,likes,image,postId,ownerId}) => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  // fetching comments
  const{data,isLoading}=useGetCommentsQuery(postId)
  useEffect(()=>{
    setComments(data?.data) 
  })
  // post comments
  const info={
  message:comment,
  owner:ownerId,
  post:postId
}
  const[createComment,postResponse]=usePostCommentMutation()
const post=(e)=>{
    e.preventDefault()
  createComment(info)
    setComment('')

    console.log(postResponse)
    console.log("posted")
    }
// deleting comment
const [deleteComments,deleteResponse]=useDeleteCommentsMutation()
    const deleteComment=async (commentId)=>{
    deleteComments(commentId)
    console.log(deleteResponse)
     console.log('deleted')
    
    }
// editing comments
    const editingComment=(comment)=>{
     
 setComment(comment.message)

 deleteComments(comment.id)
    }
  return (
    <div className="border-rounded-sm my-7 bg-white shadow-md">
    {/* header */}
    <div className="flex items-center p-5 py-3">
      <img
        src={profile}
        alt=""
        className="mr-3 h-12 w-12 rounded-full border object-contain p-1"
      />
      <p className="flex-1 font-bold">{firstName}_{lastName}</p>
      <DotsHorizontalIcon className="h-5" />
    </div>
    {/* img */}
    <img src={image} alt="" className="w-full object-cover max-h-[45em]" />
    {/* buttons */}
    <div className="flex justify-between px-4 pt-4 pb-4">
      <div className="flex space-x-2 ">
     
    <HeartIcon className='h-7'/>
        <p className='font-bold mb-1'>{likes} Likes</p>
  
      
    
      </div>
      <BookmarkIcon className="btn" />
    </div>
  
    {/* comments */}
    {isLoading?<div className="flex justify-center items-center"><BeatLoader color="#000000" size={10} /></div>:<>
    {comments?.length > 0 && (
      <div className="ml-10 max-h-[11em] overflow-y-scroll scrollbar-thin scrollbar-thumb-black">
        {comments?.map((comment) => (
          <div className="mb-3 flex items-center space-x-2 p-3 rounded-md  bg-slate-50  space-y-1 justify-between shadow-sm" key={comment.id}>

              <p className="font-semibold">

              {comment.message}
              </p>
            <div className=" flex space-x-2 ">
              <p className="text-blue-500 text-sm cursor-pointer"onClick={()=>editingComment(comment)} >Edit</p>
              <p className="text-red-500 text-sm cursor-pointer" onClick={()=>deleteComment(comment.id)}>Delete</p>
            </div>
           
          </div>
        ))}
      </div>
    )}
    </>}

    {/* input box */}
    <form className="flex items-center p-4 pt-0">
      <EmojiHappyIcon className="h-7" />
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment...."
        className="flex-1 border-none outline-none focus:ring-0 "
      />
      <button
        type="submit"
        disabled={!comment.trim()}
        onClick={post}
        className="font-semibold text-blue-400"
      >
        Post
      </button>
    </form>
  </div>
  )
}

export default post