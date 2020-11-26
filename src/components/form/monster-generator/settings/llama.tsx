import React from 'react'
import { useTranslation } from 'react-i18next'
import MinecraftSelect from '@/components/form/minecraft/minecraft-select'
import { SettingFC } from '..'
import FormField from '../../form-field'
import { min, max, integer } from '../../form-rules'

const PREFIX = 'monster-generator.fields.settings.llama'

export const Fields: SettingFC = ({ control }) => {
  const { t } = useTranslation('invasion')

  return (
    <>
      <FormField
        control={control}
        type="number"
        name="settings.strength"
        min={1}
        max={5}
        step={1}
        value={3}
        label={t(PREFIX + '.strength')}
        rules={{
          min: min(1),
          max: max(5),
          validate: {
            integer
          }
        }}
      />
      <MinecraftSelect control={control} type="LlamaColor" name="settings.color" label={t(PREFIX + '.color')} />
      <MinecraftSelect control={control} type="Color" name="settings.decor" label={t(PREFIX + '.decor')} />
    </>
  )
}
