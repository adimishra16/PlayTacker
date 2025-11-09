import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface MatchCardProps {
  matchId: string;
  team1: string;
  team2: string;
  team1Score?: string;
  team2Score?: string;
  status: "live" | "upcoming" | "completed";
  venue?: string;
  time?: string;
}

const MatchCard = ({
  matchId,
  team1,
  team2,
  team1Score,
  team2Score,
  status,
  venue,
  time,
}: MatchCardProps) => {
  return (
    <Card className="p-6 hover:shadow-score transition-all duration-300 bg-gradient-card border-border">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Badge
            variant={status === "live" ? "default" : status === "upcoming" ? "secondary" : "outline"}
            className={status === "live" ? "animate-pulse-glow" : ""}
          >
            {status === "live" && <span className="w-2 h-2 rounded-full bg-secondary mr-2 animate-pulse" />}
            {status.toUpperCase()}
          </Badge>
          {venue && <span className="text-xs text-muted-foreground">{venue}</span>}
        </div>

        {/* Teams & Scores */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-lg">{team1}</span>
            {team1Score && (
              <span className="text-2xl font-bold text-primary">{team1Score}</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-lg">{team2}</span>
            {team2Score && (
              <span className="text-2xl font-bold text-primary">{team2Score}</span>
            )}
          </div>
        </div>

        {/* Time or Action */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          {time && <span className="text-sm text-muted-foreground">{time}</span>}
          <Link to={status === "live" ? `/live-match/${matchId}` : `/score-viewer/${matchId}`}>
            <Button size="sm" variant={status === "live" ? "default" : "outline"}>
              {status === "live" ? (
                <>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Watch Live
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default MatchCard;
