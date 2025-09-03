
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ModelStatsSectionProps {
  data: any;
  config: any;
}

export const ModelStatsSection: React.FC<ModelStatsSectionProps> = React.memo(({ data, config }) => {
  if (!config.includeModelStats) return null;

  const formatNumber = (value: number, decimals: number = 3) => {
    if (value === null || value === undefined) return 'N/A';
    return value.toFixed(decimals);
  };

  return (
    <div className="mb-6 p-4 bg-slate-50 rounded-lg">
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-slate-600">Model:</span>
          <Badge variant="secondary">{data.modelType?.charAt(0).toUpperCase() + data.modelType?.slice(1) || 'Linear'}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-600">R²:</span>
          <Badge variant="secondary">{formatNumber(data.rSquared, 3)}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-600">Adj. R²:</span>
          <Badge variant="secondary">{formatNumber(data.adjustedRSquared, 3)}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-600">F-statistic:</span>
          <Badge variant="secondary">{formatNumber(data.fStatistic, 2)}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-600">Observations:</span>
          <Badge variant="secondary">{data.nObservations}</Badge>
        </div>
      </div>
    </div>
  );
});

ModelStatsSection.displayName = 'ModelStatsSection';
