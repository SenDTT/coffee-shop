

export default function AboutUs() {
    return (
        <section className="section-panel sm:min-h-lvh section-full-width">
            {/* Left Column - Brand Introduction */}
            <div className="sm:min-h-lvh w-full grid grid-cols-1 md:grid-cols-2 font-serif">
                <div className="bg-espresso-800 text-light_latte p-10 flex items-center sm:px-28 order-1 md:order-none">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome to Macha Haus</h2>
                        <p className="text-lg mb-4 leading-7">
                            Where matcha meets modern moments.
                        </p>
                        <p className="text-lg leading-7">
                            We bring a fresh twist to traditional brews. Crafted with organic Japanese matcha and infused with creativity, our drinks are more than beverages — they’re rituals of calm and joy.
                        </p>
                    </div>
                </div>

                {/* Right Column - Our Philosophy */}
                <div className="bg-matcha-latte p-10 sm:px-28 h-80 sm:h-auto order-2 md:order-none">

                </div>

                {/* Right Column - Our Philosophy */}
                <div className="bg-esspresso p-10 sm:px-28 h-80 sm:h-auto order-4 md:order-none">

                </div>
                {/* Left Column - Brand Introduction */}
                <div className="text-espresso-800 bg-light_latte p-10 flex items-center sm:px-28 order-3 md:order-none">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-semibold mb-4">Our Philosophy</h3>
                        <p className="mb-6 leading-8">
                            At Macha Haus, every cup is a story — from the green fields of Uji to your cozy corner table. We honor sustainability, mindfulness, and craftsmanship in all we do.
                        </p>
                        <p className="leading-8">
                            Whether you're sipping a classic matcha latte or trying a seasonal creation, we aim to spark a moment of clarity and comfort in your day.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
