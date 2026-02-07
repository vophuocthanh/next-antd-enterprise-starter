import type {
  ColumnType as AntdColumnType,
  ColumnsType as AntdColumnsType,
  TableProps,
} from 'antd/es/table';

export type AntdTableProps<RecordType extends object> = TableProps<RecordType>;

export type CommonTableProps<RecordType extends object = Record<string, unknown>> =
  AntdTableProps<RecordType> & {
    /** Hiển thị checkbox cho row selection */
    showCheckbox?: boolean;
    /** Tổng số bản ghi */
    total?: number;
    /** Số bản ghi mặc định trên mỗi trang */
    defaultPageSize?: number;
    /** Trang hiện tại */
    current?: number;
    /** Các tùy chọn số bản ghi trên mỗi trang */
    rowsPerPage?: number[];
    /** Hiển thị size changer */
    showSizeChanger?: boolean;
    /** Message hiển thị khi không có dữ liệu */
    emptyMessage?: string;
    /** Chiều cao tối thiểu của empty state */
    emptyMinHeight?: number;
  };

export type ColumnsType<RecordType extends object> = AntdColumnsType<RecordType>;
export type ColumnType<RecordType extends object> = AntdColumnType<RecordType>;
