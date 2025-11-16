import React, { useState, useEffect } from "react";
import obj_DB_Service from "../appwrite/configuration";
import { Container, Loader, PostCard } from "../components/index";
import { useSelector } from "react-redux";

const Home = () => {
  const userData = useSelector((state) => state.userData);
  const authStatus = useSelector((state) => state.status);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (authStatus === false || !userData?.$id) {
      setPosts([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    obj_DB_Service
      .getUserPosts(userData ? userData.$id : null)
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching user posts:", error);
        setPosts([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userData]);

  if (isLoading) {
    return (
      <Loader className="w-screen h-[75vh] flex items-center justify-center " />
    );
  }

  //{
  //   return (
  //     <div className="w-full py-8 mt-4 text-center">
  //       <Container>
  //         <div className="flex flex-wrap">
  //           <div className="p-2 w-full">
  //             <h1 className="text-2xl font-bold">Loading Posts...</h1>
  //           </div>
  //         </div>
  //       </Container>
  //     </div>
  //   );
  // }

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="grid grid-cols-1 gap-4">
            <div className="p-2">
              <h1 className="text-2xl font-bold text-red-700">
                {authStatus === false
                  ? " Please Login to view posts..."
                  : "No Posts found..."}
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="grid grid-cols-1 w-[100%]  justify-center items-center gap-4">
          {posts.map((post) => (
            <div className="p-2" key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
