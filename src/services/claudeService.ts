// Claude AI service for regression analysis insights
interface ClaudeInsightsRequest {
  rSquared: number;
  adjustedRSquared: number;
  pValueF: number;
  significantVars: number;
  totalVars: number;
  dependentVariable: string;
  sampleSize?: number;
}

interface ClaudeInsightsResponse {
  modelSummary: {
    paragraph1: string;
    paragraph2: string;
  };
  variableImportance: {
    paragraph1: string;
    paragraph2: string;
  };
  practicalUse: {
    paragraph1: string;
    paragraph2: string;
  };
}

export class ClaudeService {
  private static createPrompt(data: ClaudeInsightsRequest): string {
    return `Analyze regression output. Write 3 sections, 2 brief paragraphs each:

Model Stats:
- R²: ${data.rSquared}
- Adj R²: ${data.adjustedRSquared}  
- F-test p: ${data.pValueF}
- Significant vars: ${data.significantVars}/${data.totalVars}
- DV: ${data.dependentVariable}

1. Model Summary
P1: Fit & key effects
P2: Significance & precision

2. Variable Importance
P1: Effect sizes & rankings
P2: R² contributions

3. Practical Use
P1: Real-world meaning
P2: Implementation guide

Rules: Clear, specific numbers, practical focus.

Required JSON structure:
{
  "modelSummary": {"paragraph1": "text", "paragraph2": "text"},
  "variableImportance": {"paragraph1": "text", "paragraph2": "text"}, 
  "practicalUse": {"paragraph1": "text", "paragraph2": "text"}
}`;
  }

  public static async generateInsights(data: ClaudeInsightsRequest): Promise<ClaudeInsightsResponse> {
    const prompt = this.createPrompt(data);
    
    // For now, return optimized mock data
    // TODO: Replace with actual Claude API call
    return this.generateOptimizedMockData(data);
  }

  private static generateOptimizedMockData(data: ClaudeInsightsRequest): ClaudeInsightsResponse {
    const rSquaredPercent = (data.rSquared * 100).toFixed(1);
    const adjRSquaredPercent = (data.adjustedRSquared * 100).toFixed(1);
    const sigVarPercent = ((data.significantVars / data.totalVars) * 100).toFixed(0);

    return {
      modelSummary: {
        paragraph1: `This linear regression model demonstrates ${data.rSquared > 0.7 ? 'strong' : data.rSquared > 0.5 ? 'moderate' : 'weak'} explanatory power with an R² of ${rSquaredPercent}%, meaning it explains ${rSquaredPercent}% of the variance in ${data.dependentVariable}. The adjusted R² of ${adjRSquaredPercent}% accounts for model complexity, ${data.adjustedRSquared < data.rSquared - 0.05 ? 'suggesting some overfitting concerns' : 'indicating appropriate model complexity'}.`,
        paragraph2: `The model achieves statistical significance with an F-test p-value of ${data.pValueF.toFixed(4)} (${data.pValueF < 0.05 ? 'p < 0.05' : 'p ≥ 0.05'}), ${data.pValueF < 0.05 ? 'confirming it performs significantly better than a baseline model' : 'indicating it may not be statistically meaningful'}. With ${data.significantVars} out of ${data.totalVars} variables showing significance (${sigVarPercent}%), ${data.significantVars / data.totalVars > 0.5 ? 'the majority of predictors contribute meaningfully' : 'many predictors may be redundant'}.`
      },
      variableImportance: {
        paragraph1: `Among the ${data.totalVars} predictor variables, ${data.significantVars} emerge as statistically significant contributors to explaining ${data.dependentVariable}. ${data.significantVars > 3 ? 'The substantial number of significant predictors suggests a complex relationship' : data.significantVars === 0 ? 'The lack of significant predictors raises concerns about model validity' : 'The limited number of significant predictors suggests focused key drivers'}.`,
        paragraph2: `The ${data.significantVars} significant variables collectively account for the model's ${rSquaredPercent}% explanatory power. ${data.rSquared > 0.6 ? 'This indicates strong predictive relationships' : data.rSquared > 0.3 ? 'This suggests moderate but meaningful associations' : 'This reflects weak predictive capability'}. ${data.totalVars - data.significantVars > 0 ? `The remaining ${data.totalVars - data.significantVars} non-significant variables contribute minimally and could potentially be removed.` : 'All variables contribute significantly to the model.'}`
      },
      practicalUse: {
        paragraph1: `In practice, this model ${data.rSquared > 0.6 ? 'provides reliable predictions' : data.rSquared > 0.3 ? 'offers moderate predictive capability' : 'has limited predictive utility'} for ${data.dependentVariable}. ${data.pValueF < 0.05 ? 'The statistical significance ensures the relationships are not due to chance' : 'The lack of statistical significance limits confidence in the results'}. ${data.significantVars > 2 ? 'Focus on the significant predictors for practical applications' : 'Consider model refinement given limited significant predictors'}.`,
        paragraph2: `For implementation, ${data.rSquared > 0.5 ? 'use this model for forecasting and decision-making with reasonable confidence' : 'exercise caution when using this model for predictions'}. ${data.significantVars / data.totalVars > 0.5 ? 'The high proportion of significant variables suggests robust relationships' : 'Consider collecting additional data or exploring alternative modeling approaches'}. Regular model validation and monitoring are recommended${data.rSquared < 0.5 ? ', especially given the limited explanatory power' : ' to maintain predictive accuracy'}.`
      }
    };
  }

  // Method to integrate with actual Claude API
  public static async callClaudeAPI(prompt: string, apiKey: string): Promise<ClaudeInsightsResponse> {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }]
        })
      });

      const data = await response.json();
      return JSON.parse(data.content[0].text) as ClaudeInsightsResponse;
    } catch (error) {
      console.error('Claude API error:', error);
      throw new Error('Failed to generate AI insights');
    }
  }
}

export type { ClaudeInsightsRequest, ClaudeInsightsResponse };