"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import Toggle from "./Toggle";
import axios from "axios";
import toast from "react-hot-toast";

type EditProps = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

export default function EditPost({ avatar, name, title, comments, id }: EditProps) {
  const [toggle, setToggle] = useState(false);
  const queryClient = useQueryClient();
  let deleteToastId: string;
  const { mutate } = useMutation(
    async (id: string) => {
      await axios.delete("/api/posts/deletePost", { data: id });
    },
    {
      onSuccess: (data: any) => {
        console.log(data);
        toast.success("Post has been deleted", { id: deleteToastId });
        queryClient.invalidateQueries(["authPosts"]);
      },
      onError: (error: any) => {
        toast.error("Error deleting post", { id: deleteToastId });
      },
    }
  );

  const deletePost = () => {
    deleteToastId = toast.loading("Deleting your post...", { id: deleteToastId });
    mutate(id);
  };

  return (
    <>
      <div className="p-8 my-8 bg-white rounded-lg">
        <div className="flex items-center gap-2">
          <Image className="rounded-full" src={avatar} alt="avatar" width={32} height={32} />
          <h3 className="font-bold text-gray-700">{name}</h3>
        </div>
        <div className="my-8">
          <p className="break-all">{title}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm font-bold text-gray-700">{comments?.length} Comments</p>
          <button
            onClick={(e) => {
              setToggle(true);
            }}
            className="text-sm font-bold text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </>
  );
}
