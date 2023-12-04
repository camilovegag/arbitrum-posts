"use client";
import Post from "@/components/Post";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export default function Home() {
  const { authUser, isLogged } = useAuth();

  type PostType = {
    id: number;
    title: string;
    body: string;
    likes: number;
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

  return (
    <section>
      <h2>
        {isLogged ? "Read some cool posts" : "Log in to see some cool posts"}
      </h2>
      <br />
      {isLogged && (
        <section className="grid">
          {posts.map((post) => (
            <Post
              key={post.id}
              title={post.title}
              body={post.body}
              likes={post.likes}
            />
          ))}
        </section>
      )}
    </section>
  );
}
