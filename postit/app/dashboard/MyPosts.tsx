"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthPosts } from "../types/AuthPosts";
import EditPost from "./EditPost";

const fetchAuthPosts = async () => {
  const reponse = await axios.get("/api/posts/authPosts");
  return reponse.data;
};

export default function MyPosts() {
  const { data, isLoading } = useQuery<AuthPosts>({ queryFn: fetchAuthPosts, queryKey: ["authPosts"] });
  if (isLoading) return <h1>Posts are loading...</h1>;
  return (
    <div>
      {data?.posts.map((post) => (
        <EditPost id={post.id} key={post.id} avatar={data.image} name={data.name} title={post.title} comments={post.comments} />
      ))}
    </div>
  );
}
