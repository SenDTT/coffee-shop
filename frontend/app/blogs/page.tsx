
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../../components/Layouts/MainLayout"), { ssr: true });
const ComingSoon = dynamic(() => import("../../components/ComingSoon"), { ssr: true });

export default function BlogsList() {
    return (
        <Layout>
            <ComingSoon />
        </Layout>
    )
}