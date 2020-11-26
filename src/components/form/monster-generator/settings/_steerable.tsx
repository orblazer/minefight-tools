import React from 'react'
import { useTranslation } from 'react-i18next'
import FormField from '@/components/form/form-field'
import { SettingFC } from '..'

const PREFIX = 'monster-generator.fields.settings.horse'

export const AvailableEntities: ReadonlyArray<string> = Object.freeze([
  'horse',
  'donkey',
  'mule',
  'skeleton_horse',
  'zombie_horse',
  'llama',
  'trader_llama',
  'pig',
  'strider'
])

export const Checkboxes: SettingFC = ({ control }) => {
  const { t } = useTranslation('invasion')

  return (
    <FormField
      control={control}
      className="control"
      type="checkbox"
      name="settings.saddle"
      label={t(PREFIX + '.saddle')}
    />
  )
}
