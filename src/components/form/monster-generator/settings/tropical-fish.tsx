import React from 'react'
import { useTranslation } from 'react-i18next'
import MinecraftSelect from '@/components/form/minecraft/minecraft-select'
import { SettingFC } from '..'

const PREFIX = 'monster-generator.fields.settings.tropical_fish'

export const Fields: SettingFC = ({ control }) => {
  const { t } = useTranslation('invasion')

  return (
    <>
      <MinecraftSelect
        control={control}
        type="TropicalFishType"
        name="settings.pattern"
        label={t(PREFIX + '.pattern')}
      />
      <MinecraftSelect
        control={control}
        type="Color"
        name="settings.patternColor"
        label={t(PREFIX + '.pattern-color')}
      />
      <MinecraftSelect
        control={control}
        type="Color"
        name="settings.bodyColor"
        label={t(PREFIX + '.body-color')}
      />
    </>
  )
}
