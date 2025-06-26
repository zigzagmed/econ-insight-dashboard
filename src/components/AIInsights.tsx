
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Brain, ChevronDown, Lightbulb, Target, TrendingUpDown, CheckCircle, AlertCircle } from 'lucide-react';

interface AIInsightsProps {
  results: any;
}

const AIInsights: React.FC<AIInsightsProps> = ({ results }) => {
  const [isAIInsightsOpen, setIsAIInsightsOpen] = useState(false);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);

  // Mock AI insights generation
  const generateMockAIInsights = (results: any) => {
    return {
      overallAssessment: {
        quality: "Strong",
        summary: "This model demonstrates solid explanatory power with an R² of 0.742, indicating that approximately 74% of the variation in the dependent variable is explained by the included predictors. The F-statistic confirms the model is statistically significant overall."
      },
      keyFindings: [
        {
          type: "strength",
          title: "Strong Predictive Variables",
          content: `${results.coefficients.filter((c: any) => c.significance === '***').length} variables show highly significant relationships (p < 0.001), indicating robust predictive power.`
        },
        {
          type: "insight",
          title: "Economic Interpretation",
          content: "The positive coefficients suggest complementary relationships between key economic indicators, which aligns with economic theory."
        },
        {
          type: "warning",
          title: "Model Limitations",
          content: "While the model shows good fit, consider testing for potential multicollinearity between highly correlated predictors."
        }
      ],
      recommendations: [
        "Consider adding interaction terms between significant variables to capture more complex relationships",
        "Test robustness with alternative model specifications",
        "Examine residual plots to verify model assumptions",
        "Consider time series analysis if data has temporal structure"
      ],
      technicalNotes: {
        goodnessOfFit: "The adjusted R² of 0.738 accounts for model complexity and confirms good explanatory power.",
        significance: "The F-statistic indicates the model is significantly better than a null model with no predictors.",
        coefficients: "Standard errors appear reasonable relative to coefficient magnitudes, suggesting stable estimates."
      }
    };
  };

  const aiInsights = generateMockAIInsights(results);

  const handleGenerateInsights = () => {
    setIsLoadingInsights(true);
    setTimeout(() => {
      setIsLoadingInsights(false);
      setIsAIInsightsOpen(true);
    }, 2000);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'strength': return <CheckCircle size={16} className="text-green-600" />;
      case 'insight': return <Lightbulb size={16} className="text-blue-600" />;
      case 'warning': return <AlertCircle size={16} className="text-orange-600" />;
      default: return <Target size={16} className="text-gray-600" />;
    }
  };

  return (
    <Card className="border-2 border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Brain size={20} className="text-white" />
            </div>
            <div>
              <span className="text-xl">AI-Powered Insights</span>
              <p className="text-sm font-normal text-slate-600 mt-1">
                Advanced interpretation powered by Claude AI
              </p>
            </div>
          </CardTitle>
          {!isAIInsightsOpen && (
            <Button 
              onClick={handleGenerateInsights}
              disabled={isLoadingInsights}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoadingInsights ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain size={16} className="mr-2" />
                  Generate Insights
                </>
              )}
            </Button>
          )}
        </div>
      </CardHeader>
      
      {isAIInsightsOpen && (
        <CardContent className="space-y-6">
          {/* Overall Assessment */}
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUpDown size={18} className="text-blue-600" />
              <h4 className="font-semibold text-slate-800">Overall Model Assessment</h4>
              <Badge className="bg-green-100 text-green-800">{aiInsights.overallAssessment.quality}</Badge>
            </div>
            <p className="text-slate-700">{aiInsights.overallAssessment.summary}</p>
          </div>

          {/* Key Findings */}
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-slate-800 mb-4 flex items-center space-x-2">
              <Lightbulb size={18} className="text-blue-600" />
              <span>Key Findings</span>
            </h4>
            <div className="space-y-3">
              {aiInsights.keyFindings.map((finding, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                  {getInsightIcon(finding.type)}
                  <div>
                    <h5 className="font-medium text-slate-800">{finding.title}</h5>
                    <p className="text-sm text-slate-600 mt-1">{finding.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <Collapsible>
            <CollapsibleTrigger className="w-full">
              <div className="bg-white p-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-slate-800 flex items-center space-x-2">
                    <Target size={18} className="text-blue-600" />
                    <span>AI Recommendations</span>
                  </h4>
                  <ChevronDown size={18} className="text-slate-600" />
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <ul className="space-y-2">
                  {aiInsights.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-slate-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Technical Notes */}
          <Collapsible>
            <CollapsibleTrigger className="w-full">
              <div className="bg-white p-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-slate-800 flex items-center space-x-2">
                    <AlertCircle size={18} className="text-blue-600" />
                    <span>Technical Analysis</span>
                  </h4>
                  <ChevronDown size={18} className="text-slate-600" />
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="bg-white p-4 rounded-lg border border-blue-200 space-y-3">
                <div>
                  <h5 className="font-medium text-slate-800">Goodness of Fit</h5>
                  <p className="text-sm text-slate-600">{aiInsights.technicalNotes.goodnessOfFit}</p>
                </div>
                <div>
                  <h5 className="font-medium text-slate-800">Statistical Significance</h5>
                  <p className="text-sm text-slate-600">{aiInsights.technicalNotes.significance}</p>
                </div>
                <div>
                  <h5 className="font-medium text-slate-800">Coefficient Analysis</h5>
                  <p className="text-sm text-slate-600">{aiInsights.technicalNotes.coefficients}</p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      )}
    </Card>
  );
};

export default AIInsights;
