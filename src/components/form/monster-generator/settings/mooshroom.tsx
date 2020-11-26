import React from 'react'
import { useTranslation } from 'react-i18next'
import MinecraftSelect from '@/components/form/minecraft/minecraft-select'
import { SettingFC } from '..'

const PREFIX = 'monster-generator.fields.settings.mooshroom'

export const Fields: SettingFC = ({ control }) => {
  const { t } = useTranslation('invasion')

  return (
    <MinecraftSelect control={control} type="MooshroomVariant" name="settings.variant" label={t(PREFIX + '.variant')} />
  )
}
