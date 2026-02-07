import { type ReactNode, type ComponentProps } from 'react';

import type { FieldError } from 'react-hook-form';

export interface BaseFormFieldProps {
  label?: string;
  required?: boolean;
  description?: ReactNode;
  errors?: FieldError;
  name: string;
}

interface FormFieldWrapperProps extends BaseFormFieldProps {
  children: ReactNode;
  className?: string;
}

const FormFieldWrapper = ({
  name,
  label,
  required,
  description,
  errors,
  children,
  className = '',
}: FormFieldWrapperProps) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={name} className='text-sm font-medium text-gray-700'>
          {label}
          {required && <span className='ml-1 text-red-500'>*</span>}
        </label>
      )}
      {children}
      <FormFieldMessage errors={errors} description={description} />
    </div>
  );
};

const FormFieldMessage = ({
  errors,
  description,
}: Pick<BaseFormFieldProps, 'errors' | 'description'>) => {
  if (errors) {
    return <span className='text-xs text-red-500'>{errors.message}</span>;
  }

  if (description) {
    return <span className='text-xs text-gray-500'>{description}</span>;
  }

  return null;
};

export type InputStatus = ComponentProps<'input'>['aria-invalid'] extends boolean
  ? 'error' | undefined
  : 'error' | undefined;

export const getFieldStatus = (errors?: FieldError): 'error' | undefined => {
  return errors ? 'error' : undefined;
};

export { FormFieldWrapper, FormFieldMessage };
export default FormFieldWrapper;
