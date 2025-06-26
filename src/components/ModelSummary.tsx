
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

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
    tooltip,
    isLarge = false
  }: { 
    value: string | number; 
    label: string; 
    tooltip: string;
    isLarge?: boolean;
  }) => (
    <Card className="text-center">
      <CardContent className="p-6">
        <div className="flex items-center justify-center space-x-1 mb-2">
          <div className={`font-bold text-blue-600 ${isLarge ? 'text-2xl' : 'text-xl'}`}>
            {value}
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle size={14} className="text-slate-400 hover:text-slate-600" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard 
            value={nObservations}
            label="Observations"
            tooltip="The total number of data points used in the regression analysis."
          />
          <StatCard 
            value={formatNumber(rSquared, 3)}
            label="R-squared"
            tooltip="The proportion of variance in the dependent variable explained by the independent variables. Higher values indicate better model fit."
            isLarge
          />
          <StatCard 
            value={formatNumber(adjustedRSquared, 3)}
            label="Adj. R-squared"
            tooltip="R-squared adjusted for the number of predictors. More conservative measure that penalizes unnecessary variables."
            isLarge
          />
          <StatCard 
            value={formatNumber(fStatistic, 2)}
            label="F-statistic"
            tooltip="Tests whether the overall regression model is statistically significant. Higher values suggest the model explains variance better than chance."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard 
            value={formatNumber(pValueF, 3)}
            label="Prob(F-stat)"
            tooltip="P-value for the F-statistic. Values < 0.05 indicate the model is statistically significant overall."
          />
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-xl font-bold text-blue-600 mb-2">
                {pValueF < 0.001 ? 'Excellent' : pValueF < 0.01 ? 'Good' : pValueF < 0.05 ? 'Moderate' : 'Poor'}
              </div>
              <div className="text-sm text-slate-600 font-medium">Model Quality</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-xl font-bold text-blue-600 mb-2">
                {adjustedRSquared > 0.7 ? 'Strong' : adjustedRSquared > 0.5 ? 'Moderate' : 'Weak'}
              </div>
              <div className="text-sm text-slate-600 font-medium">Explanatory Power</div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelSummary;
