import { FaCode, FaUsers, FaRocket } from "react-icons/fa";

export default function page() {
  return (
    <section className="bg-white text-gray-900 min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
          About Codely
        </h1>
        <p className="text-gray-600 text-xl mt-4 max-w-3xl mx-auto">
          Codely is a modern cloud-based coding environment designed for
          developers, students, and teams who want to **code, run, and collaborate**
          instantly — all from the browser.
        </p>

        {/* Mission Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-10">
          <div className="bg-orange-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
            <FaCode className="text-orange-500 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Built for Developers</h3>
            <p className="text-gray-600">
              Whether you’re a beginner learning your first language or a
              professional working on complex projects — Codely is made for you.
            </p>
          </div>

          <div className="bg-orange-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
            <FaUsers className="text-orange-500 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Collaboration First</h3>
            <p className="text-gray-600">
              Code together with friends or teammates in real time, with
              live cursors, chat, and instant output sharing.
            </p>
          </div>

          <div className="bg-orange-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
            <FaRocket className="text-orange-500 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Fast & Reliable</h3>
            <p className="text-gray-600">
              No setup. No lag. Just open your browser and start building —
              powered by secure, scalable cloud infrastructure.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="mt-24 text-left max-w-4xl mx-auto">
          <h2 className="text-3xl text-center sm:text-start font-bold text-orange-500 mb-4">Our Story</h2>
          <p className="text-gray-700 text-center sm:text-start text-lg leading-relaxed">
            Codely started with a simple goal: to make coding accessible from
            anywhere, without the hassle of local setups. We believe that great
            ideas can come from anywhere — and developers deserve tools that let
            them **focus on creativity, not configuration.**
          </p>
          <p className="text-gray-700 text-center sm:text-start text-lg mt-4 leading-relaxed">
            Our team is passionate about building an ecosystem where you can
            experiment, collaborate, and grow your skills — all in one place.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-16">
          <a
            href="/features"
            className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-all shadow-md hover:shadow-lg"
          >
            Explore Features
          </a>
        </div>
      </div>
    </section>
  );
}
