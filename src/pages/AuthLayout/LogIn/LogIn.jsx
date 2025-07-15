import React from "react";
import { Link } from "react-router";

const LogIn = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center py-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 ">
                {/* Logo or Heading */}
                <div className="text-center mb-6">
                    {/* You can replace with your logo */}
                    <h1 className="text-3xl font-bold text-primary"> Please Login</h1>
                </div>

                {/* Form */}
                <form className="space-y-6">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="example@email.com"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* Remember Me + Forgot Password */}
                    <div className="flex justify-between items-center text-sm">
                        <label className="flex items-center gap-2 text-gray-600">
                            <input type="checkbox" className="form-checkbox text-indigo-600" />
                            Remember me
                        </label>
                        <a href="#" className="text-indigo-600 hover:underline">
                            Forgot password?
                        </a>
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
            </div>
        </div>
    );
};



export default LogIn;