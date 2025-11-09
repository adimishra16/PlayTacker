import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, X, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Player {
  name: string;
  role: string;
}

const CreateMatch = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [matchName, setMatchName] = useState("");
  const [venue, setVenue] = useState("");
  const [overs, setOvers] = useState("20");
  const [date, setDate] = useState("");
  const [team1Name, setTeam1Name] = useState("");
  const [team2Name, setTeam2Name] = useState("");
  const [team1Players, setTeam1Players] = useState<Player[]>([{ name: "", role: "Batsman" }]);
  const [team2Players, setTeam2Players] = useState<Player[]>([{ name: "", role: "Batsman" }]);

  const playerRoles = ["Batsman", "Bowler", "All-rounder", "Wicket Keeper"];

  const addPlayer = (team: "team1" | "team2") => {
    if (team === "team1") {
      setTeam1Players([...team1Players, { name: "", role: "Batsman" }]);
    } else {
      setTeam2Players([...team2Players, { name: "", role: "Batsman" }]);
    }
  };

  const removePlayer = (team: "team1" | "team2", index: number) => {
    if (team === "team1") {
      setTeam1Players(team1Players.filter((_, i) => i !== index));
    } else {
      setTeam2Players(team2Players.filter((_, i) => i !== index));
    }
  };

  const updatePlayer = (team: "team1" | "team2", index: number, field: "name" | "role", value: string) => {
    if (team === "team1") {
      const updated = [...team1Players];
      updated[index] = { ...updated[index], [field]: value };
      setTeam1Players(updated);
    } else {
      const updated = [...team2Players];
      updated[index] = { ...updated[index], [field]: value };
      setTeam2Players(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!matchName || !venue || !team1Name || !team2Name) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const team1ValidPlayers = team1Players.filter((p) => p.name.trim() !== "");
    const team2ValidPlayers = team2Players.filter((p) => p.name.trim() !== "");

    if (team1ValidPlayers.length < 2 || team2ValidPlayers.length < 2) {
      toast({
        title: "Insufficient Players",
        description: "Each team must have at least 2 players",
        variant: "destructive",
      });
      return;
    }

    // Store match data (in real app, would save to backend)
    const matchData = {
      id: Date.now().toString(),
      matchName,
      venue,
      overs: parseInt(overs),
      date,
      team1: { name: team1Name, players: team1ValidPlayers },
      team2: { name: team2Name, players: team2ValidPlayers },
    };

    console.log("Match Created:", matchData);

    toast({
      title: "Match Created Successfully!",
      description: `${team1Name} vs ${team2Name} is ready to start`,
    });

    // Navigate to live match page
    navigate(`/live-match/${matchData.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Create New Match</h1>
            <p className="text-muted-foreground">Set up your cricket match with teams and players</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Match Details */}
            <Card className="p-6 bg-gradient-card border-border">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                Match Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="matchName">Match Name *</Label>
                  <Input
                    id="matchName"
                    value={matchName}
                    onChange={(e) => setMatchName(e.target.value)}
                    placeholder="e.g., Finals 2024"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="venue">Venue *</Label>
                  <Input
                    id="venue"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="e.g., Mumbai Stadium"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="overs">Overs per Innings</Label>
                  <Select value={overs} onValueChange={setOvers}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Overs</SelectItem>
                      <SelectItem value="10">10 Overs</SelectItem>
                      <SelectItem value="20">20 Overs (T20)</SelectItem>
                      <SelectItem value="50">50 Overs (ODI)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date">Date & Time</Label>
                  <Input
                    id="date"
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
            </Card>

            {/* Team 1 */}
            <Card className="p-6 bg-gradient-card border-border">
              <h2 className="text-2xl font-semibold mb-4">Team 1</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="team1Name">Team Name *</Label>
                  <Input
                    id="team1Name"
                    value={team1Name}
                    onChange={(e) => setTeam1Name(e.target.value)}
                    placeholder="e.g., Mumbai Indians"
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label>Players</Label>
                    <Button type="button" size="sm" onClick={() => addPlayer("team1")}>
                      <Plus className="w-4 h-4 mr-1" />
                      Add Player
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {team1Players.map((player, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder="Player name"
                          value={player.name}
                          onChange={(e) => updatePlayer("team1", index, "name", e.target.value)}
                        />
                        <Select
                          value={player.role}
                          onValueChange={(value) => updatePlayer("team1", index, "role", value)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {playerRoles.map((role) => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {team1Players.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removePlayer("team1", index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Team 2 */}
            <Card className="p-6 bg-gradient-card border-border">
              <h2 className="text-2xl font-semibold mb-4">Team 2</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="team2Name">Team Name *</Label>
                  <Input
                    id="team2Name"
                    value={team2Name}
                    onChange={(e) => setTeam2Name(e.target.value)}
                    placeholder="e.g., Chennai Super Kings"
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label>Players</Label>
                    <Button type="button" size="sm" onClick={() => addPlayer("team2")}>
                      <Plus className="w-4 h-4 mr-1" />
                      Add Player
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {team2Players.map((player, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder="Player name"
                          value={player.name}
                          onChange={(e) => updatePlayer("team2", index, "name", e.target.value)}
                        />
                        <Select
                          value={player.role}
                          onValueChange={(value) => updatePlayer("team2", index, "role", value)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {playerRoles.map((role) => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {team2Players.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removePlayer("team2", index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button type="submit" size="lg" className="flex-1">
                Create Match & Start Scoring
              </Button>
              <Button type="button" variant="outline" size="lg" onClick={() => navigate("/")}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateMatch;
