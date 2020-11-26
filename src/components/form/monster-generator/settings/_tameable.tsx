import React from 'react'
import { useTranslation } from 'react-i18next'
import FormField from '@/components/form/form-field'
import { SettingFC } from '..'

const PREFIX = 'monster-generator.fields.settings._tameable'

export const AvailableEntities: ReadonlyArray<string> = Object.freeze([
  'cat',
  'horse',
  'donkey',
  'mule',
  'skeleton_horse',
  'zombie_horse',
  'llama',
  'trader_llama',
  'parrot',
  'wolf'
])

export const Checkboxes: SettingFC = ({ control }) => {
  const { t } = useTranslation('invasion')

  return (
    <FormField
      control={control}
      className="control"
      type="checkbox"
      name="settings.tamed"
      label={t(PREFIX + '.tamed')}
    />
  )
}
