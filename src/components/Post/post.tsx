"use client";

import { useEffect, useState } from "react";
import styles from "./post.module.css";
import Like from "@/components/Like";

type PostProps = {
  title: string;
  body: string;
  likes: number;
  expirationTimestamp: number;
  onLike: () => void;
  onUnlike: () => void;
};

const Post = ({
  title,
  body,
  likes,
  expirationTimestamp,
  onLike,
  onUnlike,
}: PostProps) => {
  const calculateCountdown = () => {
    const now = Date.now();
    const timeRemaining = expirationTimestamp - now;

    if (timeRemaining > 0) {
      const seconds = Math.floor(timeRemaining / 1000) % 60;
      const minutes = Math.floor(timeRemaining / (1000 * 60)) % 60;
      const hours = Math.floor(timeRemaining / (1000 * 60 * 60)) % 24;

      return `${hours}h ${minutes}m ${seconds}s`;
    } else {
      return "Expired";
    }
  };

  const [countdown, setCountdown] = useState(calculateCountdown());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [expirationTimestamp]); // Run effect whenever expirationTimestamp changes

  return (
    <article className={styles.post}>
      <p className={styles.title}>{title}</p>
      <p className={styles.body}>{body}</p>
      <div className={styles.likeContainer}>
        <Like
          amount={likes}
          status={likes > 0 ? "full" : "empty"}
          clickable={false}
        />
      </div>
      <div className={styles.buttons}>
        <button className={styles.unlike} onClick={onUnlike}>
          Unlike
        </button>
        <button className={styles.like} onClick={onLike}>
          Like
        </button>
      </div>
      <p className={styles.countdown}>Expires in: {countdown}</p>
    </article>
  );
};

export default Post;
