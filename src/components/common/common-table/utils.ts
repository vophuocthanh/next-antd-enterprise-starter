import type { Key } from 'react';

import { DEFAULT_SORT_DIRECTIONS } from './constants';
import type { AntdTableProps, ColumnType, ColumnsType } from './types';

export const getValueByDataIndex = <RecordType extends object>(
  record: RecordType,
  dataIndex: ColumnType<RecordType>['dataIndex']
): unknown => {
  if (dataIndex == null) {
    return undefined;
  }

  if (Array.isArray(dataIndex)) {
    let currentValue: unknown = record;

    for (const key of dataIndex) {
      if (currentValue == null || typeof currentValue !== 'object') {
        return undefined;
      }
      currentValue = (currentValue as Record<string, unknown>)[key as unknown as string];
    }

    return currentValue;
  }

  return (record as Record<string, unknown>)[dataIndex as string];
};

export const toValidDate = (value: unknown): Date | null => {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  return null;
};

export const compareValues = (firstValue: unknown, secondValue: unknown): number => {
  if (firstValue === null && secondValue === null) {
    return 0;
  }

  if (firstValue === null) {
    return -1;
  }

  if (secondValue === null) {
    return 1;
  }

  const firstDate = toValidDate(firstValue);
  const secondDate = toValidDate(secondValue);

  if (firstDate && secondDate) {
    return firstDate.getTime() - secondDate.getTime();
  }

  if (typeof firstValue === 'number' && typeof secondValue === 'number') {
    return firstValue - secondValue;
  }

  const firstString = String(firstValue).toLowerCase();
  const secondString = String(secondValue).toLowerCase();

  if (firstString === secondString) {
    return 0;
  }

  return firstString > secondString ? 1 : -1;
};

export const createDefaultSorter =
  <RecordType extends object>(
    dataIndex: ColumnType<RecordType>['dataIndex']
  ): NonNullable<ColumnType<RecordType>['sorter']> =>
  (firstRecord: RecordType, secondRecord: RecordType): number => {
    const firstValue = getValueByDataIndex(firstRecord, dataIndex);
    const secondValue = getValueByDataIndex(secondRecord, dataIndex);

    return compareValues(firstValue, secondValue);
  };

export const buildColumnsWithDefaultSorters = <RecordType extends object>(
  columns?: ColumnsType<RecordType>
): ColumnsType<RecordType> | undefined => {
  if (!columns) {
    return columns;
  }

  return columns.map((column) => {
    if ('children' in column && column.children && column.children.length > 0) {
      return {
        ...column,
        children: buildColumnsWithDefaultSorters<RecordType>(column.children),
      };
    }

    if (!('dataIndex' in column)) {
      return column;
    }

    const nextColumn: ColumnType<RecordType> = { ...column };
    const dataIndex = nextColumn.dataIndex;

    if (!dataIndex) {
      return nextColumn;
    }

    if (nextColumn.sorter && nextColumn.sorter !== true) {
      return nextColumn;
    }

    if (nextColumn.sorter === false) {
      return nextColumn;
    }

    if (nextColumn.sorter === true) {
      nextColumn.showSorterTooltip = false;
      nextColumn.sorter = createDefaultSorter<RecordType>(dataIndex);

      if (!nextColumn.sortDirections) {
        nextColumn.sortDirections = [...DEFAULT_SORT_DIRECTIONS];
      }
    }

    return nextColumn;
  });
};

export const getRowKey = <RecordType extends object>(
  record: RecordType,
  rowKey?: AntdTableProps<RecordType>['rowKey'],
  index?: number
): Key => {
  if (typeof rowKey === 'function') {
    return rowKey(record, index);
  }

  if (rowKey != null) {
    return (record as Record<string, unknown>)[rowKey as string] as Key;
  }

  return (
    ((record as Record<string, unknown>).key as Key) ||
    ((record as Record<string, unknown>).id as Key) ||
    index!
  );
};
