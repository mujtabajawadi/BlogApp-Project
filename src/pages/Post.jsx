import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import obj_DB_Service from "../appwrite/configuration";
import obj_AuthService from "../appwrite/auth";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

const Post = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      obj_DB_Service.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);
  


  const deletePost = () => {
    obj_DB_Service.deletePost(post.$id).then((status) => {
      if (status) {
        obj_DB_Service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };
  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex flex-col justify-center mb-4 relative rounded-xl p-2">
          <div className="w-full mb-6">
            <h1 className="text-3xl font-sans font-bold">{post.title}</h1>
          </div>
          <h3>
            by <span className="font-mono italic">{post.author}</span>
          </h3>

          <img
            src={obj_DB_Service.getFileView(post.featuredImage)}
            alt={post.title}
            className="rounded-xl w-full mt-10"
          />
        </div>

        <div className="browser-css font-serif">{parse(post.content)}</div>
        {isAuthor && (
          <div className="flex justify-around mt-5">
            <Link to={`/edit-post/${post.$id}`}>
              <Button bgcolor="bg-green-500" className="mr-3">
                Edit Post
              </Button>
            </Link>
            <Button bgcolor="bg-red-500" onClick={deletePost}>
              Delete Post
            </Button>
          </div>
        )}
      </Container>
    </div>
  ) : null;
};

export default Post;
