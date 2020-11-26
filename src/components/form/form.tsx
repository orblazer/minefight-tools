/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {
  Control,
  DeepPartial,
  FieldValues,
  SubmitHandler,
  UnpackNestedValue,
  useForm,
  UseFormMethods,
  ValidationRules
} from 'react-hook-form'

export interface BaseFormFieldProps<TFieldValues extends FieldValues> {
  control?: Control<TFieldValues>
  rules?: ValidationRules
  name: string // Paths<TFieldValues> TODO: WAIT TS 4.1
}

type HTMLFormProps = Omit<
  React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
  'onSubmit'
>
export type FormProps<TFieldValues extends FieldValues = FieldValues> = React.PropsWithChildren<
  HTMLFormProps & {
    formMethods?: UseFormMethods<TFieldValues>
    defaultValues?: UnpackNestedValue<DeepPartial<TFieldValues>>
    onSubmit: SubmitHandler<TFieldValues>
    register?(control: Control<TFieldValues>): React.ReactElement
  }
>
const Form = <TFieldValues extends FieldValues = FieldValues>({
  formMethods,
  defaultValues,
  children,
  onSubmit,
  className = '',
  register,
  ...formProps
}: FormProps<TFieldValues>): React.ReactElement => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { handleSubmit, control } = formMethods || useForm({ defaultValues, mode: 'onBlur' })

  return (
    <form className={`form ${className}`} onSubmit={handleSubmit(onSubmit)} noValidate {...formProps}>
      {React.Children.map(children, (child: any) => {
        if (child !== null && typeof child.props !== 'undefined' && typeof child.props.name === 'string') {
          return React.createElement(child.type, {
            ...{
              ...child.props,
              control,
              key: child.props.name
            }
          })
        } else {
          return child
        }
      })}

      {register && register(control)}
    </form>
  )
}
export default Form
