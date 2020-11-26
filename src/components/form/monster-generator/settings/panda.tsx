import React from 'react'
import { useTranslation } from 'react-i18next'
import MinecraftSelect from '@/components/form/minecraft/minecraft-select'
import { SettingFC } from '..'

const PREFIX = 'monster-generator.fields.settings.panda'

export const Fields: SettingFC = ({ control }) => {
  const { t } = useTranslation('invasion')

  return (
    <>
      <MinecraftSelect control={control} type="PandaGene" name="settings.gene" label={t(PREFIX + '.gene')} />
      <MinecraftSelect
        control={control}
        type="PandaGene"
        name="settings.hiddenGene"
        label={t(PREFIX + '.hidden-gene')}
      />
    </>
  )
}
