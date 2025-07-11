
const Home = () => {
    return (
        <div className="bg-gray-100">
            {/* banner section */}
            <section
                className="hero min-h-[90vh]"
                style={{
                    backgroundImage:
                        "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
                }}
            >
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Bangladesh Learn and Study Zone</h1>
                        <p className="mb-5">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </section>

            {/* available study session */}
            <section className="py-12 container mx-auto px-4">
                <h1 className="font-bold text-3xl text-center capitalize text">available study session</h1>
            </section>
        </div>
    );
};

export default Home;