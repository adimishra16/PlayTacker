import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const LiveMatch = () => {
  const { matchId } = useParams();
  const { toast } = useToast();

  // Mock match state
  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [overs, setOvers] = useState(0.0);
  const [balls, setBalls] = useState(0);
  const [currentBall, setCurrentBall] = useState<string[]>([]);
  const [striker, setStriker] = useState("Player 1");
  const [nonStriker, setNonStriker] = useState("Player 2");
  const [bowler, setBowler] = useState("Bowler 1");

  const battingTeam = "India";
  const bowlingTeam = "Australia";

  const mockPlayers = [
    "Player 1",
    "Player 2",
    "Player 3",
    "Player 4",
    "Player 5",
  ];

  const mockBowlers = ["Bowler 1", "Bowler 2", "Bowler 3"];

  const addRuns = (runsScored: number) => {
    setRuns(runs + runsScored);
    setBalls(balls + 1);
    setCurrentBall([...currentBall, runsScored.toString()]);

    // Rotate strike on odd runs
    if (runsScored % 2 !== 0) {
      const temp = striker;
      setStriker(nonStriker);
      setNonStriker(temp);
    }

    // Update overs
    if (balls === 5) {
      setOvers(Math.floor(overs) + 1);
      setBalls(0);
      setCurrentBall([]);
      // Rotate strike at end of over
      const temp = striker;
      setStriker(nonStriker);
      setNonStriker(temp);
    } else {
      setOvers(Math.floor(overs) + (balls + 1) / 6);
    }

    toast({
      title: `${runsScored} ${runsScored === 1 ? "Run" : "Runs"}!`,
      description: `Score: ${runs + runsScored}/${wickets}`,
    });
  };

  const addWicket = () => {
    if (wickets < 10) {
      setWickets(wickets + 1);
      setBalls(balls + 1);
      setCurrentBall([...currentBall, "W"]);

      if (balls === 5) {
        setOvers(Math.floor(overs) + 1);
        setBalls(0);
        setCurrentBall([]);
      } else {
        setOvers(Math.floor(overs) + (balls + 1) / 6);
      }

      toast({
        title: "Wicket!",
        description: `${striker} is out`,
        variant: "destructive",
      });
    }
  };

  const addExtra = (type: string) => {
    setRuns(runs + 1);
    // Extras don't count as legal deliveries
    setCurrentBall([...currentBall, type]);

    toast({
      title: `${type}!`,
      description: `1 extra run added`,
    });
  };

  const runRate = overs > 0 ? (runs / overs).toFixed(2) : "0.00";

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar />

      <div className="flex-1 container mx-auto px-4 py-6">
        {/* Match Header */}
        <Card className="p-6 mb-6 bg-gradient-card border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">{battingTeam} vs {bowlingTeam}</h1>
              <p className="text-muted-foreground">Match {matchId} • Live</p>
            </div>
            <Badge className="animate-pulse-glow">
              <span className="w-2 h-2 rounded-full bg-secondary mr-2 animate-pulse" />
              LIVE
            </Badge>
          </div>

          {/* Main Score Display */}
          <div className="bg-primary/5 rounded-lg p-6 mb-4">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">
                {runs}/{wickets}
              </div>
              <div className="text-2xl text-muted-foreground">
                {Math.floor(overs)}.{balls} Overs • RR: {runRate}
              </div>
            </div>
          </div>

          {/* Current Batsmen */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background/50 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Striker *</div>
              <div className="font-semibold">{striker}</div>
              <div className="text-sm text-muted-foreground">45 (32) • 6x4s</div>
            </div>
            <div className="bg-background/50 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Non-Striker</div>
              <div className="font-semibold">{nonStriker}</div>
              <div className="text-sm text-muted-foreground">23 (18) • 2x4s</div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Scoring Panel */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-gradient-card border-border">
              <h2 className="text-xl font-semibold mb-4">Scorer Panel</h2>

              {/* Player Selection */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Striker
                  </label>
                  <Select value={striker} onValueChange={setStriker}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockPlayers.map((player) => (
                        <SelectItem key={player} value={player}>
                          {player}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Non-Striker
                  </label>
                  <Select value={nonStriker} onValueChange={setNonStriker}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockPlayers.map((player) => (
                        <SelectItem key={player} value={player}>
                          {player}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-sm text-muted-foreground mb-2 block">
                  Bowler
                </label>
                <Select value={bowler} onValueChange={setBowler}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockBowlers.map((bowlerName) => (
                      <SelectItem key={bowlerName} value={bowlerName}>
                        {bowlerName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Run Buttons */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Runs</label>
                  <div className="grid grid-cols-7 gap-2">
                    {[0, 1, 2, 3, 4, 5, 6].map((run) => (
                      <Button
                        key={run}
                        onClick={() => addRuns(run)}
                        variant={run === 4 || run === 6 ? "default" : "outline"}
                        size="lg"
                        className="text-lg font-bold"
                      >
                        {run}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Extras */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Extras</label>
                  <div className="grid grid-cols-4 gap-2">
                    <Button
                      onClick={() => addExtra("WD")}
                      variant="secondary"
                      size="lg"
                    >
                      Wide
                    </Button>
                    <Button
                      onClick={() => addExtra("NB")}
                      variant="secondary"
                      size="lg"
                    >
                      No Ball
                    </Button>
                    <Button
                      onClick={() => addExtra("LB")}
                      variant="secondary"
                      size="lg"
                    >
                      Leg Bye
                    </Button>
                    <Button
                      onClick={() => addExtra("B")}
                      variant="secondary"
                      size="lg"
                    >
                      Bye
                    </Button>
                  </div>
                </div>

                {/* Wicket */}
                <div>
                  <Button
                    onClick={addWicket}
                    variant="destructive"
                    size="lg"
                    className="w-full"
                  >
                    Wicket
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Current Over */}
            <Card className="p-6 bg-gradient-card border-border">
              <h3 className="font-semibold mb-4">Current Over</h3>
              <div className="flex gap-2 flex-wrap">
                {currentBall.length === 0 ? (
                  <span className="text-muted-foreground text-sm">
                    No balls bowled yet
                  </span>
                ) : (
                  currentBall.map((ball, index) => (
                    <Badge
                      key={index}
                      variant={ball === "W" ? "destructive" : "secondary"}
                      className="text-lg px-3 py-1"
                    >
                      {ball}
                    </Badge>
                  ))
                )}
              </div>
            </Card>

            {/* Bowler Stats */}
            <Card className="p-6 bg-gradient-card border-border">
              <h3 className="font-semibold mb-4">Bowler Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Overs:</span>
                  <span className="font-semibold">4.2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Runs:</span>
                  <span className="font-semibold">28</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Wickets:</span>
                  <span className="font-semibold">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Economy:</span>
                  <span className="font-semibold">6.46</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Tabs for additional info */}
        <Card className="mt-6 p-6 bg-gradient-card border-border">
          <Tabs defaultValue="scorecard">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="scorecard">Scorecard</TabsTrigger>
              <TabsTrigger value="commentary">Commentary</TabsTrigger>
              <TabsTrigger value="info">Match Info</TabsTrigger>
            </TabsList>
            <TabsContent value="scorecard" className="mt-4">
              <div className="space-y-4">
                <h3 className="font-semibold">Batting</h3>
                <div className="text-sm text-muted-foreground">
                  Full scorecard will be displayed here
                </div>
              </div>
            </TabsContent>
            <TabsContent value="commentary" className="mt-4">
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-semibold">4.2</span> - Great shot! Four runs
                </div>
                <div className="text-sm">
                  <span className="font-semibold">4.1</span> - Single taken
                </div>
              </div>
            </TabsContent>
            <TabsContent value="info" className="mt-4">
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold">Venue:</span> Mumbai Stadium
                </div>
                <div>
                  <span className="font-semibold">Toss:</span> India won the toss
                  and chose to bat
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default LiveMatch;
