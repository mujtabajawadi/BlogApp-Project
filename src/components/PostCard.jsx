import React from "react";
import obj_DB_Service from "../appwrite/configuration";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImage }) => {
  
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={obj_DB_Service.getFileView(featuredImage)}
            alt={title}
            className="rounded-xl w-full"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
