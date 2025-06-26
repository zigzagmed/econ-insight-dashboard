
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface Coefficient {
  variable: string;
  coefficient: number;
  significance: string;
}

interface ModelInterpretationProps {
  rSquared: number;
  pValueF: number;
  dependentVariable: string;
  coefficients: Coefficient[];
}

const ModelInterpretation: React.FC<ModelInterpretationProps> = ({
  rSquared,
  pValueF,
  dependentVariable,
  coefficients
}) => {
  const formatNumber = (num: number, decimals: number = 3) => {
    return num.toFixed(decimals);
  };

  const getInterpretation = () => {
    const significantVars = coefficients.filter(c => c.significance !== '').length;
    const modelFit = rSquared > 0.7 ? 'excellent' : rSquared > 0.5 ? 'good' : 'moderate';
    
    return {
      overallFit: `The model shows ${modelFit} fit with an R² of ${formatNumber(rSquared, 2)}, explaining ${formatNumber(rSquared * 100, 1)}% of the variance in ${dependentVariable}.`,
      significance: `${significantVars} out of ${coefficients.length} independent variables are statistically significant.`,
      modelValid: pValueF < 0.05
    };
  };

  const interpretation = getInterpretation();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertCircle size={20} className="text-blue-600" />
          <span>Model Interpretation</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-3">
          <CheckCircle size={16} className="text-green-600 mt-1" />
          <div>
            <h4 className="font-semibold text-slate-800">Overall Model Fit</h4>
            <p className="text-slate-600">{interpretation.overallFit}</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <CheckCircle size={16} className="text-green-600 mt-1" />
          <div>
            <h4 className="font-semibold text-slate-800">Variable Significance</h4>
            <p className="text-slate-600">{interpretation.significance}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          {interpretation.modelValid ? (
            <CheckCircle size={16} className="text-green-600 mt-1" />
          ) : (
            <AlertCircle size={16} className="text-red-600 mt-1" />
          )}
          <div>
            <h4 className="font-semibold text-slate-800">Model Validity</h4>
            <p className="text-slate-600">
              {interpretation.modelValid 
                ? 'The F-statistic indicates the model is statistically significant overall.'
                : 'The F-statistic suggests the model may not be statistically significant overall.'
              }
            </p>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Key Findings</h4>
          <ul className="space-y-1 text-blue-700">
            {coefficients
              .filter(c => c.significance !== '')
              .map(c => (
                <li key={c.variable}>
                  • {c.variable}: {c.coefficient > 0 ? 'Positive' : 'Negative'} relationship 
                  (β = {formatNumber(c.coefficient)}, {c.significance})
                </li>
              ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelInterpretation;
