import React from 'react'
import { useTranslation } from 'react-i18next'
import getOrDefault from '@/utils/getOrDefault'
import FormField from '@/components/form/form-field'
import { min, integer } from '@/components/form/form-rules'
import { SpellSettings } from '.'
import { Control, useWatch } from 'react-hook-form'

export interface FireballData {
  small: boolean
  yield: number
  incendiary: boolean
  fireTicks?: number
}

const Fireball: SpellSettings<FireballData> = ({ control, name, defaultValue = {}, onChange }) => {
  const { t } = useTranslation('invasion')
  const incendiary = useWatch({
    name: `${name}.incendiary`,
    control: control as Control,
    defaultValue: getOrDefault(defaultValue.incendiary, false)
  })

  function handleChange(field: string, value: string) {
    typeof onChange === 'function' && onChange(`${name}.${field}`, value)
  }

  return (
    <>
      <div className="columns is-mobile is-multiline">
        <FormField
          className="column is-half"
          control={control}
          defaultValue={getOrDefault(defaultValue.yield, 4)}
          type="number"
          name={`${name}.yield`}
          id={`${name}.yield`}
          min={0}
          step={0.01}
          label={t('monster-generator.fields.spell.fireball.yield')}
          placeholder={t('monster-generator.fields.spell.fireball.yield')}
          rules={{
            min: min(0)
          }}
          onChange={(e) => handleChange('yield', e.target.value)}
        />
      </div>

      <div className="field is-grouped is-grouped-multiline mb-4">
        <FormField
          control={control}
          defaultChecked={getOrDefault(defaultValue.small, false)}
          className="control"
          type="checkbox"
          name={`${name}.small`}
          label={t('monster-generator.fields.spell.fireball.small')}
          onChange={(e) => handleChange('small', e.target.value)}
        />
        <FormField
          control={control}
          defaultChecked={incendiary}
          className="control"
          type="checkbox"
          name={`${name}.incendiary`}
          label={t('monster-generator.fields.spell.fireball.incendiary')}
          onChange={(e) => handleChange('incendiary', e.target.value)}
        />
      </div>
      {incendiary && (
        <FormField
          control={control}
          defaultValue={getOrDefault(defaultValue.fireTicks, 0)}
          type="number"
          name={`${name}.fireTicks`}
          id={`${name}.fireTicks`}
          min={0}
          step={1}
          label={t('monster-generator.fields.spell.fireball.fire-ticks')}
          placeholder={t('monster-generator.fields.spell.fireball.fire-ticks')}
          help={t('tick-help', { ns: 'minecraft' })}
          rules={{
            min: min(0),
            validate: {
              integer
            }
          }}
          onChange={(e) => handleChange('fireTicks', e.target.value)}
        />
      )}
    </>
  )
}
export default Fireball
