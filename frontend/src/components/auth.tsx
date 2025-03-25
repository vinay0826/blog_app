import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
export function Signup_comp() {
    const [postValues, setPostValues] = useState({
        name: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    function HandleInput(e: any) {
        const { name, value } = e.target;
        setPostValues((postValues) => ({
            ...postValues,
            [name]: value, // Dynamically update the field based on name
        }));
    }
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit() {
        setIsLoading(true);
        try {
          // Define the request body
          const requestBody = {
            name: postValues.name,
            email: postValues.email,
            password: postValues.password,
          };
          console.log(requestBody)
          // Send POST request to a placeholder API
          const response = await axios.post(
            "https://backend.nalagatlavinay26.workers.dev/api/v1/user/signup", 
            requestBody
          );
    
          // Log and alert success
          console.log(response);
          navigate("/Signin");
        } catch (error) {
          // Handle errors
          console.error("Error sending request:", error);
          setIsLoading(false);
          alert("Failed to send request. Check console for details.");
        }finally{
            setIsLoading(false);
        }
      }

      if (isLoading) {
        return (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
            <ClipLoader color="#3b82f6" size={50} />
          </div>
        );
      }
    return (
        <div>
            <div>CREATE AN ACCOUNT</div>
            <Label_input label="Name" placeholder="Enter your name" HandleInput={HandleInput} name="name" />
            <Label_input label="Email" placeholder="Enter your email" HandleInput={HandleInput} name="email" />
            <Label_input label="Password" placeholder="Enter your password" HandleInput={HandleInput} name="password" />
            <div>
                <button onClick={handleSubmit} className="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                <span className="relative text-white">SUBMIT</span></button>
                </div>
                {isLoading && (
                <div className="mt-4 flex justify-center">
                <ClipLoader color="#3b82f6" size={35} />
                </div>
                    )}
        </div>)
}

interface LabelInputProps {
    label: string;
    placeholder: string;
    HandleInput: (e: any) => void;
    name: string;
}

function Label_input({ label, placeholder, HandleInput, name }: LabelInputProps) {
    return (
        <div>
            <div className="max-w-sm">
                <label className="block text-sm font-medium mb-2 dark:text-white">{label}</label>
                <input
                    name={name}
                    type={name === "password" ? "password" : "text"}
                    className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder={placeholder}
                    onChange={HandleInput} // Corrected placement
                />
            </div>
        </div>
    );
}
