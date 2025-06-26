
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Brain, ChevronDown, Lightbulb, Target, TrendingUpDown } from 'lucide-react';

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
        "The regression model exhibits strong explanatory power, with an R-squared value of 0.742 suggesting that approximately 74% of the variance in the dependent variable can be attributed to the selected independent variables. This level of explanatory power indicates a robust relationship between the predictors and the outcome variable.",
        
        "Statistical significance analysis reveals that the majority of included variables demonstrate meaningful relationships with the dependent variable. The F-statistic provides strong evidence that the model performs significantly better than a baseline model with no predictors, validating the overall model specification.",
        
        "The adjusted R-squared value of 0.738 remains close to the unadjusted R-squared, indicating that the model does not suffer from overfitting due to excessive variables. This suggests that the selected predictors genuinely contribute to explaining the variance rather than merely capitalizing on random variation in the data.",
        
        "Coefficient magnitudes and their associated standard errors indicate stable parameter estimates. The statistical significance levels observed across different variables provide insights into which factors have the strongest and most reliable effects on the dependent variable, enabling prioritization of policy or business interventions."
      ],
      recommendations: [
        "Consider adding interaction terms between significant variables to capture more complex relationships",
        "Test robustness with alternative model specifications",
        "Examine residual plots to verify model assumptions",
        "Consider time series analysis if data has temporal structure"
      ],
      technicalNotes: {
        modelSpecification: {
          title: "Model Specification Analysis",
          content: "The current model specification appears well-balanced with an appropriate number of predictors relative to the sample size. The ratio of observations to parameters suggests adequate degrees of freedom for reliable statistical inference. The inclusion of multiple independent variables allows for controlling confounding effects while examining individual variable impacts."
        },
        statisticalAssumptions: {
          title: "Statistical Assumptions Assessment",
          content: "Key regression assumptions should be verified through diagnostic testing. The model assumes linear relationships between predictors and the dependent variable, independence of observations, homoscedasticity (constant variance of residuals), and normality of residuals. Violation of these assumptions could affect the reliability of coefficient estimates and statistical tests."
        },
        coefficientReliability: {
          title: "Coefficient Reliability and Interpretation",
          content: "Standard errors relative to coefficient magnitudes indicate the precision of parameter estimates. Smaller standard errors relative to coefficients suggest more reliable estimates. The t-statistics and associated p-values provide evidence for statistical significance, while confidence intervals would offer additional insight into the range of plausible parameter values."
        },
        modelValidation: {
          title: "Model Validation and Robustness",
          content: "The high F-statistic and low p-value indicate strong overall model significance. However, additional validation through cross-validation, out-of-sample testing, or alternative model specifications would strengthen confidence in the results. Consider examining residual patterns to identify potential model improvements or assumption violations."
        },
        practicalSignificance: {
          title: "Practical vs Statistical Significance",
          content: "While statistical significance indicates reliable effects, practical significance depends on the magnitude of coefficients in the context of the problem domain. Large coefficients may indicate substantial practical impact, while small coefficients might be statistically significant but practically negligible. Economic or business significance should be evaluated alongside statistical measures."
        }
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
              <h4 className="text-base font-semibold text-slate-800">Overall Model Assessment</h4>
              <Badge className="bg-green-100 text-green-800">{aiInsights.overallAssessment.quality}</Badge>
            </div>
            <p className="text-sm text-slate-700">{aiInsights.overallAssessment.summary}</p>
          </div>

          {/* Key Findings */}
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="text-base font-semibold text-slate-800 mb-4 flex items-center space-x-2">
              <Lightbulb size={18} className="text-blue-600" />
              <span>Key Findings</span>
            </h4>
            <div className="space-y-4">
              {aiInsights.keyFindings.map((finding, index) => (
                <div key={index} className="border-l-4 border-blue-300 pl-4">
                  <p className="text-sm text-slate-700 leading-relaxed">{finding}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <Collapsible>
            <CollapsibleTrigger className="w-full">
              <div className="bg-white p-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-semibold text-slate-800 flex items-center space-x-2">
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

          {/* Expanded Technical Analysis */}
          <Collapsible>
            <CollapsibleTrigger className="w-full">
              <div className="bg-white p-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-semibold text-slate-800 flex items-center space-x-2">
                    <Brain size={18} className="text-blue-600" />
                    <span>Technical Analysis</span>
                  </h4>
                  <ChevronDown size={18} className="text-slate-600" />
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="bg-white rounded-lg border border-blue-200 divide-y divide-slate-200">
                {Object.entries(aiInsights.technicalNotes).map(([key, section]) => (
                  <div key={key} className="p-4">
                    <h5 className="text-sm font-semibold text-slate-800 mb-2">{section.title}</h5>
                    <p className="text-sm text-slate-600 leading-relaxed">{section.content}</p>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      )}
    </Card>
  );
};

export default AIInsights;
