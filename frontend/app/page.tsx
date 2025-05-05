import type { NextPage } from "next";
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <Hero />
      {/* Add sections like MenuPreview, Testimonials, etc. */}
    </Layout>
  );
};

export default Home;
