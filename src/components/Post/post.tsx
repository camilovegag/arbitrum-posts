import styles from "./post.module.css";

type PostProps = {
  title: string;
  body: string;
};

const Post = ({ title, body }: PostProps) => {
  return (
    <article className={styles.post}>
      <p className={styles.title}>{title}</p>
      <p className={styles.body}>{body}</p>
    </article>
  );
};

export default Post;
