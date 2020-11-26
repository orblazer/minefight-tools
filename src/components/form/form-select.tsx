/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Control, Controller, FieldValues, useFormContext } from 'react-hook-form'
import Select, { mergeStyles, NamedProps, OptionTypeBase } from 'react-select'
import { BaseFormFieldProps } from './form'
import { LabelAndHelp } from './form-field'
import { retrieveError } from './form-utils'

export type DefaultOptionType = { label: string; value: string }
export type FormSelectPropsWithoutOptions<
  OptionType extends OptionTypeBase = DefaultOptionType,
  TFieldValues extends FieldValues = FieldValues
> = Omit<FormSelectProps<OptionType, TFieldValues>, 'options'>
export type FormSelectProps<
  OptionType extends OptionTypeBase = DefaultOptionType,
  TFieldValues extends FieldValues = FieldValues
> = Omit<NamedProps<OptionType>, 'value' | 'options' | 'defaultValue'> &
  BaseFormFieldProps<TFieldValues> &
  LabelAndHelp & {
    selectClassName?: string
    sortOptions?: 'asc' | 'desc'
    options?: OptionType[]
    defaultValue?: string | string[]
  }
const FormSelect = <
  OptionType extends OptionTypeBase = DefaultOptionType,
  TFieldValues extends FieldValues = FieldValues
>({
  control,
  rules,
  name,

  label,
  id,
  className = '',
  help,
  selectClassName = '',
  helpStatus,
  styles = {},
  options = [],
  sortOptions = 'asc',
  onChange,
  defaultValue,
  ...selectProps
}: FormSelectProps<OptionType, TFieldValues>): React.ReactElement => {
  const methods = useFormContext()
  if (!control && !methods && process.env.NODE_ENV !== 'production') {
    throw new Error(`📋 Controller is missing 'control' prop  (field ${name}).`)
  }
  const {
    formStateRef: {
      current: { errors }
    }
  } = control || methods.control
  const error = retrieveError(errors, name)

  // Sort the options
  if (typeof options !== 'undefined' && typeof sortOptions !== 'undefined') {
    if (Array.isArray(options)) {
      const isAsc = sortOptions === 'asc'
      options = options.sort((a, b) => {
        if (typeof a.label === 'string' && typeof b.label === 'string') {
          if (a.label < b.label) {
            return isAsc ? -1 : 1
          } else if (a.label > b.label) {
            return isAsc ? 1 : -1
          }
        }
        return 0
      })
    } else {
      console.warn('Could not sort object options')
    }
  }

  return (
    <div className={`field ${className}`}>
      {label && (
        <label htmlFor={id || name} className="label">
          {label}
        </label>
      )}

      <div className="control is-expanded">
        <Controller
          name={name}
          control={control as Control}
          rules={rules}
          defaultValue={defaultValue}
          render={(props) => {
            return (
              <Select
                {...props}
                className={selectClassName}
                id={id || name}
                onChange={(value, action) => {
                  props.onChange(
                    Array.isArray(value)
                      ? value.map((val) => val.value)
                      : typeof value === 'object'
                      ? (value as any).value
                      : value,
                    action
                  )
                  typeof onChange === 'function' && onChange(value, action)
                }}
                options={options}
                value={
                  Array.isArray(props.value)
                    ? options.find((option) => props.value.includes(option.value))
                    : options.find((option) => option.value === props.value)
                }
                styles={mergeStyles(
                  {
                    control(base: any) {
                      if (error !== null) {
                        base.borderColor = base['&:hover'].borderColor = 'hsl(348, 86%, 61%)'
                      }
                      return base
                    }
                  },
                  styles
                )}
                {...selectProps}
              />
            )
          }}
        />
      </div>
      {help && <p className={`help${helpStatus ? ` ${helpStatus}` : ''}`} dangerouslySetInnerHTML={{ __html: help }} />}
      {error && <p className="help is-danger">{error.message}</p>}
    </div>
  )
}
export default FormSelect
