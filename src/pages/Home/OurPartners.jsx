import Marquee from "react-fast-marquee";

const OurPartners = () => {
    const logos = [
        "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/0/08/Google_Logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png",
        "https://upload.wikimedia.org/wikipedia/commons/2/2f/Logo_of_Tesla_Motors.svg",
        "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/0/0e/NVIDIA_logo.svg",
    ];

    return (
        <section className="bg-gray-50 py-14">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
                Our Partners
            </h2>

            <Marquee direction="left" speed={60} pauseOnHover={true} autoFill={true}>
                <div className="flex space-x-16 px-4">
                    {logos.map((logo, index) => (
                        <img
                            key={index}
                            src={logo}
                            alt={`Partner ${index}`}
                            className="h-14 object-contain grayscale hover:grayscale-0 transition duration-300"
                        />
                    ))}
                </div>
            </Marquee>
        </section>
    );
};

export default OurPartners;
