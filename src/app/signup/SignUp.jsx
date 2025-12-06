import React, { useState } from 'react';
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

export default function SignUp() {
  
  // State to handle form inputs
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Add your registration logic here
  };

  return (
    

    // Outer container for centering (optional, remove if placing inside a specific layout)
   <div className="fixed inset-0 w-full h-[100dvh] bg-gradient-to-b from-[#1a1a40] to-[#22d3ee] flex items-center justify-center overflow-hidden">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" /> 
      <BackgroundLines />
      <div className="bg-[#15464D]/20 backdrop-blur-md text-white rounded-[40px] 
                      p-10 border border-white/30 w-full max-w-[500px] ml-0 sm:ml-20 shadow-lg">
        
        <h2 className="text-[32px] font-bold text-center mb-8">Create Account</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Username Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium ml-4">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="bg-transparent border border-white/30 rounded-full px-6 py-3 
                         text-white placeholder-[#A9A9A9] outline-none focus:border-white 
                         focus:bg-white/10 transition-all duration-300"
              required
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium ml-4">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="bg-transparent border border-white/30 rounded-full px-6 py-3 
                         text-white placeholder-[#A9A9A9] outline-none focus:border-white 
                         focus:bg-white/10 transition-all duration-300"
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium ml-4">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="bg-transparent border border-white/30 rounded-full px-6 py-3 
                         text-white placeholder-[#A9A9A9] outline-none focus:border-white 
                         focus:bg-white/10 transition-all duration-300"
              required
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="mt-4 bg-white text-[#15464D] text-lg font-bold py-3 rounded-full 
                       hover:bg-[#15464D] hover:text-white hover:border hover:border-white/50 
                       transition-all duration-300 shadow-md"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-6 text-[#A9A9A9] text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-white font-semibold hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}