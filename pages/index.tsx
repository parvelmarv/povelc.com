import type { NextPage } from 'next';
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import About from "../components/About";
import Contact from "../components/Contact";

const IndexPage: NextPage = () => {
  return (
    <Layout title="Portfolio | John Doe">
      <Hero />
      <Projects />
      <About />
      <Contact />
    </Layout>
  );
};

export default IndexPage;
