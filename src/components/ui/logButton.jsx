export default function LogButton({onClick}){
    return(

        <button
         onClick={onClick}
         className="  p-4 2xl:p-8 w-full text-base md:text-xl 2xl:text-4xl bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all">
                Login
            </button>
    )
    
}