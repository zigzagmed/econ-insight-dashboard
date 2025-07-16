import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Target, AlertCircle } from 'lucide-react';

interface TechnicalNote {
  category: string;
  finding: string;
  implication: string;
}

interface OptimizedTechnicalNotesProps {
  notes: TechnicalNote[];
}

export const OptimizedTechnicalNotes: React.FC<OptimizedTechnicalNotesProps> = ({ notes }) => {
  const getCategoryIcon = (category: string) => {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('fit')) return BarChart3;
    if (lowerCategory.includes('power') || lowerCategory.includes('statistical')) return Target;
    return AlertCircle;
  };

  const getCategoryColor = (category: string) => {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('fit')) return 'text-blue-600';
    if (lowerCategory.includes('power') || lowerCategory.includes('statistical')) return 'text-green-600';
    return 'text-purple-600';
  };

  return (
    <div className="space-y-3">
      {notes.map((note, index) => {
        const IconComponent = getCategoryIcon(note.category);
        const iconColor = getCategoryColor(note.category);
        
        return (
          <Card key={index} className="bg-white border border-blue-100">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  <IconComponent size={16} className={iconColor} />
                </div>
                <div className="flex-grow space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {note.category}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-800">{note.finding}</p>
                    <p className="text-xs text-slate-600">{note.implication}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};