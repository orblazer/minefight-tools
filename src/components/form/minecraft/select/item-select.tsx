/* eslint-disable @typescript-eslint/no-explicit-any */
import { graphql, useStaticQuery } from 'gatsby'
import React, { CSSProperties } from 'react'
import { Control, Controller, FieldValues, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { components, mergeStyles, OptionProps } from 'react-select'
import AsyncSelect from 'react-select/async'
import { DefaultOptionType, FormSelectPropsWithoutOptions } from '../../form-select'
import { retrieveError } from '../../form-utils'

export type ItemOptionType = DefaultOptionType & { texture?: string }

const optionImageStyle: CSSProperties = {
  marginRight: '0.25rem',
  height: '16px',
  objectFit: 'none',
  objectPosition: 'top'
}
const Option: React.FC<Omit<OptionProps<ItemOptionType>, 'data'> & { data: ItemOptionType }> = (props) => {
  return (
    <components.Option {...props}>
      <img src={props.data.texture} height="16px" width="16px" style={optionImageStyle} />
      {props.data.label}
    </components.Option>
  )
}

const ItemSelect = <TFieldValues extends FieldValues = FieldValues>({
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
  sortOptions = 'asc',
  onChange,
  defaultValue,
  components = {},
  ...selectProps
}: FormSelectPropsWithoutOptions<ItemOptionType, TFieldValues>): React.ReactElement => {
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

  // Retrieve options
  const {
    allMinecraftItem: { nodes: items }
  } = useStaticQuery<GatsbyTypes.MinecraftItemSelectQuery>(graphql`
    query MinecraftItemSelect {
      allMinecraftItem {
        nodes {
          name
          texture
        }
      }
    }
  `)
  const { t } = useTranslation('minecraft')
  let options: ItemOptionType[] = items.map(({ name, texture }) => ({
    label: t([`item.${name}.name`, `item.${name}`, `block.${name}.name`, `block.${name}`]),
    value: name,
    texture
  }))

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
              <AsyncSelect
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
                loadOptions={(input) =>
                  Promise.resolve(
                    options.filter(
                      (option) =>
                        option.label.toLowerCase().includes(input.toLowerCase()) ||
                        option.value.toLowerCase().includes(input.toLowerCase())
                    )
                  )
                }
                components={Object.assign({}, components, {
                  Option
                })}
                value={options.find((option) => option.value === props.value)}
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
                placeholder={t('fields.item.search')}
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
export default ItemSelect
