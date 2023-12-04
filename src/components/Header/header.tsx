"use client";

import styles from "./header.module.css";
import useAuth from "@/hooks/useAuth";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import Like from "@/components/Like";

const Header = () => {
  const { authUser, setAuthUser, isLogged, setIsLogged } = useAuth();

  const account = useAccount({
    onConnect({ address }) {
      setAuthUser({
        address,
        likes: 10,
        likedPosts: [],
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
        <nav className={styles.nav}>
          {isLogged && (
            <Like
              amount={authUser?.likes}
              status={authUser?.likes && authUser.likes > 0 ? "full" : "empty"}
              clickable={false}
            />
          )}
          <ConnectButton
            accountStatus={"avatar"}
            chainStatus={"icon"}
            showBalance={false}
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;
