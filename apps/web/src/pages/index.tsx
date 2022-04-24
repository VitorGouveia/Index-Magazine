import { NextPage } from "next";
import Link from "next/link";

import styles from "./index/styles.module.scss";

const Homepage: NextPage = () => {
  return (
    <div className={styles.container}>
      <div>welcome to index news</div>
      <div>
        <Link href="/news">
          <a>go to news portal</a>
        </Link>
      </div>
      <div>
        <Link href="/blog">
          <a>go to blog portal</a>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
