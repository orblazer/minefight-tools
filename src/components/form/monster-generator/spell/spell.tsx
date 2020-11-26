import React, { useEffect } from 'react'
import { Control, FieldValues, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { SpellType } from '@/data/invasion'
import { BaseFormFieldProps } from '../../form'
import { OnObjectChange } from '../../form-utils'
import { SpellConditionData } from './spell-condition'
import FormSelect, { DefaultOptionType } from '../../form-select'
import getOrDefault from '@/utils/getOrDefault'
import SpellConditions from './spell-conditions'
import FormField from '../../form-field'
import { max, min, integer } from '../../form-rules'
import Settings, { SpellSettings as SpellSettingsElem } from './settings'

export interface SpellData {
  spell: SpellType
  chance: number
  castDuration: number
  cooldown: number
  conditions: SpellConditionData[]
  settings: Record<string, unknown>
}

const SpellSettings: Record<SpellType, SpellSettingsElem<unknown> | null> = {
  area_effect: Settings.AreaEffect,
  arrow: Settings.Arrow,
  bomb: Settings.Bomb,
  fireball: Settings.Fireball,
  lightning: null,
  teleport: Settings.Teleport,
  throw: Settings.Throw,
  enderman: Settings.Teleport,
  disarm: null,
  minions: Settings.Minions,
  fangs: null
}

const Spell = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  defaultValue = {},
  onChange
}: BaseFormFieldProps<TFieldValues> & {
  defaultValue?: Partial<SpellData>
  onChange?: OnObjectChange
}): React.ReactElement | null => {
  const { t } = useTranslation('invasion')
  const spell = useWatch({
    name: `${name}.spell`,
    control: control as Control,
    defaultValue: getOrDefault(defaultValue.spell, 'area_effect')
  })

  useEffect(() => {
    ;(control as Control)?.setValue(`${name}.settings`, {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spell])

  function handleChange(field: string, value: string) {
    typeof onChange === 'function' && onChange(`${name}.${field}`, value)
  }

  return (
    <>
      <div className="columns is-mobile is-multiline">
        <FormSelect<{ value: SpellType; label: string }>
          className="column is-half"
          control={control as Control}
          defaultValue={spell}
          options={[
            { value: 'area_effect', label: t('spell.type.area_effect') },
            { value: 'arrow', label: t('spell.type.arrow') },
            { value: 'bomb', label: t('spell.type.bomb') },
            { value: 'disarm', label: t('spell.type.disarm') },
            { value: 'enderman', label: t('spell.type.enderman') },
            { value: 'fangs', label: t('spell.type.fangs') },
            { value: 'fireball', label: t('spell.type.fireball') },
            { value: 'lightning', label: t('spell.type.lightning') },
            { value: 'minions', label: t('spell.type.minions') },
            { value: 'teleport', label: t('spell.type.teleport') },
            { value: 'throw', label: t('spell.type.throw') }
          ]}
          name={`${name}.spell`}
          id={`${name}.spell`}
          label={t('monster-generator.fields.spell.spell')}
          onChange={(option) => handleChange('spell', (option as DefaultOptionType).value)}
        />
        <FormField
          className="column is-half"
          control={control}
          defaultValue={getOrDefault(defaultValue.chance, 0)}
          type="number"
          name={`${name}.chance`}
          id={`${name}.chance`}
          min={0}
          max={100}
          step={0.01}
          label={t('monster-generator.fields.spell.chance')}
          placeholder={t('monster-generator.fields.spell.chance')}
          rules={{
            min: min(0),
            max: max(100)
          }}
          onChange={(e) => handleChange('chance', e.target.value)}
        />
        <FormField
          className="column is-half"
          control={control}
          defaultValue={getOrDefault(defaultValue.castDuration, 0)}
          type="number"
          name={`${name}.castDuration`}
          id={`${name}.castDuration`}
          min={0}
          step={1}
          label={t('monster-generator.fields.spell.cast-duration')}
          placeholder={t('monster-generator.fields.spell.cast-duration')}
          help={t('tick-help', { ns: 'minecraft' })}
          rules={{
            min: min(0),
            validate: {
              integer
            }
          }}
          onChange={(e) => handleChange('castDuration', e.target.value)}
        />
        <FormField
          className="column is-half"
          control={control}
          defaultValue={getOrDefault(defaultValue.cooldown, 0)}
          type="number"
          name={`${name}.cooldown`}
          id={`${name}.cooldown`}
          min={0}
          step={1}
          label={t('monster-generator.fields.spell.cooldown')}
          placeholder={t('monster-generator.fields.spell.cooldown')}
          help={t('tick-help', { ns: 'minecraft' })}
          rules={{
            min: min(0),
            validate: {
              integer
            }
          }}
          onChange={(e) => handleChange('cooldown', e.target.value)}
        />
      </div>

      <fieldset name={`${name}.conditions`}>
        <SpellConditions name={`${name}.conditions`} control={control} />
        <hr />
      </fieldset>

      <fieldset name={`${name}.settings`}>
        {SpellSettings[spell] !== null &&
          React.createElement(SpellSettings[spell] as SpellSettingsElem<unknown>, {
            control: control as Control,
            name: `${name}.settings`,
            defaultValue: getOrDefault(defaultValue.settings, {}),
            onChange: handleChange
          })}
      </fieldset>
    </>
  )
}
export default Spell
