'use client';

import { type ReactNode } from 'react';

interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}

const ModalBody = ({ children, className = '' }: ModalBodyProps) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

export default ModalBody;
