import React from 'react'
import { useTranslation } from 'react-i18next'
import { SettingFC } from '..'
import FormSelect from '../../form-select'

const PREFIX = 'monster-generator.fields.settings.pufferfish'

export const Fields: SettingFC = ({ control }) => {
  const { t } = useTranslation('invasion')

  return (
    <FormSelect
      control={control}
      name="settings.puffState"
      options={[
        { label: t(PREFIX + '.puff-state.state.0'), value: 0 },
        { label: t(PREFIX + '.puff-state.state.1'), value: 1 },
        { label: t(PREFIX + '.puff-state.state.2'), value: 2 }
      ]}
      label={t(PREFIX + '.puff-state.label')}
    />
  )
}
