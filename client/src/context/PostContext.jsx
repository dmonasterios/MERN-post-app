import { useState, useEffect, createContext } from "react";
import {
  getPostsRequests,
  createPostRequests,
  deletePostRequests,
  getPostRequests,
  updatePostRequests,
} from "../api/post";
export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const res = await getPostsRequests();
    setPosts(res.data);
  };
  const createPost = async (post) => {
    const res = await createPostRequests(post);
    setPosts([...posts, res.data]);
  };
  const deletePost = async (id) => {
    const res = await deletePostRequests(id);
    if (res.status === 204) setPosts(posts.filter((post) => post._id !== id));
  };
  const getPost = async (id) => {
    const res = await getPostRequests(id);
    return res.data;
  };
  const updatePost = async (id, post) => {
    const res = await updatePostRequests(id, post);
    if(res.status === 200) setPosts(posts.map(post => post._id === id ? res.data : post));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        getPost,
        createPost,
        deletePost,
        updatePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
