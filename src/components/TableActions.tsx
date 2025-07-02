
import React from 'react';
import { Table } from 'lucide-react';

interface TableActionsProps {
  title: string;
}

export const TableActions: React.FC<TableActionsProps> = React.memo(({ title }) => {
  return (
    <div className="flex items-center gap-2">
      <Table className="h-4 w-4" />
      <span className="text-sm font-medium">{title}</span>
    </div>
  );
});

TableActions.displayName = 'TableActions';
