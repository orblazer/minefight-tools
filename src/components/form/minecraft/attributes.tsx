import { Attribute as AttributeType, EAttribute } from '@/data/minecraft'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Control, FieldValues, useFieldArray, useWatch } from 'react-hook-form'
import Attribute, { AttributeData } from './attribute'
import Accordion from '../../accordion'
import { BaseFormFieldProps } from '../form'
import { OnObjectChange } from '../form-utils'

const AttributeValues: ReadonlyArray<AttributeType> = Object.freeze(Object.values(EAttribute))

const AttributeItem = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  itemAttribute,
  excluded = [],
  remove,
  defaultValue,
  onChange
}: BaseFormFieldProps<TFieldValues> & {
  itemAttribute?: boolean
  excluded?: AttributeType[]
  remove: () => void
  defaultValue?: Partial<AttributeData>
  onChange?: OnObjectChange
}): React.ReactElement | null => {
  const { t } = useTranslation('minecraft')
  const watchedItem = useWatch<Partial<AttributeData>>({
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
        t('attributes.block-title', {
          type: t(`attribute.${watchedItem.type.replace(/\./g, '_')}`)
        })
      }
      actions={deleteButton}
    >
      <Attribute
        control={control}
        name={name}
        excludes={excluded.filter((type) => type !== watchedItem.type)}
        defaultValue={watchedItem}
        onChange={onChange}
        itemAttribute={itemAttribute}
      />
    </Accordion>
  )
}

const Attributes = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  itemAttribute = false
}: BaseFormFieldProps<TFieldValues> & { itemAttribute?: boolean }): React.ReactElement | null => {
  const { t } = useTranslation('minecraft')
  const { fields, append, remove } = useFieldArray<AttributeData>({
    name,
    control: control as Control
  })
  const watchedItems = useWatch<AttributeData[]>({
    name,
    defaultValue: [],
    control: control as Control
  })
  const excludedType = useMemo(() => watchedItems.map((field) => field.type), [watchedItems])

  return (
    <>
      <h5 className="title is-5">{t('attributes.title')}</h5>
      {fields.map((item, index) => (
        <AttributeItem
          key={item.id}
          control={control}
          name={`${name}[${index}]`}
          remove={() => remove(index)}
          defaultValue={item}
          excluded={excludedType}
          itemAttribute={itemAttribute}
        />
      ))}

      <button
        type="button"
        className="button is-link"
        onClick={() => {
          append({
            type: AttributeValues.filter((type) => !excludedType.includes(type))[0]
          })
        }}
        disabled={excludedType.length === AttributeValues.length}
      >
        {t('attributes.add')}
      </button>
    </>
  )
}
export default Attributes
