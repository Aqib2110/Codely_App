import { FaGithub,FaLinkedinIn,FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-orange-400 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        <div>
          <h2 className="text-3xl text-center sm:text-start font-extrabold hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300">
            Codely
          </h2>
          <p className="text-white/80 text-center sm:text-start mt-3">
            Code. Run. Collaborate.  
            Build your ideas instantly with Codely.
          </p>
        </div>

        <div>
          <h3 className="text-xl text-center sm:text-start font-semibold mb-3">Product</h3>
          <ul className="space-y-2 flex flex-col justify-center items-center sm:justify-start sm:items-start text-white/80">
            <li><a href="#" className="hover:text-white text-center transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Languages</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Docs</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl text-center sm:text-start font-semibold mb-3">Company</h3>
          <ul className="space-y-2 flex flex-col justify-center items-center sm:justify-start sm:items-start text-white/80">
            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl text-center sm:text-start font-semibold mb-3">Connect</h3>
          <div className="flex space-x-5 flex flex-row justify-center items-center sm:justify-start sm:items-start text-2xl">
            <a href="#" className="hover:scale-110 transition-transform">
              <i className="devicon-github-original">
                <FaGithub />
              </i>
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <i className="devicon-twitter-original">
                <FaTwitter />
              </i>
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <i className="devicon-linkedin-plain">
                <FaLinkedinIn/>
              </i>
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/20 mt-10 pt-6 text-center text-white/70 text-sm">
        © {new Date().getFullYear()} Codely. All rights reserved.
      </div>
    </footer>
  );
}
