import { memo } from 'react';

import { IconTableEmpty } from '@/static/icon';

import { EMPTY_TEXT_CONFIG } from './constants';

interface TableEmptyStateProps {
  message?: string;
  minHeight?: number;
}

const TableEmptyState = memo(function TableEmptyState({
  message = EMPTY_TEXT_CONFIG.message,
  minHeight = EMPTY_TEXT_CONFIG.minHeight,
}: TableEmptyStateProps) {
  return (
    <div className='flex flex-col justify-center items-center' style={{ minHeight }}>
      <IconTableEmpty />
      <span className='mt-4 text-gray-500'>{message}</span>
    </div>
  );
});

export default TableEmptyState;
