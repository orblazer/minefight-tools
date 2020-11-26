import React from 'react'
import * as Minecraft from '@/data/minecraft'
import { createLocalizedOptions } from '../form-utils'
import { FieldValues } from 'react-hook-form'
import { graphql, useStaticQuery } from 'gatsby'
import { useTranslation } from 'react-i18next'
import FormSelect, { DefaultOptionType, FormSelectPropsWithoutOptions } from '../form-select'
import ItemSelect from './select/item-select'

export const Type = Object.freeze({
  EntityType: null,
  Effect: null,
  Enchantment: null,
  Item: null,
  Attribute: createLocalizedOptions(Minecraft.EAttribute, 'attribute'),
  AttributeOperation: createLocalizedOptions(Minecraft.EAttributeOperation, 'attribute.operation'),
  Color: createLocalizedOptions(Minecraft.EColor, 'color'),
  EquipmentSlot: createLocalizedOptions(Minecraft.EEquipmentSlot, 'equipment-slot'),
  CatType: createLocalizedOptions(Minecraft.ECatType, 'entity.cat.type'),
  FoxType: createLocalizedOptions(Minecraft.EFoxType, 'entity.fox.type'),
  HorseColor: createLocalizedOptions(Minecraft.EHorseColor, 'entity.horse.color'),
  HorseStyle: createLocalizedOptions(Minecraft.EHorseStyle, 'entity.horse.style'),
  LlamaColor: createLocalizedOptions(Minecraft.ELlamaColor, 'entity.llama.color'),
  MooshroomVariant: createLocalizedOptions(Minecraft.EMooshroomVariant, 'entity.mooshroom.variant'),
  PandaGene: createLocalizedOptions(Minecraft.EPandaGene, 'entity.panda.gene'),
  ParrotVariant: createLocalizedOptions(Minecraft.EParrotVariant, 'entity.parrot.variant'),
  RabbitType: createLocalizedOptions(Minecraft.ERabbitType, 'entity.rabbit.type'),
  TropicalFishType: createLocalizedOptions(Minecraft.ETropicalFishType, 'entity.tropical_fish.type'),
  VillagerType: createLocalizedOptions(Minecraft.EVillagerType, 'entity.villager.type'),
  VillagerProfession: createLocalizedOptions(Minecraft.EVillagerProfession, 'entity.villager'),
  ItemFlag: createLocalizedOptions(Minecraft.EItemFlag, 'item-flag'),
  Particle: createLocalizedOptions(Minecraft.EParticle, 'particle')
})

export type MinecraftSelectProps<TFieldValues extends FieldValues = FieldValues> = FormSelectPropsWithoutOptions<
  DefaultOptionType,
  TFieldValues
> & { type: keyof typeof Type }
const MinecraftSelect = <TFieldValues extends FieldValues = FieldValues>({
  type,
  ...fieldProps
}: MinecraftSelectProps<TFieldValues>): React.ReactElement => {
  const {
    allMinecraftEntity: { nodes: minecraftEntities },
    allMinecraftEffect: { nodes: minecraftEffects },
    allMinecraftEnchantment: { nodes: minecraftEnchantments }
  } = useStaticQuery<GatsbyTypes.EntityAndEffectSelectQuery>(graphql`
    query EntityAndEffectSelect {
      allMinecraftEntity(filter: { type: { eq: "mob" } }) {
        nodes {
          name
        }
      }
      allMinecraftEffect {
        nodes {
          name
        }
      }
      allMinecraftEnchantment {
        nodes {
          name
        }
      }
    }
  `)
  const { t } = useTranslation('minecraft')
  let options: DefaultOptionType[] = []

  if (type === 'EntityType') {
    options = minecraftEntities.map(({ name }) => ({
      label: t([`entity.${name}.name`, `entity.${name}`]),
      value: name
    }))
  } else if (type === 'Effect') {
    options = minecraftEffects.map(({ name }) => ({
      label: t(`effect.${name}`),
      value: name
    }))
  } else if (type === 'Enchantment') {
    options = minecraftEnchantments.map(({ name }) => ({
      label: t(`enchantment.${name}`),
      value: name
    }))
  } else if (type === 'Item') {
    return <ItemSelect {...fieldProps} />
  } else {
    options = Type[type](t)
  }

  return <FormSelect options={options} {...fieldProps} />
}
export default MinecraftSelect
