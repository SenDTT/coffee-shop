export default function ReviewSection() {
    return (
        <section className="section-panel min-h-lvh section-full-width py-16 bg-espresso-800">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-xl sm:text-4xl font-bold mb-6 font-serif text-latte-200">Customer Reviews</h2>
                <p className="mb-12 text-light_latte font-serif leading-8 mx-auto">
                    Hear what our coffee lovers say about their experience with us — every sip, every visit, every moment.
                </p>

                <div className="grid gap-10 md:grid-cols-3">
                    {/* Review 1 */}
                    <div className="bg-light_latte/20 shadow-md p-6 rounded-xl">
                        <img
                            src="https://i.pravatar.cc/100?img=5"
                            alt="Reviewer 1"
                            className="w-16 h-16 rounded-full mx-auto mb-4"
                        />
                        <h4 className="font-semibold text-lg text-latte-200 mb-2">Emily R.</h4>
                        <p className="text-sm text-light_latte font-serif">
                            The best matcha latte I’ve ever had. Cozy vibes, lovely staff — my new favorite hangout spot!
                        </p>
                    </div>

                    {/* Review 2 */}
                    <div className="bg-light_latte/20 shadow-md p-6 rounded-xl">
                        <img
                            src="https://i.pravatar.cc/100?img=12"
                            alt="Reviewer 2"
                            className="w-16 h-16 rounded-full mx-auto mb-4"
                        />
                        <h4 className="font-semibold text-lg text-latte-200 mb-2">David M.</h4>
                        <p className="text-sm text-light_latte font-serif">
                            A hidden gem! The espresso is bold, smooth, and perfectly balanced. Highly recommend.
                        </p>
                    </div>

                    {/* Review 3 */}
                    <div className="bg-light_latte/20 shadow-md p-6 rounded-xl">
                        <img
                            src="https://i.pravatar.cc/100?img=24"
                            alt="Reviewer 3"
                            className="w-16 h-16 rounded-full mx-auto mb-4"
                        />
                        <h4 className="font-semibold text-lg text-latte-200 mb-2">Sophia L.</h4>
                        <p className="text-sm text-light_latte font-serif">
                            Incredible atmosphere and service. I come here every weekend to relax and unwind.
                        </p>
                    </div>

                    {/* Review 4 */}
                    <div className="bg-light_latte/20 shadow-md p-6 rounded-xl">
                        <img
                            src="https://i.pravatar.cc/100?img=27"
                            alt="Reviewer 1"
                            className="w-16 h-16 rounded-full mx-auto mb-4"
                        />
                        <h4 className="font-semibold text-lg text-latte-200 mb-2">Emily R.</h4>
                        <p className="text-sm text-light_latte font-serif">
                            The best matcha latte I’ve ever had. Cozy vibes, lovely staff — my new favorite hangout spot!
                        </p>
                    </div>

                    {/* Review 5 */}
                    <div className="bg-light_latte/20 shadow-md p-6 rounded-xl">
                        <img
                            src="https://i.pravatar.cc/100?img=52"
                            alt="Reviewer 2"
                            className="w-16 h-16 rounded-full mx-auto mb-4"
                        />
                        <h4 className="font-semibold text-lg text-latte-200 mb-2">David M.</h4>
                        <p className="text-sm text-light_latte font-serif">
                            A hidden gem! The espresso is bold, smooth, and perfectly balanced. Highly recommend.
                        </p>
                    </div>

                    {/* Review 6 */}
                    <div className="bg-light_latte/20 shadow-md p-6 rounded-xl">
                        <img
                            src="https://i.pravatar.cc/100?img=60"
                            alt="Reviewer 3"
                            className="w-16 h-16 rounded-full mx-auto mb-4"
                        />
                        <h4 className="font-semibold text-lg text-latte-200 mb-2">Sophia L.</h4>
                        <p className="text-sm text-light_latte font-serif">
                            Incredible atmosphere and service. I come here every weekend to relax and unwind.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}