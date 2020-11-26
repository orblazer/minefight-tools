import { Attribute as AttributeType, AttributeOperation, EquipmentSlot } from '@/data/minecraft'
import getOrDefault from '@/utils/getOrDefault'
import React from 'react'
import { FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BaseFormFieldProps } from '../form'
import FormField from '../form-field'
import FormSelect, { DefaultOptionType } from '../form-select'
import { OnObjectChange } from '../form-utils'
import MinecraftSelect, { Type } from './minecraft-select'

export interface AttributeData {
  type: AttributeType
  value: number
  uuid?: string
  name?: string
  operation?: AttributeOperation
  slot?: EquipmentSlot
}
export type FullAttributeData = Required<AttributeData>

const Attribute = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  itemAttribute = false,
  excludes = [],
  defaultValue = {},
  onChange
}: BaseFormFieldProps<TFieldValues> & {
  itemAttribute?: boolean
  excludes?: AttributeType[]
  defaultValue?: Partial<AttributeData>
  onChange?: OnObjectChange
}): React.ReactElement | null => {
  const { t } = useTranslation('minecraft')
  const slots: DefaultOptionType[] = [{ label: t('fields.attribute.empty-slot'), value: '' }, ...Type.EquipmentSlot(t)]

  function handleChange(field: string, value: string) {
    typeof onChange === 'function' && onChange(`${name}.${field}`, value)
  }

  return (
    <>
      <div className="columns is-mobile is-multiline">
        <MinecraftSelect
          className="column is-half"
          control={control}
          defaultValue={defaultValue.type}
          type="Attribute"
          name={`${name}.type`}
          id={`${name}.type`}
          label={t('fields.attribute.type')}
          isOptionDisabled={(option) => excludes.includes(option.value as AttributeType)}
          onChange={(option) => handleChange('type', (option as DefaultOptionType).value)}
        />
        {itemAttribute && (
          <>
            <FormField
              className="column is-half"
              control={control}
              defaultValue={defaultValue.uuid}
              type="text"
              name={`${name}.uuid`}
              id={`${name}.uuid`}
              label={t('fields.attribute.uuid')}
              placeholder={t('fields.attribute.uuid')}
              onChange={(e) => handleChange('uuid', e.target.value)}
            />
            <FormField
              className="column is-half"
              control={control}
              defaultValue={defaultValue.name}
              type="text"
              name={`${name}.name`}
              id={`${name}.name`}
              label={t('fields.attribute.name')}
              placeholder={t('fields.attribute.name')}
              onChange={(e) => handleChange('name', e.target.value)}
            />
            <FormSelect
              className="column is-half"
              control={control}
              defaultValue={getOrDefault(defaultValue.slot, '')}
              options={slots}
              name={`${name}.slot`}
              id={`${name}.slot`}
              label={t('fields.attribute.slot')}
              onChange={(option) => handleChange('slot', (option as DefaultOptionType).value)}
            />
            <MinecraftSelect
              className="column is-half"
              control={control}
              defaultValue={getOrDefault(defaultValue.operation, 'add_number')}
              type="AttributeOperation"
              name={`${name}.operation`}
              id={`${name}.operation`}
              label={t('fields.attribute.operation')}
              onChange={(option) => handleChange('operation', (option as DefaultOptionType).value)}
            />
          </>
        )}
        <FormField
          className="column is-half"
          control={control}
          defaultValue={defaultValue.value}
          type="number"
          name={`${name}.value`}
          id={`${name}.value`}
          label={t('fields.attribute.value')}
          placeholder={t('fields.attribute.value')}
          onChange={(e) => handleChange('value', e.target.value)}
        />
      </div>
    </>
  )
}
export default Attribute
