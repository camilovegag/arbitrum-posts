"use client";

import styles from "./header.module.css";
import useAuth from "@/hooks/useAuth";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  const { setAuthUser, isLogged, setIsLogged } = useAuth();

  const account = useAccount({
    onConnect({ address }) {
      setIsLogged(true);
      setAuthUser({
        address,
        likes: 0,
      });
      console.log("Connected", { address });
    },
    onDisconnect() {
      setIsLogged(false);
      setAuthUser(null);
      console.log(`setting is logged to false ${isLogged}`);
    },
  });

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
