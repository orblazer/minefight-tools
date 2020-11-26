import React from 'react'
import { useTranslation } from 'react-i18next'
import FormField from '@/components/form/form-field'
import { SettingFC } from '..'

const PREFIX = 'monster-generator.fields.settings.snow_golem'

export const Checkboxes: SettingFC = ({ control }) => {
  const { t } = useTranslation('invasion')

  return (
    <FormField
      control={control}
      className="control"
      type="checkbox"
      name="settings.derped"
      label={t(PREFIX + '.derped')}
    />
  )
}
