/* eslint-disable camelcase */
export enum SpawnType {
  normal = 'normal',
  water = 'water',
  flying = 'flying',
  boss = 'boss'
}

export enum ESpellType {
  area_effect = 'area_effect',
  arrow = 'arrow',
  bomb = 'bomb',
  fireball = 'fireball',
  lightning = 'lightning',
  teleport = 'teleport',
  throw = 'throw',
  enderman = 'enderman',
  disarm = 'disarm',
  minions = 'minions',
  fangs = 'fangs'
}
export type SpellType = keyof typeof ESpellType

export enum ESpellCondition {
  minHealth = 'minHealth',
  maxHealth = 'maxHealth',
  minNearbyPlayer = 'minNearbyPlayer',
  maxNearbyPlayer = 'maxNearbyPlayer'
}
export type SpellCondition = keyof typeof ESpellCondition
