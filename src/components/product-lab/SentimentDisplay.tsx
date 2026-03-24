import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ThumbsUp, ThumbsDown, Minus, MessageCircle, AlertTriangle, TrendingUp } from 'lucide-react';

export interface SentimentData {
  overall: 'positive' | 'neutral' | 'negative';
  score: number;
  featureReactions: {
    feature: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    comment: string;
  }[];
  keyConcerns: string[];
  likelihoodToConsider: 'high' | 'medium' | 'low';
}

interface SentimentDisplayProps {
  sentiment?: SentimentData;
  personaName: string;
  productNames: string[];
  isLoading?: boolean;
}

const sentimentConfig = {
  positive: {
    color: 'bg-success/10 text-success border-success/30',
    icon: ThumbsUp,
    label: 'Positive',
  },
  neutral: {
    color: 'bg-muted text-muted-foreground border-border',
    icon: Minus,
    label: 'Neutral',
  },
  negative: {
    color: 'bg-destructive/10 text-destructive border-destructive/30',
    icon: ThumbsDown,
    label: 'Negative',
  },
};

const likelihoodConfig = {
  high: { color: 'bg-success/10 text-success border-success/30', label: 'High' },
  medium: { color: 'bg-warning/10 text-warning border-warning/30', label: 'Medium' },
  low: { color: 'bg-destructive/10 text-destructive border-destructive/30', label: 'Low' },
};

export function SentimentDisplay({ 
  sentiment, 
  personaName, 
  productNames,
  isLoading 
}: SentimentDisplayProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Analyzing Sentiment...</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="h-20 bg-muted rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!sentiment) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <MessageCircle className="w-12 h-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground">No Sentiment Data</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Start a conversation to gather persona feedback
          </p>
        </CardContent>
      </Card>
    );
  }

  const overallConfig = sentimentConfig[sentiment.overall];
  const OverallIcon = overallConfig.icon;
  const likelihoodStyle = likelihoodConfig[sentiment.likelihoodToConsider];

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">Sentiment Analysis</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {personaName} on {productNames.join(' + ')}
            </p>
          </div>
          <Badge variant="outline" className={overallConfig.color}>
            <OverallIcon className="w-3 h-3 mr-1" />
            {overallConfig.label} ({sentiment.score}%)
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Overall Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Sentiment</span>
            <span className="text-sm text-muted-foreground">{sentiment.score}%</span>
          </div>
          <Progress 
            value={sentiment.score} 
            className={`h-3 ${
              sentiment.overall === 'positive' ? '[&>div]:bg-success' :
              sentiment.overall === 'negative' ? '[&>div]:bg-destructive' : ''
            }`}
          />
        </div>

        {/* Feature Reactions */}
        {sentiment.featureReactions.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-3">Feature Reactions</h4>
            <div className="space-y-2">
              {sentiment.featureReactions.map((reaction, i) => {
                const config = sentimentConfig[reaction.sentiment];
                const Icon = config.icon;
                return (
                  <div 
                    key={i}
                    className="p-3 rounded-lg bg-muted/50 space-y-1"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${
                        reaction.sentiment === 'positive' ? 'text-success' :
                        reaction.sentiment === 'negative' ? 'text-destructive' :
                        'text-muted-foreground'
                      }`} />
                      <span className="text-sm font-medium">{reaction.feature}</span>
                    </div>
                    <p className="text-sm text-muted-foreground italic">"{reaction.comment}"</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Key Concerns */}
        {sentiment.keyConcerns.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-warning" />
              Key Concerns
            </h4>
            <ul className="space-y-1">
              {sentiment.keyConcerns.map((concern, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-warning">•</span>
                  {concern}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Likelihood to Consider */}
        <div className="pt-3 border-t flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Likelihood to Consider</span>
          </div>
          <Badge variant="outline" className={likelihoodStyle.color}>
            {likelihoodStyle.label}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
