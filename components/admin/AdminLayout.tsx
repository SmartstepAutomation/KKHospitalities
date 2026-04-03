"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import { authService } from "@/services/authService";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  HiHome, 
  HiViewGrid, 
  HiOfficeBuilding, 
  HiInboxIn, 
  HiLogout,
  HiMenu,
  HiX
} from "react-icons/hi";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin/login") {
      setLoading(false);
      return;
    }

    // DEMO MODE BYPASS if Firebase is missing
    if (!isFirebaseConfigured) {
      const isDemoLoggedIn = localStorage.getItem("demo_admin_logged_in") === "true";
      if (isDemoLoggedIn) {
        setUser({ email: "demo-admin@local" } as User);
        setLoading(false);
        return;
      }
    }

    if (!auth || !isFirebaseConfigured) {
      router.push("/admin/login");
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/admin/login");
        return;
      }

      const isAdmin = await authService.checkIsAdmin(currentUser.email);
      if (!isAdmin) {
        await signOut(auth);
        router.push("/admin/login");
        return;
      }

      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#008489] rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-bold text-lg animate-pulse">Verifying Access...</p>
      </div>
    );
  }

  const handleLogout = async () => {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    } else {
      localStorage.removeItem("demo_admin_logged_in");
    }
    router.push("/admin/login");
  };

  const navLinks = [
    { label: "Dashboard", href: "/admin", icon: <HiViewGrid className="text-xl" /> },
    { label: "Properties", href: "/admin/properties", icon: <HiOfficeBuilding className="text-xl" /> },
    { label: "Leads Input", href: "/admin/leads", icon: <HiInboxIn className="text-xl" /> },
  ];

  // Render login page plainly without the big sidebar wrapper
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Header Overlay */}
      <div className="md:hidden bg-gray-900 text-white p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <HiHome className="text-[#ff385c] text-2xl" />
          <span className="font-black tracking-tight tracking-wider">PORTAL</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
          {isSidebarOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-screen md:h-screen w-64 bg-gray-900 text-white flex flex-col 
        transition-transform duration-300 z-40 ease-in-out shrink-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="p-6 md:p-8 flex items-center gap-3 border-b border-gray-800">
          <div className="bg-[#ff385c] p-2.5 rounded-xl shadow-lg shadow-[#ff385c]/20">
            <HiHome className="text-xl" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tight leading-none text-white">Admin</span>
            <span className="font-bold text-xs text-gray-500 tracking-widest uppercase mt-1">Hospitalities</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 flex flex-col gap-2 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all
                  ${isActive 
                    ? "bg-[#008489] text-white shadow-lg shadow-[#008489]/20" 
                    : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"}
                `}
              >
                {link.icon}
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-6 border-t border-gray-800 flex flex-col gap-4">
          <div className="px-4 py-3 bg-gray-800 rounded-xl flex flex-col overflow-hidden">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Logged in as</span>
            <span className="text-sm font-bold text-white truncate" title={user?.email || ""}>
              {user?.email}
            </span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 hover:bg-red-500/10 hover:text-red-400 text-gray-400 rounded-2xl font-bold transition-colors w-full"
          >
            <HiLogout className="text-xl" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 w-full min-w-0 transition-opacity duration-300 ${isSidebarOpen ? "opacity-50 md:opacity-100 overflow-hidden" : ""}`}>
        {/* Click-away overlay on mobile */}
        {isSidebarOpen && (
          <div 
            className="md:hidden fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        <div className="p-6 md:p-12 w-full max-w-7xl mx-auto h-full flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
}
