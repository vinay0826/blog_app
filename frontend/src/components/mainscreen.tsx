
import "./mainscreen.css"; // New CSS file for this component

export function Mainscreen(){
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-900 text-white font-mono relative overflow-hidden p-4">
      {/* Code Rain Background */}
      <div className="absolute inset-0 flex flex-wrap gap-2 animate-code-rain">
        {Array.from({ length: 50 }).map((_, i) => (
          <span
            key={i}
            className="text-green-400 text-xs md:text-sm opacity-50 animate-code-drop"
            style={{ animationDelay: `${i * 0.1}s`, left: `${(i % 10) * 10}%` }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </span>
        ))}
      </div>

      {/* Central Matrix Cube */}
      <div className="relative z-10 flex flex-col items-center text-center transform perspective-1000">
        {/* Main Text: Glitchy Matrix */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-wider text-green-400 animate-matrix-glitch mb-6 md:mb-8">
          you are not authorized!
        </h1>

        {/* Subtext: Code Pulse */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 animate-code-pulse">
          
        </p>

        {/* 3D Matrix Cube */}
        <div className="mt-8 md:mt-12 w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 relative animate-cube-spin">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 transform rotate-45 animate-cube-face"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-green-500/20 to-blue-500/20 transform rotate-45 translate-z-20 animate-cube-face-back"></div>
          <div className="absolute inset-0 border-2 border-green-400/50 rounded-lg animate-cube-edge"></div>
        </div>

        {/* Floating Code Fragments */}
        <div className="absolute inset-0 pointer-events-none">
          <span className="text-green-300 text-sm absolute top-1/4 left-1/5 animate-code-fragment"></span>
          <span className="text-blue-300 text-sm absolute bottom-1/3 right-1/4 animate-code-fragment-delay"></span>
        </div>
      </div>
    </div>
  );
}
