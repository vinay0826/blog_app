import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export function Signin_comp() {
  const [login_failed, set_loginfailed] = useState(false);
  const [postValues, setPostValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation(); // To access navigation state
  const [isLoading, setIsLoading] = useState(false);

  // Check if redirected from signup with success
  const signupSuccess = location.state?.signupSuccess || false;

  function HandleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPostValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    setIsLoading(true);
    set_loginfailed(false);
    try {
      const requestBody = {
        email: postValues.email,
        password: postValues.password,
      };
      console.log(requestBody);
      const response = await axios.post(
        "https://backend.nalagatlavinay26.workers.dev/api/v1/user/signin",
        requestBody
      );
      if (response.data.jwt_token) {
        localStorage.setItem("authToken", response.data.jwt_token);
        navigate("/mainscreen");
      } else {
        set_loginfailed(true);
      }
    } catch (error) {
      set_loginfailed(true);
      console.error("Signin error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function Loader() {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="w-12 h-12 border-4 border-t-transparent border-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full animate-spin-fast" />
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          @keyframes fluxWave {
            0%, 100% { background-position: 0 0; opacity: 0.4; }
            50% { background-position: 30px 30px; opacity: 0.6; }
          }
          @keyframes particleDance {
            0% { transform: translate(0, 0); opacity: 0.8; }
            25% { transform: translate(20px, -20px); opacity: 0.5; }
            50% { transform: translate(-20px, 20px); opacity: 0.8; }
            75% { transform: translate(-10px, -10px); opacity: 0.5; }
            100% { transform: translate(0, 0); opacity: 0.8; }
          }
          @keyframes inputFlux {
            0%, 100% { box-shadow: 0 0 5px rgba(0, 255, 255, 0.5), 0 0 10px rgba(255, 0, 255, 0.3); }
            50% { box-shadow: 0 0 15px rgba(0, 255, 255, 0.8), 0 0 25px rgba(255, 0, 255, 0.6); }
          }
          @keyframes energyBurst {
            0% { transform: scale(1); box-shadow: 0 0 0 rgba(0, 255, 255, 0); }
            50% { transform: scale(1.1); box-shadow: 0 0 30px rgba(0, 255, 255, 0.7), 0 0 50px rgba(255, 0, 255, 0.5); }
            100% { transform: scale(1); box-shadow: 0 0 0 rgba(0, 255, 255, 0); }
          }
          @keyframes fluxTitle {
            0%, 100% { text-shadow: 0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(255, 0, 255, 0.6); }
            50% { text-shadow: 0 0 20px rgba(0, 255, 255, 1), 0 0 40px rgba(255, 0, 255, 0.8); }
          }
          @keyframes failurePop {
            0% { transform: translateY(-10px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          @keyframes successPop {
            0% { transform: translateY(-20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          @keyframes spinFast {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      <div className="min-h-screen flex items-center justify-center bg-black p-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1)_1px,transparent_1%)] bg-[size:30px_30px] animate-flux-wave" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-2 h-2 bg-cyan-400 rounded-full absolute top-1/4 left-1/3 animate-particle-dance" style={{ animationDelay: "0s" }} />
          <div className="w-3 h-3 bg-pink-500 rounded-full absolute bottom-1/3 right-1/4 animate-particle-dance" style={{ animationDelay: "1s" }} />
          <div className="w-1 h-1 bg-purple-500 rounded-full absolute top-1/2 left-1/5 animate-particle-dance" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative z-10 w-full max-w-md bg-black/70 p-8 rounded-2xl border border-cyan-400/20 shadow-[0_0_30px_rgba(0,255,255,0.3)] backdrop-blur-md">
          {/* Success Message */}
          {signupSuccess && (
            <div
              className="mb-6 px-4 py-2 bg-gradient-to-r from-teal-400 to-lime-500 text-white text-sm font-mono rounded-md text-center shadow-[0_0_15px_rgba(45,212,191,0.5)]"
              style={{ animation: "successPop 0.4s ease-out forwards" }}
            >
              Account Created - Please Login to Continue
            </div>
          )}

          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-center mb-10 animate-flux-title">
            SIGN IN
          </h2>
          <div className="mb-6">
            <label className="block text-sm font-medium text-cyan-300 mb-2 animate-pulse-subtle">Email</label>
            <input
              name="email"
              type="text"
              value={postValues.email}
              onChange={HandleInput}
              placeholder="Enter your email"
              className="w-full p-3 bg-black/40 border border-cyan-400/40 rounded-lg text-white focus:outline-none focus:border-cyan-400 animate-input-flux transition-all"
            />
          </div>
          <div className="mb-8">
            <label className="block text-sm font-medium text-cyan-300 mb-2 animate-pulse-subtle">Password</label>
            <input
              name="password"
              type="password"
              value={postValues.password}
              onChange={HandleInput}
              placeholder="Enter your password"
              className="w-full p-3 bg-black/40 border border-cyan-400/40 rounded-lg text-white focus:outline-none focus:border-cyan-400 animate-input-flux transition-all"
            />
          </div>
          <div className="text-center">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full p-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-bold rounded-lg transition-all ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:animate-energy-burst"
              }`}
            >
              SIGN IN
            </button>
          </div>
          {login_failed && (
            <div
              className="mt-4 px-4 py-2 bg-gradient-to-r from-red-500 to-purple-600 text-white text-sm font-mono rounded-md text-center"
              style={{ animation: "failurePop 0.3s ease-out forwards" }}
            >
              Login Failed - Try Again!
            </div>
          )}
          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
}
