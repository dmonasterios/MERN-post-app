import usePosts from "../hooks/usePosts";
import { PostCard } from "../components/PostCard";
import { VscEmptyWindow } from "react-icons/vsc";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const { posts } = usePosts();
  if (posts.length === 0)
    return (
      <div className="flex flex-col justify-center items-center text-slate-200">
        <VscEmptyWindow className="w-48 h-48 text-white" />
        <h1 className="text-2xl">There are no posts</h1>
        <Link to="/new" >Create New Post</Link>
      </div>
    );
  return (
    <div className="text-slate-200">
      <header className="flex justify-between py-4">
        <h1 className="text-2xl text-gray-300 font-bold">Posts ({posts.length})</h1>
        <Link to="/new" className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white">Create New Post</Link>
      </header>
      <div className="grid grid-cols-3 gap-2">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};
