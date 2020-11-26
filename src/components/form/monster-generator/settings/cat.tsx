import React from 'react'
import { useTranslation } from 'react-i18next'
import MinecraftSelect from '@/components/form/minecraft/minecraft-select'
import { SettingFC } from '..'

const PREFIX = 'monster-generator.fields.settings.cat'

export const Fields: SettingFC = ({ control }) => {
  const { t } = useTranslation('invasion')

  return (
    <>
      <MinecraftSelect control={control} type="CatType" name="settings.type" label={t(PREFIX + '.type')} />
      <MinecraftSelect control={control} type="Color" name="settings.collarColor" label={t(PREFIX + '.collar-color')} />
    </>
  )
}
