import type { NextPage } from "next";
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import MenuPreview from "@/components/Home/MenuPreview";
// _app.tsx or in the component that uses <Slider>

const Home: NextPage = () => {
  return (
    <Layout>
      <Hero />
      {/* Add sections like MenuPreview, Testimonials, etc. */}
      <MenuPreview />
    </Layout>
  );
};

export default Home;
