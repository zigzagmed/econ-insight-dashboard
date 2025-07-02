
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Zap, Shield, TrendingUp } from 'lucide-react';

interface ActionCardsProps {
  recommendations: string[];
}

export const ActionCards: React.FC<ActionCardsProps> = ({ recommendations }) => {
  const actionCategories = [
    {
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      priority: 'High',
      priorityColor: 'bg-red-100 text-red-700'
    },
    {
      icon: Zap,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      priority: 'Medium',
      priorityColor: 'bg-yellow-100 text-yellow-700'
    },
    {
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      priority: 'Medium',
      priorityColor: 'bg-yellow-100 text-yellow-700'
    },
    {
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      priority: 'Low',
      priorityColor: 'bg-gray-100 text-gray-700'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {recommendations.slice(0, 4).map((rec, index) => {
        const category = actionCategories[index] || actionCategories[0];
        const IconComponent = category.icon;
        
        return (
          <Card key={index} className={`${category.bgColor} ${category.borderColor} border-l-4`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <IconComponent size={18} className={category.color} />
                  <span className="text-sm font-medium text-slate-800">Action Item {index + 1}</span>
                </div>
                <Badge className={`text-xs ${category.priorityColor}`}>
                  {category.priority}
                </Badge>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{rec}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
