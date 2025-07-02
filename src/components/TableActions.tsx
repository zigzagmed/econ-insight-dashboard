
import React from 'react';

interface TableActionsProps {
  title: string;
}

export const TableActions: React.FC<TableActionsProps> = React.memo(({ title }) => {
  return (
    <div className="flex items-center gap-2">
      <span>{title}</span>
    </div>
  );
});

TableActions.displayName = 'TableActions';
