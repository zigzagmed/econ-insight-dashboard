
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, AlertTriangle, CheckCircle } from 'lucide-react';

interface InsightCardsProps {
  keyFindings: string[];
  rSquared: number;
  adjustedRSquared: number;
  pValueF: number;
}

export const InsightCards: React.FC<InsightCardsProps> = ({
  keyFindings,
  rSquared,
  adjustedRSquared,
  pValueF
}) => {
  const insights = [
    {
      icon: TrendingUp,
      title: 'Explanatory Power',
      value: `${(rSquared * 100).toFixed(1)}%`,
      description: `Model explains ${(rSquared * 100).toFixed(1)}% of variance in the dependent variable`,
      progress: rSquared * 100,
      color: rSquared > 0.7 ? 'text-green-600' : rSquared > 0.5 ? 'text-blue-600' : 'text-yellow-600',
      bgColor: rSquared > 0.7 ? 'bg-green-50' : rSquared > 0.5 ? 'bg-blue-50' : 'bg-yellow-50'
    },
    {
      icon: Target,
      title: 'Model Precision',
      value: adjustedRSquared.toFixed(3),
      description: 'Adjusted R² accounting for number of predictors',
      progress: adjustedRSquared * 100,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: pValueF < 0.001 ? CheckCircle : AlertTriangle,
      title: 'Statistical Validity',
      value: pValueF < 0.001 ? 'p < 0.001' : `p = ${pValueF.toFixed(3)}`,
      description: pValueF < 0.05 ? 'Model is statistically significant' : 'Model lacks statistical significance',
      progress: pValueF < 0.05 ? 100 : 0,
      color: pValueF < 0.05 ? 'text-green-600' : 'text-red-600',
      bgColor: pValueF < 0.05 ? 'bg-green-50' : 'bg-red-50'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, index) => {
          const IconComponent = insight.icon;
          return (
            <Card key={index} className={`${insight.bgColor} border-l-4 border-l-blue-500`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <IconComponent size={18} className={insight.color} />
                    <span className="text-sm font-medium text-slate-700">{insight.title}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {insight.value}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600 mb-3">{insight.description}</p>
                <Progress value={insight.progress} className="h-1.5" />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
