import React from 'react'
import { useTranslation } from 'react-i18next'
import { Control, FieldValues, useFieldArray, useWatch } from 'react-hook-form'
import { OnObjectChange } from '../../form-utils'
import { BaseFormFieldProps } from '../../form'
import Spell, { SpellData } from './spell'
import Accordion from '@/components/accordion'

const SpellItem = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  remove,
  defaultValue = {},
  onChange
}: BaseFormFieldProps<TFieldValues> & {
  remove: () => void
  defaultValue?: Partial<SpellData>
  onChange?: OnObjectChange
}): React.ReactElement | null => {
  const { t } = useTranslation('invasion')
  const watchedItem = useWatch<Partial<SpellData>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: name as any,
    defaultValue,
    control: control as Control
  })

  const deleteButton = <a className="delete" onClick={() => remove()} title={t('delete', { ns: 'translation' })} />
  return (
    <Accordion
      title={
        watchedItem.spell &&
        t('spells.block-title', {
          type: t(`spell.type.${watchedItem.spell}`)
        })
      }
      actions={deleteButton}
    >
      <Spell control={control} name={name} defaultValue={watchedItem} onChange={onChange} />
    </Accordion>
  )
}

const Spells = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name
}: BaseFormFieldProps<TFieldValues>): React.ReactElement | null => {
  const { t } = useTranslation('invasion')
  const { fields, append, remove } = useFieldArray<SpellData>({
    name,
    control: control as Control
  })

  return (
    <>
      <h5 className="title is-5">{t('spells.title')}</h5>
      {fields.map((item, index) => (
        <SpellItem
          key={item.id}
          control={control}
          name={`${name}[${index}]`}
          remove={() => remove(index)}
          defaultValue={item}
        />
      ))}

      <button
        type="button"
        className="button is-link"
        onClick={() =>
          append({
            spell: 'area_effect'
          })
        }
      >
        {t('spells.add')}
      </button>
    </>
  )
}
export default Spells
