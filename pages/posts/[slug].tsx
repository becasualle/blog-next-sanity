import Head from "next/head";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import {
  Container,
  PostBody,
  MoreStories,
  Header,
  PostHeader,
  SectionSeparator,
  Layout,
  PostTitle,
} from "../../components";
import { postQuery, postSlugsQuery } from "../../lib/queries";
import { urlForImage, usePreviewSubscription } from "../../lib/sanity";
import {
  sanityClient,
  getClient,
  overlayDrafts,
} from "../../lib/sanity.server";
import { SanityData } from "../../types";

type Props = {
  data: SanityData | {};
  preview: boolean;
  slug: string;
};

export default function Post({ data = {}, preview, slug }: Props) {
  const router = useRouter();

  // TODO: handle error when slug is undefined (when post url is not exist)
  const {
    // @ts-ignore
    data: { post, morePosts },
  } = usePreviewSubscription(postQuery, {
    params: { slug },
    initialData: data,
    enabled: preview,
  });

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>{post.title} | Без заголовка</title>
                {post.coverImage?.asset?._ref && (
                  <meta
                    key="ogImage"
                    property="og:image"
                    content={urlForImage(post.coverImage)
                      .width(1200)
                      .height(627)
                      .fit("crop")
                      .url()}
                  />
                )}
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} />
            </article>
            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const slug = params.slug;
  const { post, morePosts } = await getClient(preview).fetch(postQuery, {
    slug,
  });

  const data = {
    post,
    morePosts: overlayDrafts(morePosts),
  } as SanityData;

  return {
    props: {
      preview,
      data,
      slug,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(postSlugsQuery);

  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  };
}
