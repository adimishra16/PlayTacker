import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Plus,
  Calendar,
  TrendingUp,
  Users,
  BarChart3,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MatchCard from "@/components/MatchCard";
import heroImage from "@/assets/cricket-hero.jpg";

const Index = () => {
  // Mock data for live matches
  const liveMatches = [
    {
      matchId: "1",
      team1: "India",
      team2: "Australia",
      team1Score: "245/6 (45.0)",
      team2Score: "178/4 (32.0)",
      status: "live" as const,
      venue: "Mumbai Stadium",
      time: "Live Now",
    },
    {
      matchId: "2",
      team1: "England",
      team2: "Pakistan",
      team1Score: "198/10 (48.2)",
      team2Score: "142/3 (28.0)",
      status: "live" as const,
      venue: "Lords Cricket Ground",
      time: "Live Now",
    },
  ];

  const upcomingMatches = [
    {
      matchId: "3",
      team1: "South Africa",
      team2: "New Zealand",
      status: "upcoming" as const,
      venue: "Cape Town",
      time: "Tomorrow, 2:00 PM",
    },
    {
      matchId: "4",
      team1: "West Indies",
      team2: "Sri Lanka",
      status: "upcoming" as const,
      venue: "Kingston",
      time: "Friday, 4:30 PM",
    },
  ];

  const features = [
    {
      icon: Plus,
      title: "Create Match",
      description: "Set up custom matches with your own teams and players",
      link: "/create-match",
    },
    {
      icon: Trophy,
      title: "Tournaments",
      description: "Organize and manage complete cricket tournaments",
      link: "/tournaments",
    },
    {
      icon: TrendingUp,
      title: "Live Scoring",
      description: "Real-time score updates with ball-by-ball commentary",
      link: "/live-scores",
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Detailed statistics and performance insights",
      link: "/stats",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background"></div>
        </div>

        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Live Cricket Scoring
              <span className="block text-accent">Made Simple</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Create matches, track scores in real-time, and manage tournaments
              with our powerful cricket scoring platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/create-match">
                <Button size="lg" className="text-lg px-8">
                  <Plus className="w-5 h-5 mr-2" />
                  Start a Match
                </Button>
              </Link>
              <Link to="/tournaments">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20"
                >
                  <Trophy className="w-5 h-5 mr-2" />
                  Create Tournament
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live Matches Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Live Matches</h2>
            <p className="text-muted-foreground">
              Catch all the action happening right now
            </p>
          </div>
          <Link to="/live-scores">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
          {liveMatches.map((match) => (
            <MatchCard key={match.matchId} {...match} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools for cricket scoring, tournament management,
              and analytics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link}>
                <div className="bg-card p-6 rounded-lg border border-border hover:shadow-card transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Matches */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Upcoming Matches</h2>
          <p className="text-muted-foreground">
            Don't miss these exciting fixtures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingMatches.map((match) => (
            <MatchCard key={match.matchId} {...match} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <Users className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">
            Join Thousands of Cricket Enthusiasts
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Whether you're organizing a local tournament or tracking friendly
            matches, PlayTracker has you covered.
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
