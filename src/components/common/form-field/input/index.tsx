import { type ReactNode } from 'react';

import { Input, type InputProps } from 'antd';
import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import {
  FormFieldWrapper,
  getFieldStatus,
} from '@/components/common/form-field/form-field-wrapper';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  description?: ReactNode;
  errors?: FieldError;
  wrapperClassName?: string;
} & InputProps;

export default function FormFieldInput<T extends FieldValues>({
  control,
  name,
  label,
  required,
  description,
  errors,
  wrapperClassName,
  ...inputProps
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormFieldWrapper
          name={name}
          label={label}
          required={required}
          description={description}
          errors={errors}
          className={wrapperClassName}
        >
          <Input {...inputProps} {...field} id={name} status={getFieldStatus(errors)} />
        </FormFieldWrapper>
      )}
    />
  );
}
