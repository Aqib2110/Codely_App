"use client";
import Hero from "./Hero";
import Languages from "./Languages";
import Works from "./Works";

const Home = () => {
  return (
    <div className="bg-white">
      <div className="py-5 px-2 sm:py-5 sm:px-5">
        <Hero />
        <Languages />
        <Works />
      </div>
    </div>
  );
};

export default Home;
