import { ReactElement } from 'react'
import { FieldValues } from 'react-hook-form'
import { BaseFormFieldProps } from '@/components/form/form'
import { OnObjectChange } from '@/components/form/form-utils'
import AreaEffect from './area-effect'
import Arrow from './arrow'
import Bomb from './bomb'
import Fireball from './fireball'
import Teleport from './teleport'
import Throw from './throw'
import Minions from './minions'

export type SpellSettings<SpellData, TFieldValues extends FieldValues = FieldValues> = (
  props: BaseFormFieldProps<TFieldValues> & {
    defaultValue?: Partial<SpellData>
    onChange?: OnObjectChange
  }
) => ReactElement

export default {
  AreaEffect,
  Arrow,
  Bomb,
  Fireball,
  Teleport,
  Throw,
  Minions
}
