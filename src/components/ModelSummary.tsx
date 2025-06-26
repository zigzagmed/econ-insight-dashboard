
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ModelSummaryProps {
  nObservations: number;
  rSquared: number;
  fStatistic: number;
  pValueF: number;
}

const ModelSummary: React.FC<ModelSummaryProps> = ({ 
  nObservations, 
  rSquared, 
  fStatistic, 
  pValueF 
}) => {
  const formatNumber = (num: number, decimals: number = 3) => {
    return num.toFixed(decimals);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="text-center">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-blue-600">{nObservations}</div>
          <div className="text-sm text-slate-600">Observations</div>
        </CardContent>
      </Card>
      <Card className="text-center">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-blue-600">{formatNumber(rSquared, 3)}</div>
          <div className="text-sm text-slate-600">R-squared</div>
        </CardContent>
      </Card>
      <Card className="text-center">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-blue-600">{formatNumber(fStatistic, 2)}</div>
          <div className="text-sm text-slate-600">F-statistic</div>
        </CardContent>
      </Card>
      <Card className="text-center">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-blue-600">{formatNumber(pValueF, 3)}</div>
          <div className="text-sm text-slate-600">Prob(F-stat)</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelSummary;
