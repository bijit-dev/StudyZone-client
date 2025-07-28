import Banner from "./Banner";
import banner1 from '../../assets/banner/1.webp'
import banner2 from '../../assets/banner/2.webp'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import StudySessions from "./StudySessions";
import KeyFeatures from "./KeyFeatures";
import OurPartners from "./OurPartners";
import Ourteacher from "./Ourteacher";
import Contact from "./Contact";

const Home = () => {
    return (
        <div className="bg-gray-100">
            {/* banner section */}
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: true,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide><Banner img={banner1} /></SwiperSlide>
                <SwiperSlide><Banner img={banner2} /></SwiperSlide>
            </Swiper>

            {/* available study session */}
            <StudySessions />

            {/* Our Partners Section */}
            <OurPartners />

            {/* Key Features Section */}
            <section className="bg-blue-50 py-10 px-6 rounded-xl shadow-md max-w-5xl mx-auto my-10">
                <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
                    Collaborative Study Platform Overview
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                    Our platform bridges <strong>students</strong>, <strong>tutors</strong>, and <strong>administrators</strong> into a centralized system
                    for <strong>study session scheduling</strong>, <strong>material sharing</strong>, and <strong>user management</strong>. Designed for modern education,
                    it empowers efficient learning, streamlined collaboration, and full administrative control.
                </p>
            </section>

            {/* Our Teachers Section */}
            <Ourteacher />

            {/* Key Features */}
            <KeyFeatures />

            {/* Contact Section */}
            <Contact />
        </div>
    );
};

export default Home;