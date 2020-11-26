import React from 'react'
import { useTranslation } from 'react-i18next'
import getOrDefault from '@/utils/getOrDefault'
import FormField from '@/components/form/form-field'
import { min, max, integer } from '@/components/form/form-rules'
import { SpellSettings } from '.'

export interface ThrowData {
  duration: number
  amplifier: number
}

const Throw: SpellSettings<ThrowData> = ({ control, name, defaultValue = {}, onChange }) => {
  const { t } = useTranslation('invasion')

  function handleChange(field: string, value: string) {
    typeof onChange === 'function' && onChange(`${name}.${field}`, value)
  }

  return (
    <div className="columns is-mobile is-multiline">
      <FormField
        className="column is-half"
        control={control}
        defaultValue={getOrDefault(defaultValue.duration, 20)}
        type="number"
        name={`${name}.duration`}
        id={`${name}.duration`}
        min={0}
        step={1}
        label={t('monster-generator.fields.spell.throw.duration')}
        placeholder={t('monster-generator.fields.spell.throw.duration')}
        help={t('tick-help', { ns: 'minecraft' })}
        rules={{
          min: min(0),
          validate: {
            integer
          }
        }}
        onChange={(e) => handleChange('duration', e.target.value)}
      />
      <FormField
        className="column is-half"
        control={control}
        defaultValue={getOrDefault(defaultValue.amplifier, 10)}
        type="number"
        name={`${name}.amplifier`}
        id={`${name}.amplifier`}
        min={0}
        max={255}
        step={1}
        label={t('monster-generator.fields.spell.throw.amplifier')}
        placeholder={t('monster-generator.fields.spell.throw.amplifier')}
        rules={{
          min: min(0),
          max: max(255),
          validate: {
            integer
          }
        }}
        onChange={(e) => handleChange('amplifier', e.target.value)}
      />
    </div>
  )
}
export default Throw
