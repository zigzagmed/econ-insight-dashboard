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
  modelHealth: {
    score: number; // 0-100
    status: 'excellent' | 'good' | 'moderate' | 'poor';
    factors: string[];
  };
  keyInsights: {
    metric: string;
    value: number;
    interpretation: 'excellent' | 'good' | 'moderate' | 'poor';
    description: string;
  }[];
  recommendations: {
    priority: 'high' | 'medium' | 'low';
    action: string;
    reason: string;
  }[];
  technicalNotes: {
    category: string;
    finding: string;
    implication: string;
  }[];
}

export class ClaudeService {
  private static createPrompt(data: ClaudeInsightsRequest): string {
    return `Analyze this regression model. Respond in JSON format only:

Model Stats:
- R²: ${data.rSquared}
- Adj R²: ${data.adjustedRSquared}  
- F-test p: ${data.pValueF}
- Significant vars: ${data.significantVars}/${data.totalVars}
- DV: ${data.dependentVariable}

Required JSON structure:
{
  "modelHealth": {"score": 0-100, "status": "excellent|good|moderate|poor", "factors": ["factor1", "factor2"]},
  "keyInsights": [{"metric": "explanatory_power", "value": 74.2, "interpretation": "good", "description": "brief"}],
  "recommendations": [{"priority": "high", "action": "brief_action", "reason": "brief_reason"}],
  "technicalNotes": [{"category": "fit", "finding": "brief", "implication": "brief"}]
}

Keep all text concise. Max 3 insights, 4 recommendations, 3 technical notes.`;
  }

  public static async generateInsights(data: ClaudeInsightsRequest): Promise<ClaudeInsightsResponse> {
    const prompt = this.createPrompt(data);
    
    // For now, return optimized mock data
    // TODO: Replace with actual Claude API call
    return this.generateOptimizedMockData(data);
  }

  private static generateOptimizedMockData(data: ClaudeInsightsRequest): ClaudeInsightsResponse {
    const healthScore = Math.round(
      (data.rSquared * 40) + 
      ((data.significantVars / data.totalVars) * 30) + 
      ((data.pValueF < 0.05 ? 1 : 0) * 30)
    );

    const status = healthScore >= 80 ? 'excellent' : 
                  healthScore >= 65 ? 'good' : 
                  healthScore >= 50 ? 'moderate' : 'poor';

    return {
      modelHealth: {
        score: healthScore,
        status,
        factors: [
          data.rSquared > 0.7 ? 'strong_r2' : 'moderate_r2',
          data.significantVars > data.totalVars * 0.5 ? 'significant_vars' : 'few_significant_vars',
          data.pValueF < 0.05 ? 'model_significant' : 'model_not_significant'
        ]
      },
      keyInsights: [
        {
          metric: 'explanatory_power',
          value: data.rSquared * 100,
          interpretation: data.rSquared > 0.7 ? 'excellent' : data.rSquared > 0.5 ? 'good' : 'moderate',
          description: `Model explains ${(data.rSquared * 100).toFixed(1)}% of variance`
        },
        {
          metric: 'variable_significance',
          value: (data.significantVars / data.totalVars) * 100,
          interpretation: data.significantVars / data.totalVars > 0.7 ? 'excellent' : 'moderate',
          description: `${data.significantVars} of ${data.totalVars} variables are significant`
        },
        {
          metric: 'model_validity',
          value: data.pValueF,
          interpretation: data.pValueF < 0.05 ? 'excellent' : 'poor',
          description: data.pValueF < 0.05 ? 'Model is statistically valid' : 'Model lacks significance'
        }
      ],
      recommendations: [
        {
          priority: data.rSquared < 0.5 ? 'high' : 'medium',
          action: 'Check residual diagnostics',
          reason: 'Verify model assumptions'
        },
        {
          priority: data.significantVars < data.totalVars * 0.5 ? 'high' : 'low',
          action: 'Review variable selection',
          reason: 'Many variables lack significance'
        },
        {
          priority: 'medium',
          action: 'Test interaction terms',
          reason: 'May capture additional relationships'
        },
        {
          priority: 'low',
          action: 'Cross-validate results',
          reason: 'Ensure model robustness'
        }
      ],
      technicalNotes: [
        {
          category: 'Model Fit',
          finding: `R² = ${data.rSquared.toFixed(3)}`,
          implication: data.rSquared > 0.7 ? 'Strong predictive power' : 'Limited explanatory ability'
        },
        {
          category: 'Statistical Power',
          finding: `F-test p = ${data.pValueF.toFixed(3)}`,
          implication: data.pValueF < 0.05 ? 'Model significantly better than baseline' : 'Model may not be meaningful'
        },
        {
          category: 'Variable Selection',
          finding: `${data.significantVars}/${data.totalVars} significant`,
          implication: data.significantVars < data.totalVars * 0.5 ? 'Consider removing non-significant variables' : 'Good variable selection'
        }
      ]
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