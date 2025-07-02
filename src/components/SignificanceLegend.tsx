
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface SignificanceLegendProps {
  config: any;
}

export const SignificanceLegend: React.FC<SignificanceLegendProps> = React.memo(({ config }) => {
  if (!config.showSignificance) return null;

  return (
    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
      <div className="text-sm text-slate-600">
        <div className="font-medium mb-2">Significance levels:</div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline">***</Badge>
            <span>p &lt; 0.001</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">**</Badge>
            <span>p &lt; 0.01</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">*</Badge>
            <span>p &lt; 0.05</span>
          </div>
        </div>
      </div>
    </div>
  );
});

SignificanceLegend.displayName = 'SignificanceLegend';
