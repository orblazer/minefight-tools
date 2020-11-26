import React from 'react'
import { useTranslation } from 'react-i18next'
import MinecraftSelect from '@/components/form/minecraft/minecraft-select'
import { SettingFC } from '..'

const PREFIX = 'monster-generator.fields.settings.villager'

export const Fields: SettingFC = ({ control }) => {
  const { t } = useTranslation('invasion')

  return (
    <>
      <MinecraftSelect
        control={control}
        type="VillagerType"
        name="settings.type"
        label={t(PREFIX + '.type')}
      />
      <MinecraftSelect
        control={control}
        type="VillagerProfession"
        name="settings.profession"
        label={t(PREFIX + '.profession')}
      />
    </>
  )
}
