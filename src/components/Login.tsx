
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSimulateLogin = (role: 'student' | 'admin') => {
    login(role);
    navigate('/'); // Redirect to home page after login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md shadow-soft border-border/50">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold pt-6">Welcome Back</CardTitle>
                <CardDescription>Sign in to access your MindCare account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" required />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pb-6">
                <Button className="w-full">Login</Button>
                <div className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary hover:underline">
                        Sign Up
                    </Link>
                </div>

                {/* Temporary section for frontend demonstration */}
                <div className="relative w-full pt-4">
                    <Separator />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                        For Demo Only
                    </span>
                </div>
                <p className="text-sm text-muted-foreground text-center px-4">This will be removed before the hackathon. It is for development and testing only.</p>
                <div className="w-full grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={() => handleSimulateLogin('student')}>Simulate Student Login</Button>
                  <Button variant="outline" onClick={() => handleSimulateLogin('admin')}>Simulate Admin Login</Button>
                </div>
            </CardFooter>
        </Card>
    </div>
  );
};

export default Login;
