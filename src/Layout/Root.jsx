import { Outlet } from 'react-router';

const Root = () => {
    return (
        <>
            {/* <Navbar /> */}
            <Outlet />
            {/* <Footer /> */}
        </>
    );
};

export default Root;