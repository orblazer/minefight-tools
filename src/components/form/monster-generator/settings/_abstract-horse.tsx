import React from 'react'
import { Control, FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import FormField from '@/components/form/form-field'

const PREFIX = 'monster-generator.fields.settings.horse'

export const AvailableEntities: ReadonlyArray<string> = Object.freeze([
  'horse',
  'donkey',
  'mule',
  'skeleton_horse',
  'zombie_horse',
  'llama',
  'trader_llama'
])

export const Checkboxes = <TFieldValues extends FieldValues = FieldValues>({
  control,
  canChest = false
}: {
  control?: Control<TFieldValues>
  canChest?: boolean
}): React.ReactElement => {
  const { t } = useTranslation('invasion')

  return (
    <>
      {canChest && (
        <FormField
          control={control}
          className="control"
          type="checkbox"
          name="settings.chest"
          label={t(PREFIX + '.chest')}
        />
      )}
    </>
  )
}
