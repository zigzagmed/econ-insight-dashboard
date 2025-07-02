
import React from 'react';
import { BarChart3 } from 'lucide-react';

interface TableActionsProps {
  title: string;
}

export const TableActions: React.FC<TableActionsProps> = React.memo(({ title }) => {
  return (
    <div className="flex items-center gap-2">
      <BarChart3 className="h-5 w-5" />
      <span>{title}</span>
    </div>
  );
});

TableActions.displayName = 'TableActions';
