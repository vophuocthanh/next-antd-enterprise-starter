import { type ReactNode } from 'react';

import { Input } from 'antd';
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

const { TextArea } = Input;

type AntdTextAreaProps = React.ComponentProps<typeof TextArea>;

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  description?: ReactNode;
  errors?: FieldError;
  wrapperClassName?: string;
} & AntdTextAreaProps;

const FormFieldTextArea = <T extends FieldValues>({
  control,
  name,
  label,
  required,
  description,
  errors,
  wrapperClassName,
  ...textAreaProps
}: Props<T>) => {
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
          <TextArea {...field} {...textAreaProps} id={name} status={getFieldStatus(errors)} />
        </FormFieldWrapper>
      )}
    />
  );
};

export default FormFieldTextArea;
