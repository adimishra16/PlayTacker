import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TrendingUp, User } from "lucide-react";

const ScoreViewer = () => {
  const { matchId } = useParams();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Match Header */}
          <Card className="p-6 mb-6 bg-gradient-card border-border shadow-score">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-1">India vs Australia</h1>
                <p className="text-muted-foreground">Match {matchId} • Mumbai Stadium</p>
              </div>
              <Badge variant="secondary">Completed</Badge>
            </div>

            {/* Team Scores */}
            <div className="space-y-4">
              <div className="bg-primary/5 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold mb-1">India</div>
                    <div className="text-muted-foreground">Won by 45 runs</div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-primary">245/6</div>
                    <div className="text-lg text-muted-foreground">(50.0 overs)</div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">Australia</div>
                  <div className="text-right">
                    <div className="text-4xl font-bold">200/10</div>
                    <div className="text-lg text-muted-foreground">(47.3 overs)</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Detailed Scorecard */}
          <Tabs defaultValue="batting" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="batting">Batting</TabsTrigger>
              <TabsTrigger value="bowling">Bowling</TabsTrigger>
              <TabsTrigger value="commentary">Commentary</TabsTrigger>
            </TabsList>

            <TabsContent value="batting" className="space-y-6">
              {/* India Batting */}
              <Card className="p-6 bg-gradient-card border-border">
                <h3 className="text-xl font-semibold mb-4">India Innings</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-2">Batsman</th>
                        <th className="text-center py-3 px-2">R</th>
                        <th className="text-center py-3 px-2">B</th>
                        <th className="text-center py-3 px-2">4s</th>
                        <th className="text-center py-3 px-2">6s</th>
                        <th className="text-center py-3 px-2">SR</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">Rohit Sharma (c)</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            c Smith b Starc
                          </div>
                        </td>
                        <td className="text-center py-3 px-2 font-semibold">87</td>
                        <td className="text-center py-3 px-2">65</td>
                        <td className="text-center py-3 px-2">10</td>
                        <td className="text-center py-3 px-2">3</td>
                        <td className="text-center py-3 px-2">133.85</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">Virat Kohli</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            c Warner b Cummins
                          </div>
                        </td>
                        <td className="text-center py-3 px-2 font-semibold">64</td>
                        <td className="text-center py-3 px-2">78</td>
                        <td className="text-center py-3 px-2">6</td>
                        <td className="text-center py-3 px-2">1</td>
                        <td className="text-center py-3 px-2">82.05</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">KL Rahul (wk)</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            not out
                          </div>
                        </td>
                        <td className="text-center py-3 px-2 font-semibold">52*</td>
                        <td className="text-center py-3 px-2">48</td>
                        <td className="text-center py-3 px-2">5</td>
                        <td className="text-center py-3 px-2">2</td>
                        <td className="text-center py-3 px-2">108.33</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 pt-4 border-t border-border text-sm">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <span className="text-muted-foreground">Extras:</span>
                      <span className="font-semibold ml-2">12 (wd 5, nb 4, lb 3)</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total:</span>
                      <span className="font-semibold ml-2">245/6 (50.0 overs)</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Run Rate:</span>
                      <span className="font-semibold ml-2">4.90</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Fall of Wickets */}
              <Card className="p-6 bg-gradient-card border-border">
                <h3 className="text-xl font-semibold mb-4">Fall of Wickets</h3>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline">1-25 (Dhawan, 5.2 ov)</Badge>
                  <Badge variant="outline">2-145 (Rohit, 28.4 ov)</Badge>
                  <Badge variant="outline">3-167 (Kohli, 35.1 ov)</Badge>
                  <Badge variant="outline">4-198 (Pant, 42.3 ov)</Badge>
                  <Badge variant="outline">5-215 (Hardik, 46.2 ov)</Badge>
                  <Badge variant="outline">6-230 (Jadeja, 48.5 ov)</Badge>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="bowling" className="space-y-6">
              <Card className="p-6 bg-gradient-card border-border">
                <h3 className="text-xl font-semibold mb-4">Australia Bowling</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-2">Bowler</th>
                        <th className="text-center py-3 px-2">O</th>
                        <th className="text-center py-3 px-2">M</th>
                        <th className="text-center py-3 px-2">R</th>
                        <th className="text-center py-3 px-2">W</th>
                        <th className="text-center py-3 px-2">Econ</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-2 font-medium">Mitchell Starc</td>
                        <td className="text-center py-3 px-2">10</td>
                        <td className="text-center py-3 px-2">1</td>
                        <td className="text-center py-3 px-2">52</td>
                        <td className="text-center py-3 px-2 font-semibold">2</td>
                        <td className="text-center py-3 px-2">5.20</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-2 font-medium">Pat Cummins</td>
                        <td className="text-center py-3 px-2">10</td>
                        <td className="text-center py-3 px-2">0</td>
                        <td className="text-center py-3 px-2">48</td>
                        <td className="text-center py-3 px-2 font-semibold">2</td>
                        <td className="text-center py-3 px-2">4.80</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-2 font-medium">Adam Zampa</td>
                        <td className="text-center py-3 px-2">10</td>
                        <td className="text-center py-3 px-2">0</td>
                        <td className="text-center py-3 px-2">45</td>
                        <td className="text-center py-3 px-2 font-semibold">1</td>
                        <td className="text-center py-3 px-2">4.50</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="commentary" className="space-y-4">
              <Card className="p-6 bg-gradient-card border-border">
                <h3 className="text-xl font-semibold mb-4">Ball-by-Ball Commentary</h3>
                
                <div className="space-y-4">
                  <div className="pb-4 border-b border-border">
                    <div className="flex items-start gap-3">
                      <Badge variant="secondary" className="mt-1">49.6</Badge>
                      <div className="flex-1">
                        <p className="font-medium mb-1">Starc to Bumrah, SIX!</p>
                        <p className="text-sm text-muted-foreground">
                          What a way to finish! Bumrah swings hard and connects perfectly. The ball sails over long-on for a maximum!
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pb-4 border-b border-border">
                    <div className="flex items-start gap-3">
                      <Badge variant="secondary" className="mt-1">49.5</Badge>
                      <div className="flex-1">
                        <p className="font-medium mb-1">Starc to Bumrah, no run</p>
                        <p className="text-sm text-muted-foreground">
                          Slower delivery, Bumrah tries to slog but misses completely.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pb-4 border-b border-border">
                    <div className="flex items-start gap-3">
                      <Badge variant="secondary" className="mt-1">49.4</Badge>
                      <div className="flex-1">
                        <p className="font-medium mb-1">Starc to Rahul, 1 run</p>
                        <p className="text-sm text-muted-foreground">
                          Full toss, driven down to long-off for a single.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ScoreViewer;
