import React, { useState, useEffect } from "react";
import obj_DB_Service from "../appwrite/configuration";
import { Container, PostCard } from "../components/index";
import { useSelector } from "react-redux";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
   const userData =  useSelector((state) => state.userData);
   const authStatus =  useSelector((state) => state.status);

  useEffect(() => {
 
    
    // console.log("userData", userData);
    const fetchPosts = async () => {



      try {
           
         const posts = await obj_DB_Service.getAllActivePosts(
           userData && userData.$id
         );
         console.log(posts.documents);
         if (posts) {
           setPosts(posts.documents);
         }
       } catch (error) {
         console.log(error);
       } finally {
         if (authStatus === false) {
           setPosts([]);
         }
       }
    }
   fetchPosts()
  }, [userData, authStatus]);


  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold text-red-700">
                No post found!
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div className="p-2 w-1/4" key={post.$id}>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
};

export default AllPosts;
