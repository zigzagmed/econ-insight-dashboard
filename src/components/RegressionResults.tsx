
import React from 'react';
import { ModelConfig } from './Dashboard';
import RegressionTable from './RegressionTable';
import ModelSummary from './ModelSummary';
import ModelInterpretation from './ModelInterpretation';
import AIInsights from './AIInsights';

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

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Regression Results</h2>
        <p className="text-slate-600">
          {modelConfig.type.charAt(0).toUpperCase() + modelConfig.type.slice(1)} regression of {modelConfig.dependentVariable}
        </p>
      </div>

      <RegressionTable 
        coefficients={results.coefficients}
        intercept={results.intercept}
      />

      <ModelSummary 
        nObservations={results.nObservations}
        rSquared={results.rSquared}
        fStatistic={results.fStatistic}
        pValueF={results.pValueF}
      />

      <ModelInterpretation 
        rSquared={results.rSquared}
        pValueF={results.pValueF}
        dependentVariable={results.dependentVariable}
        coefficients={results.coefficients}
      />

      <AIInsights results={results} />
    </div>
  );
};

export default RegressionResults;
