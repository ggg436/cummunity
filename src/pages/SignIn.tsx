import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { clerkAppearance, clerkPaths } from "@/lib/clerk";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if this is an SSO callback
  const isSSOCallback = location.pathname.includes('sso-callback');
  
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      {!isSSOCallback && <Navbar />}
      
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          {!isSSOCallback && (
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Sign In to Your Account</h1>
              <p className="text-gray-600">Welcome back to Easy Learning Hub!</p>
            </div>
          )}
          
          <div className={isSSOCallback ? "" : "bg-white p-8 rounded-xl shadow-sm"}>
            <ClerkSignIn 
              routing="path"
              path="/sign-in"
              signUpUrl={clerkPaths.signUp}
              redirectUrl={clerkPaths.afterSignIn}
              appearance={clerkAppearance}
            />
          </div>
        </div>
      </div>
      
      {!isSSOCallback && <Footer />}
    </div>
  );
};

export default SignIn; 