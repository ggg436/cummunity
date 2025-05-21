import { useUser, UserProfile as ClerkUserProfile } from "@clerk/clerk-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const UserProfile = () => {
  const { user, isLoaded } = useUser();
  
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
            
            {!isLoaded ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <img 
                    src={user?.imageUrl} 
                    alt={user?.fullName || "User"} 
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{user?.fullName}</h2>
                    <p className="text-gray-600">{user?.primaryEmailAddress?.emailAddress}</p>
                  </div>
                </div>
                
                <ClerkUserProfile
                  appearance={{
                    elements: {
                      rootBox: "mx-auto",
                      card: "shadow-none p-0",
                      navbar: "hidden",
                      navbarMobileMenuButton: "hidden",
                      headerTitle: "text-xl",
                      headerSubtitle: "text-gray-600",
                      formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UserProfile; 