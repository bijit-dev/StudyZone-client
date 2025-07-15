import { Outlet } from 'react-router';
import Lottie from 'lottie-react';
import StudyZoneLogo from '../components/StudyZoneLogo';
import animationData from '../assets/json/RegesterLottie.json';


const AuthLayout = () => {
    return (
        <div className=" container mx-auto py-4 lg:p-8 bg-base-200">
            <div>
                <StudyZoneLogo />
            </div>
            <div className="hero-content mx-auto flex-col lg:flex-row-reverse">
                <div className='flex-1'>
                    <Lottie style={{ maxWidth: '600px', margin:'auto'}} animationData={animationData} loop={true} ></Lottie>
                </div>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;