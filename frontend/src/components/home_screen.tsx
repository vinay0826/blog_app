import { useNavigate } from "react-router-dom";
import "./homescreen.css";

export function Homescreen() {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen flex items-center justify-center text-white font-mono relative overflow-hidden bg-black"
      style={{ backgroundImage: "url('/anime2.jpg')" }}
    >
      {/* Background Overlay: Cosmic Void */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-indigo-900/40 to-black/60 animate-void-shift"></div>

      {/* Holographic Portal Container */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        {/* Title: Floating Holo-Text */}
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-500 animate-holo-text mb-12">
          BLOGGERV
        </h1>

        {/* Tagline: Glitch Effect */}
        <p className="text-xl text-cyan-200 mb-10 animate-glitch" data-text="Enter the Blog Dimension">
          Enter the Blog Dimension
        </p>

        {/* Signup Energy Core */}
        <div className="relative bg-gradient-to-br from-cyan-500/20 to-blue-700/20 p-8 rounded-full shadow-[0_0_40px_rgba(0,255,255,0.3)] w-80 h-80 flex flex-col items-center justify-center animate-core-pulse">
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400/50 blur-md animate-orbit"></div>
          <h2 className="text-2xl font-semibold tracking-widest text-cyan-100">New Explorer?</h2>
          <p className="text-sm text-gray-300 mb-4">Power Up Your Journey</p>
          <button
            onClick={() => navigate("/signup")}
            className="w-3/4 px-4 py-2 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition shadow-[0_0_15px_rgba(0,255,255,0.5)] animate-bounce"
          >
            SIGN UP
          </button>
        </div>

        {/* Signin Cosmic Gateway - Shifted Right */}
        <div className="mt-12 relative self-center md:self-end md:mr-[-8rem] lg:mr-[-12rem] transform translate-x-1/4">
          <p className="text-lg text-purple-200 mb-4 animate-fade-in text-center">already a user?</p>
          <button type="button" className="btn relative mx-auto block" onClick={() => navigate("/signin")}>
            <strong>SIGNIN</strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>
            <div id="glow">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
            {/* Enhanced Portal Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-purple-500/70 blur-sm animate-spin-slow"></div>
          </button>
        </div>

        {/* Ambient Light Trails */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-px h-40 bg-gradient-to-b from-cyan-400 to-transparent absolute top-10 left-1/4 animate-light-trail"></div>
          <div className="w-px h-60 bg-gradient-to-t from-purple-500 to-transparent absolute bottom-20 right-1/3 animate-light-trail-delay"></div>
        </div>
      </div>
    </div>
  );
}