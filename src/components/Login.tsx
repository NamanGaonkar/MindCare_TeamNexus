import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const Login = () => {
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
            <CardFooter className="flex flex-col space-y-4">
                <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">Login</Button>
                <div className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary hover:underline">
                        Sign Up
                    </Link>
                </div>
            </CardFooter>
        </Card>
    </div>
  );
};

export default Login;
