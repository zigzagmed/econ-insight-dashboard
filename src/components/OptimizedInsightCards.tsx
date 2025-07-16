import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, CheckCircle, AlertTriangle } from 'lucide-react';

interface InsightData {
  metric: string;
  value: number;
  interpretation: 'excellent' | 'good' | 'moderate' | 'poor';
  description: string;
}

interface OptimizedInsightCardsProps {
  insights: InsightData[];
}

export const OptimizedInsightCards: React.FC<OptimizedInsightCardsProps> = ({ insights }) => {
  const getInsightIcon = (metric: string) => {
    switch (metric) {
      case 'explanatory_power': return TrendingUp;
      case 'variable_significance': return Target;
      case 'model_validity': return CheckCircle;
      default: return AlertTriangle;
    }
  };

  const getStatusColor = (interpretation: string) => {
    switch (interpretation) {
      case 'excellent': return { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
      case 'good': return { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
      case 'moderate': return { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
      case 'poor': return { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
      default: return { color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200' };
    }
  };

  const formatValue = (metric: string, value: number) => {
    if (metric === 'explanatory_power' || metric === 'variable_significance') {
      return `${value.toFixed(1)}%`;
    }
    if (metric === 'model_validity') {
      return value < 0.001 ? 'p < 0.001' : `p = ${value.toFixed(3)}`;
    }
    return value.toFixed(2);
  };

  const getProgressValue = (metric: string, value: number, interpretation: string) => {
    if (metric === 'explanatory_power' || metric === 'variable_significance') {
      return value;
    }
    if (metric === 'model_validity') {
      return interpretation === 'excellent' ? 100 : 0;
    }
    return interpretation === 'excellent' ? 100 : interpretation === 'good' ? 75 : interpretation === 'moderate' ? 50 : 25;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {insights.map((insight, index) => {
        const IconComponent = getInsightIcon(insight.metric);
        const colors = getStatusColor(insight.interpretation);
        const formattedValue = formatValue(insight.metric, insight.value);
        const progressValue = getProgressValue(insight.metric, insight.value, insight.interpretation);

        return (
          <Card key={index} className={`${colors.bg} ${colors.border} border-l-4`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <IconComponent size={18} className={colors.color} />
                  <span className="text-sm font-medium text-slate-700 capitalize">
                    {insight.metric.replace('_', ' ')}
                  </span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {formattedValue}
                </Badge>
              </div>
              <p className="text-xs text-slate-600 mb-3">{insight.description}</p>
              <div className="space-y-1">
                <Progress value={progressValue} className="h-1.5" />
                <div className="flex justify-between items-center">
                  <Badge className={`text-xs ${colors.color.replace('text-', 'bg-').replace('600', '100')} ${colors.color}`}>
                    {insight.interpretation}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};