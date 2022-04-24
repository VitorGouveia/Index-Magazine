import type { ReactNode } from "react";

import styles from "./styles.module.scss";

type LogoProps = {
  /**
   * text that will be inside the logo
   */
  children: ReactNode;

  backgroundColor: string;
};

export const Logo: React.FC<LogoProps> = ({ children, backgroundColor }) => {
  return (
    <div className={styles.logoContainer}>
      <h1
        // @ts-ignore
        style={{ "--mask-background-color": backgroundColor }}
        className={styles.heading}
      >
        {children}
      </h1>
    </div>
  );
};
