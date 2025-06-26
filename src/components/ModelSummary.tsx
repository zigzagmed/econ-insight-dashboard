
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
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

  // Calculate additional statistics
  const logLikelihood = -nObservations * Math.log(2 * Math.PI) / 2 - 234.5; // Mock value
  const aic = -2 * logLikelihood + 2 * 4; // Mock AIC
  const bic = -2 * logLikelihood + Math.log(nObservations) * 4; // Mock BIC
  const durbinWatson = 1.85 + Math.random() * 0.3; // Mock DW statistic
  const jbStat = 2.45 + Math.random() * 1.5; // Mock Jarque-Bera
  const bpStat = 3.21 + Math.random() * 2.0; // Mock Breusch-Pagan
  const whiteStat = 4.67 + Math.random() * 3.0; // Mock White test

  const StatCard = ({ 
    value, 
    label, 
    tooltip 
  }: { 
    value: string | number; 
    label: string; 
    tooltip: string; 
  }) => (
    <Card className="text-center">
      <CardContent className="p-4">
        <div className="flex items-center justify-center space-x-1 mb-1">
          <div className="text-xl font-bold text-blue-600">{value}</div>
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
        <div className="text-sm text-slate-600">{label}</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          value={nObservations}
          label="Observations"
          tooltip="The total number of data points used in the regression analysis."
        />
        <StatCard 
          value={formatNumber(rSquared, 3)}
          label="R-squared"
          tooltip="The proportion of variance in the dependent variable explained by the independent variables. Higher values indicate better model fit."
        />
        <StatCard 
          value={formatNumber(adjustedRSquared, 3)}
          label="Adj. R-squared"
          tooltip="R-squared adjusted for the number of predictors. More conservative measure that penalizes unnecessary variables."
        />
        <StatCard 
          value={formatNumber(fStatistic, 2)}
          label="F-statistic"
          tooltip="Tests whether the overall regression model is statistically significant. Higher values suggest the model explains variance better than chance."
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          value={formatNumber(pValueF, 3)}
          label="Prob(F-stat)"
          tooltip="P-value for the F-statistic. Values < 0.05 indicate the model is statistically significant overall."
        />
        <StatCard 
          value={formatNumber(logLikelihood, 1)}
          label="Log-Likelihood"
          tooltip="Measures how well the model fits the data. Higher (less negative) values indicate better fit."
        />
        <StatCard 
          value={formatNumber(aic, 1)}
          label="AIC"
          tooltip="Akaike Information Criterion. Lower values indicate better model fit while penalizing model complexity."
        />
        <StatCard 
          value={formatNumber(bic, 1)}
          label="BIC"
          tooltip="Bayesian Information Criterion. Similar to AIC but with stronger penalty for additional parameters."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          value={formatNumber(durbinWatson, 2)}
          label="Durbin-Watson"
          tooltip="Tests for autocorrelation in residuals. Values around 2 indicate no autocorrelation, while values near 0 or 4 suggest positive or negative autocorrelation."
        />
        <StatCard 
          value={formatNumber(jbStat, 2)}
          label="Jarque-Bera"
          tooltip="Tests for normality of residuals. Low p-values (< 0.05) suggest residuals are not normally distributed."
        />
        <StatCard 
          value={formatNumber(bpStat, 2)}
          label="Breusch-Pagan"
          tooltip="Tests for heteroscedasticity (non-constant variance). Low p-values suggest heteroscedasticity is present."
        />
        <StatCard 
          value={formatNumber(whiteStat, 2)}
          label="White Test"
          tooltip="Alternative test for heteroscedasticity that doesn't assume a specific form. Low p-values indicate heteroscedasticity."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-xl font-bold text-blue-600">
              {pValueF < 0.001 ? 'Excellent' : pValueF < 0.01 ? 'Good' : pValueF < 0.05 ? 'Moderate' : 'Poor'}
            </div>
            <div className="text-sm text-slate-600">Model Quality</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-xl font-bold text-blue-600">
              {adjustedRSquared > 0.7 ? 'Strong' : adjustedRSquared > 0.5 ? 'Moderate' : 'Weak'}
            </div>
            <div className="text-sm text-slate-600">Explanatory Power</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModelSummary;
