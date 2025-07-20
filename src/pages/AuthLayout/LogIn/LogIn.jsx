import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SocialLogin from "../SocialLogin/SocialLogin";

const LogIn = () => {

    const [showPassword, setShowPassword] = useState(false);
    const { signIn } = useAuth();
    const { register, handleSubmit } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(() => {
                Swal.fire({
                    title: "Login successfully!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from);

            }).catch(() => {
                Swal.fire({
                    title: "Login failed! please try again.",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 ">
                {/* Logo or Heading */}
                <div className="text-center mb-6">
                    {/* You can replace with your logo */}
                    <h1 className="text-3xl font-bold text-primary"> Please Login</h1>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            {...register('email')}
                            placeholder="example@email.com"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            {...register('password')}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                        <span
                            className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    {/* Remember Me + Forgot Password */}
                    <div className="flex justify-between items-center text-sm">
                        <label className="flex items-center gap-2 text-gray-600">
                            <input type="checkbox" className="form-checkbox text-indigo-600" />
                            Remember me
                        </label>
                        <Link to="#" className="text-indigo-600 hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                    >
                        Login
                    </button>
                </form>

                {/* Optional Footer */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-indigo-600 hover:underline">
                        Register
                    </Link>
                </p>

                <SocialLogin />
            </div>
        </div>
    );
};



export default LogIn;