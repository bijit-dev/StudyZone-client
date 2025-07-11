

const Banner = ({img}) => {
    return (
        <section
                className="hero min-h-[90vh]"
                style={{
                    backgroundImage: `url(${img})`,
                }}
            >
                <div className="hero-overlay"></div>
                <div className="container mx-auto px-4 text-neutral-content text-center md:text-left">
                    <div className="max-w-full space-y-4">
                        <h3 className='font-medium text-lg md:text-xl lg:text-3xl'>Welcome To Study</h3>
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">The Best Learning Institution</h1>
                        <p className="md:max-w-1/2 font-medium text-base md:text-lg">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                        <button className="btn btn-accent btn-outline lg:btn-lg">Get Started</button>
                    </div>
                </div>
            </section>
    );
};

export default Banner;