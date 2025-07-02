
import React from 'react';

interface SignificanceLegendProps {
  config: any;
}

export const SignificanceLegend: React.FC<SignificanceLegendProps> = React.memo(({ config }) => {
  if (!config.showSignificance) return null;

  return (
    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
      <div className="text-sm text-slate-600">
        <div className="font-medium mb-2">Significance levels:</div>
        <div className="flex items-center gap-6">
          <span>*** p &lt; 0.001</span>
          <span>** p &lt; 0.01</span>
          <span>* p &lt; 0.05</span>
        </div>
      </div>
    </div>
  );
});

SignificanceLegend.displayName = 'SignificanceLegend';
