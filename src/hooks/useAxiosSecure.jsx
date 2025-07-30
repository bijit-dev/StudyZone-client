import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.accessToken) {
            // 🔒 Add request interceptor
            const requestInterceptor = axiosSecure.interceptors.request.use(
                (config) => {
                    config.headers.Authorization = `Bearer ${user.accessToken}`;
                    return config;
                },
                (error) => Promise.reject(error)
            );

            // 🔐 Add response interceptor
            const responseInterceptor = axiosSecure.interceptors.response.use(
                (res) => res,
                (error) => {
                    const status = error.response?.status;

                    if (status === 401 || status === 403) {
                        logOut()
                            .then(() => {
                                navigate('/login');
                            })
                            .catch(console.error);
                    }

                    return Promise.reject(error);
                }
            );

            // 🧹 Cleanup: remove interceptors to prevent memory leaks
            return () => {
                axiosSecure.interceptors.request.eject(requestInterceptor);
                axiosSecure.interceptors.response.eject(responseInterceptor);
            };
        }
    }, [user, logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
