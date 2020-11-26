import React from 'react'

export type InputType = 'checkbox' | 'email' | 'number' | 'password' | 'range' | 'search' | 'tel' | 'text' | 'url' | 'color'

export type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  return <input ref={ref} {...props} />
})

export type OptionValue = string | number | ReadonlyArray<string>
export type Option = {
  label: React.ReactNode
  value: OptionValue
}
export type SelectProps = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
  options: Option[]
  excludes?: OptionValue[]
}
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { options, excludes = [], ...props },
  ref
) {
  return (
    <select ref={ref} {...props}>
      {options
        .filter((option) => !excludes.includes(option.value))
        .map(({ label, value }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
    </select>
  )
})

export type TextareaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Input(props, ref) {
  return <textarea ref={ref} {...props} />
})
