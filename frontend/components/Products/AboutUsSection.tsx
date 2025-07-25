import { Coffee, Handshake, Leaf, PackageSearch } from "lucide-react"; // adjust icons as needed

export default function AboutUsSection() {
    return (
        <section className="section-full-width text-cabin-800 py-16 px-6 sm:px-10 lg:px-20">
            <div className="container mx-auto">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 text-center text-cabin-800">About Us</h2>
                <p className="text-cabin-800 max-w-3xl mx-auto text-center mb-10 text-base">
                    We are a Vietnamese craft coffee brand dedicated to premium quality, transparent sourcing, and in-house roasting.
                    Every cup reflects our love for the land, the farmers, and the experience of drinking great coffee.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 sm:gap-8 text-center">
                    <div className="flex flex-col items-center px-2 py-4 sm:px-4 sm:py-8overflow-hidden bg-latte-500/20 rounded-none sm:rounded-xl">
                        {/* Foreground Icon */}
                        <Coffee className="w-10 h-10 text-cabin-800" />
                        <h3 className="text-lg font-semibold text-cabin-800">Fresh Roasts</h3>
                        <p className="text-sm text-cabin-800">
                            Small-batch roasted weekly for peak flavor.
                        </p>
                    </div>

                    <div className="flex flex-col items-center px-2 py-4 sm:px-4 sm:py-8overflow-hidden bg-caramel-800/20 rounded-none sm:rounded-xl">
                        <Handshake className="w-10 h-10 text-cabin-800" />
                        <h3 className="text-lg font-semibold text-cabin-800">Direct Trade</h3>
                        <p className="text-sm text-cabin-800">
                            We partner directly with local farmers in Vietnam.
                        </p>
                    </div>

                    <div className="flex flex-col items-center px-2 py-4 sm:px-4 sm:py-8overflow-hidden bg-caramel-800/20 sm:bg-latte-500/20 rounded-none sm:rounded-xl">
                        <Leaf className="w-10 h-10 text-cabin-800" />
                        <h3 className="text-lg font-semibold text-cabin-800">Sustainable</h3>
                        <p className="text-sm text-cabin-800">
                            Eco-conscious packaging and ethical sourcing practices.
                        </p>
                    </div>

                    <div className="flex flex-col items-center px-2 py-4 sm:px-4 sm:py-8overflow-hidden bg-latte-500/20 sm:bg-caramel-800/20 rounded-none sm:rounded-xl">
                        <PackageSearch className="w-10 h-10 text-cabin-800" />
                        <h3 className="text-lg font-semibold text-cabin-800">Careful Delivery</h3>
                        <p className="text-sm text-cabin-800">
                            Fast, careful shipping to ensure freshness at your door.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
