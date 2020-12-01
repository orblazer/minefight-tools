import React from 'react'
import { useTranslation } from 'react-i18next'
import FormField from '@/components/form/form-field'
import { max, min } from '@/components/form//form-rules'
import { SettingFC } from '..'
import getOrDefault from '@/utils/getOrDefault'

const PREFIX = 'monster-generator.fields.settings.slime'

export const Fields: SettingFC = ({ control }) => {
  const { t } = useTranslation('invasion')

  return (
    <FormField
        control={control}
        type="number"
        name="settings.size"
        defaultValue={getOrDefault(control?.getValues('settings.size') as number, 1)}
        min={1}
        max={256}
        step={1}
        label={t(PREFIX + '.size')}
        rules={{
          min: min(1),
          max: max(256)
        }}
      />
  )
}
