'use client';

import { type Key, useMemo, useState } from 'react';

import { Table } from 'antd';

import { IconTableEmpty } from '@/static/icon';

import { EMPTY_TEXT_CONFIG } from './constants';
import { mergeRowSelection, buildPaginationConfig, enhanceColumnsWithActionHover } from './helpers';
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
    [rowSelection, showCheckbox]
  );

  const paginationWithTotalLabel = useMemo(
    () =>
      buildPaginationConfig<RecordType>({
        pagination,
        total,
        defaultPageSize,
        current,
        rowsPerPage,
        showSizeChanger,
      }),
    [pagination, total, defaultPageSize, current, rowsPerPage, showSizeChanger]
  );

  const handleRowMouseEnter = (record: RecordType, index?: number) => {
    const key = getRowKey(record, rowKey, index);
    setHoveredRowKey(key);
  };

  const handleRowMouseLeave = () => {
    setHoveredRowKey(null);
  };

  return (
    <div className='table-container'>
      <Table<RecordType>
        columns={enhancedColumns}
        rowSelection={mergedRowSelection}
        rowKey={rowKey}
        pagination={paginationWithTotalLabel}
        locale={{
          emptyText: (
            <div className='flex flex-col justify-center items-center min-h-[550px]'>
              <IconTableEmpty />
              <span>{EMPTY_TEXT_CONFIG.message}</span>
            </div>
          ),
        }}
        onRow={(record, index) => ({
          onMouseEnter: () => handleRowMouseEnter(record, index),
          onMouseLeave: handleRowMouseLeave,
        })}
        {...restTableProps}
      />
    </div>
  );
};

export default CommonTable;
export type { CommonTableProps } from './types';
