"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Sparkles, Plus, LayoutGrid, LogOut } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/sign-in");
    }
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo and Links */}
            <div className="flex items-center gap-8">
              <Link href="/dashboard">
                <div className="flex items-center gap-2 cursor-pointer group">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-gradient">EventPlatform</h1>
                </div>
              </Link>
              
              <div className="hidden md:flex items-center gap-1">
                <Button variant="ghost" asChild className="gap-2">
                  <Link href="/dashboard">
                    <LayoutGrid className="h-4 w-4" />
                    Events
                  </Link>
                </Button>
                <Button variant="ghost" asChild className="gap-2">
                  <Link href="/dashboard/events/new">
                    <Plus className="h-4 w-4" />
                    Create Event
                  </Link>
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button 
                onClick={handleSignOut}
                variant="outline" 
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden gap-2 mt-4">
            <Button variant="outline" asChild className="flex-1 gap-2" size="sm">
              <Link href="/dashboard">
                <LayoutGrid className="h-4 w-4" />
                Events
              </Link>
            </Button>
            <Button variant="outline" asChild className="flex-1 gap-2" size="sm">
              <Link href="/dashboard/events/new">
                <Plus className="h-4 w-4" />
                Create
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
