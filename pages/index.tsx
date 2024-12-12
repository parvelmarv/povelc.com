import type { NextPage } from 'next';
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Connect from "../components/Connect";

const IndexPage: NextPage = () => {
  return (
    <Layout title="Portfolio | Povel Croona">
      <Hero />
      <Projects />
      <Connect />
    </Layout>
  );
};

export default IndexPage;
