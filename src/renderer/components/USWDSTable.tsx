import React from 'react';

interface Column {
  header: string;
  accessor: string;
  sortable?: boolean;
}

interface USWDSTableProps {
  columns: Column[];
  data: any[];
  bordered?: boolean;
  borderless?: boolean;
  striped?: boolean;
  compact?: boolean;
  scrollable?: boolean;
  stackedHeader?: boolean;
  caption?: string;
  className?: string;
}

const USWDSTable: React.FC<USWDSTableProps> = ({
  columns,
  data,
  bordered = false,
  borderless = false,
  striped = false,
  compact = false,
  scrollable = false,
  stackedHeader = false,
  caption,
  className = ''
}) => {
  const tableClasses = ['usa-table'];
  
  if (bordered) {
    tableClasses.push('usa-table--bordered');
  }
  
  if (borderless) {
    tableClasses.push('usa-table--borderless');
  }
  
  if (striped) {
    tableClasses.push('usa-table--striped');
  }
  
  if (compact) {
    tableClasses.push('usa-table--compact');
  }
  
  if (stackedHeader) {
    tableClasses.push('usa-table--stacked-header');
  }
  
  if (className) {
    tableClasses.push(className);
  }
  
  const TableContent = () => (
    <table className={tableClasses.join(' ')}>
      {caption && <caption>{caption}</caption>}
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th 
              key={index} 
              scope="col"
              aria-sort={column.sortable ? 'none' : undefined}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} style={{ textAlign: 'center' }}>
              No data available
            </td>
          </tr>
        ) : (
          data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} data-label={column.header}>
                  {String(row[column.accessor] ?? '-')}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  if (scrollable) {
    return (
      <div className="usa-table-container--scrollable" tabIndex={0}>
        <TableContent />
      </div>
    );
  }

  return <TableContent />;
};

export default USWDSTable;
