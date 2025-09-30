import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input, RTE, Select } from "../index";
import React, { useCallback, useEffect } from "react";
import obj_DB_Service from "../../appwrite/configuration";

const PostForm = ({ post }) => {

console.log(post)
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "",
      },
    });

  const userData = useSelector((state) => state.userData);


  const submit = async (data) => {
    console.log(data)
    if (post) {
      const file = data.image[0]
        ? await obj_DB_Service.createFile(data.image[0])
        : null;

      if (file) {
        await obj_DB_Service.deleteFile(post.featuredImage);
      }

      const dbPost = await obj_DB_Service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await obj_DB_Service.createFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await obj_DB_Service.createPost({
          ...data,
          userId: userData.$id,
          author: userData.name
        });
        navigate(`/post/${dbPost.$id}`);
        console.log(dbPost)
      }
    }
  };


  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);



  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-full px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value));
          }}
        />
        <label htmlFor="poststatus">Select Post Status :</label>
        <Select
          id='postStatus'
          label="Status :"
          type='select'
          options={["active", "inactive"]}
          className="mb-4"
          {...register("status", { required: true })}
        />
      </div>
      <div className="w-full px-2">
        {post && (
          <div className="w-full mb-4">
            <img
              src={obj_DB_Service.getFileView(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
              width="220px"
            />
          </div>
        )}
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: true })}
        />
      </div>
      <RTE
        label="Content :"
        name="content"
        className="mr-200"
        control={control}
        defaultValue={getValues("content")}
      />
      <Button
        type="submit"
        bgcolor={post ? "bg-green-500" : undefined}
        className="w-full mt-8"
      >
        {post ? "Update" : "Submit"}
      </Button>
    </form>
  );
};

export default PostForm;
