import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    institute: "",
    rollNumber: "",
    adminNumber: ""
  });
  const [isAdminSignup, setIsAdminSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (isAdminSignup && !formData.adminNumber) {
      toast.error("Admin number is required for admin signup");
      return;
    }

    setLoading(true);

    const userData = {
      fullName: formData.fullName,
      institute: formData.institute,
      rollNumber: formData.rollNumber,
      ...(isAdminSignup && { adminNumber: formData.adminNumber, isAdmin: true })
    };

    const { error } = await signup(formData.email, formData.password, userData);

    if (!error) {
      setFormData({
        fullName: "",
        email: "",
        password: "",
        institute: "",
        rollNumber: "",
        adminNumber: ""
      });
      navigate('/login');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-elegant border-border/50 bg-background/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center space-x-2 mb-4">
              <Button
                type="button"
                variant={!isAdminSignup ? "default" : "outline"}
                size="sm"
                onClick={() => setIsAdminSignup(false)}
                className="px-6"
              >
                Student
              </Button>
              <Button
                type="button"
                variant={isAdminSignup ? "default" : "outline"}
                size="sm"
                onClick={() => setIsAdminSignup(true)}
                className="px-6"
              >
                Admin
              </Button>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {isAdminSignup ? 'Admin Registration' : 'Join Our Community'}
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              {isAdminSignup ? 'Register as an administrator to manage the platform' : 'Create your account to access confidential support and connect with your peer community.'}
            </p>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <Input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
              />

              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />

              <Input
                type="password"
                placeholder="Password (min. 6 characters)"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />

              {isAdminSignup && (
                <Input
                  type="text"
                  placeholder="Admin Number (e.g., ADM2024001)"
                  value={formData.adminNumber}
                  onChange={(e) => setFormData({...formData, adminNumber: e.target.value})}
                  required={isAdminSignup}
                />
              )}

              <Input
                type="text"
                placeholder="Institute/University"
                value={formData.institute}
                onChange={(e) => setFormData({...formData, institute: e.target.value})}
              />

              {!isAdminSignup && (
                <Input
                  type="text"
                  placeholder="Roll Number (optional)"
                  value={formData.rollNumber}
                  onChange={(e) => setFormData({...formData, rollNumber: e.target.value})}
                />
              )}

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:opacity-90 text-white shadow-medium" 
                disabled={loading}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : (isAdminSignup ? "Register as Admin" : "Create Account")}
              </Button>
            </CardContent>
          </form>

          <CardFooter className="text-center">
            <p className="text-sm text-muted-foreground w-full">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;