import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup_comp() {
  const [failed, setFailed] = useState(false);
  const [postValues, setPostValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function HandleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPostValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    setIsLoading(true);
    setFailed(false);
    try {
      const requestBody = const requestBody = {
        name : postValues.name.trimEnd(),
        email : postValues.email.trimEnd(),
        password : postValues.password.trimEnd()
      };
      console.log(requestBody);
      const res = await axios.post(
        "https://backend.nalagatlavinay26.workers.dev/api/v1/user/signup",
        requestBody
      );
      if (res.data.id) {
        // Navigate to Signin with success flag
        navigate("/Signin", { state: { signupSuccess: true } });
      } else {
        setFailed(true);
      }
    } catch (error) {
      setFailed(true);
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function Loader() {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="w-12 h-12 border-4 border-t-transparent border-gradient-to-r from-teal-400 via-lime-400 to-violet-500 rounded-full animate-spin-fast" />
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          @keyframes pulseArray {
            0%, 100% { background-position: 0 0; opacity: 0.3; }
            50% { background-position: 25px 25px; opacity: 0.5; }
          }
          @keyframes nodeOrbit {
            0% { transform: translate(0, 0); opacity: 0.7; }
            25% { transform: translate(15px, -15px); opacity: 0.4; }
            50% { transform: translate(-15px, 15px); opacity: 0.7; }
            75% { transform: translate(10px, -10px); opacity: 0.4; }
            100% { transform: translate(0, 0); opacity: 0.7; }
          }
          @keyframes inputPulse {
            0%, 100% { box-shadow: 0 0 5px rgba(45, 212, 191, 0.5), 0 0 10px rgba(163, 230, 53, 0.3); }
            50% { box-shadow: 0 0 15px rgba(45, 212, 191, 0.8), 0 0 25px rgba(163, 230, 53, 0.6); }
          }
          @keyframes surge {
            0% { transform: scale(1); box-shadow: 0 0 0 rgba(45, 212, 191, 0); }
            50% { transform: scale(1.1); box-shadow: 0 0 25px rgba(45, 212, 191, 0.7), 0 0 40px rgba(163, 230, 53, 0.5); }
            100% { transform: scale(1); box-shadow: 0 0 0 rgba(45, 212, 191, 0); }
          }
          @keyframes arrayTitle {
            0%, 100% { text-shadow: 0 0 10px rgba(45, 212, 191, 0.8), 0 0 20px rgba(163, 230, 53, 0.6); }
            50% { text-shadow: 0 0 20px rgba(45, 212, 191, 1), 0 0 40px rgba(163, 230, 53, 0.8); }
          }
          @keyframes spinFast {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes failurePop {
            0% { transform: translateY(-10px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>

      <div className="min-h-screen flex items-center justify-center bg-black p-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.15)_1px,transparent_1%)] bg-[size:25px_25px] animate-pulse-array" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-2 h-2 bg-teal-400 rounded-full absolute top-1/5 left-1/4 animate-node-orbit" style={{ animationDelay: "0s" }} />
          <div className="w-3 h-3 bg-lime-400 rounded-full absolute bottom-1/4 right-1/3 animate-node-orbit" style={{ animationDelay: "1.5s" }} />
          <div className="w-1 h-1 bg-violet-500 rounded-full absolute top-1/3 left-2/3 animate-node-orbit" style={{ animationDelay: "0.8s" }} />
        </div>

        <div className="relative z-10 w-full max-w-md bg-black/70 p-8 rounded-2xl border border-teal-400/30 shadow-[0_0_25px_rgba(45,212,191,0.3)] backdrop-blur-lg transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-lime-400 to-violet-500 text-center mb-10 animate-array-title">
            SIGN UP
          </h2>
          <div className="mb-6">
            <label className="block text-sm font-medium text-teal-300 mb-2 animate-pulse-subtle">Name</label>
            <input
              name="name"
              type="text"
              value={postValues.name}
              onChange={HandleInput}
              placeholder="Your identity"
              className="w-full p-3 bg-black/50 border border-teal-400/40 rounded-lg text-white focus:outline-none focus:border-teal-400 animate-input-pulse transition-all"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-teal-300 mb-2 animate-pulse-subtle">Email</label>
            <input
              name="email"
              type="text"
              value={postValues.email}
              onChange={HandleInput}
              placeholder="Your digital key"
              className="w-full p-3 bg-black/50 border border-teal-400/40 rounded-lg text-white focus:outline-none focus:border-teal-400 animate-input-pulse transition-all"
            />
          </div>
          <div className="mb-8">
            <label className="block text-sm font-medium text-teal-300 mb-2 animate-pulse-subtle">Password</label>
            <input
              name="password"
              type="password"
              value={postValues.password}
              onChange={HandleInput}
              placeholder="Your secret code"
              className="w-full p-3 bg-black/50 border border-teal-400/40 rounded-lg text-white focus:outline-none focus:border-teal-400 animate-input-pulse transition-all"
            />
          </div>
          <div className="text-center">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full p-4 bg-gradient-to-r from-teal-500 via-lime-400 to-violet-500 text-white font-bold rounded-lg transition-all ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:animate-surge"
              }`}
            >
              SIGN UP
            </button>
          </div>
          {failed && (
            <div
              className="mt-4 px-4 py-2 bg-gradient-to-r from-red-500 to-purple-600 text-white text-sm font-mono rounded-md text-center"
              style={{ animation: "failurePop 0.3s ease-out forwards" }}
            >
              Signup Failed - Try Again!
            </div>
          )}
          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
}
