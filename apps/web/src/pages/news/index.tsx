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
                <div className={styles.postImage}>
                  <img src={metadata.thumbnailUrl} alt={metadata.description} />
                </div>
              </a>
            </Link>

            <span>
              {metadata.tags.slice(0, 3).map((category, index) => (
                <>
                  <Link key={category} href={`/news/${category}`}>
                    <a>{category}</a>
                  </Link>
                  {index + 1 === metadata.tags.slice(0, 3).length ? "" : ", "}
                </>
              ))}
            </span>

            <Link href={`/news/${metadata.slug}`}>
              <a>
                <h4>{metadata.title}</h4>
                <p>{metadata.description.slice(0, 80)}...</p>
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

      <section data-variant="large-small" className={styles.evenly}>
        <div style={{ width: "100%" }}>
          <h1>GEOPOLÍTICA</h1>

          <section
            data-variant="large-only"
            className={styles.postsRow}
            style={{ padding: 0 }}
          >
            <div data-variant="large" className={styles.post}>
              <Link href={`/news`}>
                <a>
                  <div className={styles.postImage}></div>
                </a>
              </Link>

              <span>
                <Link href={`/news`}>
                  <a>bruh</a>
                </Link>
              </span>

              <Link href={`/news`}>
                <a>
                  <h4>bruh title</h4>
                  <p>my huge post description</p>
                </a>
              </Link>
            </div>
          </section>
        </div>

        <div style={{ width: "100%" }}>
          <h1>TECNOLOGIA</h1>

          <section className={styles.postsRow} style={{ padding: 0 }}>
            <div data-variant="small" className={styles.post}>
              <Link href={`/news`}>
                <a>
                  <div className={styles.postImage}></div>
                </a>
              </Link>
              <span>
                <Link href={`/news`}>
                  <a>bruh</a>
                </Link>
              </span>
              <Link href={`/news`}>
                <a>
                  <h4>bruh title</h4>
                  <p>my huge post description</p>
                </a>
              </Link>
            </div>

            <div data-variant="small" className={styles.post}>
              <Link href={`/news`}>
                <a>
                  <div className={styles.postImage}></div>
                </a>
              </Link>
              <span>
                <Link href={`/news`}>
                  <a>bruh</a>
                </Link>
              </span>
              <Link href={`/news`}>
                <a>
                  <h4>bruh title</h4>
                  <p>my huge post description</p>
                </a>
              </Link>
            </div>
          </section>
        </div>
      </section>

      <section data-variant="large-large" className={styles.evenly}>
        <div style={{ width: "100%" }}>
          <h1>MELHORES DA SEMANA</h1>

          <section
            className={styles.postsRow}
            style={{ padding: 0, justifyContent: "center" }}
          >
            <div data-variant="large" className={styles.post}>
              <Link href={`/news`}>
                <a>
                  <div className={styles.postImage}></div>
                </a>
              </Link>

              <span>
                <Link href={`/news`}>
                  <a>bruh</a>
                </Link>
              </span>

              <Link href={`/news`}>
                <a>
                  <h4>bruh title</h4>
                  <p>my huge post description</p>
                </a>
              </Link>
            </div>

            <div data-variant="large" className={styles.post}>
              <Link href={`/news`}>
                <a>
                  <div className={styles.postImage}></div>
                </a>
              </Link>

              <span>
                <Link href={`/news`}>
                  <a>bruh</a>
                </Link>
              </span>

              <Link href={`/news`}>
                <a>
                  <h4>bruh title</h4>
                  <p>my huge post description</p>
                </a>
              </Link>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export const getStaticProps: GetStaticProps<NewsProps> = async () => {
  const getPosts = await import("@lib/blog").then((module) => module.getPosts);
  const getPostBySlug = await import("@lib/blog").then(
    (module) => module.getPostBySlug
  );

  const { posts } = getPosts({
    category: "news",
  });

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
