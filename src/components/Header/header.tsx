import styles from "./header.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>LexCorp</h1>
        <nav>
          <ConnectButton />
        </nav>
      </div>
    </header>
  );
};

export default Header;
