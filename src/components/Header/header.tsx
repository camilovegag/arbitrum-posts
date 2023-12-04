"use client";

import styles from "./header.module.css";
import useAuth from "@/hooks/useAuth";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

const Header = () => {
  const { authUser, setAuthUser, isLogged, setIsLogged } = useAuth();

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
        <nav className={styles.nav}>
          {isLogged && (
            <div className={styles.like}>
              <p className={styles.count}>{authUser?.likes}</p>
              <Image
                src="full_hearth.svg"
                alt="Full Hearth"
                width={24}
                height={24}
              />
            </div>
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
