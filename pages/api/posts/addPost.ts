import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Please sign in to make a post" });

    const title: string = req.body.title;
    if (title.length > 300) return res.status(403).json({ message: "Title is too long" });
    if (!title.length) return res.status(403).json({ message: "Title is too short" });

    //Get user
    const prismaUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email?.toString(),
      },
    });

    //Create post
    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser?.id!,
        },
      });
      console.log("Post created");
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ message: "Something went wrong" });
    }
  }
}
