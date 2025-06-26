
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

  const addIndependentVariable = (variable: string) => {
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

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Configure Your Regression Model</h2>
        <p className="text-slate-600">Select your model type and variables to get started</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Variables */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Available Variables</span>
              <Badge variant="secondary">{sampleVariables.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {sampleVariables.map((variable) => (
                <div
                  key={variable.name}
                  className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-slate-800">{variable.name}</span>
                      <Badge className={`text-xs ${getVariableTypeColor(variable.type)}`}>
                        {variable.type}
                      </Badge>
                    </div>
                    {variable.description && (
                      <p className="text-sm text-slate-600">{variable.description}</p>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addIndependentVariable(variable.name)}
                    disabled={modelConfig.independentVariables.includes(variable.name) || variable.name === modelConfig.dependentVariable}
                    className="ml-2"
                  >
                    <Plus size={14} />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Model Configuration */}
        <div className="space-y-6">
          {/* Model Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Model Type</CardTitle>
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
              <div className="mt-2 text-sm text-slate-600">
                {modelConfig.type === 'linear' && 'Best for continuous dependent variables'}
                {modelConfig.type === 'logistic' && 'Best for binary dependent variables'}
                {modelConfig.type === 'polynomial' && 'Best for non-linear relationships'}
              </div>
            </CardContent>
          </Card>

          {/* Dependent Variable */}
          <Card>
            <CardHeader>
              <CardTitle>Dependent Variable (Y)</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={modelConfig.dependentVariable} onValueChange={handleDependentVariableChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select dependent variable" />
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
            <CardHeader>
              <CardTitle>Independent Variables (X)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {modelConfig.independentVariables.length === 0 ? (
                  <p className="text-slate-500 text-center py-4">
                    Click the + button next to variables to add them as independent variables
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {modelConfig.independentVariables.map((variable) => {
                      const variableInfo = sampleVariables.find(v => v.name === variable);
                      return (
                        <Badge
                          key={variable}
                          variant="secondary"
                          className="flex items-center space-x-2 px-3 py-1"
                        >
                          <span>{variable}</span>
                          {variableInfo && (
                            <span className={`text-xs px-1 rounded ${getVariableTypeColor(variableInfo.type)}`}>
                              {variableInfo.type}
                            </span>
                          )}
                          <button
                            onClick={() => removeIndependentVariable(variable)}
                            className="ml-2 hover:bg-red-100 rounded-full p-0.5"
                          >
                            <X size={12} />
                          </button>
                        </Badge>
                      );
                    })}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VariableSelection;
