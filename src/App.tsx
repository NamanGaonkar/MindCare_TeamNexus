
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AIChatPage from "./pages/AIChatPage";
import BookingSystemPage from "./pages/BookingSystemPage";
import ResourceHubPage from "./pages/ResourceHubPage";
import CommunityPage from "./pages/CommunityPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import PeerHelperApplicationPage from "./pages/PeerHelperApplicationPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/" element={<Index />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/ai-chat" element={<AIChatPage />} />
              <Route path="/booking" element={<BookingSystemPage />} />
              <Route path="/resources" element={<ResourceHubPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/peer-helper-application" element={<PeerHelperApplicationPage />} />
              {/* Note: Admin route protection might need an extra layer based on user role */}
              <Route path="/admin" element={<AdminDashboardPage />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
