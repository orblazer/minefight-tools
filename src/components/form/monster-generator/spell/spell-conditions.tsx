import React, { useMemo } from 'react'
import { Control, FieldValues, useFieldArray, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Accordion from '@/components/accordion'
import { ESpellCondition, SpellCondition as SpellConditionType } from '@/data/invasion'
import { BaseFormFieldProps } from '../../form'
import { OnObjectChange } from '../../form-utils'
import SpellCondition, { SpellConditionData } from './spell-condition'

const SpellConditionValues: ReadonlyArray<SpellConditionType> = Object.freeze(Object.values(ESpellCondition))

const SpellConditionItem = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  excluded = [],
  remove,
  defaultValue,
  onChange
}: BaseFormFieldProps<TFieldValues> & {
  excluded?: SpellConditionType[]
  remove: () => void
  defaultValue?: Partial<SpellConditionData>
  onChange?: OnObjectChange
}): React.ReactElement | null => {
  const { t } = useTranslation('invasion')
  const watchedItem = useWatch<Partial<SpellConditionData>>({
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
        t('monster-generator.fields.spell.conditions.block-title', {
          type: t(`spell.condition.${watchedItem.type}`)
        })
      }
      actions={deleteButton}
    >
      <SpellCondition
        control={control}
        name={name}
        excludes={excluded.filter((type) => type !== watchedItem.type)}
        defaultValue={watchedItem as SpellConditionData}
        onChange={onChange}
      />
    </Accordion>
  )
}

const SpellConditions = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name
}: BaseFormFieldProps<TFieldValues>): React.ReactElement | null => {
  const { t } = useTranslation('invasion')
  const { fields, append, remove } = useFieldArray<SpellConditionData>({
    name: name,
    control: control as Control
  })
  const watchedItems = useWatch<SpellConditionData[]>({
    name: name,
    defaultValue: [],
    control: control as Control
  })
  const excludedType = useMemo(() => watchedItems.map((field) => field.type), [watchedItems])

  return (
    <>
      <h5 className="title is-5">{t('monster-generator.fields.spell.conditions.title')}</h5>
      {fields.map((item, index) => (
        <SpellConditionItem
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
            type: SpellConditionValues.filter((type) => !excludedType.includes(type))[0]
          })
        }}
        disabled={excludedType.length === SpellConditionValues.length}
      >
        {t('monster-generator.fields.spell.conditions.add')}
      </button>
    </>
  )
}
export default SpellConditions
