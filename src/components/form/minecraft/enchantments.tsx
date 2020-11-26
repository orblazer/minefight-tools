import { Enchantment as EnchantmentType, EEnchantment } from '@/data/minecraft'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Control, FieldValues, useFieldArray, useWatch } from 'react-hook-form'
import Accordion from '../../accordion'
import { BaseFormFieldProps } from '../form'
import { OnObjectChange } from '../form-utils'
import Enchantment, { EnchantmentData } from './enchantment'

const EnchantmentValues: ReadonlyArray<EnchantmentType> = Object.freeze(Object.values(EEnchantment))

const EnchantmentItem = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  excluded = [],
  remove,
  defaultValue,
  onChange
}: BaseFormFieldProps<TFieldValues> & {
  excluded?: string[]
  remove: () => void
  defaultValue?: Partial<EnchantmentData>
  onChange?: OnObjectChange
}): React.ReactElement | null => {
  const { t } = useTranslation('minecraft')
  const watchedItem = useWatch<Partial<EnchantmentData>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: name as any,
    defaultValue,
    control: control as Control
  })

  const deleteButton = <a className="delete" onClick={() => remove()} title={t('delete', { ns: 'translation' })} />
  return (
    <Accordion
      title={
        watchedItem.type &&
        t('enchantments.block-title', {
          type: t(`enchantment.${watchedItem.type}`),
          level: watchedItem.level || 1
        })
      }
      actions={deleteButton}
    >
      <Enchantment
        control={control}
        name={name}
        excludes={excluded.filter((type) => type !== watchedItem.type)}
        defaultValue={watchedItem}
        onChange={onChange}
      />
    </Accordion>
  )
}

const Enchantments = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name
}: BaseFormFieldProps<TFieldValues>): React.ReactElement | null => {
  const { t } = useTranslation('minecraft')
  const { fields, append, remove } = useFieldArray<EnchantmentData>({
    name,
    control: control as Control
  })
  const watchedItems = useWatch<EnchantmentData[]>({
    name,
    defaultValue: [],
    control: control as Control
  })
  const excludedType = useMemo(() => watchedItems.map((field) => field.type), [watchedItems])

  return (
    <>
      <h5 className="title is-5">{t('enchantments.title')}</h5>
      {fields.map((item, index) => (
        <EnchantmentItem
          key={item.id}
          control={control}
          name={`${name}[${index}]`}
          remove={() => remove(index)}
          defaultValue={item}
          excluded={excludedType}
        />
      ))}

      <button
        type="button"
        className="button is-link"
        onClick={() => {
          append({
            type: EnchantmentValues.filter((type) => !excludedType.includes(type))[0]
          })
        }}
        disabled={excludedType.length === EnchantmentValues.length}
      >
        {t('enchantments.add')}
      </button>
    </>
  )
}
export default Enchantments
