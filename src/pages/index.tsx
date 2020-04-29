import Layout from '../components/Layout';
import { GetStaticProps } from 'next';
import fetch from 'isomorphic-unfetch';

const IndexPage = (props: any) => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <pre>
        <code>{JSON.stringify(props, null, 2)}</code>
      </pre>
    </p>
  </Layout>
);

export const getStaticProps: GetStaticProps = async (_context) => {
  const response = await fetch('https://api-dev.devatech.us/api/v2/pages/3/');
  const cmsData = await response.json();
  return {
    props: {
      cmsData,
    },
  };
};

export default IndexPage;
