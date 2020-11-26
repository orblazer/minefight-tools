import React from 'react'
import { useTranslation } from 'react-i18next'
import getOrDefault from '@/utils/getOrDefault'
import { EffectData } from '@/components/form/minecraft/effect'
import FormField from '@/components/form/form-field'
import { min } from '@/components/form/form-rules'
import Effects from '@/components/form/minecraft/effects'
import { SpellSettings } from '.'

export interface ArrowData {
  speed: number
  spread: number
  color: string
  effects: EffectData[]
}

const Arrow: SpellSettings<ArrowData> = ({ control, name, defaultValue = {}, onChange }) => {
  const { t } = useTranslation('invasion')

  function handleChange(field: string, value: string) {
    typeof onChange === 'function' && onChange(`${name}.${field}`, value)
  }

  return (
    <>
      <div className="columns is-mobile is-multiline">
        <FormField
          className="column is-half"
          control={control}
          defaultValue={getOrDefault(defaultValue.speed, 0.6)}
          type="number"
          name={`${name}.speed`}
          id={`${name}.speed`}
          min={0}
          step={0.01}
          label={t('monster-generator.fields.spell.arrow.speed')}
          placeholder={t('monster-generator.fields.spell.arrow.speed')}
          rules={{
            min: min(0)
          }}
          onChange={(e) => handleChange('speed', e.target.value)}
        />
        <FormField
          className="column is-half"
          control={control}
          defaultValue={getOrDefault(defaultValue.spread, 12)}
          type="number"
          name={`${name}.spread`}
          id={`${name}.spread`}
          min={0}
          step={0.01}
          label={t('monster-generator.fields.spell.arrow.spread')}
          placeholder={t('monster-generator.fields.spell.arrow.spread')}
          rules={{
            min: min(0)
          }}
          onChange={(e) => handleChange('spread', e.target.value)}
        />
        <FormField
          className="column is-half"
          control={control}
          defaultValue={defaultValue.color}
          type="color"
          name={`${name}.color`}
          id={`${name}.color`}
          label={t('monster-generator.fields.spell.arrow.color')}
          placeholder={t('monster-generator.fields.spell.arrow.color')}
          onChange={(e) => handleChange('color', e.target.value)}
        />
      </div>

      <fieldset name={`${name}.effects`}>
        <Effects control={control} name={`${name}.effects`} />
      </fieldset>
    </>
  )
}
export default Arrow
