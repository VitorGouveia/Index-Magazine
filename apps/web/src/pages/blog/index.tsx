import type { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

import type { Post } from "@lib/blog";

import { Logo } from "@components/logo";

import styles from "./styles.module.scss";

const Header = dynamic(() => import("@components/header"), {
  ssr: false,
  loading: () => <h1>Loading header...</h1>,
});

type BlogProps = {
  posts: Post[];
};

const Blog: NextPage<BlogProps> = ({ posts }) => {
  const categories = ["all", "articles", "guides"];

  return (
    <div>
      <Header>
        <Link href="/stories">
          <a>
            <strong>Stories</strong>
          </a>
        </Link>
        <Link href="/insights">
          <a>
            <strong>Insights</strong>
          </a>
        </Link>

        <Logo backgroundColor="hsl(240, 10%, 18%)">
          <Link href="/">
            <a>blog</a>
          </Link>
        </Logo>

        <Link href="/development">
          <a>
            <strong>Development</strong>
          </a>
        </Link>
        <Link href="/eleicoes">
          <a>
            <strong>Creators</strong>
          </a>
        </Link>
      </Header>

      <section className={styles.headingContainer}>
        <h1>Insights</h1>
        <p>insights and ideas from developing in Index Magazine</p>

        <ul>
          {categories.map((category) => (
            <li key={category}>
              <Link href={`/${category}`}>
                <a>{category}</a>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <main className={styles.postsContainer}>
        {posts.map(({ metadata }) => (
          <Link key={metadata.createdAt} href={`/blog/${metadata.slug}`}>
            <a className={styles.post}>
              <div className={styles.postImage}></div>

              <span>{metadata.readTime} read</span>

              <h4>{metadata.slug}</h4>
            </a>
          </Link>
        ))}
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const getPosts = await import("@lib/blog").then((module) => module.getPosts);

  const { posts } = getPosts({
    category: "blog",
  });

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
