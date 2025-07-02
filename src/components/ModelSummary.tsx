
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ModelSummaryProps {
  nObservations: number;
  rSquared: number;
  adjustedRSquared: number;
  fStatistic: number;
  pValueF: number;
}

const ModelSummary: React.FC<ModelSummaryProps> = ({ 
  nObservations, 
  rSquared,
  adjustedRSquared, 
  fStatistic, 
  pValueF 
}) => {
  const formatNumber = (num: number, decimals: number = 3) => {
    return num.toFixed(decimals);
  };

  const StatCard = ({ 
    value, 
    label,
    isLarge = false
  }: { 
    value: string | number; 
    label: string; 
    isLarge?: boolean;
  }) => (
    <Card className="text-center">
      <CardContent className="p-6">
        <div className={`font-bold text-blue-600 mb-2 ${isLarge ? 'text-2xl' : 'text-xl'}`}>
          {value}
        </div>
        <div className="text-sm text-slate-600 font-medium">{label}</div>
      </CardContent>
    </Card>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard 
            value={nObservations}
            label="Observations"
          />
          <StatCard 
            value={formatNumber(rSquared, 3)}
            label="R-squared"
            isLarge
          />
          <StatCard 
            value={formatNumber(adjustedRSquared, 3)}
            label="Adj. R-squared"
            isLarge
          />
          <StatCard 
            value={formatNumber(fStatistic, 2)}
            label="F-statistic"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelSummary;
