import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-soft border-border/50">
        <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold pt-6">Create an Account</CardTitle>
            <CardDescription>Join MindCare to access our support community and resources</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" type="text" placeholder="Enter your full name" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="rollNumber">Roll Number</Label>
                <Input id="rollNumber" type="text" placeholder="Enter your roll number" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="instituteName">Institute Name</Label>
                <Input id="instituteName" type="text" placeholder="Enter your institute name" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Choose a password" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" placeholder="Confirm your password" required />
            </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">Create Account</Button>
            <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                    Login
                </Link>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
