import React from 'react'
import { useTranslation } from 'react-i18next'
import getOrDefault from '@/utils/getOrDefault'
import FormField from '@/components/form/form-field'
import { min } from '@/components/form/form-rules'
import { SpellSettings } from '.'

export interface TeleportData {
  radius: number
}

const Teleport: SpellSettings<TeleportData> = ({ control, name, defaultValue = {}, onChange }) => {
  const { t } = useTranslation('invasion')

  function handleChange(field: string, value: string) {
    typeof onChange === 'function' && onChange(`${name}.${field}`, value)
  }

  return (
    <div className="columns is-mobile is-multiline">
      <FormField
        className="column is-half"
        control={control}
        defaultValue={getOrDefault(defaultValue.radius, 256)}
        type="number"
        name={`${name}.radius`}
        id={`${name}.radius`}
        min={0}
        step={0.01}
        label={t('monster-generator.fields.spell.teleport.radius')}
        placeholder={t('monster-generator.fields.spell.teleport.radius')}
        rules={{
          min: min(0)
        }}
        onChange={(e) => handleChange('radius', e.target.value)}
      />
    </div>
  )
}
export default Teleport
