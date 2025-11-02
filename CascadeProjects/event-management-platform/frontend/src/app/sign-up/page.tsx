"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { authAPI } from "@/lib/api";
import { Sparkles } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.register(email, password);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.15] via-transparent to-rose-500/[0.15] dark:from-indigo-500/[0.05] dark:via-transparent dark:to-rose-500/[0.05] blur-3xl" />
      
      {/* Navigation */}
      <nav className="absolute top-0 left-0 w-full z-20 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-rose-500 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gradient">EventPlatform</h1>
            </div>
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      {/* Sign Up Form */}
      <Card className="w-full max-w-md mx-4 backdrop-blur-xl relative z-10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-gradient">
            Sign Up
          </CardTitle>
          <CardDescription>
            Create an account to start managing events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-md p-3">
                {error}
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
