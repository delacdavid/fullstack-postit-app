"use client";

type ToggleProps = {
  deletePost: () => void;
  setToggle: (toggle: boolean) => void;
};

export default function Toggle({ deletePost, setToggle }: ToggleProps) {
  return (
    <div
      onClick={(e) => {
        setToggle(false);
      }}
      className="fixed top-0 left-0 z-20 w-full h-full bg-black/50"
    >
      <div className="absolute flex flex-col gap-6 p-12 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg top-1/2 left-1/2">
        <h2 className="text-xl">Are you sure want to delete this post?</h2>
        <h3 className="text-sm text-red-600">Pressing the delete button will permanently delete your post</h3>
        <button onClick={deletePost} className="px-4 py-2 text-sm text-white bg-red-600 rounded-md">
          Delete Post
        </button>
      </div>
    </div>
  );
}
