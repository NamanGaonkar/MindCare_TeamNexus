import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout, loading } = useAuth();
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const commonNavItems = [
    { name: "AI Support", href: "/ai-chat" },
    { name: "Book Session", href: "/booking" },
    { name: "Resources", href: "/resources" },
    { name: "Community", href: "/community" },
  ];

  const adminNavItem = { name: "Admin Panel", href: "/admin/analytics" };

  // Add admin navigation for admin users
  const navItems = user?.role === 'admin' ? [...commonNavItems, adminNavItem] : commonNavItems;

  if (loading) {
    return (
      <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">MindCare</span>
            </Link>
            <div className="flex items-center">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          </div>
        </div>
      </header>
    );
  }

  return ( 
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">MindCare</span>
          </Link>

          {isAuthenticated ? (
            <>
              {/* Desktop Navigation for Authenticated Users */}
              <nav className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-foreground/80 hover:text-primary transition-colors duration-200 font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="hidden md:flex items-center space-x-4">
                {user?.email && (
                  <span className="text-sm text-muted-foreground">
                    {user.role === 'admin' ? '👑 Admin' : '👤'} {user.email}
                  </span>
                )}
                <Button variant="outline" onClick={handleLogout}>Logout</Button>
              </div>
            </>
          ) : (
            /* CTA for Unauthenticated Users */
            <div className="hidden md:flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline" className="w-24">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="w-24">Sign Up</Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "Close" : "Menu"}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-4 pt-4">
              {isAuthenticated ? (
                <>
                  {user?.email && (
                    <div className="text-sm text-muted-foreground py-2">
                      {user.role === 'admin' ? '👑 Admin' : '👤'} {user.email}
                    </div>
                  )}
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-foreground/80 hover:text-primary transition-colors duration-200 font-medium py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4">
                    <Button variant="outline" className="w-full" onClick={handleLogout}>Logout</Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-4">
                  <Link to="/">
                      <Button variant="ghost" className="w-full justify-start">Home</Button>
                  </Link>
                  <Link to="/login">
                      <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link to="/signup">
                      <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;