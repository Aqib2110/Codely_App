import { Code2, Users, PlayCircle } from "lucide-react";
import Image from "next/image";
 function Works() {
  const features = [
    {
      icon: "/web-developer.png",
      title: "Code Instantly",
      desc: "Start coding in your browser—no setup, no installs. Just open, type, and run.",
    },
    {
      icon: "/digital-collaboration.png",
      title: "Collaborate Live",
      desc: "Work together with your team in real-time using live sharing and chat.",
    },
    {
      icon: "/run.png",
      title: "Run Instantly",
      desc: "Execute code instantly across multiple languages right from the cloud.",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-orange-500 mb-12">
          Everything You Need to Build & Collaborate
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-orange-50 rounded-2xl border border-gray-200 shadow-md p-8 flex flex-col items-center hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                <Image src={feature.icon} alt={feature.title} width={40} height={40} />
              </div>
              <h3 className="text-xl text-black font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Works;