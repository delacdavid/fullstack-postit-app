"use client";

import Post from "@/app/components/Post";
import { PostType } from "@/app/types/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AddComment from "@/app/components/AddComment";
import Image from "next/image";

type URL = {
  params: {
    slug: string;
  };
};

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery<PostType>({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug),
  });
  if (isLoading) return <h1>Loading...</h1>;
  console.log(data);
  return (
    <>
      <div>
        <Post id={data?.id} name={data?.user.name} avatar={data?.user.image} postTitle={data?.title} comments={data?.comments} />
      </div>
      <AddComment id={data?.id} />
      {data?.comments?.map((comment) => (
        <div key={comment.id} className="p-8 my-6 bg-white rounded-md">
          <div className="flex items-center gap-2">
            <Image width={32} height={32} className="rounded-full" src={comment.user?.image} alt="avatar" />
            <h3 className="font-bold">{comment.user?.name}</h3>
            <h2 className="text-sm">{comment.createdAt}</h2>
          </div>
          <div className="py-4">{comment.message}</div>
        </div>
      ))}
    </>
  );
}
