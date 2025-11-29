'use client';
import { useState } from "react";
import LogButton from "@/components/ui/logButton";
import ForgotPassword from "@/components/ui/ForgotPassword";
import SignButton from "@/components/ui/SignButton";
import Homepage from "./Homepage";

export default function LoginForm(){
    const [showHomePage, SetHomePage] = useState(false);
    return(
     <div className="flex flex-col justify-center items-center min-h-screen w-full ">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                {showHomePage ? (
                    <Homepage />
                ) : (
                <div className="flex flex-col items-center gap-7 bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/20 shadow-2xl w-auto">
                

                <h1 className="text-4xl font-bold text-white mb-4 tracking-wider">Login</h1>
                    <div className="flex flex-col gap-6 w-full">
                        

                        <input
                            type="text"
                            placeholder="Username"
                            className="bg-white/20 backdrop-blur-sm text-white placeholder-gray-300 rounded-2xl 
                            p-4 outline-none border border-white/30 w-auto h-auto text-[22px] transition-all focus:bg-white/30 focus:border-white/60"
                        />

                  
                        <input
                            type="text"
                            placeholder="Email"
                            className="bg-white/20 backdrop-blur-sm text-white placeholder-gray-300 rounded-2xl 
                            p-4 outline-none border border-white/30 w-auto h-auto transition-all focus:bg-white/30 focus:border-white/60 text-[22px]"
                        />


                        <input
                            type="password"
                            placeholder="Password"
                            className="bg-white/20 backdrop-blur-sm text-white placeholder-gray-300 rounded-2xl 
                            p-4 outline-none border border-white/30 w-auto h-auto text-xl transition-all focus:bg-white/30 focus:border-white/60 text-[22px]"
                        />

                       
                        <div className="w-full flex justify-left w-auto h-auto">
                            <ForgotPassword 
                                onClick={() => alert('kawawa ka naman di mo alam password mo')} 
                            />
                        </div>

                        
                        <LogButton onClick={() => SetHomePage(true)} />
                             <div className="mt-4">
                    <SignButton onClick={() => alert('wala kang acc?')} />
                </div>
                    </div>
                    </div>
                )}

               
               
            
        </div>
    );
}