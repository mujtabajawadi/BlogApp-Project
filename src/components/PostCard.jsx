import React from "react";
import obj_DB_Service from "../appwrite/configuration";
import { Link } from "react-router-dom";
import parse from 'html-react-parser'

const PostCard = ({ $id, title, content, featuredImage, author }) => {

  const parsedContent = parse(content)
  
 const fullText = (function extractText(nodes) {
   if (typeof nodes === "string") {
     return nodes;
   }
   if (Array.isArray(nodes)) {
     return nodes.map(extractText).join(" ");
   }
   if (nodes && nodes.props && nodes.props.children) {
     return extractText(nodes.props.children);
   }
   return "";
  })(parsedContent);
  

  
  
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full sm:w-[70vw] border-b-[0.1px] rounded-xl p-4">
        <p>
          By <span className="font-thin italic">{author}</span>
        </p>
        <div className="w-full flex justify-between items-top ">
          <div className="w-[100%] sm:w-[70%]">
            <h2 className="text-3xl font-sans font-bold mb-1">{title}</h2>
            <span className="md:max-w-[50%] font-serif">{fullText.length > 100 ? fullText.slice(0,100) +"  " +"(Read more...)"  : fullText}</span>

          </div>
          <div
            className="w-[70px] h-[70px]  right-2 sm:w-[100px] sm:h-[100px] rounded-2xl hidden sm:block" loading="lazy"
            style={{
              background: `url(${obj_DB_Service.getFileView(featuredImage)})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
