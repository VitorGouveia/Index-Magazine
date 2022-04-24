import { memo, ReactNode } from "react";

import styles from "./styles.module.scss";

type HeaderProps = {
  children: ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className={styles.headerContainer}>
      <ul>{children}</ul>
    </header>
  );
};

export default memo(Header);
