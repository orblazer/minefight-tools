/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import Layout from '@/components/layout'
import Seo from '@/components/seo'
import FormField from '@/components/form/form-field'
import noop from '@/utils/noop'
import { SpawnType } from '@/data/invasion'
import MinecraftSelect from '@/components/form/minecraft/minecraft-select'
import MobFields from '@/components/form/monster-generator'
import InvasionSelect from '@/components/form/fields/invasion-select'
import { jsonText } from '@/data/tools'
import Effects from '@/components/form/minecraft/effects'
import Attributes from '@/components/form/minecraft/attributes'
import { EffectData } from '@/components/form/minecraft/effect'
import { AttributeData } from '@/components/form/minecraft/attribute'
import Equipment, { EquipmentData } from '@/components/form/monster-generator/equipment'
import { SpellData } from '@/components/form/monster-generator/spell/spell'
import Spells from '@/components/form/monster-generator/spell/spells'
import downloadText from '@/utils/downloadText'

type StepMode = 'load' | 'new'

export interface FormData {
  internalName: string
  type: string
  spawnType: SpawnType
  name: string
  bossBar: boolean
  gravity: boolean
  silent: boolean
  glowing: boolean
  vehicle: string
  effects: EffectData[]
  attributes: AttributeData[]
  equipments: EquipmentData[]
  settings: Record<string, unknown>
  spells: SpellData[]
}

function readCode(code: string): Partial<FormData> | null {
  if (code.trim() === '') {
    return null
  }

  try {
    return JSON.parse(atob(code))
  } catch (e) {
    return null
  }
}

const Step0: React.FC<{ onSubmit: (values: Partial<FormData> | null) => void }> = ({ onSubmit }) => {
  const { t } = useTranslation('invasion')
  const { watch, control, setError, errors, formState } = useForm<{ code: string }>({
    mode: 'onBlur',
    defaultValues: {
      code: ''
    }
  })
  noop(formState.isDirty) // make sure formState is read before render to enable the Proxy
  const code = watch('code')
  const file = useMemo(() => {
    const readedCode = readCode(code)
    if (readedCode !== null) {
      const filename = readedCode.internalName + '.json'
      delete readedCode.internalName
      return {
        filename,
        content: JSON.stringify(readedCode, null, 2)
      }
    } else {
      return null
    }
  }, [code])

  function submitForm(mode: StepMode) {
    if (mode === 'load') {
      const readedCode = readCode(code)
      // Check code
      if (readedCode === null) {
        setError('code', {
          type: 'required',
          message: '',
          shouldFocus: true
        })
        return
      } else if (errors.code != null) {
        return
      }

      onSubmit(readedCode)
    } else {
      onSubmit(null)
    }
  }

  return (
    <form className="form" noValidate>
      <div className="field">
        <FormField
          control={control}
          name="code"
          id="code"
          type="textarea"
          rows={4}
          label={t('monster-generator.fields.code')}
          placeholder={t('monster-generator.fields.code')}
          rules={{
            validate(value) {
              return readCode(value) == null ? t<string>('rules.invalid', { ns: 'validations' }) : true
            }
          }}
        />
      </div>
      <div className="field">
        <div className="field is-grouped">
          <div className="control">
            <button
              className="button is-primary"
              onClick={(e) => {
                e.preventDefault()
                submitForm('load')
              }}
              disabled={code === ''}
            >
              {t('monster-generator.load')}
            </button>
          </div>
          <div className="control">
            <button
              className="button is-link"
              onClick={(e) => {
                e.preventDefault()
                submitForm('new')
              }}
            >
              {t('monster-generator.new')}
            </button>
          </div>
          <div className="control">
            <button
              className="button"
              onClick={(e) => {
                e.preventDefault()
                downloadText(file?.content || '', file?.filename || 'undefined.json')
              }}
              disabled={file === null}
            >
              {t('monster-generator.export')}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

const Step1: React.FC<{ onSubmit: SubmitHandler<FormData>; onReset: () => void; defaultValues: Partial<FormData> }> = ({
  onSubmit,
  onReset,
  defaultValues
}) => {
  const { t } = useTranslation('invasion')
  const { control, watch, setValue, handleSubmit, formState } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: Object.assign(
      {
        type: 'zombie',
        spawnType: SpawnType.normal
      },
      defaultValues
    )
  })
  noop(formState.isDirty) // make sure formState is read before render to enable the Proxy

  const type = watch<string, string>('type')
  const fixedType = useMemo(() => type.replace(/_(\w)/g, (_match, g1) => g1.toUpperCase()), [type])

  useEffect(() => {
    setValue('settings', {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit, console.log)} noValidate>
      <fieldset>
        <FormField
          control={control}
          type="text"
          name="internalName"
          id="internalName"
          label={t('monster-generator.fields.internal-name')}
          placeholder={t('monster-generator.fields.internal-name')}
          rules={{
            required: true,
            pattern: /^[a-z][a-z0-9_-]*$/
          }}
        />
        <MinecraftSelect
          control={control}
          type="EntityType"
          name="type"
          id="type"
          label={t('monster-generator.fields.type')}
          rules={{ required: true }}
        />
        <InvasionSelect
          control={control}
          options="SpawnType"
          name="spawnType"
          id="spawnType"
          label={t('monster-generator.fields.spawn-type')}
          rules={{ required: true }}
        />
        <FormField
          control={control}
          type="text"
          name="name"
          id="name"
          label={t('monster-generator.fields.name')}
          help={t('monster-generator.fields.name-help')
            .replace('<1>', `<a href="${jsonText}" target="_blank" rel="noreferrer">`)
            .replace('</1>', '</a>')}
          placeholder={t('monster-generator.fields.name')}
        />
        <FormField
          control={control}
          type="text"
          name="vehicle"
          id="vehicle"
          label={t('monster-generator.fields.vehicle')}
          help={t('internal-name-help')}
          placeholder={t('monster-generator.fields.vehicle')}
        />
        <hr />
      </fieldset>

      <fieldset>
        <div className="field is-grouped is-grouped-multiline mb-4">
          <FormField
            control={control}
            className="control"
            type="checkbox"
            name="bossBar"
            id="bossBar"
            label={t('monster-generator.fields.bossBar')}
          />
          <FormField
            control={control}
            className="control"
            type="checkbox"
            name="gravity"
            id="gravity"
            defaultChecked
            label={t('monster-generator.fields.gravity')}
          />
          <FormField
            control={control}
            className="control"
            type="checkbox"
            name="silent"
            id="silent"
            label={t('monster-generator.fields.silent')}
          />
          <FormField
            control={control}
            className="control"
            type="checkbox"
            name="glowing"
            id="glowing"
            label={t('monster-generator.fields.glowing')}
          />

          {MobFields.AbstractHorse.AvailableEntities.includes(type) && (
            <MobFields.AbstractHorse.Checkboxes control={control} canChest={['donkey', 'mule'].includes(type)} />
          )}
          {MobFields.Ageable.AvailableEntities.includes(type) && <MobFields.Ageable.Checkboxes control={control} />}
          {MobFields.Steerable.AvailableEntities.includes(type) && <MobFields.Steerable.Checkboxes control={control} />}
          {MobFields.Tameable.AvailableEntities.includes(type) && <MobFields.Tameable.Checkboxes control={control} />}

          {(MobFields as any)[fixedType] &&
            (MobFields as any)[fixedType].Checkboxes &&
            React.createElement((MobFields as any)[fixedType].Checkboxes, {
              ...{ control }
            })}
        </div>

        {(MobFields as any)[fixedType] &&
          (MobFields as any)[fixedType].Fields &&
          React.createElement((MobFields as any)[fixedType].Fields, {
            ...{ control }
          })}
        <hr />
      </fieldset>

      <fieldset name="effects">
        <Effects name="effects" control={control} />
        <hr />
      </fieldset>

      <fieldset name="attributes">
        <Attributes name="attributes" control={control} />
        <hr />
      </fieldset>

      <fieldset name="equipments">
        <Equipment name="equipments" control={control} />
        <hr />
      </fieldset>

      <fieldset name="spells">
        <Spells name="spells" control={control} />
        <hr />
      </fieldset>

      <div className="field pt-4">
        <div className="field is-grouped">
          <div className="control">
            <button type="submit" className="button is-primary">
              {t('monster-generator.generate')}
            </button>
          </div>
          <div className="control">
            <button
              type="reset"
              className="button"
              onClick={(e) => {
                e.preventDefault()
                onReset()
              }}
            >
              {t('monster-generator.reset')}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

const MonsterGeneratorPage: React.FC = () => {
  const { t } = useTranslation('invasion')
  const [step, setStep] = useState(0)
  const [defaultValues, setDefaultValues] = useState<Partial<FormData>>({})
  const [code, setCode] = useState('')
  const [file, setFile] = useState<{ filename: string; content: string } | null>(null)

  function onLoadCode(code: Partial<FormData> | null) {
    setDefaultValues(code || {})
    setStep(1)
  }
  function onSubmit(data: FormData) {
    // Skip empty equipments
    if (Array.isArray(data.equipments)) {
      data.equipments = data.equipments.filter((equipment) => equipment.item.material !== '')
    }
    setCode(btoa(JSON.stringify(data)))

    // Create file
    const { internalName, ...content } = data
    const filename = internalName + '.json'
    setFile({
      filename,
      content: JSON.stringify(content, null, 2)
    })
  }

  return (
    <Layout>
      <Seo title={t('monster-generator.title')} />

      <div className="container">
        <h1 className="title">{t('monster-generator.title')}</h1>

        {step === 0 && <Step0 onSubmit={onLoadCode} />}
        {step === 1 && (
          <Step1
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            onReset={() => {
              setStep(0)
              setDefaultValues({})
              setCode('')
              setFile(null)
            }}
          />
        )}

        {code !== '' && (
          <div className="field">
            <label htmlFor="code" className="label">
              {t('monster-generator.fields.code')}
            </label>
            <div className="control is-expanded">
              <textarea id="code" rows={3} className="textarea" value={code} readOnly />
            </div>
          </div>
        )}
        {file !== null && (
          <div className="control">
            <button
              className="button"
              onClick={(e) => {
                e.preventDefault()
                downloadText(file.content || '', file.filename || 'undefined.json')
              }}
              disabled={file === null}
            >
              {t('monster-generator.export')}
            </button>
          </div>
        )}
      </div>
    </Layout>
  )
}
export default MonsterGeneratorPage
