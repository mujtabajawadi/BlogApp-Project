import React, { useState, useEffect } from "react";
import obj_DB_Service from "../appwrite/configuration";
import { Container, PostCard } from "../components/index";
import { useSelector } from "react-redux";

const Home = () => {
  const userData = useSelector((state) => state.userData);
  const authStatus = useSelector((state)=> state.status)
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    obj_DB_Service.getUserPosts(userData?userData.$id:null).then((posts) => {
      
      if (posts) {
        setPosts(posts.documents);
      }
      if (authStatus === false) {
        setPosts([])
      }
    });
  }, [userData]);

 console.log(posts)


  if (posts.length === 0 || authStatus === 'false') {
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
                <div key={post.$id} className="p-2 w-1/4">
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </Container>
        </div>
      );
  }



};

export default Home;
