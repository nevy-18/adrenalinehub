'use client';
import { useState } from "react";
import Homepage from "../homepage/Homepage";
import SignUp from "../signup/SignUp";

// --- VISUAL COMPONENT ---
const BackgroundLines = () => (
  <>
    <div className="absolute top-[9%] right-[0%] w-[300px] md:w-[500px] 2xl:w-[800px] h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent rotate-[134deg] opacity-60" />
    <div className="absolute top-[10%] right-[40%] w-[300px] md:w-[500px] 2xl:w-[800px] h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent rotate-[134deg] opacity-60" />
    <div className="absolute top-[10%] right-[70%] w-[300px] md:w-[500px] 2xl:w-[800px] h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent rotate-[134deg] opacity-60" />
    <div className="absolute top-[25%] left-[25%] w-80 md:w-[500px] 2xl:w-[800px] h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent rotate-[134deg] opacity-70 animate-pulse" />
    <div className="absolute top-[60%] left-[-50%] w-96 md:w-[600px] 2xl:w-[1000px] h-[3px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent rotate-[134deg] opacity-60 blur-[1px]" />
    <div className="absolute bottom-40 right-10 w-80 md:w-[500px] 2xl:w-[900px] h-[1px] bg-gradient-to-r from-transparent via-blue-200 to-transparent rotate-[134deg] opacity-50" />
    <div className="absolute top-[80%] left-[70%] w-96 md:w-[600px] 2xl:w-[1000px] h-[3px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent rotate-[134deg] opacity-60 blur-[1px]" />
    <div className="absolute top-[80%] left-[50%] w-96 md:w-[600px] 2xl:w-[1000px] h-[3px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent rotate-[134deg] opacity-60 blur-[1px]" />
    <div className="absolute top-[70%] left-[20%] w-96 md:w-[600px] 2xl:w-[1000px] h-[3px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent rotate-[134deg] opacity-60 blur-[1px]" />
    <div className="absolute bottom-80 right-20 w-[300px] md:w-[500px] 2xl:w-[800px] h-[1px] bg-gradient-to-r from-transparent via-blue-200 to-transparent rotate-[134deg] opacity-50" />
  </>
);

// --- MAIN COMPONENT ---
export default function LoginForm() {
  const [showHomePage, setHomePage] = useState(false);
  const [showsignup, setSignup] = useState(false);
  const [error, setError] = useState("");
  
  // State for User Data
  const [currentUser, setCurrentUser] = useState(""); 
  const [isAdmin, setIsAdmin] = useState(false); // <--- New Admin State

  const [loginData, setLoginData] = useState({
    identifier: '', 
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault(); 
    console.log("Attempting Login..."); 

    // 1. HARDCODED ADMIN CHECK (PRIORITY)
    // Trim removes accidental spaces
    if(loginData.identifier.trim() === "admin" && loginData.password === "123") {
        console.log("Admin Logged In!");
        setCurrentUser("Administrator");
        setIsAdmin(true); // Flag as Admin
        setHomePage(true);
        // We return early so we don't try to fetch from the backend
        return; 
    }

    // 2. STANDARD USER LOGIN (BACKEND)
    const isEmail = loginData.identifier.includes('@');
    
    const payload = {
        password: loginData.password,
        ...(isEmail ? { email: loginData.identifier } : { username: loginData.identifier })
    };

    try {
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok) {
            setCurrentUser(data.username);
            setIsAdmin(false); // Ensure regular user is NOT admin
            alert("SUCCESS: " + data.message);
            setHomePage(true);
        } else {
            alert("FAILURE: " + data.message);
            setError(data.message);
        }
    } catch (error) {
        console.error('CRITICAL ERROR:', error);
        alert("SYSTEM ERROR: " + error.message);
    }
  };

  const signUpclick = () => {
    setSignup(true)
  }
  
  const placeholderClick = () => {
    console.log("Feature coming soon!");
  };

  // --- RENDER HOMEPAGE IF LOGGED IN ---
  if (showHomePage) {
    // We pass the 'isAdmin' flag to the Homepage component
    return (
        <Homepage 
            onLogout={() => { 
                setHomePage(false); 
                setIsAdmin(false); 
                setCurrentUser("");
                setLoginData({ identifier: '', password: '' });
            }} 
            username={currentUser} 
            isAdmin={isAdmin} // <--- Passing the prop here
        />
    );
  }
  
  if (showsignup){
    return <SignUp/>;
  }

  // --- RENDER LOGIN FORM ---
  return (
    <div className="fixed inset-0 w-full h-[100dvh] bg-gradient-to-b from-[#1a1a40] to-[#22d3ee] flex items-center justify-center overflow-hidden p-4">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      <BackgroundLines />

      {/* --- CONTAINER --- */}
      <div className="relative z-10 w-full max-w-sm md:max-w-md 2xl:max-w-4xl flex flex-col items-center transition-all duration-300">
        
        {/* LOGO AREA */}
        <div className="mb-8 md:mb-10 2xl:mb-[-10] text-center relative flex flex-col items-center">
          <img 
            src="/images/logo.png" 
            alt="Adrenaline Hub Logo"
            className="relative z-20 w-48 md:w-64 2xl:w-[800px] mx-auto drop-shadow-lg transition-all" 
          />
          {/* Platform Glow */}
          <div className="absolute z-10 bottom-[60px] 2xl:bottom-[60px] w-[140px] md:w-[450px] 2xl:w-[450px] h-[25px] 2xl:h-[50px] bg-white/20 rounded-[100%] blur-md" />
        </div>

        {/* INPUT CONTAINER */}
        <div className="w-full space-y-4 md:space-y-6 2xl:space-y-12">
          
          <div className="bg-[#1f2937]/80 backdrop-blur-sm rounded-xl p-4 2xl:p-8 border border-white/10 shadow-lg">
            <p className="text-gray-400 text-sm md:text-base 2xl:text-2xl font-medium mb-1">Email address / Username</p>
            <input 
              type="text" 
              name="identifier"  
              value={loginData.identifier} 
              onChange={handleChange} 
              placeholder="name@example.com or username" 
              className="bg-transparent w-full text-white outline-none text-base md:text-xl 2xl:text-4xl placeholder-gray-500" 
            />
          </div>
          
          <div className="bg-[#1f2937]/80 backdrop-blur-sm rounded-xl p-4 2xl:p-8 border border-white/10 shadow-lg">
            <p className="text-gray-400 text-sm md:text-base 2xl:text-2xl font-medium mb-1">Password</p>
            <input 
              type="password" 
              name="password"
              value={loginData.password} 
              onChange={handleChange} 
              placeholder="••••••••" 
              className="bg-transparent w-full text-white outline-none text-base md:text-xl 2xl:text-4xl placeholder-gray-500" 
            />
          </div>

          <div className="flex">
            <u 
                onClick={placeholderClick}
                className="text-[blue] text-[24px] ml-5 mt-3 cursor-pointer"
            >
                Forgot Password
            </u>
          </div>

         <button
         onClick={handleLogin}  
         className="p-4 2xl:p-8 w-full text-base md:text-xl 2xl:text-4xl bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all">
                Login
            </button>

          <div className="flex items-center gap-4 py-2 2xl:py-4">
            <div className="h-px bg-white/20 flex-1" />
            <span className="text-gray-400 text-sm md:text-lg 2xl:text-2xl font-medium">OR</span>
            <div className="h-px bg-white/20 flex-1" />
          </div>

          {/* Sign Up Button */}
          <div>
           <button
             onClick={signUpclick}
             className= "p-4 2xl:p-8 w-full text-base md:text-xl 2xl:text-4xl bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all"
             >SignUp</button>
          </div>

        </div>
      </div>
    </div>
  );
}