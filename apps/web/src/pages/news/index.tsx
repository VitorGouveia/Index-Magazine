import type { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

import { Metadata, Post } from "@lib/blog";
import { Logo } from "@components/logo";

import styles from "./styles.module.scss";
import React from "react";

const Header = dynamic(() => import("@components/header"), {
  ssr: false,
  loading: () => <h1>Loading header...</h1>,
});

type PostWithRelated = Omit<Post, "metadata"> & {
  metadata: Omit<Metadata, "relatedPosts"> & {
    relatedPosts?: Post[];
  };
};

type NewsProps = {
  posts: PostWithRelated[];
};

const News: NextPage<NewsProps> = ({ posts }) => {
  return (
    <div>
      <Header>
        <Link href="/news/economia">
          <a>
            <strong>Economia</strong>
          </a>
        </Link>
        <Link href="/news/politica">
          <a>
            <strong>Política</strong>
          </a>
        </Link>

        <Logo backgroundColor="hsl(240, 10%, 18%)">
          <Link href="/news">
            <a>news</a>
          </Link>
        </Logo>

        <Link href="/news/saude">
          <a>
            <strong>Saúde</strong>
          </a>
        </Link>
        <Link href="/news/eleicoes">
          <a>
            <strong>Eleições</strong>
          </a>
        </Link>
      </Header>

      <section className={styles.headingContainer}>
        <h1>INDEX NEWS</h1>
        <p>veja como o seu país é um lixo</p>
      </section>

      <main className={styles.postsRow}>
        {posts.map(({ metadata }) => (
          <div
            data-variant="small"
            key={metadata.createdAt}
            className={styles.post}
          >
            <Link href={`/news/${metadata.slug}`}>
              <a>
                <div className={styles.postImage}></div>
              </a>
            </Link>

            <span>
              {metadata.categories.map((category) => (
                <Link key={category} href={`/news/${category}`}>
                  <a>{category}</a>
                </Link>
              ))}
            </span>

            <Link href={`/news/${metadata.slug}`}>
              <a>
                <h4>{metadata.title}</h4>
                <p>{metadata.description}</p>
              </a>
            </Link>

            {metadata.relatedPosts && <hr />}
            {metadata.relatedPosts &&
              metadata.relatedPosts.map((post) => (
                <Link
                  href={`/${post.metadata.categories[0]}/${post.metadata.slug}`}
                  key={post.metadata.createdAt}
                >
                  <a className={styles.relatedPostLink}>
                    {post.metadata.title}
                  </a>
                </Link>
              ))}
          </div>
        ))}
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<NewsProps> = async () => {
  const getPosts = await import("@lib/blog").then(
    (module) => module.getAllPosts
  );
  const getPostBySlug = await import("@lib/blog").then(
    (module) => module.getPostBySlug
  );

  const { posts } = getPosts();

  const postsWithRelated = await Promise.all(
    posts.map(async (post) => {
      if (post.metadata.relatedPosts) {
        const related =
          (await Promise.all(
            post.metadata.relatedPosts!.map(async (slug) => {
              const { post } = await getPostBySlug({
                slug,
              });

              return post as Post;
            })
          )) || [];
        return {
          ...post,
          metadata: {
            ...post.metadata,
            relatedPosts: related,
          },
        };
      }

      return post;
    })
  );

  return {
    props: {
      posts: postsWithRelated as PostWithRelated[],
    },
  };
};

export default News;
