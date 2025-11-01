import { Typewriter } from 'react-simple-typewriter'

export default function HeroEditor() {
  return (
    <div className="bg-[#0d1117] text-[#c9d1d9] h-full p-6 rounded-2xl shadow-[0_0_25px_rgba(0,200,255,0.2)] w-full max-w-2xl mx-auto border border-[#1f6feb]">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-3 h-3 bg-red-500 rounded-full" />
        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
        <div className="w-3 h-3 bg-green-500 rounded-full" />
      </div>

      <pre className="font-mono text-sm">
        <code>
          <Typewriter
            words={[
              'console.log("Welcome to Codely 🚀");',
              'function runCode() {',
              '  console.log("Running your project...")',
              '}',
              'runCode();',
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={60}
            deleteSpeed={30}
            delaySpeed={2000}
          />
        </code>
      </pre>

      {/* <button className="mt-6 px-4 py-2 bg-[#238636] hover:bg-[#2ea043] rounded-lg text-white font-medium transition-all">
        ▶ Run
      </button> */}
    </div>
  );
}
