
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';
import { ModelConfig } from './Dashboard';

interface RegressionResultsProps {
  modelConfig: ModelConfig;
}

// Mock regression results - in real implementation, this would come from your econometrics software
const generateMockResults = (config: ModelConfig) => {
  const results = {
    modelType: config.type,
    dependentVariable: config.dependentVariable,
    nObservations: 1000,
    rSquared: 0.742,
    adjustedRSquared: 0.738,
    fStatistic: 87.3,
    pValueF: 0.000,
    coefficients: config.independentVariables.map((variable, index) => ({
      variable,
      coefficient: (Math.random() - 0.5) * 10,
      standardError: Math.random() * 2,
      tStatistic: (Math.random() - 0.5) * 6,
      pValue: Math.random(),
      significance: Math.random() < 0.3 ? '***' : Math.random() < 0.5 ? '**' : Math.random() < 0.7 ? '*' : '',
    })),
    intercept: {
      coefficient: Math.random() * 20 - 10,
      standardError: Math.random() * 3,
      tStatistic: (Math.random() - 0.5) * 4,
      pValue: Math.random(),
      significance: Math.random() < 0.5 ? '**' : '*',
    }
  };
  
  return results;
};

const RegressionResults: React.FC<RegressionResultsProps> = ({ modelConfig }) => {
  const results = generateMockResults(modelConfig);

  const getSignificanceColor = (significance: string) => {
    if (significance === '***') return 'bg-green-100 text-green-800';
    if (significance === '**') return 'bg-yellow-100 text-yellow-800';
    if (significance === '*') return 'bg-orange-100 text-orange-800';
    return 'bg-gray-100 text-gray-600';
  };

  const formatNumber = (num: number, decimals: number = 3) => {
    return num.toFixed(decimals);
  };

  const getInterpretation = () => {
    const significantVars = results.coefficients.filter(c => c.significance !== '').length;
    const modelFit = results.rSquared > 0.7 ? 'excellent' : results.rSquared > 0.5 ? 'good' : 'moderate';
    
    return {
      overallFit: `The model shows ${modelFit} fit with an R² of ${formatNumber(results.rSquared, 2)}, explaining ${formatNumber(results.rSquared * 100, 1)}% of the variance in ${results.dependentVariable}.`,
      significance: `${significantVars} out of ${results.coefficients.length} independent variables are statistically significant.`,
      modelValid: results.pValueF < 0.05
    };
  };

  const interpretation = getInterpretation();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Regression Results</h2>
        <p className="text-slate-600">
          {modelConfig.type.charAt(0).toUpperCase() + modelConfig.type.slice(1)} regression of {modelConfig.dependentVariable}
        </p>
      </div>

      {/* Model Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{results.nObservations}</div>
            <div className="text-sm text-slate-600">Observations</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{formatNumber(results.rSquared, 3)}</div>
            <div className="text-sm text-slate-600">R-squared</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{formatNumber(results.fStatistic, 2)}</div>
            <div className="text-sm text-slate-600">F-statistic</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{formatNumber(results.pValueF, 3)}</div>
            <div className="text-sm text-slate-600">Prob(F-stat)</div>
          </CardContent>
        </Card>
      </div>

      {/* Regression Table */}
      <Card>
        <CardHeader>
          <CardTitle>Regression Coefficients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left p-3 font-semibold">Variable</th>
                  <th className="text-right p-3 font-semibold">Coefficient</th>
                  <th className="text-right p-3 font-semibold">Std. Error</th>
                  <th className="text-right p-3 font-semibold">t-statistic</th>
                  <th className="text-right p-3 font-semibold">P-value</th>
                  <th className="text-center p-3 font-semibold">Significance</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-3 font-medium">Intercept</td>
                  <td className="text-right p-3 font-mono">{formatNumber(results.intercept.coefficient)}</td>
                  <td className="text-right p-3 font-mono">{formatNumber(results.intercept.standardError)}</td>
                  <td className="text-right p-3 font-mono">{formatNumber(results.intercept.tStatistic)}</td>
                  <td className="text-right p-3 font-mono">{formatNumber(results.intercept.pValue)}</td>
                  <td className="text-center p-3">
                    {results.intercept.significance && (
                      <Badge className={getSignificanceColor(results.intercept.significance)}>
                        {results.intercept.significance}
                      </Badge>
                    )}
                  </td>
                </tr>
                {results.coefficients.map((coef, index) => (
                  <tr key={coef.variable} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-3 font-medium">{coef.variable}</td>
                    <td className="text-right p-3 font-mono flex items-center justify-end space-x-1">
                      {coef.coefficient > 0 ? (
                        <TrendingUp size={14} className="text-green-600" />
                      ) : (
                        <TrendingDown size={14} className="text-red-600" />
                      )}
                      <span>{formatNumber(coef.coefficient)}</span>
                    </td>
                    <td className="text-right p-3 font-mono">{formatNumber(coef.standardError)}</td>
                    <td className="text-right p-3 font-mono">{formatNumber(coef.tStatistic)}</td>
                    <td className="text-right p-3 font-mono">{formatNumber(coef.pValue)}</td>
                    <td className="text-center p-3">
                      {coef.significance && (
                        <Badge className={getSignificanceColor(coef.significance)}>
                          {coef.significance}
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-xs text-slate-500">
            Significance codes: *** p&lt;0.001, ** p&lt;0.01, * p&lt;0.05
          </div>
        </CardContent>
      </Card>

      {/* Interpretation */}
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
              {results.coefficients
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
    </div>
  );
};

export default RegressionResults;
