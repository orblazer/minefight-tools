import React from 'react'
import { useTranslation } from 'react-i18next'
import FormField from '@/components/form/form-field'
import { min, integer } from '@/components/form/form-rules'
import { SettingFC } from '..'
import getOrDefault from '@/utils/getOrDefault'

const PREFIX = 'monster-generator.fields.settings.creeper'

export const Checkboxes: SettingFC = ({ control }) => {
  const { t } = useTranslation('invasion')

  return (
    <>
      <FormField
        control={control}
        className="control"
        type="checkbox"
        name="settings.powered"
        label={t(PREFIX + '.powered')}
      />
      <FormField
        control={control}
        className="control"
        type="checkbox"
        name="settings.ignited"
        label={t(PREFIX + '.ignited')}
      />
    </>
  )
}

export const Fields: SettingFC = ({ control }) => {
  const { t } = useTranslation('invasion')

  return (
    <>
      <FormField
        control={control}
        type="number"
        name="settings.fuseTicks"
        defaultValue={getOrDefault(control?.getValues('settings.fuseTicks') as number, 30)}
        min={0}
        step={1}
        label={t(PREFIX + '.fuse-ticks')}
        help={t('tick-help', { ns: 'minecraft' })}
        rules={{
          min: min(0),
          validate: {
            integer
          }
        }}
      />
      <FormField
        control={control}
        type="number"
        name="settings.radius"
        defaultValue={getOrDefault(control?.getValues('settings.radius') as number, 3)}
        min={0}
        step={1}
        label={t(PREFIX + '.radius')}
        rules={{
          min: min(0),
          validate: {
            integer
          }
        }}
      />
    </>
  )
}
