'use client';

import type { NextPage } from "next";
import Hero from "../components/Hero";
import Layout from "../components/Layouts/MainLayout";
import MenuPreview from "../components/Home/MenuPreview";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useSettings } from "../context/SettingsContext";

const Home: NextPage = () => {
  const { logout } = useAuth();
  const searchParams = useSearchParams();
  const { settings } = useSettings();

  useEffect(() => {
    if (settings?.shopName) {
      document.title = settings.shopName;
    }
  }, [settings]);

  useEffect(() => {
    const expired = searchParams.get('expired');
    if (expired === "true") {
      logout();
    }
  }, [searchParams]);

  return (
    <Layout>
      <Hero />
      {/* Add sections like MenuPreview, Testimonials, etc. */}
      <MenuPreview />
    </Layout>
  );
};

export default Home;
