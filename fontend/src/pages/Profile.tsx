import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Trophy, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">My Profile</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="p-6 bg-gradient-card border-border md:col-span-1">
              <div className="text-center space-y-4">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">John Doe</h2>
                  <p className="text-muted-foreground">Cricket Enthusiast</p>
                </div>
                <Button variant="outline" className="w-full">
                  <User className="w-4 h-4 mr-2" />
                  Change Avatar
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Matches Created</div>
                    <div className="font-semibold">12</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Tournaments</div>
                    <div className="font-semibold">3</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Edit Profile Form */}
            <Card className="p-6 bg-gradient-card border-border md:col-span-2">
              <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+1 234 567 8900" />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue="Mumbai, India" />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    placeholder="Tell us about yourself..."
                    defaultValue="Passionate cricket player and organizer"
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="button" onClick={handleSave}>
                    Save Changes
                  </Button>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Saved Teams & Tournaments */}
          <div className="mt-8 space-y-6">
            <Card className="p-6 bg-gradient-card border-border">
              <h2 className="text-2xl font-semibold mb-4">My Teams</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold mb-1">Mumbai Warriors</h3>
                  <p className="text-sm text-muted-foreground">11 Players</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold mb-1">Chennai Champions</h3>
                  <p className="text-sm text-muted-foreground">11 Players</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-border">
              <h2 className="text-2xl font-semibold mb-4">My Tournaments</h2>
              <div className="space-y-3">
                <div className="p-4 bg-muted/30 rounded-lg flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">Summer League 2024</h3>
                    <p className="text-sm text-muted-foreground">8 Teams • In Progress</p>
                  </div>
                  <Button size="sm" variant="outline">View</Button>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">Office Cup</h3>
                    <p className="text-sm text-muted-foreground">6 Teams • Upcoming</p>
                  </div>
                  <Button size="sm" variant="outline">View</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
