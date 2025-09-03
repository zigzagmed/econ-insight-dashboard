
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Brain, ChevronDown } from 'lucide-react';
import { ModelHealthScorecard } from './ModelHealthScorecard';
import { OptimizedInsightCards } from './OptimizedInsightCards';
import { OptimizedActionCards } from './OptimizedActionCards';
import { OptimizedTechnicalNotes } from './OptimizedTechnicalNotes';
import { ClaudeService } from '@/services/claudeService';
import type { ClaudeInsightsResponse } from '@/services/claudeService';

interface AIInsightsProps {
  results: any;
}

const AIInsights: React.FC<AIInsightsProps> = ({ results }) => {
  const [isAIInsightsOpen, setIsAIInsightsOpen] = useState(false);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [aiInsights, setAiInsights] = useState<ClaudeInsightsResponse | null>(null);

  const significantVars = results.coefficients.filter((c: any) => c.significance !== '').length;

  const handleGenerateInsights = async () => {
    setIsLoadingInsights(true);
    
    try {
      // Prepare data for Claude service
      const requestData = {
        rSquared: results.rSquared,
        adjustedRSquared: results.adjustedRSquared,
        pValueF: results.pValueF,
        significantVars,
        totalVars: results.coefficients.length,
        dependentVariable: results.dependentVariable,
      };

      // Generate insights using Claude service
      const insights = await ClaudeService.generateInsights(requestData);
      setAiInsights(insights);
      setIsAIInsightsOpen(true);
    } catch (error) {
      console.error('Failed to generate insights:', error);
      // Fallback to showing interface without insights
      setIsAIInsightsOpen(true);
    } finally {
      setIsLoadingInsights(false);
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
        </CardContent>
      )}
    </Card>
  );
};

export default AIInsights;
