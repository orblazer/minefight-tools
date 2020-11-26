import getOrDefault from '@/utils/getOrDefault'
import React from 'react'
import { FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BaseFormFieldProps } from '../form'
import FormField from '../form-field'
import { min, max, integer } from '../form-rules'
import { DefaultOptionType } from '../form-select'
import { OnObjectChange } from '../form-utils'
import MinecraftSelect from './minecraft-select'

export interface EnchantmentData {
  type: string
  level: number
}

const Enchantment = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  excludes = [],
  defaultValue = {},
  onChange
}: BaseFormFieldProps<TFieldValues> & {
  excludes?: string[]
  defaultValue?: Partial<EnchantmentData>
  onChange?: OnObjectChange
}): React.ReactElement | null => {
  const { t } = useTranslation('minecraft')

  function handleChange(field: string, value: string) {
    typeof onChange === 'function' && onChange(`${name}.${field}`, value)
  }

  return (
    <div className="columns is-mobile is-multiline">
      <MinecraftSelect
        className="column is-half"
        control={control}
        defaultValue={defaultValue.type}
        type="Enchantment"
        name={`${name}.type`}
        id={`${name}.type`}
        label={t('fields.enchantment.type')}
        isOptionDisabled={(option) => excludes.includes(option.value)}
        onChange={(option) => handleChange('type', (option as DefaultOptionType).value)}
      />
      <FormField
        className="column is-half"
        control={control}
        defaultValue={getOrDefault(defaultValue.level, 1)}
        type="number"
        name={`${name}.level`}
        id={`${name}.level`}
        label={t('fields.enchantment.level')}
        placeholder={t('fields.enchantment.level')}
        onChange={(e) => handleChange('value', e.target.value)}
        min={1}
        max={255}
        step={1}
        rules={{
          min: min(1),
          max: max(255),
          validate: {
            integer
          }
        }}
      />
    </div>
  )
}
export default Enchantment
