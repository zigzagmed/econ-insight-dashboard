
import React, { useState } from 'react';
import { ModelConfig } from './Dashboard';
import ModelInterpretation from './ModelInterpretation';
import AIInsights from './AIInsights';
import { InteractiveTable } from './InteractiveTable';

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

  // Interactive table configuration
  const [tableConfig] = useState({
    visibleColumns: ['variable', 'coef', 'std_err', 't', 'p_value', 'ci_lower', 'ci_upper'],
    decimalPlaces: 4,
    showSignificance: true,
    tableTitle: 'Regression Table',
    includeModelStats: true,
    columnOrder: ['variable', 'coef', 'std_err', 't', 'p_value', 'ci_lower', 'ci_upper']
  });

  const [customHeaders] = useState({
    variable: 'Variable',
    coef: 'Coefficient',
    std_err: 'Std. Error',
    t: 't-statistic',
    p_value: 'P>|t|',
    ci_lower: '[0.025',
    ci_upper: '0.975]'
  });

  return (
    <div className="space-y-6">
      <InteractiveTable 
        data={results}
        config={tableConfig}
        customHeaders={customHeaders}
        onConfigChange={() => {}}
        onHeaderChange={() => {}}
      />

      <ModelInterpretation 
        rSquared={results.rSquared}
        adjustedRSquared={results.adjustedRSquared}
        pValueF={results.pValueF}
        dependentVariable={results.dependentVariable}
        coefficients={results.coefficients}
        intercept={results.intercept}
        modelType={results.modelType}
      />

      <AIInsights results={results} />
    </div>
  );
};

export default RegressionResults;
