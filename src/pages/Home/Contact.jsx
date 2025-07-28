import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
    return (
        <section id="Contact" className="bg-gray-100 py-12 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Contact Info */}
                <div>
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">Get in Touch</h2>
                    <p className="text-gray-600 mb-6">
                        Have questions or suggestions? Reach out to us — we're here to help you succeed.
                    </p>
                    <div className="space-y-4 text-gray-700">
                        <div className="flex items-center gap-3">
                            <FaPhoneAlt className="text-blue-600" />
                            <span>+880 123 456 789</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaEnvelope className="text-blue-600" />
                            <span>support@studyzone.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaMapMarkerAlt className="text-blue-600" />
                            <span>Dhaka, Bangladesh</span>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Send a Message</h3>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm mb-1 text-gray-700">Name</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1 text-gray-700">Email</label>
                            <input
                                type="email"
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Your Email"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1 text-gray-700">Message</label>
                            <textarea
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="4"
                                placeholder="Your Message"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
