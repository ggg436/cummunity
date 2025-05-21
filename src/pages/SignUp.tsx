import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { clerkAppearance, clerkPaths } from "@/lib/clerk";

const SignUp = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
            <p className="text-gray-600">Join Easy Learning Hub today!</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <ClerkSignUp 
              routing="path"
              path="/sign-up"
              signInUrl={clerkPaths.signIn}
              redirectUrl={clerkPaths.afterSignUp}
              appearance={clerkAppearance}
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SignUp; 