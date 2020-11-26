import getOrDefault from '@/utils/getOrDefault'
import { graphql, useStaticQuery } from 'gatsby'
import React, { useMemo } from 'react'
import { Control, FieldValues, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BaseFormFieldProps } from '../form'
import FormField from '../form-field'
import { integer, max, min } from '../form-rules'
import { DefaultOptionType } from '../form-select'
import { OnObjectChange } from '../form-utils'
import { AttributeData } from './attribute'
import Attributes from './attributes'
import { EffectData } from './effect'
import Effects from './effects'
import { EnchantmentData } from './enchantment'
import Enchantments from './enchantments'
import MinecraftSelect from './minecraft-select'
import ItemSelect from './select/item-select'

export interface ItemData {
  material: string
  color?: string
  amount?: number
  damage?: number
  attributes: AttributeData[]
  enchantments: EnchantmentData[]
  flags: string[]
  effects?: EffectData[]
}

const colorable = (type: string) => type.includes('leather') || type.includes('potion') || type === 'tipped_arrow'
const damageable = (type: string) =>
  /_(sword|shovel|pickaxe|axe|hoe|helmet|chestplate|leggings|boots)$/.test(type) ||
  [
    'shears',
    'fishing_rod',
    'carrot_on_a_stick',
    'flint_and_steel',
    'bow',
    'trident',
    'elytra',
    'shield',
    'crossbow',
    'warped_fungus_on_a_stick'
  ].includes(type)
const isPotion = (type: string) => type.includes('potion') || type === 'tipped_arrow'

const Item = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  defaultValue = {},
  canAmount = true,
  onChange,
  filterType
}: BaseFormFieldProps<TFieldValues> & {
  defaultValue?: Partial<ItemData>
  canAmount?: boolean
  onChange?: OnObjectChange
  filterType?: ((option: DefaultOptionType, rawInput: string) => boolean) | null
}): React.ReactElement | null => {
  const { t } = useTranslation('minecraft')
  const material = useWatch({
    name: `${name}.material`,
    control: control as Control,
    defaultValue: getOrDefault(defaultValue.material, 'air')
  })
  // Retrieve stack size
  const {
    allMinecraftItem: { nodes: items }
  } = useStaticQuery<GatsbyTypes.MinecraftItemStackSizeQuery>(graphql`
    query MinecraftItemStackSize {
      allMinecraftItem {
        nodes {
          name
          stackSize
        }
      }
    }
  `)
  const stackSize = useMemo(() => items.find((item) => item.name === material)?.stackSize || 0, [items, material])

  function handleChange(field: string, value: string) {
    typeof onChange === 'function' && onChange(`${name}.${field}`, value)
  }

  return (
    <>
      <div className="columns is-mobile is-multiline">
        <ItemSelect
          className="column is-half"
          control={control}
          defaultValue={material}
          name={`${name}.material`}
          id={`${name}.material`}
          label={t('fields.item.material')}
          filterOption={filterType}
          onChange={(option) => handleChange('material', (option as DefaultOptionType).value)}
        />
        {canAmount && stackSize > 1 && (
          <FormField
            className="column is-half"
            control={control}
            type="number"
            defaultValue={getOrDefault(defaultValue.amount, 1)}
            name={`${name}.amount`}
            id={`${name}.amount`}
            label={t('fields.item.amount')}
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
        )}
        {colorable(material) && (
          <FormField
            className="column is-half"
            control={control}
            type="color"
            defaultValue={defaultValue.color}
            name={`${name}.color`}
            id={`${name}.color`}
            label={t('fields.item.color')}
            rules={{
              required: true,
              pattern: /^#([a-f0-9]{6}|[a-f0-9]{3})$/i
            }}
          />
        )}
        {damageable(material) && (
          <FormField
            className="column is-half"
            control={control}
            type="number"
            defaultValue={getOrDefault(defaultValue.damage, 0)}
            name={`${name}.damage`}
            id={`${name}.damage`}
            label={t('fields.item.damage')}
            help={t('fields.item.damage_help')}
            step={1}
            rules={{
              required: true,
              validate: {
                integer
              }
            }}
          />
        )}
        <MinecraftSelect
          className="column is-half"
          control={control}
          type="ItemFlag"
          defaultValue={getOrDefault(defaultValue.flags, [])}
          name={`${name}.flags`}
          id={`${name}.flags`}
          label={t('fields.item.flags')}
          isMulti
          isClearable
          isSearchable={false}
        />
      </div>

      <fieldset name={`${name}.attributes`}>
        <Attributes name={`${name}.attributes`} control={control} itemAttribute />
        <hr />
      </fieldset>

      <fieldset name={`${name}.enchantments`}>
        <Enchantments name={`${name}.enchantments`} control={control} />
      </fieldset>

      {isPotion(material) && (
        <fieldset name={`${name}.effects`}>
          <hr />
          <Effects name={`${name}.effects`} control={control} />
        </fieldset>
      )}
    </>
  )
}
export default Item
