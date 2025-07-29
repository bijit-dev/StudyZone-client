import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    console.log(user.accessToken);
    
    axiosSecure.interceptors.request.use(config => {
        if (user && user.accessToken) {
            config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        const status = error.response?.status;
        if (status === 403) {
            navigate('/');
        } else if (status === 401) {
            logOut()
                .then(() => {
                    navigate('/login');
                })
                .catch(() => {});
        }

        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;
