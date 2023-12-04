"use client";
import Post from "@/components/Post";
import useAuth from "@/hooks/useAuth";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const { authUser, setAuthUser, isLogged } = useAuth();

  type PostType = {
    id: number;
    title: string;
    body: string;
    likes: number;
    likedBy: { address: string; amount: number }[];
  };

  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetch("https://jsonplaceholder.typicode.com/posts");
        const json = await data.json();
        const postsWithLikes = json.map((post: PostType) => ({
          ...post,
          likes: Math.floor(Math.random() * 10),
        }));
        setPosts(postsWithLikes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  const updatePostLikes = (postId: number, amount: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + amount } : post
      )
    );
  };

  const handleLike = useCallback(
    (postId: number) => {
      if (authUser && authUser.likes > 0) {
        const likedPosts = [...authUser.likedPosts];
        const existingLikeIndex = likedPosts.findIndex(
          (like) => like.id === postId
        );

        if (existingLikeIndex === -1) {
          // User is liking the post for the first time
          const updatedUser = {
            ...authUser,
            likes: authUser.likes - 1,
            likedPosts: [...likedPosts, { id: postId, likes: 1 }],
          };
          setAuthUser(updatedUser);
          updatePostLikes(postId, 1);
        } else {
          // User is liking the post again to increase the like count
          const updatedLikedPosts = [...likedPosts];
          updatedLikedPosts[existingLikeIndex].likes += 1;

          const updatedUser = {
            ...authUser,
            likes: authUser.likes - 1,
            likedPosts: updatedLikedPosts,
          };

          setAuthUser(updatedUser);
          updatePostLikes(postId, 1);
        }
      }
    },
    [authUser, setAuthUser]
  );

  const handleUnlike = useCallback(
    (postId: number) => {
      if (authUser) {
        const likedPosts = [...authUser.likedPosts];
        const existingLikeIndex = likedPosts.findIndex(
          (like) => like.id === postId
        );

        if (
          existingLikeIndex !== -1 &&
          likedPosts[existingLikeIndex].likes > 0
        ) {
          // User is unliking the post
          const updatedLikedPosts = [...likedPosts];
          updatedLikedPosts[existingLikeIndex].likes -= 1;

          const updatedUser = {
            ...authUser,
            likes: authUser.likes + 1,
            likedPosts: updatedLikedPosts,
          };

          setAuthUser(updatedUser);
          updatePostLikes(postId, -1);
        }
      }
    },
    [authUser, setAuthUser]
  );

  return (
    <section>
      <h2>
        {isLogged ? "Read some cool posts" : "Log in to see some cool posts"}
      </h2>
      <pre>{JSON.stringify(authUser?.likedPosts, null)}</pre>
      <br />
      {isLogged && (
        <section className="grid">
          {posts.map((post) => (
            <Post
              key={post.id}
              title={post.title}
              body={post.body}
              likes={post.likes}
              onLike={() => handleLike(post.id)}
              onUnlike={() => handleUnlike(post.id)}
            />
          ))}
        </section>
      )}
    </section>
  );
}
