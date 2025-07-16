import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Zap, Info } from 'lucide-react';

interface RecommendationData {
  priority: 'high' | 'medium' | 'low';
  action: string;
  reason: string;
}

interface OptimizedActionCardsProps {
  recommendations: RecommendationData[];
}

export const OptimizedActionCards: React.FC<OptimizedActionCardsProps> = ({ recommendations }) => {
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          icon: AlertTriangle,
          color: 'text-red-600',
          bg: 'bg-red-50',
          border: 'border-red-200',
          badgeClass: 'bg-red-100 text-red-700'
        };
      case 'medium':
        return {
          icon: Zap,
          color: 'text-yellow-600',
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          badgeClass: 'bg-yellow-100 text-yellow-700'
        };
      case 'low':
        return {
          icon: Info,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          badgeClass: 'bg-blue-100 text-blue-700'
        };
      default:
        return {
          icon: Info,
          color: 'text-gray-600',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          badgeClass: 'bg-gray-100 text-gray-700'
        };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {recommendations.map((rec, index) => {
        const config = getPriorityConfig(rec.priority);
        const IconComponent = config.icon;
        
        return (
          <Card key={index} className={`${config.bg} ${config.border} border-l-4`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <IconComponent size={16} className={config.color} />
                  <span className="text-sm font-medium text-slate-800 capitalize">
                    {rec.priority} Priority
                  </span>
                </div>
                <Badge className={`text-xs ${config.badgeClass}`}>
                  Action {index + 1}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <h5 className="text-sm font-semibold text-slate-800">{rec.action}</h5>
                <p className="text-xs text-slate-600">{rec.reason}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};