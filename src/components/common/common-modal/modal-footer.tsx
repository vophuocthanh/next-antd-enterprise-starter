'use client';

import { type ReactNode } from 'react';

interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

const ModalFooter = ({ children, className = '' }: ModalFooterProps) => {
  return <div className={`flex gap-6 justify-end p-4 pb-6 w-full ${className}`}>{children}</div>;
};

export default ModalFooter;
