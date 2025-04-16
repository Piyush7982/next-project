import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen, // Potentially for stationary/books
  Home, // For flats/housing
  Calendar, // For events
  UtensilsCrossed, // For restaurants/food
  ShoppingBag, // General marketplace icon
  GraduationCap, // Represents student focus
  ArrowRight,
  BookMarked, // Alternate for books/stationary
} from "lucide-react";
import { Suspense } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  getApprovedListings,
  getApprovedEvents,
  getApprovedRestaurants,
} from "@/actions/listing.actions"; // Actions to fetch approved items
import ItemCard from "@/components/ItemCard"; // Import the new card component
import SSRLoader from "@/components/SSRLoader"; // Loader component

// --- Data Display Component (Remains mostly the same logic, styling adjustments below) ---
async function ApprovedItemsDisplay() {
  const [latestListings, upcomingEvents, featuredRestaurants] =
    await Promise.all([
      getApprovedListings(4),
      getApprovedEvents(4),
      getApprovedRestaurants(4),
    ]);

  const SectionCard = ({ title, children }) => (
    <Card className="bg-background/50 border-border/30">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );

  if (
    latestListings.length === 0 &&
    upcomingEvents.length === 0 &&
    featuredRestaurants.length === 0
  ) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No items available right now.</p>
        <p className="text-sm text-muted-foreground/80">
          Check back later for new listings, events, and restaurants!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {latestListings.length > 0 && (
        <SectionCard title="Featured Items">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {latestListings.map((item) => (
              <ItemCard key={`listing-${item.id}`} item={item} />
            ))}
          </div>
        </SectionCard>
      )}

      {upcomingEvents.length > 0 && (
        <SectionCard title="Upcoming Events">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {upcomingEvents.map((item) => (
              <ItemCard key={`event-${item.id}`} item={item} />
            ))}
          </div>
        </SectionCard>
      )}

      {featuredRestaurants.length > 0 && (
        <SectionCard title="Featured Restaurants">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredRestaurants.map((item) => (
              <ItemCard key={`restaurant-${item.id}`} item={item} />
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
}

// --- Feature Card Component ---
const FeatureCard = ({ icon: Icon, title, description }) => (
  <Card className="bg-card/80 backdrop-blur-sm border-border/30 hover:border-primary/50 transition-colors duration-200">
    <CardHeader className="flex flex-row items-center gap-4 pb-2">
      <div className="bg-primary/10 p-2 rounded-lg">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <CardTitle className="text-lg font-semibold text-card-foreground">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

// --- Main Landing Page Component ---
export default async function LandingPage() {
  const session = await auth();

  if (session && session.user.role !== "admin") {
    return redirect("/dashboard");
  }

  return (
    // Ensure your main layout has dark class enabled if using class strategy
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 lg:py-40 xl:py-56 overflow-hidden">
        {/* Subtle Background Gradient/Pattern */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black opacity-90"></div>
        {/* Optional: Add a subtle SVG pattern or noise texture */}
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-30"></div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
              <GraduationCap className="inline-block w-4 h-4 mr-1" />
              For Students, By Students
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-white">
              Your Campus Connection Hub
            </h1>
            <p className="max-w-[700px] text-lg text-gray-300 md:text-xl dark:text-gray-400">
              Find student housing, buy/sell stationary, discover local events,
              and grab deals at nearby restaurants – all in one place.
            </p>
            <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center pt-4">
              {!session && (
                <>
                  <Button
                    size="lg"
                    asChild
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Link href="/signup">
                      Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="border-white/20 text-white hover:bg-white/10 hover:text-white"
                  >
                    <Link href="/login">Log In</Link>
                  </Button>
                </>
              )}
              {session && session.user.role === "admin" && (
                <Button
                  size="lg"
                  asChild
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Link href="/admin">Admin Dashboard</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 md:py-24 lg:py-28 bg-zinc-950 border-t border-b border-white/10">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 text-white">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={Home}
              title="Student Housing"
              description="Find flats, PGs, and shared accommodations near campus."
            />
            <FeatureCard
              icon={BookMarked}
              title="Stationary & More"
              description="Buy and sell textbooks, notes, lab coats, and other essentials."
            />
            <FeatureCard
              icon={Calendar}
              title="Campus Events"
              description="Discover workshops, club activities, fests, and local happenings."
            />
            <FeatureCard
              icon={UtensilsCrossed}
              title="Local Deals"
              description="Explore nearby restaurants and cafes offering student discounts."
            />
          </div>
        </div>
      </section>

      {/* Approved Items Section */}
      <section className="w-full py-16 md:py-24 lg:py-28 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 text-foreground">
            Latest Arrivals
          </h2>
          <Suspense
            fallback={
              <div className="flex justify-center items-center min-h-[200px]">
                <SSRLoader />
              </div>
            }
          >
            <ApprovedItemsDisplay />
          </Suspense>
        </div>
      </section>

      {/* Footer Placeholder */}
      <footer className="py-6 text-center text-xs text-muted-foreground border-t border-border/20">
        © {new Date().getFullYear()} EduStation. All rights reserved.
      </footer>
    </main>
  );
}
