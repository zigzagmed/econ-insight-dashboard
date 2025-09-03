
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { Variable, ModelConfig } from './Dashboard';

// Sample variables - in real implementation, these would come from your econometrics software
const sampleVariables: Variable[] = [
  { name: 'GDP', type: 'continuous', description: 'Gross Domestic Product' },
  { name: 'inflation_rate', type: 'continuous', description: 'Annual inflation rate' },
  { name: 'unemployment', type: 'continuous', description: 'Unemployment rate' },
  { name: 'education_level', type: 'categorical', description: 'Educational attainment' },
  { name: 'urban', type: 'binary', description: 'Urban vs rural location' },
  { name: 'age', type: 'continuous', description: 'Age in years' },
  { name: 'income', type: 'continuous', description: 'Annual income' },
  { name: 'gender', type: 'binary', description: 'Gender indicator' },
  { name: 'experience', type: 'continuous', description: 'Years of experience' },
  { name: 'region', type: 'categorical', description: 'Geographic region' },
];

interface VariableSelectionProps {
  modelConfig: ModelConfig;
  setModelConfig: (config: ModelConfig) => void;
}

const VariableSelection: React.FC<VariableSelectionProps> = ({ modelConfig, setModelConfig }) => {
  const handleModelTypeChange = (type: 'linear' | 'logistic' | 'polynomial') => {
    setModelConfig({ ...modelConfig, type });
  };

  const handleDependentVariableChange = (variable: string) => {
    setModelConfig({ ...modelConfig, dependentVariable: variable });
  };

  const handleIndependentVariableChange = (variable: string) => {
    if (!modelConfig.independentVariables.includes(variable) && variable !== modelConfig.dependentVariable) {
      setModelConfig({
        ...modelConfig,
        independentVariables: [...modelConfig.independentVariables, variable]
      });
    }
  };

  const removeIndependentVariable = (variable: string) => {
    setModelConfig({
      ...modelConfig,
      independentVariables: modelConfig.independentVariables.filter(v => v !== variable)
    });
  };

  const getVariableTypeColor = (type: Variable['type']) => {
    switch (type) {
      case 'continuous': return 'bg-green-100 text-green-800';
      case 'categorical': return 'bg-yellow-100 text-yellow-800';
      case 'binary': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const availableIndependentVariables = sampleVariables.filter(
    variable => variable.name !== modelConfig.dependentVariable && 
                !modelConfig.independentVariables.includes(variable.name)
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Configure Your Regression Model</h2>
        <p className="text-slate-600">Select your model type and variables to get started</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {/* Model Type Selection */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Model Type</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={modelConfig.type} onValueChange={handleModelTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select model type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linear">Linear Regression</SelectItem>
                <SelectItem value="logistic">Logistic Regression</SelectItem>
                <SelectItem value="polynomial">Polynomial Regression</SelectItem>
              </SelectContent>
            </Select>
            <div className="mt-2 text-xs text-slate-600">
              {modelConfig.type === 'linear' && 'Continuous outcomes'}
              {modelConfig.type === 'logistic' && 'Binary outcomes'}
              {modelConfig.type === 'polynomial' && 'Non-linear relationships'}
            </div>
          </CardContent>
        </Card>

        {/* Dependent Variable */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Dependent Variable</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={modelConfig.dependentVariable} onValueChange={handleDependentVariableChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Y variable" />
              </SelectTrigger>
              <SelectContent>
                {sampleVariables.map((variable) => (
                  <SelectItem key={variable.name} value={variable.name}>
                    <div className="flex items-center space-x-2">
                      <span>{variable.name}</span>
                      <Badge className={`text-xs ${getVariableTypeColor(variable.type)}`}>
                        {variable.type}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Independent Variables */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Independent Variables</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value="" onValueChange={handleIndependentVariableChange}>
              <SelectTrigger>
                <SelectValue placeholder="Add X variables" />
              </SelectTrigger>
              <SelectContent>
                {availableIndependentVariables.map((variable) => (
                  <SelectItem key={variable.name} value={variable.name}>
                    <div className="flex items-center space-x-2">
                      <span>{variable.name}</span>
                      <Badge className={`text-xs ${getVariableTypeColor(variable.type)}`}>
                        {variable.type}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Selected Independent Variables */}
            {modelConfig.independentVariables.length > 0 && (
              <div className="mt-3 space-y-2">
                <div className="text-xs text-slate-600 mb-2">Selected ({modelConfig.independentVariables.length}):</div>
                <div className="flex flex-wrap gap-1">
                  {modelConfig.independentVariables.map((variable) => {
                    const variableInfo = sampleVariables.find(v => v.name === variable);
                    return (
                      <Badge
                        key={variable}
                        variant="secondary"
                        className="flex items-center space-x-1 text-xs px-2 py-1"
                      >
                        <span>{variable}</span>
                        <button
                          onClick={() => removeIndependentVariable(variable)}
                          className="ml-1 hover:bg-red-100 rounded-full p-0.5"
                        >
                          <X size={10} />
                        </button>
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VariableSelection;
