import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Calendar, Users, MapPin, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-rose-500 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gradient">EventPlatform</h1>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Component */}
      <HeroGeometric
        badge="🎉 Event Platform"
        title1="Discover & Create"
        title2="Amazing Events"
      />

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gradient">Why Choose Us</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to create, manage, and discover amazing events in one place
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Event Creation</h3>
              <p className="text-muted-foreground">
                Create and manage events effortlessly with our intuitive interface
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-rose-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect with People</h3>
              <p className="text-muted-foreground">
                Find events that match your interests and connect with like-minded people
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Local & Global</h3>
              <p className="text-muted-foreground">
                Discover events in your area or explore opportunities worldwide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 p-1">
            <div className="bg-background rounded-3xl p-12 text-center">
              <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of event creators and attendees. Create your first event today!
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <Link href="/sign-up">Create Account</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/dashboard">Browse Events</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>&copy; 2024 EventPlatform. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
