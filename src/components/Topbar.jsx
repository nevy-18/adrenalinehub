import { useState } from 'react';
import { Product } from '@/app/data/Product';
import { XIcon } from 'lucide-react';



// --- Icon Components ---
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
const TrendingUp = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
);
const AlertCircle = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
);
const Trash2 = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
);
const ArrowLeft = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);
<XIcon/>

const Topbar = ({onCartClick, searchValue, onSearchChange}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Fallback "Suggested" products - displayed when search is empty
  const defaultSuggestions = typeof Product !== 'undefined' ? [
    Product.find(p => p.id === 1),  // Olympic Barbell
    Product.find(p => p.id === 44), // Water Rower
    Product.find(p => p.id === 73), // Suspension Trainer
    Product.find(p => p.id === 90), // Creatine
  ].filter(Boolean) : [];

  // Dropdown Logic
  const searchResults = searchValue && typeof Product !== 'undefined'
    ? Product.filter(p => p.name.toLowerCase().includes(searchValue.toLowerCase())).slice(0, 5)
    : defaultSuggestions;

  const isSearchEmpty = !searchValue || searchValue.length === 0;
  const hasResults = searchResults.length > 0;

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#1a1a40]/90 backdrop-blur-md border-b border-white/10 px-4 md:px-8 2xl:px-16 py-3 2xl:py-6 flex items-center justify-between transition-all">

      {/* Logo Section */}
      <div className="flex items-center  text-xl md:text-2xl 2xl:text-4xl font-black italic tracking-wider cursor-pointer">
        
          ADRENALINE<span className="text-cyan-400">HUB</span>
      </div>

      {/* Search Bar Section */}
      <div className="hidden md:block w-1/3 lg:w-2/5 2xl:w-1/2 relative group">
        <div className={`flex items-center bg-white/10 rounded-full px-6 py-3 md:py-4 2xl:px-10 2xl:py-6 border transition-all duration-300 ${isSearchFocused ? 'border-cyan-400 bg-[#1a1a40] shadow-xl shadow-cyan-500/20' : 'border-white/10 hover:border-white/30'}`}>
          <Search className={`w-6 h-6 lg:w-7 lg:h-7 2xl:w-10 2xl:h-10 mr-4 transition-colors ${isSearchFocused ? 'text-cyan-400' : 'text-gray-400'}`} />
          <input 
            type="text" 
            placeholder="Search for equipment..." 
            className="bg-transparent border-none outline-none text-lg lg:text-xl 2xl:text-3xl w-full placeholder-gray-400 text-white focus:ring-0 transition-all h-full" // size of placeholder
            value={searchValue || ""} 
            onChange={(e) => onSearchChange(e.target.value)} // parte to ng connection ng filtering
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
          />
          {!isSearchEmpty && (
            <button 
              onClick={() => {
                onSearchChange(""); 
          
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <XIcon className="w-5 h-5 2xl:w-8 2xl:h-8" />
            </button>
          )}
        </div>

        {/* Dynamic Dropdown */}
        {isSearchFocused && (
          <div className="absolute top-full left-0 w-full mt-3 bg-[#1a1a40] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden z-[60] animate-in fade-in slide-in-from-top-2">
            
            <div className="bg-cyan-500/10 px-4 py-2 border-b border-cyan-500/20 flex items-center gap-2">
               {isSearchEmpty ? (
                 <>
                   <span className="text-cyan-400 text-sm md:text-base 2xl:text-xl font-bold uppercase tracking-wider">Suggested for you</span>
                 </>
               ) : (
                 <>
                   <Search className="w-4 h-4 text-cyan-400" />
                   <span className="text-cyan-400 text-sm md:text-base 2xl:text-xl font-bold uppercase tracking-wider">Matching Products</span>
                 </>
               )}
            </div>

            <div className="p-2">
              {hasResults ? (
                searchResults.map((product) => (
                  <div 
                    key={product.id} 
                    className="flex items-center gap-5 2xl:gap-8 p-4 2xl:p-6 hover:bg-white/5 rounded-2xl cursor-pointer group/item transition-colors"
                    onMouseDown={(e) => e.preventDefault()} 
                    onClick={() => {
                      onSearchChange(product.name);
                      setIsSearchFocused(false);
                    }}
                  >
                    <div className={`w-16 h-16 md:w-20 md:h-20 2xl:w-28 2xl:h-28 ${product.image} rounded-xl flex items-center justify-center shrink-0 shadow-lg`}>
                      <span className="text-sm md:text-lg 2xl:text-2xl font-black text-white/30 italic">{product.name.charAt(0)}</span>
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-lg md:text-xl 2xl:text-3xl font-bold text-gray-200 group-hover/item:text-cyan-400 transition-colors truncate">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </div>
                    <span className="text-sm font-bold text-cyan-400">{product.price}</span>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center flex flex-col items-center text-gray-400">
                  <span className="text-sm">No products found for "{searchValue}"</span>
                </div>
              )}
              
              <div className="mt-3 pt-3 2xl:pt-6 border-t border-white/5 text-center">
                 <button className="text-sm md:text-base 2xl:text-xl text-gray-500 hover:text-cyan-400 transition-colors py-2">
                   {isSearchEmpty ? "View all recommendations" : `See all results for "${searchValue}"`}
                 </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Icons Section */}
      <div className="flex items-center gap-4 md:gap-6 2xl:gap-12">
        <button className="p-3 2xl:p-5 hover:bg-white/10 rounded-full relative group transition-all"
        onClick={onCartClick}>
          <ShoppingCart className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 2xl:w-12 2xl:h-12 text-white transition-transform group-hover:scale-110" />
          <span className="absolute top-1 right-0 bg-red-500 text-[10px] 2xl:text-sm font-bold px-1.5 2xl:px-2 py-0.5 2xl:py-1 rounded-full border border-[#1a1a40]">2</span>
        </button>
        <button className="p-3 2xl:p-5 hover:bg-white/10 rounded-full group transition-all"
        >
          <User className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 2xl:w-12 2xl:h-12 text-white transition-transform group-hover:scale-110" />
        </button>
      </div>

    </nav>
  );
};
export default Topbar;