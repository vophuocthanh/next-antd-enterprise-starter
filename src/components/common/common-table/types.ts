import type {
  ColumnType as AntdColumnType,
  ColumnsType as AntdColumnsType,
  TableProps,
} from 'antd/es/table';

export type AntdTableProps<RecordType extends object> = TableProps<RecordType>;

export type CommonTableProps<RecordType extends object = Record<string, unknown>> =
  AntdTableProps<RecordType> & {
    showCheckbox?: boolean;
    total?: number;
    defaultPageSize?: number;
    current?: number;
    rowsPerPage?: number[];
    showSizeChanger?: boolean;
  };

export type ColumnsType<RecordType extends object> = AntdColumnsType<RecordType>;
export type ColumnType<RecordType extends object> = AntdColumnType<RecordType>;
