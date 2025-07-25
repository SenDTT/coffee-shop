import { Users } from 'lucide-react';

import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../../components/Layouts/MainLayout"), { ssr: true });

export default function AboutPage() {
    return (
        <Layout>
            <section>
                <h1 className="text-4xl font-bold mb-6 flex items-center gap-3 text-latte-900">
                    <Users className="w-8 h-8 text-latte-600" />
                    About Us
                </h1>

                <p className="text-lg text-latte-700 leading-relaxed mb-6">
                    We are a passionate Vietnamese craft coffee brand committed to delivering the freshest, highest quality coffee beans
                    sourced directly from local farms. Our mission is to share the rich flavors and stories behind each cup.
                </p>

                <p className="text-lg text-latte-700 leading-relaxed mb-6">
                    From farm to cup, every step is carefully controlled — from selecting the beans, roasting small batches, to fast delivery right to your door.
                </p>

                <p className="text-lg text-latte-700 leading-relaxed">
                    Thank you for supporting our journey and enjoying authentic Vietnamese coffee.
                </p>
            </section>
        </Layout>
    );
}
