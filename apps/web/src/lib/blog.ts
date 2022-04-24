import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

import grayMatter from "gray-matter";
import { readdirSync, readFileSync } from "fs";

export type Post = {
  content?: string;

  metadata: Metadata;
};

export type Metadata = {
  slug?: string;
  title: string;
  description: string;

  categories: string[];

  /**
   * type of the post
   *
   * primary - centered heading with background image
   * guide - centered heading without image, breadcrumbs, table of contents on the side
   * tertiary - blog post
   */
  type: string;

  /**
   * estimated time to read the post in minutes
   */
  readTime: string;
  /**
   * url to a img to be in the banner
   */
  thumbnailUrl: string;

  tags: string[];
  authors: string[];

  // show related posts on news platform
  // an array of slugs
  relatedPosts?: string[];

  createdAt: number;
  updatedAt: number;
};

export type MDX = MDXRemoteSerializeResult<Record<string, unknown>>;

export type MDXPost = {
  mdx: MDX;
  post: Post;
};

function getFileContent(path: string) {
  const fileContent = readFileSync(path, "utf-8");

  const { content, data: metadata } = grayMatter(fileContent);

  /**                        0  1    2   4 or -1
   * ./src/posts/post.mdx -> . src posts post.mdx -> post.mdx
   */
  const [filename] = path.split("/").slice(-1);

  return {
    content,
    metadata: {
      slug: filename.replace(".mdx", ""),
      ...(metadata as Metadata),
    },
  };
}

// recursive function to read inside folders
function readFolder(folderPath: string): { posts: string[] } {
  const files = readdirSync(folderPath);

  let posts: string[] = [];

  files.forEach((filename) => {
    const isDirectory = !filename.includes("mdx");

    if (isDirectory) {
      const { posts: dirPosts } = readFolder(`${folderPath}/${filename}`);

      dirPosts.forEach((post) => posts.push(post));
    } else {
      posts.push(`${folderPath}/${filename}`);
    }
  });

  return {
    posts,
  };
}

export function getAllPosts() {
  const postFolder = "./src/posts";
  const { posts: recursivePosts } = readFolder(postFolder);

  const posts = recursivePosts.map((filename) => {
    const { content, metadata } = getFileContent(filename);

    return {
      content,
      metadata,
    };
  });

  return {
    posts,
  };
}

type getPostsProps = {
  category: string;
};

export function getPosts(data: getPostsProps) {
  const postFolder = "./src/posts";
  const { posts: recursivePosts } = readFolder(postFolder);

  const posts = recursivePosts.map((filename) => {
    const { content, metadata } = getFileContent(filename);

    return {
      content,
      metadata,
    };
  });

  return {
    posts: posts.filter((post) =>
      post.metadata.categories.includes(data.category)
    ),
  };
}

export function getPostsCategories(posts: Post[]) {
  const categories = new Set();

  posts.forEach((post) => {
    post.metadata.tags.forEach((tag) => categories.add(tag));
  });

  return Array.from(categories);
}

export async function getPostBySlug({ slug }: { slug: string | undefined }) {
  const { posts } = getAllPosts();

  const post = posts.find((post) => post.metadata.slug === slug);

  if (!post) {
    return {
      post: null,
      mdx: null,
    };
  }

  const { content } = post;
  const mdx = await serialize(content);

  return {
    mdx,
    post,
  };
}
