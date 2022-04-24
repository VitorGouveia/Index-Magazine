import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { getPosts, getPostsCategories } from "@lib/blog";

type CategoryPageProps = {
  slug: string;

  type: "post" | "category";
};

const CategoryPage: NextPage<CategoryPageProps> = ({ slug, type }) => {
  return (
    <div>
      <p>
        {slug} - {type}
      </p>
    </div>
  );
};

type Props = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<Props> = () => {
  const { posts } = getPosts({
    category: "blog",
  });

  const paths = posts.map(({ metadata }) => ({
    params: {
      slug: metadata.slug,
    },
  }));

  return {
    fallback: "blocking",
    paths: paths,
  };
};

export const getStaticProps: GetStaticProps<CategoryPageProps, Props> = ({
  params,
}) => {
  // this can either be a post or a category page, so i have do to some filtering
  const { posts } = getPosts({ category: "blog" });
  const categories = getPostsCategories(posts);

  if (categories.includes(params?.slug)) {
    // then its a category
    return {
      props: {
        slug: params?.slug!,
        type: "category",
      },
    };
  }

  const [post] = posts.filter((post) => post.metadata.slug === params?.slug);

  if (!post) {
    // not found
    return {
      notFound: true,
      props: {
        slug: "",
        type: "category",
      },
    };
  }

  // its a post
  return {
    props: {
      slug: params?.slug!,
      type: "post",
    },
  };
};

export default CategoryPage;
