import { type ReactNode } from 'react';

import { Input } from 'antd';
import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from 'react-hook-form';

const { TextArea } = Input;

type AntdTextAreaProps = React.ComponentProps<typeof TextArea>;

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  description?: ReactNode;
  errors?: FieldError;
} & AntdTextAreaProps;

const FormFieldTextArea = <T extends FieldValues>({
  control,
  name,
  label,
  required,
  description,
  errors,
  ...textAreaProps
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
          <TextArea {...field} {...textAreaProps} id={name} status={errors ? 'error' : undefined} />
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

export default FormFieldTextArea;
