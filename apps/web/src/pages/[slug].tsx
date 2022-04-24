import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next/types";

import { getAllPosts, getPostBySlug, Post, MDX } from "@lib/blog";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";

type LayoutProps = {
  mdx: MDX;
  post: Post;
  similarPosts: Post[];
};

type HeadingType = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

const components: MDXRemoteProps["components"] = {
  h1: ({ children, ...props }: HeadingType) => <h1 {...props}>{children}</h1>,
  h2: ({ children, ...props }: HeadingType) => <h2 {...props}>{children}</h2>,
  h3: ({ children, ...props }: HeadingType) => <h3 {...props}>{children}</h3>,
  p: ({
    children,
    ...props
  }: DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >) => <p {...props}>{children}</p>,
};

const Layout: NextPage<LayoutProps> = ({ mdx, post, similarPosts }) => {
  return (
    <React.Fragment>
      <MDXRemote {...mdx} components={components} />
    </React.Fragment>
  );
};

export default Layout;

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = getAllPosts();
  const paths = posts.map(({ metadata }) => ({
    params: {
      slug: metadata.slug,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  LayoutProps,
  { slug: string }
> = async ({ params }) => {
  const slug = params?.slug;

  const { mdx, post } = await getPostBySlug({
    slug,
  });

  if (!post || !mdx) {
    return {
      redirect: {
        destination: "/blog",
        permanent: false,
      },
    };
  }

  const { posts } = getAllPosts();
  const similarPosts: Post[] = [];

  posts.forEach((_post) => {
    if (_post.metadata.type === post.metadata.type) {
      similarPosts.push(_post);
    }
  });

  return {
    props: {
      mdx,
      post,
      similarPosts,
    },
    revalidate: 1,
  };
};
