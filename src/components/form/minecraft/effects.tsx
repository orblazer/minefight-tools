import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Control, FieldValues, useFieldArray, useWatch } from 'react-hook-form'
import { fr as dateFr } from 'date-fns/locale'
import Effect, { EffectData } from './effect'
import Accordion from '../../accordion'
import { formatDuration } from '@/utils/date'
import { OnObjectChange } from '../form-utils'
import { EEffectType, EffectType } from '@/data/minecraft'
import { BaseFormFieldProps } from '../form'

const EffectValues: ReadonlyArray<EffectType> = Object.freeze(Object.values(EEffectType))

const EffectItem = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  excluded = [],
  remove,
  defaultValue,
  onChange
}: BaseFormFieldProps<TFieldValues> & {
  excluded?: EffectType[]
  remove: () => void
  defaultValue?: Partial<EffectData>
  onChange?: OnObjectChange
}): React.ReactElement | null => {
  const { t } = useTranslation('minecraft')
  const watchedItem = useWatch<Partial<EffectData>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: name as any,
    defaultValue,
    control: control as Control
  })
  const duration = Number(watchedItem.duration) || 0

  const deleteButton = <a className="delete" onClick={() => remove()} title={t('delete', { ns: 'translation' })} />
  return (
    <Accordion
      title={watchedItem.type && t('effects.block-title', {
        type: t(`effect.${watchedItem.type}`),
        amplifier: (Number(watchedItem.amplifier) || 0) + 1,
        duration: ` (${formatDuration(duration * 50, {
          locale: dateFr,
          zero: duration === 0
        })})`
      })}
      actions={deleteButton}
    >
      <Effect
        control={control}
        name={name}
        excludes={excluded.filter((type) => type !== watchedItem.type)}
        defaultValue={watchedItem}
        onChange={onChange}
      />
    </Accordion>
  )
}

const Effects = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name
}: BaseFormFieldProps<TFieldValues>): React.ReactElement | null => {
  const { t } = useTranslation('minecraft')
  const { fields, append, remove } = useFieldArray<EffectData>({
    name,
    control: control as Control
  })
  const watchedItems = useWatch<EffectData[]>({
    name,
    defaultValue: [],
    control: control as Control
  })
  const excludedType = useMemo(() => watchedItems.map((field) => field.type), [watchedItems])

  return (
    <>
      <h5 className="title is-5">{t('effects.title')}</h5>
      {fields.map((item, index) => (
        <EffectItem
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
            type: EffectValues.filter((type) => !excludedType.includes(type))[0]
          })
        }}
        disabled={excludedType.length === EffectValues.length}
      >
        {t('effects.add')}
      </button>
    </>
  )
}
export default Effects
