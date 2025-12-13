import { User, Package, LogOut, Settings, ArrowLeft } from 'lucide-react';

// --- USER PROFILE COMPONENT ---
const UserProfile = ({ onBack, username , onLogout}) => {
  const displayName = username || "Guest User";
  const displayInitial = displayName.charAt(0).toUpperCase();
   
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 w-full max-w-4xl mx-auto">
      
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="text-xl md:text-2xl flex items-center gap-2 text-cyan-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
        Back to Shop
      </button>

      {/* Profile Header */}
      <div className="bg-[#1f2937]/80 backdrop-blur-sm rounded-3xl p-8 border border-white/10 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.3)]">
           <span className="text-4xl font-black text-[#1a1a40]">{username ? username.charAt(0).toUpperCase() : "U"}</span>
        </div>
        <div className="text-center md:text-left space-y-2">
           <h1 className="text-4xl font-bold text-white">{username || "Guest User"}</h1>
           <p className="text-gray-400">Member since 2024 • Pro Athlete</p>
           <button className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full text-sm font-bold transition-all mt-2">
             Edit Profile
           </button>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Package, label: "My Orders", desc: "Track active shipments" },
          { icon: Settings, label: "Settings", desc: "Account preferences" },
          { icon: LogOut, label: "Log Out", desc: "Sign out of account", color: "text-red-400" },
        ].map((item, idx) => (
          <button key={idx} 
          onClick={() =>{
                if (item.label === "Log Out") {
                    onLogout(); // Trigger the logout function passed from parent
                } else {
                    console.log(`Clicked ${item.label}`);
                }
            }
          } 
          
          
          
          
          className="bg-[#1f2937]/60 p-6 rounded-2xl border border-white/5 hover:border-cyan-400/50 hover:bg-[#1f2937] transition-all group text-left flex items-center gap-6">
             <div className={`p-4 rounded-xl bg-white/5 group-hover:bg-cyan-400/20 ${item.color || "text-cyan-400"}`}>
               <item.icon className="w-8 h-8" />
             </div>
             <div>
               <h3 className={`text-xl font-bold ${item.color || "text-white"}`}>{item.label}</h3>
               <p className="text-gray-400 text-sm">{item.desc}</p>
             </div>
          </button>
        ))}
      </div>
    </div>
  );
};