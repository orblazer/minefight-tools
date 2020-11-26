import React, { PropsWithChildren } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconName } from '@fortawesome/fontawesome-svg-core'
import { Control, Controller, FieldValues, useFormContext } from 'react-hook-form'
import * as Input from './form-input'
import { retrieveError } from './form-utils'
import { BaseFormFieldProps } from './form'

export interface LabelAndHelp {
  label?: string
  help?: string
  helpStatus?: 'primary' | 'info' | 'success' | 'warning' | 'danger'
}

// | 'color' TODO: support it
// | 'date' TODO: support it
// | 'datetime-local' TODO: support it
// | 'file' TODO: support it
// | 'image' TODO: support it
// | 'month' NOTE: this is equal to 'date'
// | 'time' TODO: support it
// | 'week' NOTE: this is equal to 'date'

interface BaseFieldProps extends LabelAndHelp {
  leftIcon?: IconName | false
  rightIcon?: IconName | false
  loading?: boolean
  inputClassName?: string
}

export interface FormFieldInputProps extends Input.InputProps, BaseFieldProps {
  type: Input.InputType
}
export interface FormFieldRadioProps extends Input.InputProps, BaseFieldProps {
  type: 'radio'
  options: Input.Option[]
}
export interface FormFieldTextareaProps extends Input.TextareaProps, BaseFieldProps {
  type: 'textarea'
}
export type RealFieldProps<FieldProps> = Omit<FieldProps, 'id' | 'type' | 'rules' | 'ref'>

/**
 * Create components
 */
export type FormFieldProps<TFieldValues extends FieldValues = FieldValues> = (
  | FormFieldInputProps
  | FormFieldRadioProps
  | FormFieldTextareaProps
) &
  BaseFormFieldProps<TFieldValues>
const FormField = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  rules,
  id,
  type,
  label,
  leftIcon,
  rightIcon,
  loading,
  help,
  helpStatus,
  className = '',
  inputClassName = '',
  ...fieldProps
}: PropsWithChildren<FormFieldProps<TFieldValues>>): React.ReactElement | null => {
  const methods = useFormContext<TFieldValues>()
  if (!control && !methods && process.env.NODE_ENV !== 'production') {
    throw new Error(`📋 Controller is missing 'control' prop (field ${name}).`)
  }
  const {
    register,
    formStateRef: {
      current: { errors }
    }
  } = control || methods.control
  const error = retrieveError(errors, name)
  let field: React.ReactNode
  const canRightIcon = true

  if (error !== null) {
    inputClassName += ' is-danger'
  }

  switch (type) {
    case 'radio':
      return (
        <div className={`field ${className}`}>
          <div className="control">
            {(fieldProps as FormFieldRadioProps).options.map(({ label, value }, index, array) => {
              fieldProps.value = value

              return (
                <label key={index} htmlFor={`${id}-${index}`} className="radio">
                  <Input.Input
                    ref={index === array.length - 1 ? register(rules) : register}
                    id={`${id}-${index}`}
                    name={name}
                    type="radio"
                    className={inputClassName}
                    {...(fieldProps as RealFieldProps<FormFieldRadioProps>)}
                  />
                  {label}
                </label>
              )
            })}
          </div>
        </div>
      )
    case 'checkbox':
      return (
        <div className={`field ${className}`}>
          <div className="control">
            <label htmlFor={id} className="checkbox">
              <Input.Input
                ref={register(rules)}
                id={id}
                name={name}
                type="checkbox"
                className={inputClassName}
                {...(fieldProps as RealFieldProps<FormFieldInputProps>)}
              />
              {label}
            </label>
          </div>
        </div>
      )

    case 'textarea':
      field = (
        <Input.Textarea
          ref={register(rules)}
          id={id}
          name={name}
          className={`textarea ${inputClassName}`}
          {...(fieldProps as RealFieldProps<FormFieldTextareaProps>)}
        />
      )
      break
    case 'number':
      // eslint-disable-next-line no-case-declarations
      const { defaultValue, onChange, ...inputProps } = fieldProps as RealFieldProps<FormFieldInputProps>
      field = (
        <Controller
          name={name}
          control={control as Control}
          defaultValue={defaultValue}
          rules={rules}
          render={(props) => (
            <Input.Input
              {...props}
              id={id}
              type="number"
              onChange={(e) => {
                let value: string | number = e.target.value
                if (e.target.value !== '') {
                  const output = e.target.valueAsNumber
                  value = isNaN(output) ? 0 : output
                }
                props.onChange(value)
                typeof onChange === 'function' && onChange(e)
              }}
              className={`input ${inputClassName}`}
              {...inputProps}
            />
          )}
        />
      )
      break
    default:
      field = (
        <Input.Input
          ref={register(rules)}
          id={id}
          name={name}
          type={type}
          className={`input ${inputClassName}`}
          {...(fieldProps as RealFieldProps<FormFieldInputProps>)}
        />
      )
      break
  }

  return (
    <div className={`field ${className}`}>
      {label && (
        <label htmlFor={id} className="label">
          {label}
        </label>
      )}
      <div
        className={`control is-expanded${leftIcon ? ' has-icons-left' : ''}${
          rightIcon || loading ? ' has-icons-right' : ''
        }${loading ? ' is-loading' : ''}`}
      >
        {field}
        {leftIcon && (
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={leftIcon} />
          </span>
        )}
        {rightIcon && canRightIcon && (
          <span className="icon is-small is-right">
            <FontAwesomeIcon icon={rightIcon} />
          </span>
        )}
      </div>
      {help && <p className={`help${helpStatus ? ` ${helpStatus}` : ''}`} dangerouslySetInnerHTML={{ __html: help }} />}
      {error && <p className="help is-danger">{error.message}</p>}
    </div>
  )
}
export default FormField
/* export default memo(
  FormField,
  (prevProps, nextProps) =>
    get(prevProps.formMethods.formState.dirtyFields, prevProps.name) !==
    get(nextProps.formMethods.formState.dirtyFields, prevProps.name)
) as typeof FormField */
