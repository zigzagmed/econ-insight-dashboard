
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Coefficient {
  variable: string;
  coefficient: number;
  standardError: number;
  tStatistic: number;
  pValue: number;
  significance: string;
}

interface Intercept {
  coefficient: number;
  standardError: number;
  tStatistic: number;
  pValue: number;
  significance: string;
}

interface RegressionTableProps {
  coefficients: Coefficient[];
  intercept: Intercept;
}

const RegressionTable: React.FC<RegressionTableProps> = ({ coefficients, intercept }) => {
  const getSignificanceColor = (significance: string) => {
    if (significance === '***') return 'bg-green-100 text-green-800';
    if (significance === '**') return 'bg-yellow-100 text-yellow-800';
    if (significance === '*') return 'bg-orange-100 text-orange-800';
    return 'bg-gray-100 text-gray-600';
  };

  const formatNumber = (num: number, decimals: number = 3) => {
    return num.toFixed(decimals);
  };

  return (
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
                <td className="text-right p-3 font-mono flex items-center justify-end space-x-1">
                  {intercept.coefficient > 0 ? (
                    <TrendingUp size={14} className="text-green-600" />
                  ) : (
                    <TrendingDown size={14} className="text-red-600" />
                  )}
                  <span>{formatNumber(intercept.coefficient)}</span>
                </td>
                <td className="text-right p-3 font-mono">{formatNumber(intercept.standardError)}</td>
                <td className="text-right p-3 font-mono">{formatNumber(intercept.tStatistic)}</td>
                <td className="text-right p-3 font-mono">{formatNumber(intercept.pValue)}</td>
                <td className="text-center p-3">
                  {intercept.significance && (
                    <Badge className={getSignificanceColor(intercept.significance)}>
                      {intercept.significance}
                    </Badge>
                  )}
                </td>
              </tr>
              {coefficients.map((coef) => (
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
  );
};

export default RegressionTable;
