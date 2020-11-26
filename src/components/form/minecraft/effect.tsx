import { EffectType } from '@/data/minecraft'
import getOrDefault from '@/utils/getOrDefault'
import React from 'react'
import { FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BaseFormFieldProps } from '../form'
import FormField from '../form-field'
import { integer, max, min } from '../form-rules'
import { DefaultOptionType } from '../form-select'
import { OnObjectChange } from '../form-utils'
import MinecraftSelect from './minecraft-select'

export interface EffectData {
  type: EffectType
  duration: number
  amplifier: number
  ambient: boolean
  particles: boolean
  icon: boolean
}

const Effect = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  excludes = [],
  defaultValue = {},
  onChange
}: BaseFormFieldProps<TFieldValues> & {
  excludes?: EffectType[]
  defaultValue?: Partial<EffectData>
  onChange?: OnObjectChange
}): React.ReactElement | null => {
  const { t } = useTranslation('minecraft')

  function handleChange(field: string, value: string) {
    typeof onChange === 'function' && onChange(`${name}.${field}`, value)
  }

  return (
    <>
      <MinecraftSelect
        control={control}
        defaultValue={defaultValue.type}
        type="Effect"
        name={`${name}.type`}
        id={`${name}.type`}
        label={t('fields.effect.type')}
        isOptionDisabled={(option) => excludes.includes(option.value as EffectType)}
        onChange={(option) => handleChange('type', (option as DefaultOptionType).value)}
      />
      <div className="columns">
        <FormField
          className="column"
          control={control}
          defaultValue={getOrDefault(defaultValue.duration, 0)}
          type="number"
          name={`${name}.duration`}
          id={`${name}.duration`}
          min={0}
          step={1}
          label={t('fields.effect.duration')}
          placeholder={t('fields.effect.duration')}
          help={t('tick-help')}
          rules={{
            min: min(0),
            validate: integer
          }}
          onChange={(e) => handleChange('duration', e.target.value)}
        />
        <FormField
          className="column"
          control={control}
          defaultValue={getOrDefault(defaultValue.amplifier, 0)}
          type="number"
          name={`${name}.amplifier`}
          id={`${name}.amplifier`}
          min={0}
          max={255}
          step={1}
          label={t('fields.effect.amplifier')}
          placeholder={t('fields.effect.amplifier')}
          rules={{
            min: min(0),
            max: max(255),
            validate: integer
          }}
          onChange={(e) => handleChange('amplifier', e.target.value)}
        />
      </div>

      <div className="field is-grouped is-grouped-multiline mb-4">
        <FormField
          control={control}
          defaultChecked={getOrDefault(defaultValue.ambient, true)}
          type="checkbox"
          name={`${name}.ambient`}
          id={`${name}.ambient`}
          className="control"
          label={t('fields.effect.ambient')}
          onChange={(e) => handleChange('ambient', e.target.value)}
        />
        <FormField
          control={control}
          defaultChecked={getOrDefault(defaultValue.particles, true)}
          type="checkbox"
          name={`${name}.particles`}
          id={`${name}.particles`}
          className="control"
          label={t('fields.effect.particles')}
          onChange={(e) => handleChange('particles', e.target.value)}
        />
        <FormField
          control={control}
          defaultChecked={getOrDefault(defaultValue.icon, true)}
          type="checkbox"
          name={`${name}.icon`}
          id={`${name}.icon`}
          className="control"
          label={t('fields.effect.icon')}
          onChange={(e) => handleChange('icon', e.target.value)}
        />
      </div>
    </>
  )
}
export default Effect
