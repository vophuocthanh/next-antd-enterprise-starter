'use client';

import { type Key, useMemo, useState } from 'react';

import { Table } from 'antd';

import { mergeRowSelection, buildPaginationConfig, enhanceColumnsWithActionHover } from './helpers';
import TableEmptyState from './table-empty-state';
import type { CommonTableProps } from './types';
import { buildColumnsWithDefaultSorters, getRowKey } from './utils';

const CommonTable = <RecordType extends object = Record<string, unknown>>({
  columns,
  rowSelection,
  showCheckbox = false,
  rowKey,
  pagination,
  total,
  defaultPageSize,
  current,
  rowsPerPage,
  showSizeChanger,
  emptyMessage,
  emptyMinHeight,
  ...restTableProps
}: CommonTableProps<RecordType>) => {
  const [hoveredRowKey, setHoveredRowKey] = useState<Key | null>(null);

  const enhancedColumns = useMemo(() => {
    const columnsWithSorters = buildColumnsWithDefaultSorters<RecordType>(columns);
    return enhanceColumnsWithActionHover<RecordType>({
      columns: columnsWithSorters,
      hoveredRowKey,
      rowKey,
    });
  }, [columns, hoveredRowKey, rowKey]);

  const mergedRowSelection = useMemo(
    () => mergeRowSelection<RecordType>(showCheckbox, rowSelection),
    [rowSelection, showCheckbox],
  );

  const paginationConfig = useMemo(
    () =>
      buildPaginationConfig<RecordType>({
        pagination,
        total,
        defaultPageSize,
        current,
        rowsPerPage,
        showSizeChanger,
      }),
    [pagination, total, defaultPageSize, current, rowsPerPage, showSizeChanger],
  );

  const tableLocale = useMemo(
    () => ({
      emptyText: <TableEmptyState message={emptyMessage} minHeight={emptyMinHeight} />,
    }),
    [emptyMessage, emptyMinHeight],
  );

  const getRowHandlers = (record: RecordType, index?: number) => ({
    onMouseEnter: () => setHoveredRowKey(getRowKey(record, rowKey, index)),
    onMouseLeave: () => setHoveredRowKey(null),
  });

  return (
    <div className='table-container'>
      <Table<RecordType>
        columns={enhancedColumns}
        rowSelection={mergedRowSelection}
        rowKey={rowKey}
        pagination={paginationConfig}
        locale={tableLocale}
        onRow={getRowHandlers}
        {...restTableProps}
      />
    </div>
  );
};

export default CommonTable;
export type { CommonTableProps } from './types';
