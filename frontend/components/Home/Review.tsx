import Slider, { Settings } from "react-slick";

export default function ReviewSection() {

    const sliderSettings: Settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2500,
        pauseOnHover: true,
        arrows: false,
        className: "center",
        centerMode: true,
        centerPadding: "60px",
        speed: 500,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3 },
            },
            {
                breakpoint: 640,
                settings: { slidesToShow: 1 },
            },
        ],
    };

    return (
        <section className="section-panel customer-reviews sm:min-h-lvh section-full-width py-16 bg-espresso-800">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-xl sm:text-4xl font-bold mb-6 font-serif text-latte-200">Customer Reviews</h2>
                <p className="mb-12 text-light_latte font-serif leading-8 mx-auto">
                    Hear what our coffee lovers say about their experience with us — every sip, every visit, every moment.
                </p>

                <Slider {...sliderSettings}>
                    {/* Review 1 */}
                    <div className="bg-light_latte shadow-lg shadow-cabin-800 p-6 rounded-xl !flex justify-center items-stretch flex-col">
                        <img
                            src="https://i.pravatar.cc/100?img=5"
                            alt="Reviewer 1"
                            className="w-16 h-16 rounded-full mx-auto mb-4"
                        />
                        <h4 className="font-semibold text-lg text-latte-800 mb-2">Emily R.</h4>
                        <p className="text-sm text-latte-700 font-serif">
                            The best matcha latte I’ve ever had. Cozy vibes, lovely staff — my new favorite hangout spot!
                        </p>
                    </div>

                    {/* Review 2 */}
                    <div className="bg-light_latte shadow-lg shadow-cabin-800 p-6 rounded-xl !flex justify-center items-stretch flex-col">
                        <img
                            src="https://i.pravatar.cc/100?img=12"
                            alt="Reviewer 2"
                            className="w-16 h-16 rounded-full mx-auto mb-4"
                        />
                        <h4 className="font-semibold text-lg text-latte-800 mb-2">David M.</h4>
                        <p className="text-sm text-latte-700 font-serif">
                            A hidden gem! The espresso is bold, smooth, and perfectly balanced. Highly recommend.
                        </p>
                    </div>

                    {/* Review 3 */}
                    <div className="bg-light_latte shadow-lg shadow-cabin-800 p-6 rounded-xl !flex justify-center items-stretch flex-col">
                        <img
                            src="https://i.pravatar.cc/100?img=24"
                            alt="Reviewer 3"
                            className="w-16 h-16 rounded-full mx-auto mb-4"
                        />
                        <h4 className="font-semibold text-lg text-latte-800 mb-2">Sophia L.</h4>
                        <p className="text-sm text-latte-700 font-serif">
                            Incredible atmosphere and service. I come here every weekend to relax and unwind.
                        </p>
                    </div>

                    {/* Review 4 */}
                    <div className="bg-light_latte shadow-lg shadow-cabin-800 p-6 rounded-xl !flex justify-center items-stretch flex-col">
                        <img
                            src="https://i.pravatar.cc/100?img=27"
                            alt="Reviewer 1"
                            className="w-16 h-16 rounded-full mx-auto mb-4"
                        />
                        <h4 className="font-semibold text-lg text-latte-800 mb-2">Emily R.</h4>
                        <p className="text-sm text-latte-700 font-serif">
                            The best matcha latte I’ve ever had. Cozy vibes, lovely staff — my new favorite hangout spot!
                        </p>
                    </div>

                    {/* Review 5 */}
                    <div className="bg-light_latte shadow-lg shadow-cabin-800 p-6 rounded-xl !flex justify-center items-stretch flex-col">
                        <img
                            src="https://i.pravatar.cc/100?img=52"
                            alt="Reviewer 2"
                            className="w-16 h-16 rounded-full mx-auto mb-4"
                        />
                        <h4 className="font-semibold text-lg text-latte-800 mb-2">David M.</h4>
                        <p className="text-sm text-latte-700 font-serif">
                            A hidden gem! The espresso is bold, smooth, and perfectly balanced. Highly recommend.
                        </p>
                    </div>

                    {/* Review 6 */}
                    <div className="bg-light_latte shadow-lg shadow-cabin-800 p-6 rounded-xl !flex justify-center items-stretch flex-col">
                        <img
                            src="https://i.pravatar.cc/100?img=60"
                            alt="Reviewer 3"
                            className="w-16 h-16 rounded-full mx-auto mb-4"
                        />
                        <h4 className="font-semibold text-lg text-latte-800 mb-2">Sophia L.</h4>
                        <p className="text-sm text-latte-700 font-serif">
                            Incredible atmosphere and service. I come here every weekend to relax and unwind.
                        </p>
                    </div>
                </Slider>
            </div>
        </section>
    );
}