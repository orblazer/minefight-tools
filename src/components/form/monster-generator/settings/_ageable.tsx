import React from 'react'
import { useTranslation } from 'react-i18next'
import FormField from '@/components/form/form-field'
import { SettingFC } from '..'

const PREFIX = 'monster-generator.fields.settings._ageable'

export const AvailableEntities: ReadonlyArray<string> = Object.freeze([
  'bee',
  'cat',
  'chicken',
  'cow',
  'drowned',
  'fox',
  'horse',
  'donkey',
  'mule',
  'skeleton_horse',
  'zombie_horse',
  'llama',
  'trader_llama',
  'mooshroom',
  'ocelot',
  'panda',
  'pig',
  'zombified_piglin',
  'polar_bear',
  'rabbit',
  'salmon',
  'sheep',
  'turtle',
  'villager',
  'wolf',
  'zombie',
  'husk',
  'zombie_villager',
  'hoglin',
  'piglin',
  'piglin_brute',
  'strider',
  'zoglin'
])

export const Checkboxes: SettingFC = ({ control }) => {
  const { t } = useTranslation('invasion')

  return (
    <FormField control={control} className="control" type="checkbox" name="settings.baby" label={t(PREFIX + '.baby')} />
  )
}
