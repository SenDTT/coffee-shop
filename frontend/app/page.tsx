'use client';

import type { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { logout } from "../store/slices/auth";

// lazy load components
import dynamic from "next/dynamic";
import OurStorySection from "@/components/Home/OurStorySection";
const MenuPreview = dynamic(() => import("../components/Home/MenuPreview"), { ssr: false });
const Layout = dynamic(() => import("../components/Layouts/MainLayout"), { ssr: true });
const Hero = dynamic(() => import("../components/Hero"), { ssr: true });
const AboutUs = dynamic(() => import("../components/Home/AboutUs"), { ssr: true });
const ReviewSection = dynamic(() => import("../components/Home/Review"), { ssr: true });
const VideoSection = dynamic(() => import("../components/Home/VideoSection"), { ssr: true });

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { settings } = useAppSelector(state => state.settings);

  useEffect(() => {
    if (settings?.shopName) {
      document.title = settings.shopName;
    }
  }, [settings]);

  useEffect(() => {
    const expired = searchParams.get('expired');
    if (expired === "true") {
      dispatch(logout());
    }
  }, [searchParams, dispatch]);

  return (
    <Layout>
      {/* Hero section */}
      <Hero />
      {/* About Us section */}
      <AboutUs />
      {/* Menu section */}
      <MenuPreview />
      {/* Review section */}
      <ReviewSection />
      {/* Our Story section */}
      <OurStorySection />
      {/* Video section */}
      <VideoSection />
      {/* Footer will be rendered in the Layout component */}
    </Layout>
  );
};

export default Home;
