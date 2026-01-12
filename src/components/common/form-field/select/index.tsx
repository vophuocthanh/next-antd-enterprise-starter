import { type ReactNode } from 'react';

import { Select, type SelectProps } from 'antd';
import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from 'react-hook-form';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  description?: ReactNode;
  errors?: FieldError;
} & SelectProps;

const FormFieldSelect = <T extends FieldValues>({
  control,
  name,
  label,
  required,
  description,
  errors,
  ...selectProps
}: Props<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className='flex flex-col gap-1'>
          {label && (
            <label htmlFor={name} className='text-sm font-medium text-gray-700'>
              {label}
              {required && <span className='ml-1 text-red-500'>*</span>}
            </label>
          )}
          <Select
            {...selectProps}
            {...field}
            id={name}
            status={errors ? 'error' : undefined}
            onChange={(value, option) => {
              field.onChange(value);
              selectProps.onChange?.(value, option);
            }}
            onBlur={field.onBlur}
            value={field.value}
          />
          {errors ? (
            <span className='text-xs text-red-500'>{errors.message}</span>
          ) : (
            description && <span className='text-xs text-gray-500'>{description}</span>
          )}
        </div>
      )}
    />
  );
};

export default FormFieldSelect;
