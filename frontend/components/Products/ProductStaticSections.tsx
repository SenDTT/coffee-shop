// components/ProductStaticSections.tsx
import AboutUsSection from "./AboutUsSection";
import HowToBrewDescription from "./HowToBrewDescription";
import ProductFAQ from "./ProductFAQ";
import RelatedProducts from "./RelatedProducts";

export default function ProductStaticSections() {
    return (
        <div className="">
            
            {/* SECTION: Brewing Instructions */}
            <HowToBrewDescription />

            {/* SECTION: About Us */}
            <AboutUsSection />

            {/* SECTION: Frequently Asked Questions */}
            <ProductFAQ />
            
            <RelatedProducts />
        </div>
    );
}
