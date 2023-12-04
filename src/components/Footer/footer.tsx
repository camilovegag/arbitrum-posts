import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copy}>LexCopr &copy; 2023</p>
      </div>
    </footer>
  );
};

export default Footer;
