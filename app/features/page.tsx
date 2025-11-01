import { FaBolt, FaCode, FaUsers, FaTerminal, FaCloud, FaLock } from "react-icons/fa";

export default function page() {
  const features = [
    {
      icon: <FaCode className="text-orange-500 text-4xl" />,
      title: "Multi-Language Editor",
      desc: "Write and run code in 15+ programming languages seamlessly inside your browser.",
    },
    {
      icon: <FaTerminal className="text-orange-500 text-4xl" />,
      title: "Instant Execution",
      desc: "Run your code instantly with built-in terminal support and real-time output.",
    },
    {
      icon: <FaUsers className="text-orange-500 text-4xl" />,
      title: "Collaborate Live",
      desc: "Invite your friends or teammates to code together in real time.",
    },
    {
      icon: <FaCloud className="text-orange-500 text-4xl" />,
      title: "Cloud-Based",
      desc: "All your projects are stored securely in the cloud — accessible anywhere.",
    },
    {
      icon: <FaBolt className="text-orange-500 text-4xl" />,
      title: "Fast & Lightweight",
      desc: "Optimized for speed and simplicity — no heavy installs, just open and start coding.",
    },
    {
      icon: <FaLock className="text-orange-500 text-4xl" />,
      title: "Secure Environment",
      desc: "Your code and data are protected with sandboxed execution and HTTPS encryption.",
    },
  ];

  return (
    <section className="bg-white text-gray-900 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
          Powerful Features for Every Developer
        </h1>
        <p className="text-gray-600 text-xl mt-3">
          Everything you need to code, run, and collaborate — all in one place.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-orange-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow hover:-translate-y-1 duration-300"
            >
              <div className="flex justify-center mb-4">{f.icon}</div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                {f.title}
              </h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
