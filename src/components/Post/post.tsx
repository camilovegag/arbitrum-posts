import styles from "./post.module.css";
import Like from "@/components/Like";

type PostProps = {
  title: string;
  body: string;
  likes: number;
};

const Post = ({ title, body, likes }: PostProps) => {
  return (
    <article className={styles.post}>
      <p className={styles.title}>{title}</p>
      <p className={styles.body}>{body}</p>
      <div className={styles.like}>
        <Like amount={likes} status={likes > 0 ? "full" : "empty"} />
      </div>
    </article>
  );
};

export default Post;
