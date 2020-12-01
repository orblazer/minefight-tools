import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Control, FieldValues, useFieldArray, useWatch } from 'react-hook-form'
import Accordion from '../../accordion'
import { OnObjectChange } from '../form-utils'
import { BaseFormFieldProps } from '../form'
import Item, { ItemData } from '../minecraft/item'
import { DefaultOptionType } from '../form-select'
import FormField from '../form-field'
import { graphql, useStaticQuery } from 'gatsby'
import getOrDefault from '@/utils/getOrDefault'
import { max, min, integer } from '../form-rules'

export interface EquipmentData {
  item: ItemData
  dropChance: number
  minAmount?: number
  maxAmount?: number
}

const EquipmentItem = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  remove,
  defaultValue,
  onChange,
  filterType
}: BaseFormFieldProps<TFieldValues> & {
  remove: () => void
  defaultValue?: Partial<EquipmentData>
  onChange?: OnObjectChange
  filterType?: ((option: DefaultOptionType, rawInput: string) => boolean) | null
}): React.ReactElement | null => {
  const { t } = useTranslation('minecraft')
  const watchedItem = useWatch<Partial<EquipmentData>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: name as any,
    defaultValue,
    control: control as Control
  })
  // Retrieve stack size
  const {
    allMinecraftItem: { nodes: items }
  } = useStaticQuery<GatsbyTypes.EquipmentMinecraftItemStackSizeQuery>(graphql`
    query EquipmentMinecraftItemStackSize {
      allMinecraftItem {
        nodes {
          name
          stackSize
        }
      }
    }
  `)
  const stackSize = useMemo(() => items.find((item) => item.name === watchedItem?.item?.material)?.stackSize || 0, [
    items,
    watchedItem?.item?.material
  ])

  const deleteButton = <a className="delete" onClick={() => remove()} title={t('delete', { ns: 'translation' })} />
  return (
    <Accordion
      title={t('equipments.block-title', {
        type: t(
          watchedItem && watchedItem.item && watchedItem.item.material
            ? [
                `item.${watchedItem.item.material}.name`,
                `item.${watchedItem.item.material}`,
                `block.${watchedItem.item.material}.name`,
                `block.${watchedItem.item.material}`
              ]
            : 'block.air'
        )
      })}
      actions={deleteButton}
    >
      <Item
        control={control}
        name={`${name}.item`}
        defaultValue={watchedItem.item as ItemData}
        onChange={onChange}
        filterType={filterType}
        canAmount={false}
      />
      <hr />
      <FormField
        control={control}
        type="number"
        defaultValue={getOrDefault(watchedItem.dropChance, 100)}
        name={`${name}.dropChance`}
        id={`${name}.dropChance`}
        label={t('fields.equipment.drop-chance')}
        help={t('chance-help', { ns: 'translation' })}
        min={0}
        max={100}
        step={0.01}
        rules={{
          required: true,
          min: min(0),
          max: max(100)
        }}
      />
      {stackSize > 1 && (
        <div className="columns is-mobile is-multiline">
          <FormField
            className="column is-half"
            control={control}
            type="number"
            defaultValue={getOrDefault(watchedItem.minAmount, 1)}
            name={`${name}.minAmount`}
            id={`${name}.minAmount`}
            label={t('fields.equipment.min-amount')}
            step={1}
            min={1}
            max={stackSize}
            rules={{
              required: true,
              min: min(1),
              max: max(stackSize),
              validate: {
                integer
              }
            }}
          />
          <FormField
            className="column is-half"
            control={control}
            type="number"
            defaultValue={getOrDefault(watchedItem.maxAmount, 1)}
            name={`${name}.maxAmount`}
            id={`${name}.maxAmount`}
            label={t('fields.equipment.max-amount')}
            step={1}
            min={getOrDefault(watchedItem.minAmount, 1)}
            max={stackSize}
            rules={{
              required: true,
              min: min(getOrDefault(watchedItem.minAmount, 1)),
              max: max(stackSize),
              validate: {
                integer
              }
            }}
          />
        </div>
      )}
    </Accordion>
  )
}

const Equipment = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name
}: BaseFormFieldProps<TFieldValues>): React.ReactElement | null => {
  const { t } = useTranslation('minecraft')
  const { fields, append, remove } = useFieldArray<EquipmentData>({
    name,
    control: control as Control
  })

  return (
    <>
      <h5 className="title is-5">{t('equipments.title')}</h5>
      {fields.map((item, index) => (
        <EquipmentItem
          key={item.id}
          control={control}
          name={`${name}[${index}]`}
          remove={() => remove(index)}
          defaultValue={item}
        />
      ))}

      <button type="button" className="button is-link" onClick={() => append({})}>
        {t('equipments.add')}
      </button>
    </>
  )
}
export default Equipment
