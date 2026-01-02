'use client';
import { useState } from "react";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";

// Reuse your visual component for consistency
const BackgroundLines = () => (
  <>
    <div className="absolute top-[9%] right-[0%] w-[300px] md:w-[500px] 2xl:w-[800px] h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent rotate-[134deg] opacity-60" />
    <div className="absolute top-[25%] left-[25%] w-80 md:w-[500px] 2xl:w-[800px] h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent rotate-[134deg] opacity-70 animate-pulse" />
    <div className="absolute top-[60%] left-[-50%] w-96 md:w-[600px] 2xl:w-[1000px] h-[3px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent rotate-[134deg] opacity-60 blur-[1px]" />
    <div className="absolute bottom-40 right-10 w-80 md:w-[500px] 2xl:w-[900px] h-[1px] bg-gradient-to-r from-transparent via-blue-200 to-transparent rotate-[134deg] opacity-50" />
  </>
);

export default function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Mocking a backend call
    try {
      // Replace with: await fetch('http://localhost:3001/forgot-password', ...)
      setTimeout(() => {
        console.log("Reset link sent to:", email);
        setIsSubmitted(true);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      alert("Error sending reset link.");
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-[100dvh] bg-gradient-to-b from-[#1a1a40] to-[#22d3ee] flex items-center justify-center overflow-hidden p-4">
      <BackgroundLines />

      <div className="relative z-10 w-full max-w-md bg-[#1f2937]/90 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl transition-all">
        
        {/* BACK BUTTON */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors mb-6 text-sm font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={18} /> Back to Login
        </button>

        {!isSubmitted ? (
          <>
            <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter mb-2">
              Recover <span className="text-cyan-400">Password</span>
            </h2>
            <p className="text-gray-400 text-sm mb-8">
              Enter the email associated with your account and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-black/20 rounded-2xl p-4 border border-white/5 focus-within:border-cyan-500/50 transition-all">
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Email Address</p>
                <div className="flex items-center gap-3">
                  <Mail className="text-gray-500" size={20} />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="bg-transparent w-full text-white outline-none text-lg placeholder-gray-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-lg ${
                  isLoading 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-cyan-500 hover:bg-cyan-400 text-[#1a1a40] shadow-cyan-500/20'
                }`}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6 animate-in fade-in zoom-in duration-300">
            <div className="flex justify-center mb-6">
              <div className="bg-cyan-500/20 p-4 rounded-full">
                <CheckCircle className="text-cyan-400" size={48} />
              </div>
            </div>
            <h2 className="text-2xl font-black text-white uppercase mb-2">Check your email</h2>
            <p className="text-gray-400 text-sm mb-8">
              We have sent a password recover link to <br />
              <span className="text-white font-bold">{email}</span>
            </p>
            <button
              onClick={onBack}
              className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition-all border border-white/10"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}