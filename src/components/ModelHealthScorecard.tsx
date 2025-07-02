
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, XCircle, TrendingUp, Target, BarChart3 } from 'lucide-react';

interface ModelHealthScorecardProps {
  rSquared: number;
  adjustedRSquared: number;
  pValueF: number;
  significantVars: number;
  totalVars: number;
}

export const ModelHealthScorecard: React.FC<ModelHealthScorecardProps> = ({
  rSquared,
  adjustedRSquared,
  pValueF,
  significantVars,
  totalVars
}) => {
  const getModelFitRating = (r2: number) => {
    if (r2 > 0.7) return { rating: 5, label: 'Excellent', color: 'bg-green-500' };
    if (r2 > 0.5) return { rating: 4, label: 'Good', color: 'bg-blue-500' };
    if (r2 > 0.3) return { rating: 3, label: 'Moderate', color: 'bg-yellow-500' };
    return { rating: 2, label: 'Weak', color: 'bg-red-500' };
  };

  const getSignificanceStatus = (sigVars: number, total: number) => {
    const ratio = sigVars / total;
    if (ratio > 0.7) return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' };
    if (ratio > 0.4) return { icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' };
  };

  const modelFit = getModelFitRating(rSquared);
  const significance = getSignificanceStatus(significantVars, totalVars);
  const SignificanceIcon = significance.icon;

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center space-x-2">
          <BarChart3 size={20} className="text-blue-600" />
          <span>Model Health Scorecard</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Model Fit */}
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Model Fit</span>
              <Badge variant="secondary" className={`${modelFit.color} text-white`}>
                {modelFit.label}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>R²</span>
                <span className="font-mono">{rSquared.toFixed(3)}</span>
              </div>
              <Progress value={rSquared * 100} className="h-2" />
              <div className="flex justify-between text-xs text-slate-500">
                <span>Adj. R²: {adjustedRSquared.toFixed(3)}</span>
                <span>{(rSquared * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Variable Significance */}
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Variables</span>
              <div className={`p-1 rounded-full ${significance.bg}`}>
                <SignificanceIcon size={16} className={significance.color} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Significant</span>
                <span className="font-mono">{significantVars}/{totalVars}</span>
              </div>
              <Progress value={(significantVars / totalVars) * 100} className="h-2" />
              <div className="text-xs text-slate-500">
                {((significantVars / totalVars) * 100).toFixed(0)}% significant at p < 0.05
              </div>
            </div>
          </div>

          {/* Model Validity */}
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Model Validity</span>
              <div className={`p-1 rounded-full ${pValueF < 0.05 ? 'bg-green-100' : 'bg-red-100'}`}>
                {pValueF < 0.05 ? (
                  <CheckCircle size={16} className="text-green-600" />
                ) : (
                  <XCircle size={16} className="text-red-600" />
                )}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>F-test p-value</span>
                <span className="font-mono">{pValueF.toFixed(3)}</span>
              </div>
              <div className={`text-xs px-2 py-1 rounded ${pValueF < 0.05 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {pValueF < 0.05 ? 'Statistically Significant' : 'Not Significant'}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
