import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";
import Index from "./pages/Index";
import CourseDetails from "./pages/CourseDetails";
import CourseViewer from "./pages/CourseViewer";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import TursoTest from "./TursoTest";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";
import { clerkPaths } from "./lib/clerk";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useAuth();
  
  if (!isLoaded) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  if (!isSignedIn) {
    return <Navigate to={clerkPaths.signIn} />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/course/:id/learn" element={<CourseViewer />} />
        
        {/* Protected routes */}
        <Route 
          path="/community" 
          element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } 
        />
        
        {/* Authentication routes */}
        <Route path="/sign-in/*" element={
          <SignedOut>
            <SignIn />
          </SignedOut>
        } />
        <Route path="/sign-up/*" element={
          <SignedOut>
            <SignUp />
          </SignedOut>
        } />

        {/* Handle SSO callbacks */}
        <Route path="/sso-callback" element={<SignIn />} />
        
        <Route path="/turso-test" element={<TursoTest />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
