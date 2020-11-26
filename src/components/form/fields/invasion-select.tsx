import React from 'react'
import * as Invasion from '@/data/invasion'
import { FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { createLocalizedOptions } from '../form-utils'
import FormSelect, { DefaultOptionType, FormSelectPropsWithoutOptions } from '../form-select'

export const Options = Object.freeze({
  SpawnType: createLocalizedOptions(Invasion.SpawnType, 'spawn-type')
})

export type InvasionSelectProps<TFieldValues extends FieldValues = FieldValues> = FormSelectPropsWithoutOptions<
  DefaultOptionType,
  TFieldValues
> & { options: keyof typeof Options }
const InvasionSelect = <TFieldValues extends FieldValues = FieldValues>({
  options,
  ...fieldProps
}: InvasionSelectProps<TFieldValues>): React.ReactElement | null => {
  const { t } = useTranslation('invasion')
  return <FormSelect options={Options[options](t)} {...fieldProps} />
}
export default InvasionSelect
