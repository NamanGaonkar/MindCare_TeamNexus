
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AIChatPage from "./pages/AIChatPage";
import BookingSystemPage from "./pages/BookingSystemPage";
import ResourceHubPage from "./pages/ResourceHubPage";
import CommunityPage from "./pages/CommunityPage";
import AdminLayout from "./components/AdminLayout";
import AdminAnalyticsPage from "./pages/AdminAnalyticsPage";
import AdminUserManagementPage from "./pages/AdminUserManagementPage";
import AdminContentManagementPage from "./pages/AdminContentManagementPage";
import AdminSystemSettingsPage from "./pages/AdminSystemSettingsPage";
import PeerHelperApplicationPage from "./pages/PeerHelperApplicationPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PostDetailPage from "./pages/PostDetailPage";
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
              <Route path="/community/post/:postId" element={<PostDetailPage />} />
              <Route path="/peer-helper-application" element={<PeerHelperApplicationPage />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="analytics" replace />} />
                <Route path="analytics" element={<AdminAnalyticsPage />} />
                <Route path="users" element={<AdminUserManagementPage />} />
                <Route path="content" element={<AdminContentManagementPage />} />
                <Route path="settings" element={<AdminSystemSettingsPage />} />
              </Route>
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
