import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { auth } from "../../../firebase/firebase.init";
import { updateProfile } from "firebase/auth";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
    const { createUser } = useAuth();
    const [photoURL, setPhotoURL] = useState("");
    const [uploading, setUploading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const axiosInstance = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const imgbbApiKey = "3c823c20841b57865bed1f6729b05fca";

    // 📤 Upload Photo
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        try {
            setUploading(true);
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
                formData
            );
            setPhotoURL(res.data.data.url);
            setUploading(false);
        } catch (error) {
            console.error("Image upload failed", error);
            setUploading(false);
        }
    };

    // ✅ Password Strength Check
    const validatePassword = (password) => {
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^])[A-Za-z\d@$!%*?#&^]{6,}$/;
        return regex.test(password);
    };

    // 📝 Form Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const role = form.role.value;
        const fullName = form.fullName.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;


        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }

        if (!validatePassword(password)) {
            setPasswordError(
                "Password must be at least 6 characters, include uppercase, lowercase, number, and special character."
            );
            return;
        }

        setPasswordError(""); // Clear previous error

        // createUser
        createUser(email, password)
            .then(() => {
                navigate(from)

                // update user profile
                const profile = {
                    displayName: fullName,
                    photoURL: photoURL,
                }

                updateProfile(auth.currentUser, profile)
                    .then(async () => {

                        // update userinfo in the database
                        const userInfo = {
                            name: fullName,
                            photoURL: photoURL,
                            email: email,
                            role: role, // default role
                            created_at: new Date().toISOString(),
                            last_log_in: new Date().toISOString()
                        }
                        // Check if user already exists
                        await axiosInstance.post('/users', userInfo);

                        Swal.fire({
                            title: "Login successfully!",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        form.reset();
                        setPhotoURL("");
                    }).catch(() => {
                        Swal.fire({
                            title: "Profile update failed! please try again.",
                            icon: "error",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    });
            }).catch(() => {
                Swal.fire({
                    title: "Login failed! please try again.",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center  p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-indigo-600">Create Your Account</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* User Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Register As
                        </label>
                        <div className="flex items-center gap-4">
                            <label className="inline-flex items-center btn btn-accent btn-outline hover:text-white  ">
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    className="form-radio text-indigo-600"
                                    defaultChecked
                                    required
                                />
                                <span className="ml-2 ">Student</span>
                            </label>
                            <label className="inline-flex items-center btn btn-accent btn-outline hover:text-white">
                                <input
                                    type="radio"
                                    name="role"
                                    value="Tutor"
                                    className="form-radio text-indigo-600"
                                    required
                                />
                                <span className="ml-2  ">Tutor</span>
                            </label>
                        </div>
                    </div>

                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="John Doe"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Upload Photo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                            required
                        />
                        {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                        {photoURL && (
                            <img
                                src={photoURL}
                                alt="Uploaded"
                                className="mt-2 rounded-lg w-24 h-24 object-cover"
                            />
                        )}
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                            required
                        />
                        <span
                            className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                            required
                        />
                        <span
                            className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    {/* Show Error Message */}
                    {passwordError && (
                        <p className="text-sm text-red-500 mt-1">{passwordError}</p>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                        disabled={uploading}
                    >
                        {uploading ? "Registering..." : "Register"}
                    </button>
                </form>

                {/* Already Registered */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-600 hover:underline">
                        Login
                    </Link>
                </p>

                <SocialLogin />
            </div>

        </div>
    );
};

export default Register;
