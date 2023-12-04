"use client";

import styles from "./header.module.css";
import useAuth from "@/hooks/useAuth";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  const { setAuthUser, setIsLogged } = useAuth();

  const account = useAccount({
    onConnect({ address, isReconnected }) {
      setAuthUser({
        address,
        likes: 0,
      });
      setIsLogged(true);
    },
    onDisconnect() {
      setIsLogged(false);
      setAuthUser(null);
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
