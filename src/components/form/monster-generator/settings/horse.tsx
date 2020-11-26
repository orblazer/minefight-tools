import React from 'react'
import { useTranslation } from 'react-i18next'
import MinecraftSelect from '@/components/form/minecraft/minecraft-select'
import { SettingFC } from '..'

const PREFIX = 'monster-generator.fields.settings.horse'

export const Fields: SettingFC = ({ control }) => {
  const { t } = useTranslation('invasion')

  return (
    <>
      <MinecraftSelect
        control={control}
        type="HorseColor"
        name="settings.color"
        label={t(PREFIX + '.color')}
      />
      <MinecraftSelect
        control={control}
        type="HorseStyle"
        name="settings.style"
        label={t(PREFIX + '.style')}
      />
      {/* Horse armor */}
    </>
  )
}
