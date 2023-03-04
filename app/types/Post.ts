export type PostType = {
  title: string;
  id: string;
  createdAt: string;
  user: {
    email: string;
    id: string;
    name: string;
    image: string;
  };
  comments?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
    message: string;
    user: {
      email: string;
      id: string;
      image: string;
      name: string;
    };
  }[];
};
