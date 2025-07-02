
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

  // Generate regression equation
  const generateEquation = () => {
    const intercept_val = formatNumber(intercept.coefficient, 3);
    const terms = coefficients.map(c => 
      `${c.coefficient >= 0 ? '+' : ''}${formatNumber(c.coefficient, 3)}×${c.variable}`
    ).join(' ');
    
    return `${dependentVariable} = ${intercept_val} ${terms} + ε`;
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
              <div className="text-lg font-mono font-semibold text-blue-800 mb-2">
                {generateEquation()}
              </div>
              <div className="text-sm text-blue-600">
                Where ε represents the error term (residuals)
              </div>
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
