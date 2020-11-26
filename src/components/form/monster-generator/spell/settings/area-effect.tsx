import React from 'react'
import { useTranslation } from 'react-i18next'
import getOrDefault from '@/utils/getOrDefault'
import { EffectData } from '@/components/form/minecraft/effect'
import FormField from '@/components/form/form-field'
import { min, integer } from '@/components/form/form-rules'
import MinecraftSelect from '@/components/form/minecraft/minecraft-select'
import { DefaultOptionType } from '@/components/form/form-select'
import Effects from '@/components/form/minecraft/effects'
import { SpellSettings } from '.'
import { Particle } from '@/data/minecraft'

export interface AreaEffectData {
  duration: number
  waitTime: number
  reapplicationDelay: number
  durationOnUse: number
  color: string
  radius: number
  radiusOnUse: number
  radiusPerTick: number
  particle: Particle
  // particleData: unknown // TODO: implement this
  effects: EffectData[]
}

const AreaEffect: SpellSettings<AreaEffectData> = ({ control, name, defaultValue = {}, onChange }) => {
  const { t } = useTranslation('invasion')

  function handleChange(field: string, value: string) {
    typeof onChange === 'function' && onChange(`${name}.${field}`, value)
  }

  return (
    <>
      <div className="columns is-mobile is-multiline">
        <FormField
          className="column is-half"
          control={control}
          defaultValue={getOrDefault(defaultValue.duration, 600)}
          type="number"
          name={`${name}.duration`}
          id={`${name}.duration`}
          min={0}
          step={1}
          label={t('monster-generator.fields.spell.area-effect.duration')}
          placeholder={t('monster-generator.fields.spell.area-effect.duration')}
          help={t('tick-help', { ns: 'minecraft' })}
          rules={{
            min: min(0),
            validate: {
              integer
            }
          }}
          onChange={(e) => handleChange('duration', e.target.value)}
        />
        <FormField
          className="column is-half"
          control={control}
          defaultValue={getOrDefault(defaultValue.waitTime, 20)}
          type="number"
          name={`${name}.waitTime`}
          id={`${name}.waitTime`}
          min={0}
          step={1}
          label={t('monster-generator.fields.spell.area-effect.wait-time')}
          placeholder={t('monster-generator.fields.spell.area-effect.wait-time')}
          help={t('tick-help', { ns: 'minecraft' })}
          rules={{
            min: min(0),
            validate: {
              integer
            }
          }}
          onChange={(e) => handleChange('waitTime', e.target.value)}
        />
        <FormField
          className="column is-half"
          control={control}
          defaultValue={getOrDefault(defaultValue.reapplicationDelay, 20)}
          type="number"
          name={`${name}.reapplicationDelay`}
          id={`${name}.reapplicationDelay`}
          min={0}
          step={1}
          label={t('monster-generator.fields.spell.area-effect.reapplication-delay')}
          placeholder={t('monster-generator.fields.spell.area-effect.reapplication-delay')}
          help={t('tick-help', { ns: 'minecraft' })}
          rules={{
            min: min(0),
            validate: {
              integer
            }
          }}
          onChange={(e) => handleChange('reapplicationDelay', e.target.value)}
        />
        <FormField
          className="column is-half"
          control={control}
          defaultValue={getOrDefault(defaultValue.durationOnUse, 0)}
          type="number"
          name={`${name}.durationOnUse`}
          id={`${name}.durationOnUse`}
          min={0}
          step={1}
          label={t('monster-generator.fields.spell.area-effect.duration-on-use')}
          placeholder={t('monster-generator.fields.spell.area-effect.duration-on-use')}
          help={t('tick-help', { ns: 'minecraft' })}
          rules={{
            min: min(0),
            validate: {
              integer
            }
          }}
          onChange={(e) => handleChange('durationOnUse', e.target.value)}
        />
        <FormField
          className="column is-half"
          control={control}
          defaultValue={getOrDefault(defaultValue.radius, 3)}
          type="number"
          name={`${name}.radius`}
          id={`${name}.radius`}
          min={0}
          step={0.01}
          label={t('monster-generator.fields.spell.area-effect.radius')}
          placeholder={t('monster-generator.fields.spell.area-effect.radius')}
          rules={{
            min: min(0)
          }}
          onChange={(e) => handleChange('radius', e.target.value)}
        />
        <FormField
          className="column is-half"
          control={control}
          defaultValue={getOrDefault(defaultValue.radiusOnUse, 0)}
          type="number"
          name={`${name}.radiusOnUse`}
          id={`${name}.radiusOnUse`}
          min={0}
          step={0.01}
          label={t('monster-generator.fields.spell.area-effect.radius-on-use')}
          placeholder={t('monster-generator.fields.spell.area-effect.radius-on-use')}
          rules={{
            min: min(0)
          }}
          onChange={(e) => handleChange('radiusOnUse', e.target.value)}
        />
        <FormField
          className="column is-half"
          control={control}
          defaultValue={getOrDefault(defaultValue.radiusPerTick, 0)}
          type="number"
          name={`${name}.radiusPerTick`}
          id={`${name}.radiusPerTick`}
          min={0}
          step={0.01}
          label={t('monster-generator.fields.spell.area-effect.radius-per-tick')}
          placeholder={t('monster-generator.fields.spell.area-effect.radius-per-tick')}
          rules={{
            min: min(0)
          }}
          onChange={(e) => handleChange('radiusPerTick', e.target.value)}
        />
        <MinecraftSelect
          className="column is-half"
          control={control}
          defaultValue={getOrDefault(defaultValue.particle, 'effect')}
          type="Particle"
          name={`${name}.particle`}
          id={`${name}.particle`}
          label={t('monster-generator.fields.spell.area-effect.particle')}
          onChange={(option) => handleChange('particle', (option as DefaultOptionType).value)}
        />
        {/* // TODO: implement particle data */}
        <FormField
          className="column is-half"
          control={control}
          defaultValue={defaultValue.color}
          type="color"
          name={`${name}.color`}
          id={`${name}.color`}
          label={t('monster-generator.fields.spell.area-effect.color')}
          placeholder={t('monster-generator.fields.spell.area-effect.color')}
          onChange={(e) => handleChange('color', e.target.value)}
        />
      </div>

      <fieldset name={`${name}.effects`}>
        <Effects control={control} name={`${name}.effects`} />
      </fieldset>
    </>
  )
}
export default AreaEffect
