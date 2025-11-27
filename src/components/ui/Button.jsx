export default function Button({onClick}){
    return(
        <div className="h-screen flex flex-col justify-end items-center pb-75">
        <button
        onClick={onClick}
        className="bg-[#6C90A7] text-white px-70 py-12 rounded-[40px]"
        >
            Get Started
        </button>
        </div>
    );
    
    
    }

   
    
