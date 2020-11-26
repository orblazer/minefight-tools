import { SpellCondition as SpellConditionType } from '@/data/invasion'
import getOrDefault from '@/utils/getOrDefault'
import React from 'react'
import { Control, FieldValues, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BaseFormFieldProps } from '../../form'
import FormField from '../../form-field'
import FormSelect, { DefaultOptionType } from '../../form-select'
import { OnObjectChange } from '../../form-utils'
import { min, integer } from '../../form-rules'

export interface SpellConditionHealth {
  type: 'minHealth' | 'maxHealth'
  value: string
}
export interface SpellConditionNearbyPlayer {
  type: 'minNearbyPlayer' | 'maxNearbyPlayer'
  value: {
    radius: number
    count: number
  }
}
export type SpellConditionData = SpellConditionHealth | SpellConditionNearbyPlayer
type PartialSpellConditionNearbyPlayer = Partial<SpellConditionNearbyPlayer['value']> | undefined

const SpellCondition = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  excludes = [],
  defaultValue = {},
  onChange
}: BaseFormFieldProps<TFieldValues> & {
  excludes?: SpellConditionType[]
  defaultValue?: Partial<SpellConditionData>
  onChange?: OnObjectChange
}): React.ReactElement | null => {
  const { t } = useTranslation('invasion')
  const type = useWatch<SpellConditionType>({
    name: `${name}.type`,
    control: control as Control,
    defaultValue: getOrDefault(defaultValue.type, 'minHealth')
  })

  function handleChange(field: string, value: string) {
    typeof onChange === 'function' && onChange(`${name}.${field}`, value)
  }

  return (
    <div className="columns is-mobile is-multiline">
      <FormSelect<{ value: SpellConditionType; label: string }>
        className="column is-half"
        control={control as Control}
        defaultValue={type}
        options={[
          { value: 'minHealth', label: t('spell.condition.minHealth') },
          { value: 'maxHealth', label: t('spell.condition.maxHealth') },
          { value: 'minNearbyPlayer', label: t('spell.condition.minNearbyPlayer') },
          { value: 'maxNearbyPlayer', label: t('spell.condition.maxNearbyPlayer') }
        ]}
        name={`${name}.type`}
        id={`${name}.type`}
        label={t('monster-generator.fields.spell-condition.type')}
        isOptionDisabled={(option) => excludes.includes(option.value)}
        onChange={(option) => handleChange('type', (option as DefaultOptionType).value)}
      />

      {type === 'minHealth' || type === 'maxHealth' ? (
        <FormField
          className="column is-half"
          control={control}
          defaultValue={getOrDefault(defaultValue.value as string, '0')}
          type="text"
          name={`${name}.value`}
          id={`${name}.value`}
          label={t('monster-generator.fields.spell-condition.value')}
          placeholder={t('monster-generator.fields.spell-condition.value')}
          rules={{
            pattern: /\d+%?/
          }}
          onChange={(e) => handleChange('value', e.target.value)}
        />
      ) : (
        <>
          <FormField
            className="column is-half"
            control={control}
            defaultValue={getOrDefault((defaultValue.value as PartialSpellConditionNearbyPlayer)?.radius, 0)}
            type="number"
            name={`${name}.value.radius`}
            id={`${name}.value.radius`}
            min={0}
            step={0.01}
            label={t('monster-generator.fields.spell-condition.radius')}
            placeholder={t('monster-generator.fields.spell-condition.radius')}
            rules={{
              min: min(0)
            }}
            onChange={(e) => handleChange('value.radius', e.target.value)}
          />
          <FormField
            className="column is-half"
            control={control}
            defaultValue={getOrDefault((defaultValue.value as PartialSpellConditionNearbyPlayer)?.count, 0)}
            type="number"
            name={`${name}.value.count`}
            id={`${name}.value.count`}
            min={0}
            step={1}
            label={t('monster-generator.fields.spell-condition.radius')}
            placeholder={t('monster-generator.fields.spell-condition.radius')}
            rules={{
              min: min(0),
              validate: {
                integer
              }
            }}
            onChange={(e) => handleChange('value.count', e.target.value)}
          />
        </>
      )}
    </div>
  )
}
export default SpellCondition
