import React from 'react'
import { useTranslation } from 'react-i18next'
import { Control, FieldValues, useFieldArray, useWatch } from 'react-hook-form'
import getOrDefault from '@/utils/getOrDefault'
import FormField from '@/components/form/form-field'
import { min, max, integer } from '@/components/form/form-rules'
import { SpellSettings } from '.'
import { BaseFormFieldProps } from '@/components/form/form'
import { OnObjectChange } from '@/components/form/form-utils'
import Accordion from '@/components/accordion'

interface MinionMonsterData {
  type: string
  chance: number
  minAmount: number
  maxAmount: number
}
export interface MinionData {
  invulnerable: boolean
  monsters: MinionMonsterData[]
}

const MonsterItem = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  remove,
  defaultValue = {},
  onChange
}: BaseFormFieldProps<TFieldValues> & {
  remove: () => void
  defaultValue?: Partial<MinionMonsterData>
  onChange?: OnObjectChange
}): React.ReactElement | null => {
  const { t } = useTranslation('invasion')
  const watchedItem = useWatch<Partial<MinionMonsterData>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: name as any,
    defaultValue,
    control: control as Control
  })
  const minAmount = getOrDefault(watchedItem.minAmount, 1)
  const maxAmount = getOrDefault(watchedItem.maxAmount, 1)

  function handleChange(field: string, value: string) {
    typeof onChange === 'function' && onChange(`${name}.${field}`, value)
  }

  const deleteButton = <a className="delete" onClick={() => remove()} title={t('delete', { ns: 'translation' })} />
  return (
    <Accordion
      title={t('monster-generator.fields.spell.minion.monsters.block-title', {
        type: watchedItem.type || 'NONE'
      })}
      actions={deleteButton}
    >
      <div className="columns is-mobile is-multiline">
        <FormField
          className="column is-half"
          control={control}
          defaultValue={watchedItem.type}
          type="text"
          name={`${name}.type`}
          id={`${name}.type`}
          label={t('monster-generator.fields.spell.minion.monsters.type')}
          placeholder={t('monster-generator.fields.spell.minion.monsters.type')}
          rules={{
            required: true,
            pattern: /^[a-z][a-z0-9_-]*$/
          }}
          onChange={(e) => handleChange('speed', e.target.value)}
        />
        <FormField
          className="column is-half"
          control={control}
          defaultValue={getOrDefault(watchedItem.chance, 100)}
          type="number"
          name={`${name}.chance`}
          id={`${name}.chance`}
          min={0}
          max={100}
          step={0.01}
          label={t('monster-generator.fields.spell.minion.monsters.chance')}
          placeholder={t('monster-generator.fields.spell.minion.monsters.chance')}
          rules={{
            min: min(0),
            max: max(100)
          }}
          onChange={(e) => handleChange('chance', e.target.value)}
        />
        <FormField
          className="column is-half"
          control={control}
          defaultValue={minAmount}
          type="number"
          name={`${name}.minAmount`}
          id={`${name}.minAmount`}
          min={1}
          max={maxAmount}
          step={1}
          label={t('monster-generator.fields.spell.minion.monsters.min-amount')}
          placeholder={t('monster-generator.fields.spell.minion.monsters.min-amount')}
          rules={{
            min: min(1),
            max: max(maxAmount),
            validate: {
              integer
            }
          }}
          onChange={(e) => handleChange('minAmount', e.target.value)}
        />
        <FormField
          className="column is-half"
          control={control}
          defaultValue={maxAmount}
          type="number"
          name={`${name}.maxAmount`}
          id={`${name}.maxAmount`}
          min={minAmount}
          step={1}
          label={t('monster-generator.fields.spell.minion.monsters.max-amount')}
          placeholder={t('monster-generator.fields.spell.minion.monsters.max-amount')}
          rules={{
            min: min(minAmount),
            validate: {
              integer
            }
          }}
          onChange={(e) => handleChange('maxAmount', e.target.value)}
        />
      </div>
    </Accordion>
  )
}

const Minions: SpellSettings<MinionData> = ({ control, name, defaultValue = {}, onChange }) => {
  const { t } = useTranslation('invasion')
  const { fields, append, remove } = useFieldArray<MinionMonsterData>({
    name: `${name}.monsters`,
    control: control as Control
  })

  function handleChange(field: string, value: string) {
    typeof onChange === 'function' && onChange(`${name}.${field}`, value)
  }

  return (
    <>
      <div className="field is-grouped is-grouped-multiline mb-4">
        <FormField
          control={control}
          defaultChecked={getOrDefault(defaultValue.invulnerable, false)}
          className="control"
          type="checkbox"
          name={`${name}.invulnerable`}
          label={t('monster-generator.fields.spell.minion.invulnerable')}
          onChange={(e) => handleChange('invulnerable', e.target.value)}
        />
      </div>

      <h6 className="title is-5">{t('monster-generator.fields.spell.minion.monsters.title')}</h6>
      {fields.map((item, index) => (
        <MonsterItem
          key={item.id}
          control={control}
          name={`${name}.monsters[${index}]`}
          remove={() => remove(index)}
          defaultValue={item}
        />
      ))}

      <button type="button" className="button is-link" onClick={() => append({})}>
        {t('monster-generator.fields.spell.minion.monsters.add')}
      </button>
    </>
  )
}
export default Minions
