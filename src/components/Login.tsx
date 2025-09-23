
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, Users } from "lucide-react"; // Import icons

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend team: Implement real authentication logic here.
    console.log("Login form submitted. Needs backend integration.");
  };

  // Demo login handlers
  const handleStudentLogin = () => {
    login('student');
    navigate('/ai-chat');
  };

  const handleAdminLogin = () => {
    login('admin');
    navigate('/admin');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <div className="w-full max-w-md">
        <Card className="shadow-soft border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to access your mental health resources.</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full">Sign In</Button>
              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="font-medium text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>

        {/* Demo Login Section */}
        <Card className="mt-6 bg-muted/50 border-dashed">
            <CardHeader>
                <CardTitle className="text-center text-base font-semibold">Demo Access</CardTitle>
                <CardDescription className="text-center text-xs">For demonstration and testing purposes.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center gap-4">
                <Button variant="outline" onClick={handleStudentLogin}>
                    <Users className="mr-2 h-4 w-4" />
                    Login as Student
                </Button>
                <Button variant="secondary" onClick={handleAdminLogin}>
                    <Shield className="mr-2 h-4 w-4" />
                    Login as Admin
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
