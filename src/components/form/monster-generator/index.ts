import * as AbstractHorse from './settings/_abstract-horse'
import * as Ageable from './settings/_ageable'
import * as Steerable from './settings/_steerable'
import * as Tameable from './settings/_tameable'

import * as bee from './settings/bee'
import * as cat from './settings/cat'
import * as creeper from './settings/creeper'
import * as fox from './settings/fox'
import * as horse from './settings/horse'
import * as llama from './settings/llama'
import * as slime from './settings/slime'
import * as mooshroom from './settings/mooshroom'
import * as panda from './settings/panda'
import * as parrot from './settings/parrot'
import * as phantom from './settings/phantom'
import * as pufferfish from './settings/pufferfish'
import * as rabbit from './settings/rabbit'
import * as sheep from './settings/sheep'
import * as shulker from './settings/shulker'
import * as snowGolem from './settings/snow_golem'
import * as tropicalFish from './settings/tropical-fish'
import * as turtle from './settings/turtle'
import * as vex from './settings/vex'
import * as villager from './settings/villager'
import * as wolf from './settings/wolf'
import { Control, FieldValues } from 'react-hook-form'
import { ReactElement } from 'react'

export type SettingFC = <TFieldValues extends FieldValues = FieldValues>({
  control
}: {
  control?: Control<TFieldValues>
}) => ReactElement

export default {
  AbstractHorse,
  Ageable,
  Steerable,
  Tameable,

  bee,
  cat,
  creeper,
  fox,
  horse,
  llama,
  traderLlama: llama,
  magmaCube: slime,
  slime,
  mooshroom,
  panda,
  parrot,
  phantom,
  pufferfish,
  rabbit,
  sheep,
  shulker,
  snowGolem,
  tropicalFish,
  turtle,
  vex,
  villager,
  zombieVillager: villager,
  wolf
}
