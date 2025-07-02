
import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TableCustomizer } from './TableCustomizer';
import { Settings } from 'lucide-react';

interface TableActionsProps {
  config: any;
  customHeaders: any;
  data: any;
  customizeOpen: boolean;
  onCustomizeOpenChange: (open: boolean) => void;
  onConfigChange: (config: any) => void;
  onHeaderChange: (column: string, newHeader: string) => void;
}

export const TableActions: React.FC<TableActionsProps> = React.memo(({
  config,
  customHeaders,
  data,
  customizeOpen,
  onCustomizeOpenChange,
  onConfigChange,
  onHeaderChange
}) => {
  return (
    <div className="flex gap-2">
      <Dialog open={customizeOpen} onOpenChange={onCustomizeOpenChange}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Customize
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Table Customization</DialogTitle>
          </DialogHeader>
          <TableCustomizer 
            config={config}
            customHeaders={customHeaders}
            onConfigChange={onConfigChange}
            onHeaderChange={onHeaderChange}
            onClose={() => onCustomizeOpenChange(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
});

TableActions.displayName = 'TableActions';
