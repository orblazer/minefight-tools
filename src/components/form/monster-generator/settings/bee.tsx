import React from 'react'
import { useTranslation } from 'react-i18next'
import FormField from '@/components/form/form-field'
import { SettingFC } from '..'

const PREFIX = 'monster-generator.fields.settings.bee'

export const Checkboxes: SettingFC = ({ control }) => {
  const { t } = useTranslation('invasion')

  return (
    <>
      <FormField
        control={control}
        className="control"
        type="checkbox"
        name="settings.anger"
        label={t(PREFIX + '.anger')}
      />
      <FormField
        control={control}
        className="control"
        type="checkbox"
        name="settings.nectar"
        label={t(PREFIX + '.nectar')}
      />
      <FormField
        control={control}
        className="control"
        type="checkbox"
        name="settings.stung"
        label={t(PREFIX + '.stung')}
      />
    </>
  )
}
