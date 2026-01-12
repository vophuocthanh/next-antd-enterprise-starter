import type { Key, ReactNode } from 'react';

import type { ColumnsType, CommonTableProps } from './types';
import { getRowKey } from './utils';

type PaginationConfig = CommonTableProps<object>['pagination'];

export const mergeRowSelection = <RecordType extends object>(
  showCheckbox: boolean,
  rowSelection?: CommonTableProps<RecordType>['rowSelection']
) => {
  if (!showCheckbox) {
    return rowSelection;
  }

  if (!rowSelection) {
    return { type: 'checkbox' as const };
  }

  if (!rowSelection.type) {
    return { ...rowSelection, type: 'checkbox' as const };
  }

  return rowSelection;
};

export const buildPaginationConfig = <RecordType extends object>({
  pagination,
  total,
  defaultPageSize,
  current,
  rowsPerPage,
  showSizeChanger,
}: Pick<
  CommonTableProps<RecordType>,
  'pagination' | 'total' | 'defaultPageSize' | 'current' | 'rowsPerPage' | 'showSizeChanger'
>): PaginationConfig => {
  const paginationConfig = pagination && typeof pagination === 'object' ? pagination : undefined;
  const paginationTotal = total ?? paginationConfig?.total;

  if (paginationTotal != null) {
    return {
      ...paginationConfig,
      pageSize: defaultPageSize ?? paginationConfig?.pageSize,
      current: current ?? paginationConfig?.current,
      total: paginationTotal,
      pageSizeOptions: rowsPerPage ?? paginationConfig?.pageSizeOptions,
      showSizeChanger:
        showSizeChanger !== undefined ? showSizeChanger : paginationConfig?.showSizeChanger,
      locale: { items_per_page: ' / trang' },
      showTotal:
        paginationConfig?.showTotal ??
        ((totalValue: number, range: [number, number]): ReactNode =>
          `${totalValue}件中${range[0]}～${range[1]}件目`),
    };
  }

  if (pagination === false || !pagination) {
    return pagination;
  }

  const mergedPagination = {
    ...pagination,
    ...(rowsPerPage && { pageSizeOptions: rowsPerPage }),
    ...(showSizeChanger !== undefined && { showSizeChanger }),
    ...(defaultPageSize && { pageSize: defaultPageSize }),
    ...(current && { current }),
  };

  if (mergedPagination.showTotal) {
    return mergedPagination;
  }

  return {
    ...mergedPagination,
    showTotal: (totalValue: number, range: [number, number]): ReactNode =>
      `${totalValue} bản ghi trong đó ${range[0]}～${range[1]} bản ghi`,
  };
};

export const enhanceColumnsWithActionHover = <RecordType extends object>({
  columns,
  hoveredRowKey,
  rowKey,
}: {
  columns?: ColumnsType<RecordType>;
  hoveredRowKey: Key | null;
  rowKey?: CommonTableProps<RecordType>['rowKey'];
}): ColumnsType<RecordType> | undefined => {
  if (!columns) {
    return columns;
  }

  return columns.map((col) => {
    if ('dataIndex' in col && col.dataIndex === 'action') {
      return {
        ...col,
        render: (value: unknown, record: RecordType, index: number) => {
          const key = getRowKey(record, rowKey, index);
          const isHovered = key === hoveredRowKey;

          const renderedContent = col.render
            ? col.render(value, record, index)
            : (value as ReactNode);

          const baseClasses = 'flex justify-end w-full min-w-fit transition-opacity duration-200';
          const hoverClasses = isHovered
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none';
          const className = col.className
            ? `${col.className} ${baseClasses} ${hoverClasses}`
            : `${baseClasses} ${hoverClasses}`;

          return <div className={className}>{renderedContent as ReactNode}</div>;
        },
      };
    }
    return col;
  });
};
