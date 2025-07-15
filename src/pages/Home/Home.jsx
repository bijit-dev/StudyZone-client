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
            <section className="py-12 container mx-auto px-4">
                <h1 className="font-bold text-3xl text-center capitalize text-primary">available study session</h1>
                <StudySessions />
            </section>
        </div>
    );
};

export default Home;