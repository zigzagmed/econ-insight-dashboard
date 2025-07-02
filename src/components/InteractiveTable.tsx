
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ModelStatsSection } from './ModelStatsSection';
import { TableSection } from './TableSection';
import { SignificanceLegend } from './SignificanceLegend';
import { TableActions } from './TableActions';

interface InteractiveTableProps {
  data: any;
  config: any;
  customHeaders: any;
  onConfigChange: (config: any) => void;
  onHeaderChange: (column: string, newHeader: string) => void;
}

export const InteractiveTable: React.FC<InteractiveTableProps> = React.memo(({
  data,
  config,
  customHeaders,
  onConfigChange,
  onHeaderChange
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          <TableActions title={config.tableTitle} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ModelStatsSection data={data} config={config} />
        <TableSection 
          data={data}
          config={config}
          customHeaders={customHeaders}
          onConfigChange={onConfigChange}
        />
        <SignificanceLegend config={config} />
      </CardContent>
    </Card>
  );
});

InteractiveTable.displayName = 'InteractiveTable';
