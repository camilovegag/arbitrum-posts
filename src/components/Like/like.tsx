import styles from "./like.module.css";

import Image from "next/image";

type LikeProps = {
  amount?: number;
  status?: "full" | "empty";
  clickable?: boolean;
  onLike?: () => void;
  onUnlike?: () => void;
};

const Like = ({
  amount = 0,
  status = "empty",
  clickable = true,
  onLike,
  onUnlike,
}: LikeProps) => {
  const handleButtonClick = () => {
    if (amount > 0) {
      onUnlike && onUnlike(); // If already liked, unlike
    } else {
      onLike && onLike(); // If not liked, like
    }
  };

  return (
    <button
      className={`${styles.like} ${clickable && styles.clickable}`}
      disabled={!clickable}
      onClick={handleButtonClick}
    >
      <p className={styles.count}>{amount}</p>
      <Image
        src={`${status}_hearth.svg`}
        alt="Full Hearth"
        width={24}
        height={24}
      />
    </button>
  );
};

export default Like;
