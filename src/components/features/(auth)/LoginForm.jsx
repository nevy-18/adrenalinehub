'use client';
import { useState } from "react";
import LogButton from "@/components/ui/logButton";
import ForgotPassword from "@/components/ui/ForgotPassword";

export default function LoginForm(){
    return(
    <div className=" flex flex-col justify-center gap-7 w-350 bg-white h-[800px] ml-390 mt-100 ">
        
        <input 
        type="text"
        placeholder="Username"
        className="bg-[#15464D]/20 backdrop-blur-sn text-white placeholder-[#A9A9A9] rounded-[40px]
        p-15 outline-none border border-white/30 w-300 h-40 text-[32px] ml-20"
        ></input>
        <input 
        type="text"
        placeholder="Email"
        className="bg-[#15464D]/20 backdrop-blur-sn text-black placeholder-[#A9A9A9] rounded-[40px]
        p-15 outline-none border border-white/30 w-300 h-40 text-[32px] ml-20 "
        ></input>
        <input 
        type="text"
        placeholder="Password"
        className=" bg-[#15464D]/20 backdrop-blur-sn text-left text-black placeholder-[#A9A9A9] rounded-[40px]
        p-15 outline-none border border-white/30 w-300 h-40 text-[32px] ml-20 font-Italic"
        ></input>
               <ForgotPassword
               onClick={()=> alert('kawawa ka naman di mo alam password mo')}/>
        <LogButton
        onClick={()=>alert('congrats tao kana')}/>
        
        
        
    </div>

    )
    

}