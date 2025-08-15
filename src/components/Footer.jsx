import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Logo + Description */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Study Zone</h2>
                    <p className="text-sm">
                        A collaborative platform connecting students and tutors to enhance learning and access to study materials.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/study-sessions" className="hover:underline">Sessions</a></li>
                        <li><a href="/tutors" className="hover:underline">Tutors</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="https://www.facebook.com/" className="hover:text-white"><FaFacebookF /></a>
                        <a href="https://x.com/" className="hover:text-white"><FaTwitter /></a>
                        <a href="https://www.instagram.com/" className="hover:text-white"><FaInstagram /></a>
                        <a href="https://www.linkedin.com/" className="hover:text-white"><FaLinkedin /></a>
                    </div>
                </div>
            </div>

            <div className="mt-10 text-center text-xs text-gray-500 border-t border-gray-700 pt-4">
                &copy; {new Date().getFullYear()} Study Zone. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;