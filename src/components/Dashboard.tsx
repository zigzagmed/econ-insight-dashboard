
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import VariableSelection from './VariableSelection';
import RegressionResults from './RegressionResults';

export interface Variable {
  name: string;
  type: 'continuous' | 'categorical' | 'binary';
  description?: string;
}

export interface ModelConfig {
  type: 'linear' | 'logistic' | 'polynomial';
  dependentVariable: string;
  independentVariables: string[];
}

const Dashboard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [modelConfig, setModelConfig] = useState<ModelConfig>({
    type: 'linear',
    dependentVariable: '',
    independentVariables: []
  });

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
            }`}>
              <span className="font-medium">1</span>
              <span>Variable & Model Selection</span>
            </div>
            <ChevronRight className="text-slate-400" size={20} />
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
            }`}>
              <span className="font-medium">2</span>
              <span>Regression Results</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardContent className="p-8">
            {currentStep === 1 && (
              <VariableSelection 
                modelConfig={modelConfig}
                setModelConfig={setModelConfig}
              />
            )}
            {currentStep === 2 && (
              <RegressionResults modelConfig={modelConfig} />
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {currentStep === 1 && (
            <div></div>
          )}
          
          {currentStep === 1 && (
            <Button
              onClick={handleNext}
              disabled={!modelConfig.dependentVariable || modelConfig.independentVariables.length === 0}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
            >
              <span>Run Regression</span>
              <ChevronRight size={16} />
            </Button>
          )}

          {currentStep === 2 && (
            <Button
              onClick={() => setCurrentStep(1)}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <ChevronLeft size={16} />
              <span>Variable & Model Selection</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
