import Layout from '../components/Layout';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import fetch from 'isomorphic-unfetch';

const IndexPage = (props: any) => {
  if (props.code > 400) return <Error statusCode={props.code} />;
  const router = useRouter();
  if (router.isFallback)
    return (
      <Layout title="Loading...">
        <div>loading...</div>
      </Layout>
    );

  return (
    <Layout title={props.cmsData.meta.seo_title}>
      <h1>{props.cmsData.meta.seo_title}</h1>
      <pre>
        <code>{JSON.stringify(props, null, 2)}</code>
      </pre>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['/us', '/us/products'],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params) return { props: {} };
  const slugs =
    typeof context.params.slugs === 'string'
      ? context.params.slugs
      : context.params.slugs.join('/');

  const url = `https://api-dev.devatech.us/api/v2/pages/find/?site=2&html_path=${slugs}`;
  const response = await fetch(url);
  const cmsData = await response.json();
  return {
    props: {
      cmsData,
      code: response.status,
    },
  };
};

export default IndexPage;
