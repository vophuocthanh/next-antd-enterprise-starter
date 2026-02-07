import { type ReactNode } from 'react';

import { Select, type SelectProps } from 'antd';
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
} & SelectProps;

const FormFieldSelect = <T extends FieldValues>({
  control,
  name,
  label,
  required,
  description,
  errors,
  wrapperClassName,
  onChange: externalOnChange,
  ...selectProps
}: Props<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const handleChange = (value: unknown, option: unknown) => {
          field.onChange(value);
          externalOnChange?.(value, option as Parameters<NonNullable<SelectProps['onChange']>>[1]);
        };

        return (
          <FormFieldWrapper
            name={name}
            label={label}
            required={required}
            description={description}
            errors={errors}
            className={wrapperClassName}
          >
            <Select
              {...selectProps}
              {...field}
              id={name}
              status={getFieldStatus(errors)}
              onChange={handleChange}
              onBlur={field.onBlur}
              value={field.value}
            />
          </FormFieldWrapper>
        );
      }}
    />
  );
};

export default FormFieldSelect;
