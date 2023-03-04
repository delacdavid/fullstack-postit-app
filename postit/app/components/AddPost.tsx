"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let toastPostId: string;

  //Create a post

  const { mutate } = useMutation(
    async (title: string) => {
      await axios.post("/api/posts/addPost", { title });
    },
    {
      onSuccess: (data: any) => {
        toast.success("Post has been created", { id: toastPostId });
        setTitle("");
        setIsDisabled(false);
        queryClient.invalidateQueries(["posts"]);
      },
      onError: (error: any) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastPostId });
        }
        setIsDisabled(false);
      },
    }
  );

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    toastPostId = toast.loading("Creating a post...", { id: toastPostId });
    setIsDisabled(true);
    mutate(title);
  };

  return (
    <form onSubmit={submitPost} className="p-8 my-8 bg-white rounded-md">
      <div className="flex flex-col my-4">
        <textarea onChange={(e) => setTitle(e.target.value)} name="title" value={title} placeholder="What is on your mind" className="p-4 my-2 text-lg bg-gray-200 rounded-md"></textarea>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p className={`font-bold text-sm ${title.length > 300 ? "text-red-700" : "text-gray-700"}`}>{`${title.length}/300`}</p>
        <button disabled={isDisabled} className="px-6 py-2 text-sm text-white bg-teal-600 rounded-xl disabled:opacity-25" type="submit">
          Create a post
        </button>
      </div>
    </form>
  );
}
