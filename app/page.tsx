"use client";

import AddPost from "./components/AddPost";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Post from "./components/Post";
import { PostsType } from "./types/Posts";

//Fetch all posts
const allPosts = async () => {
  const reponse = await axios.get("/api/posts/getPosts");
  return reponse.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<PostsType[]>({ queryFn: allPosts, queryKey: ["posts"] });
  if (error) return error;
  if (isLoading) return "Loading...";
  console.log();
  return (
    <main>
      <AddPost />
      {data?.map((post) => (
        <Post key={post.id} name={post.user.name} avatar={post.user.image} postTitle={post.title} id={post.id} comments={post.comments} />
      ))}
    </main>
  );
}
