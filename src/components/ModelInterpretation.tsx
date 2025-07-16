
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Coefficient {
  variable: string;
  coefficient: number;
  significance: string;
}

interface Intercept {
  coefficient: number;
  significance: string;
}

interface ModelInterpretationProps {
  rSquared: number;
  adjustedRSquared: number;
  pValueF: number;
  dependentVariable: string;
  coefficients: Coefficient[];
  intercept: Intercept;
}

const ModelInterpretation: React.FC<ModelInterpretationProps> = ({
  rSquared,
  adjustedRSquared,
  pValueF,
  dependentVariable,
  coefficients,
  intercept
}) => {
  const formatNumber = (num: number, decimals: number = 3) => {
    return num.toFixed(decimals);
  };

  // Generate regression equation with hover tooltips
  const generateEquationWithTooltips = () => {
    const intercept_val = formatNumber(intercept.coefficient, 3);
    
    return (
      <TooltipProvider>
        <div className="text-lg font-mono font-semibold text-blue-800 mb-2">
          <Tooltip>
            <TooltipTrigger className="hover:bg-blue-100 px-1 rounded transition-colors">
              {dependentVariable}
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <div className="space-y-1">
                <p className="font-medium">Dependent Variable: {dependentVariable}</p>
                <p className="text-sm text-muted-foreground">
                  The outcome variable being predicted by the model
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
          <span> = </span>
          <Tooltip>
            <TooltipTrigger className="hover:bg-blue-100 px-1 rounded transition-colors">
              {intercept_val}
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <div className="space-y-1">
                <p className="font-medium">Intercept: {intercept_val}</p>
                <p className="text-sm text-muted-foreground">
                  The expected value of {dependentVariable} when all predictors equal zero
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
          {coefficients.map((c, index) => (
            <span key={index}>
              <span> {c.coefficient >= 0 ? '+' : ''}</span>
              <Tooltip>
                <TooltipTrigger className="hover:bg-blue-100 px-1 rounded transition-colors">
                  {formatNumber(c.coefficient, 3)}
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <div className="space-y-1">
                    <p className="font-medium">Coefficient: {formatNumber(c.coefficient, 3)}</p>
                    <p className="text-sm text-muted-foreground">
                      Each unit increase in {c.variable} {c.coefficient > 0 ? 'increases' : 'decreases'} {dependentVariable} by {Math.abs(c.coefficient).toFixed(3)} units
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
              <span>×</span>
              <Tooltip>
                <TooltipTrigger className="hover:bg-blue-100 px-1 rounded transition-colors">
                  {c.variable}
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <div className="space-y-1">
                    <p className="font-medium">Variable: {c.variable}</p>
                    <p className="text-sm text-muted-foreground">
                      {c.significance ? `Statistically significant (${c.significance})` : 'Not statistically significant'}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </span>
          ))}
          <span> + </span>
          <Tooltip>
            <TooltipTrigger className="hover:bg-blue-100 px-1 rounded transition-colors">
              ε
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <div className="space-y-1">
                <p className="font-medium">Error Term (ε)</p>
                <p className="text-sm text-muted-foreground">
                  Represents unexplained variation and random errors
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    );
  };

  return (
    <div className="space-y-4">
      {/* Regression Equation */}
      <Card>
        <CardHeader>
          <CardTitle>
            <span>Regression Equation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-center">
              {generateEquationWithTooltips()}
            </div>
          </div>
          <div className="mt-4 text-sm text-slate-600">
            <p><strong>Interpretation:</strong> This equation shows how each unit change in the independent variables affects {dependentVariable}.</p>
          </div>
        </CardContent>
      </Card>

      {/* Coefficient Interpretations */}
      <Card>
        <CardHeader>
          <CardTitle>Coefficient Interpretations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {coefficients.map(c => (
              <div key={c.variable} className="border-l-4 border-slate-300 pl-4">
                <h4 className="font-semibold text-slate-800">
                  {c.variable}: {formatNumber(c.coefficient, 3)}
                  {c.significance && (
                    <span className="text-green-600 ml-1">({c.significance})</span>
                  )}
                </h4>
                <p className="text-slate-600 text-sm">
                  For each one-unit increase in {c.variable}, {dependentVariable} {c.coefficient > 0 ? 'increases' : 'decreases'} by approximately {Math.abs(c.coefficient).toFixed(3)} units, holding all other variables constant.
                  {!c.significance && (
                    <span className="text-orange-600 ml-1">(Not statistically significant)</span>
                  )}
                </p>
              </div>
            ))}
            
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-slate-800">Intercept: {formatNumber(intercept.coefficient, 3)}</h4>
              <p className="text-slate-600 text-sm">
                The expected value of {dependentVariable} when all independent variables equal zero.
                {intercept.significance && ` (${intercept.significance})`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* R² and Model Fit */}
      <Card>
        <CardHeader>
          <CardTitle>R² and Overall Model Fit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-800 mb-2">R-squared: {formatNumber(rSquared, 3)}</h4>
                <p className="text-slate-600 text-sm">
                  {(rSquared * 100).toFixed(1)}% of the variation in {dependentVariable} is explained by the model. 
                  {rSquared >= 0.7 ? ' This indicates a strong fit.' : 
                   rSquared >= 0.5 ? ' This indicates a moderate fit.' : 
                   ' This indicates a weak fit.'}
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-800 mb-2">Adjusted R-squared: {formatNumber(adjustedRSquared, 3)}</h4>
                <p className="text-slate-600 text-sm">
                  Accounts for the number of predictors. The difference of {Math.abs(rSquared - adjustedRSquared).toFixed(3)} suggests 
                  {Math.abs(rSquared - adjustedRSquared) < 0.02 ? ' minimal overfitting.' : ' some potential overfitting.'}
                </p>
              </div>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-2">Overall Model Significance</h4>
              <p className="text-slate-600 text-sm">
                F-statistic p-value: {pValueF < 0.001 ? '< 0.001' : formatNumber(pValueF, 3)}
                {pValueF < 0.05 ? 
                  ' — The model is statistically significant, meaning the predictors collectively explain a significant portion of the variance.' : 
                  ' — The model is not statistically significant at the 5% level.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelInterpretation;
