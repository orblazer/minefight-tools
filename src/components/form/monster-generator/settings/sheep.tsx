import React from 'react'
import { useTranslation } from 'react-i18next'
import FormField from '@/components/form/form-field'
import MinecraftSelect from '@/components/form/minecraft/minecraft-select'
import { SettingFC } from '..'

const PREFIX = 'monster-generator.fields.settings.sheep'

export const Checkboxes: SettingFC = ({ control }) => {
  const { t } = useTranslation('invasion')

  return (
    <FormField
      control={control}
      className="control"
      type="checkbox"
      name="settings.sheared"
      label={t(PREFIX + '.sheared')}
    />
  )
}

export const Fields: SettingFC = ({ control }) => {
  const { t } = useTranslation('invasion')

  return (
    <MinecraftSelect control={control} type="Color" name="settings.color" label={t(PREFIX + '.color')} />
  )
}
