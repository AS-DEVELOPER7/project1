import React, { useEffect, useState } from 'react'
import Post from './post'
import { useGetAllPostsQuery } from '../app/services'
import { BeatLoader } from 'react-spinners'

const Feed = () => {
  const [posts,setPosts]=useState([])
  const {data,isLoading}=useGetAllPostsQuery()
  console.log(data?.data)
  
   
useEffect(()=>{
  setPosts(data?.data)
})
    
  return (
<>
      {isLoading?<div className="flex justify-center items-center h-[100vh]"><BeatLoader color="#000000" size={40} /></div>:
      <>
    <div className='lg:w-[60%] w-[90%] mx-auto'>
      {posts?.map((post)=>(
        
        <Post key={post.id} postId={post.id} image={post.image}likes={post.likes} profile={post.owner.picture} firstName={post.owner.firstName}lastName={post.owner.lastName}ownerId={post.owner.id}/>
        )
        )
      }
      </div>
      </>
    }
    </>
  )
}

export default Feed
