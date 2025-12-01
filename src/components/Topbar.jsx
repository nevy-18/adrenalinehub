export default function topbar({}){
    const ShoppingCart = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
);
    const Menu = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);
const Search = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);
const User = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
    return(
        <nav className="fixed top-0 z-50 w-full bg-[#1a1a40]/90 backdrop-blur-md border-b border-white/10 px-4 md:px-8 2xl:px-16 py-3 2xl:py-6 flex items-center justify-between transition-all">

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/10 rounded-full md:hidden">
            <Menu className="w-6 h-6 text-cyan-400" />
          </button>
         
          <div className="text-xl md:text-2xl 2xl:text-4xl font-black italic tracking-wider cursor-pointer">
            ADRENALINE<span className="text-cyan-400">HUB</span>
          </div>
        </div>

        
        <div className="hidden md:flex items-center bg-white/10 rounded-full px-4 py-2 2xl:px-6 2xl:py-4 w-1/3 2xl:w-1/2 border border-white/10 focus-within:border-cyan-400 transition-colors">
          <Search className="w-5 h-5 2xl:w-8 2xl:h-8 text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search for equipment..." 
            className="bg-transparent border-none outline-none text-sm 2xl:text-xl w-full placeholder-gray-400 text-white"
          />
          <div className=""></div>
        </div>

      
        <div className="flex items-center gap-2 md:gap-4 2xl:gap-8">
          <button className="p-2 hover:bg-white/10 rounded-full relative group">
            <ShoppingCart className="w-6 h-6 2xl:w-10 2xl:h-10 text-white transition-transform group-hover:scale-110" />
            <span className="absolute top-1 right-0 bg-red-500 text-[10px] 2xl:text-sm font-bold px-1.5 2xl:px-2 py-0.5 2xl:py-1 rounded-full border border-[#1a1a40]">2</span>
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full group">
            <User className="w-6 h-6 2xl:w-10 2xl:h-10 text-white transition-transform group-hover:scale-110" />
          </button>
        </div>
      </nav>
    )

}