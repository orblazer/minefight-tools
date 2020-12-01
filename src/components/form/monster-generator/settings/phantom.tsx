import React from 'react'
import { useTranslation } from 'react-i18next'
import FormField from '@/components/form/form-field'
import { max, min } from '@/components/form/form-rules'
import { SettingFC } from '..'
import getOrDefault from '@/utils/getOrDefault'

const PREFIX = 'monster-generator.fields.settings.phantom'

export const Fields: SettingFC = ({ control }) => {
  const { t } = useTranslation('invasion')

  return (
    <FormField
        control={control}
        type="number"
        name="settings.size"
        defaultValue={getOrDefault(control?.getValues('settings.size') as number, 0)}
        min={0}
        max={64}
        step={1}
        label={t(PREFIX + '.size')}
        rules={{
          min: min(0),
          max: max(64)
        }}
      />
  )
}
