import styles from "./post.module.css";
import Like from "@/components/Like";

type PostProps = {
  title: string;
  body: string;
  likes: number;
  onLike: () => void;
  onUnlike: () => void;
};

const Post = ({ title, body, likes, onLike, onUnlike }: PostProps) => {
  return (
    <article className={styles.post}>
      <p className={styles.title}>{title}</p>
      <p className={styles.body}>{body}</p>
      <div className={styles.like}>
        <Like
          amount={likes}
          status={likes > 0 ? "full" : "empty"}
          clickable={false}
        />
        <button onClick={onUnlike}>Unlike</button>
        <button onClick={onLike}>Like</button>
      </div>
    </article>
  );
};

export default Post;
