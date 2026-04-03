"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";
import { HiHome } from "react-icons/hi";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Redirect if already logged in as admin
  useEffect(() => {
    if (!auth) return;
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isAdmin = await authService.checkIsAdmin(user.email);
        if (isAdmin) {
          router.push("/admin");
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!isFirebaseConfigured) {
      if (email === "admin" && password === "admin123") {
        localStorage.setItem("demo_admin_logged_in", "true");
        router.push("/admin");
      } else {
        setError("Demo mode credentials are: admin / admin123");
        setLoading(false);
      }
      return;
    }

    if (!auth) {
      setError("Firebase Auth not initialized.");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const isAdmin = await authService.checkIsAdmin(user.email);
      
      if (!isAdmin) {
        // Sign out if not an admin
        await auth.signOut();
        setError("Access Denied. Your account is not authorized as an Admin.");
      } else {
        router.push("/admin");
      }
    } catch (err: any) {
      let errorMessage = "Invalid email or password.";
      if (err.code === "auth/user-not-found") errorMessage = "No user found with this email.";
      if (err.code === "auth/wrong-password") errorMessage = "Incorrect password.";
      if (err.code === "auth/too-many-requests") errorMessage = "Too many attempts. Try again later.";
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col overflow-hidden">
        <div className="bg-gray-900 p-8 flex flex-col items-center gap-4 text-white">
          <div className="bg-[#ff385c] p-3 rounded-2xl shadow-lg">
            <HiHome className="text-3xl" />
          </div>
          <h1 className="text-2xl font-black tracking-tight">KK Admin Portal</h1>
          <p className="text-gray-400 font-medium text-sm text-center">
            Sign in to manage properties and leads securely.
          </p>
        </div>
        
        <div className="p-8">
          {!isFirebaseConfigured && (
            <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl text-sm font-bold border border-yellow-200 mb-6 flex flex-col items-center justify-center text-center">
              ⚠️ Running in Local Demo Mode
              <span className="text-xs font-medium mt-1">Firebase is not configured. Use <b>admin</b> / <b>admin123</b> to test locally.</span>
            </div>
          )}
          
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100 flex items-center justify-center text-center">
                {error}
              </div>
            )}
            
            <div className="flex flex-col gap-2">
              <label className="font-bold text-gray-700 text-sm">Email Address</label>
              <input 
                type="text" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isFirebaseConfigured ? "admin@example.com" : "admin"}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008489] font-medium transition-all"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-bold text-gray-700 text-sm">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008489] font-medium transition-all"
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-[#008489] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#006e72] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Verifying...
                </div>
              ) : (
                "Secure Login"
              )}
            </button>
          </form>
        </div>
      </div>
      
      <div className="mt-8 text-sm font-medium text-gray-400 flex flex-col items-center gap-2 text-center">
        <p>Restricted Access. Authorized Personnel Only.</p>
        <a href="/" className="text-[#008489] hover:underline font-bold pb-20">← Return to Website</a>
      </div>
    </div>
  );
}
