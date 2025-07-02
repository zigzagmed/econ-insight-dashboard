
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
          <span>{dependentVariable} = </span>
          <Tooltip>
            <TooltipTrigger className="hover:bg-blue-200 px-1 rounded">
              {intercept_val}
            </TooltipTrigger>
            <TooltipContent>
              <p>Intercept: {intercept_val}</p>
              <p className="text-xs">The expected value of {dependentVariable} when all predictors equal zero</p>
            </TooltipContent>
          </Tooltip>
          {coefficients.map((c, index) => (
            <span key={index}>
              <span> {c.coefficient >= 0 ? '+' : ''}</span>
              <Tooltip>
                <TooltipTrigger className="hover:bg-blue-200 px-1 rounded">
                  {formatNumber(c.coefficient, 3)}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Coefficient for {c.variable}: {formatNumber(c.coefficient, 3)}</p>
                  <p className="text-xs">
                    Each unit increase in {c.variable} {c.coefficient > 0 ? 'increases' : 'decreases'} {dependentVariable} by {Math.abs(c.coefficient).toFixed(3)} units
                  </p>
                </TooltipContent>
              </Tooltip>
              <span>×</span>
              <Tooltip>
                <TooltipTrigger className="hover:bg-blue-200 px-1 rounded">
                  {c.variable}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Independent variable: {c.variable}</p>
                  <p className="text-xs">
                    {c.significance ? `Statistically significant (${c.significance})` : 'Not statistically significant'}
                  </p>
                </TooltipContent>
              </Tooltip>
            </span>
          ))}
          <span> + </span>
          <Tooltip>
            <TooltipTrigger className="hover:bg-blue-200 px-1 rounded">
              ε
            </TooltipTrigger>
            <TooltipContent>
              <p>Error term (ε)</p>
              <p className="text-xs">Represents unexplained variation and random errors</p>
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
    </div>
  );
};

export default ModelInterpretation;
