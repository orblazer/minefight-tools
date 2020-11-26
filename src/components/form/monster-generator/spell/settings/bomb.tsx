import React from 'react'
import { useTranslation } from 'react-i18next'
import getOrDefault from '@/utils/getOrDefault'
import FormField from '@/components/form/form-field'
import { min, integer } from '@/components/form/form-rules'
import { SpellSettings } from '.'
import { Control, useWatch } from 'react-hook-form'

export interface BombData {
  delay: number
  yield: number
  incendiary: boolean
  fireTicks?: number
}

const Bomb: SpellSettings<BombData> = ({ control, name, defaultValue = {}, onChange }) => {
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
          defaultValue={getOrDefault(defaultValue.delay, 120)}
          type="number"
          name={`${name}.delay`}
          id={`${name}.delay`}
          min={0}
          step={1}
          label={t('monster-generator.fields.spell.bomb.delay')}
          placeholder={t('monster-generator.fields.spell.bomb.delay')}
          help={t('tick-help', { ns: 'minecraft' })}
          rules={{
            min: min(0),
            validate: {
              integer
            }
          }}
          onChange={(e) => handleChange('delay', e.target.value)}
        />
        <FormField
          className="column is-half"
          control={control}
          defaultValue={getOrDefault(defaultValue.yield, 4)}
          type="number"
          name={`${name}.yield`}
          id={`${name}.yield`}
          min={0}
          step={0.01}
          label={t('monster-generator.fields.spell.bomb.yield')}
          placeholder={t('monster-generator.fields.spell.bomb.yield')}
          rules={{
            min: min(0)
          }}
          onChange={(e) => handleChange('yield', e.target.value)}
        />
      </div>

      <FormField
        control={control}
        defaultChecked={incendiary}
        className="control"
        type="checkbox"
        name={`${name}.incendiary`}
        label={t('monster-generator.fields.spell.bomb.incendiary')}
        onChange={(e) => handleChange('incendiary', e.target.value)}
      />
      {incendiary && (
        <FormField
          control={control}
          defaultValue={getOrDefault(defaultValue.fireTicks, 0)}
          type="number"
          name={`${name}.fireTicks`}
          id={`${name}.fireTicks`}
          min={0}
          step={1}
          label={t('monster-generator.fields.spell.bomb.fire-ticks')}
          placeholder={t('monster-generator.fields.spell.bomb.fire-ticks')}
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
export default Bomb
