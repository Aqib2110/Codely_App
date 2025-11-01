import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export default function page() {
  return (
    <section className="bg-white text-gray-900 min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-gray-600 text-lg mt-3">
            Have questions, feedback, or collaboration ideas? We’d love to hear from you.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form className="bg-orange-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea
                placeholder="Write your message here..."
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 h-32 resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:bg-orange-600 transition-all hover:shadow-lg"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-orange-500 mb-6">Contact Information</h2>
            <p className="text-gray-600 mb-6">
              We’re here to help! Whether it’s a question about features, a bug report, or just
              to say hi — drop us a line.
            </p>

            <div className="flex items-center mb-4">
              <FaEnvelope className="text-orange-500 text-xl mr-3" />
              <span className="text-gray-700">support@codely.dev</span>
            </div>

            <div className="flex items-center mb-4">
              <FaPhoneAlt className="text-orange-500 text-xl mr-3" />
              <span className="text-gray-700">+1 (800) 123-4567</span>
            </div>

            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-orange-500 text-xl mr-3" />
              <span className="text-gray-700">San Francisco, CA, USA</span>
            </div>

            <p className="text-gray-600 mt-6">
              Or reach us directly on our social platforms for faster replies.
            </p>

            <div className="mt-4 flex space-x-4">
              <a
                href="#"
                className="text-orange-500 hover:text-orange-600 font-medium"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-orange-500 hover:text-orange-600 font-medium"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-orange-500 hover:text-orange-600 font-medium"
              >
                Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
