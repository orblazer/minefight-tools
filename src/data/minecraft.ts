/* eslint-disable camelcase */
export enum EEffectType {
  speed = 'speed',
  slowness = 'slowness',
  haste = 'haste',
  mining_fatigue = 'mining_fatigue',
  strength = 'strength',
  instant_health = 'instant_health',
  instant_damage = 'instant_damage',
  jump_boost = 'jump_boost',
  nausea = 'nausea',
  regeneration = 'regeneration',
  resistance = 'resistance',
  fire_resistance = 'fire_resistance',
  water_breathing = 'water_breathing',
  invisibility = 'invisibility',
  blindness = 'blindness',
  night_vision = 'night_vision',
  hunger = 'hunger',
  weakness = 'weakness',
  poison = 'poison',
  wither = 'wither',
  health_boost = 'health_boost',
  absorption = 'absorption',
  saturation = 'saturation',
  glowing = 'glowing',
  levitation = 'levitation',
  luck = 'luck',
  unluck = 'unluck',
  slow_falling = 'slow_falling',
  conduit_power = 'conduit_power',
  dolphins_grace = 'dolphins_grace',
  bad_omen = 'bad_omen',
  hero_of_the_village = 'hero_of_the_village'
}
export type EffectType = keyof typeof EEffectType

export enum EAttribute {
  generic_armor = 'generic.armor',
  generic_armor_toughness = 'generic.armor_toughness',
  generic_attack_damage = 'generic.attack_damage',
  generic_attack_speed = 'generic.attack_speed',
  generic_flying_speed = 'generic.flying_speed',
  generic_follow_range = 'generic.follow_range',
  generic_knockback_resistance = 'generic.knockback_resistance',
  generic_luck = 'generic.luck',
  generic_max_health = 'generic.max_health',
  generic_movement_speed = 'generic.movement_speed',
  horse_jump_strength = 'horse.jump_strength',
  zombie_spawn_reinforcements = 'zombie.spawn_reinforcements'
}
export type Attribute = keyof typeof EAttribute

export enum EAttributeOperation {
  add_number = 'add_number',
  add_scalar = 'add_scalar',
  multiply_scalar_1 = 'multiply_scalar_1'
}
export type AttributeOperation = keyof typeof EAttributeOperation

export enum EEquipmentSlot {
  hand = 'hand',
  off_hand = 'off_hand',
  feet = 'feet',
  legs = 'legs',
  chest = 'chest',
  head = 'head'
}
export type EquipmentSlot = keyof typeof EEquipmentSlot

export enum EColor {
  white = 'white',
  orange = 'orange',
  magenta = 'magenta',
  light_blue = 'light_blue',
  yellow = 'yellow',
  lime = 'lime',
  pink = 'pink',
  gray = 'gray',
  light_gray = 'light_gray',
  cyan = 'cyan',
  purple = 'purple',
  blue = 'blue',
  brown = 'brown',
  green = 'green',
  red = 'red',
  black = 'black'
}
export type Color = keyof typeof EColor

export enum ECatType {
  tabby = 'tabby',
  black = 'black',
  red = 'red',
  siamese = 'siamese',
  british_shorthair = 'british_shorthair',
  calico = 'calico',
  persian = 'persian',
  ragdoll = 'ragdoll',
  white = 'white',
  jellie = 'jellie',
  all_black = 'all_black'
}
export type CatType = keyof typeof ECatType

export enum EFoxType {
  red = 'red',
  snow = 'snow'
}
export type FoxType = keyof typeof EFoxType

export enum EHorseColor {
  white = 'white',
  creamy = 'creamy',
  chestnut = 'chestnut',
  brown = 'brown',
  black = 'black',
  gray = 'gray',
  dark_brown = 'dark_brown'
}
export type HorseColor = keyof typeof EHorseColor

export enum EHorseStyle {
  none = 'none',
  white = 'white',
  whitefield = 'whitefield',
  white_dots = 'white_dots',
  black_dots = 'black_dots'
}
export type HorseStyle = keyof typeof EHorseStyle

export enum ELlamaColor {
  creamy = 'creamy',
  white = 'white',
  brown = 'brown',
  gray = 'gray'
}
export type LlamaColor = keyof typeof ELlamaColor

export enum EMooshroomVariant {
  red = 'red',
  brown = 'brown'
}
export type MooshroomVariant = keyof typeof EMooshroomVariant

export enum EPandaGene {
  normal = 'normal',
  lazy = 'lazy',
  worried = 'worried',
  playful = 'playful',
  brown = 'brown',
  weak = 'weak',
  aggressive = 'aggressive'
}
export type PandaGene = keyof typeof EPandaGene

export enum EParrotVariant {
  red = 'red',
  blue = 'blue',
  green = 'green',
  cyan = 'cyan',
  gray = 'gray'
}
export type ParrotVariant = keyof typeof EParrotVariant

export enum ERabbitType {
  brown = 'brown',
  white = 'white',
  black = 'black',
  black_and_white = 'black_and_white',
  gold = 'gold',
  salt_and_pepper = 'salt_and_pepper',
  the_killer_bunny = 'the_killer_bunny'
}
export type RabbitType = keyof typeof ERabbitType

export enum ETropicalFishType {
  kob = 'kob',
  sunstreak = 'sunstreak',
  snooper = 'snooper',
  dasher = 'dasher',
  brinely = 'brinely',
  spotty = 'spotty',
  flopper = 'flopper',
  stripey = 'stripey',
  glitter = 'glitter',
  blockfish = 'blockfish',
  betty = 'betty',
  clayfish = 'clayfish'
}
export type TropicalFishType = keyof typeof ETropicalFishType

export enum EVillagerType {
  desert = 'desert',
  jungle = 'jungle',
  plains = 'plains',
  savanna = 'savanna',
  snow = 'snow',
  swamp = 'swamp',
  taiga = 'taiga'
}
export type VillagerType = keyof typeof EVillagerType

export enum EVillagerProfession {
  armorer = 'armorer',
  butcher = 'butcher',
  cartographer = 'cartographer',
  cleric = 'cleric',
  farmer = 'farmer',
  fisherman = 'fisherman',
  fletcher = 'fletcher',
  leatherworker = 'leatherworker',
  librarian = 'librarian',
  mason = 'mason',
  nitwit = 'nitwit',
  none = 'none',
  shepherd = 'shepherd',
  toolsmith = 'toolsmith',
  weaponsmith = 'weaponsmith'
}
export type VillagerProfession = keyof typeof EVillagerProfession

export enum EItemFlag {
  hide_enchants = 'hide_enchants',
  hide_attributes = 'hide_attributes',
  hide_unbreakable = 'hide_unbreakable',
  // hide_destroys = 'hide_destroys',
  // hide_placed_on = 'hide_placed_on',
  hide_potion_effects = 'hide_potion_effects',
  hide_dye = 'hide_dye'
}
export type ItemFlag = keyof typeof EItemFlag

export enum EEnchantment {
  protection = 'protection',
  fire_protection = 'fire_protection',
  feather_falling = 'feather_falling',
  blast_protection = 'blast_protection',
  projectile_protection = 'projectile_protection',
  respiration = 'respiration',
  aqua_affinity = 'aqua_affinity',
  thorns = 'thorns',
  depth_strider = 'depth_strider',
  frost_walker = 'frost_walker',
  binding_curse = 'binding_curse',
  sharpness = 'sharpness',
  smite = 'smite',
  bane_of_arthropods = 'bane_of_arthropods',
  knockback = 'knockback',
  fire_aspect = 'fire_aspect',
  looting = 'looting',
  sweeping = 'sweeping',
  efficiency = 'efficiency',
  silk_touch = 'silk_touch',
  unbreaking = 'unbreaking',
  fortune = 'fortune',
  power = 'power',
  punch = 'punch',
  flame = 'flame',
  infinity = 'infinity',
  luck_of_the_sea = 'luck_of_the_sea',
  lure = 'lure',
  loyalty = 'loyalty',
  impaling = 'impaling',
  riptide = 'riptide',
  channeling = 'channeling',
  mending = 'mending',
  vanishing_curse = 'vanishing_curse'
}
export type Enchantment = keyof typeof EEnchantment

export enum EParticle {
  ambient_entity_effect = 'ambient_entity_effect', // SPELL_MOB_AMBIENT
  angry_villager = 'angry_villager', // VILLAGER_ANGRY
  ash = 'ash',
  barrier = 'barrier',
  block = 'block', // BLOCK_CRACK
  bubble = 'bubble', // WATER_BUBBLE
  bubble_column_up = 'bubble_column_up',
  bubble_pop = 'bubble_pop',
  campfire_cosy_smoke = 'campfire_cosy_smoke',
  campfire_signal_smoke = 'campfire_signal_smoke',
  cloud = 'cloud',
  composter = 'composter',
  crimson_spore = 'crimson_spore',
  crit = 'crit',
  current_down = 'current_down',
  damage_indicator = 'damage_indicator',
  dolphin = 'dolphin',
  dragon_breath = 'dragon_breath',
  dripping_honey = 'dripping_honey',
  dripping_lava = 'dripping_lava', // DRIP_LAVA
  dripping_obsidian_tear  = 'dripping_obsidian_tear',
  dripping_water = 'dripping_water', // DRIP_WATER
  dust = 'dust', // REDSTONE
  effect = 'effect', // SPELL
  elder_guardian = 'elder_guardian', // MOB_APPEARANCE
  enchant = 'enchant', // ENCHANTMENT_TABLE
  enchanted_hit = 'enchanted_hit', // CRIT_MAGIC
  end_rod = 'end_rod',
  entity_effect = 'entity_effect', // SPELL_MOB
  explosion = 'explosion', // EXPLOSION_LARGE
  explosion_emitter = 'explosion_emitter', // EXPLOSION_HUGE
  falling_dust = 'falling_dust',
  falling_honey = 'falling_honey',
  falling_lava = 'falling_lava',
  falling_nectar = 'falling_nectar',
  falling_obsidian_tear = 'falling_obsidian_tear',
  falling_water = 'falling_water',
  firework = 'firework', // FIREWORKS_SPARK
  fishing = 'fishing', // WATER_WAKE
  flame = 'flame',
  flash = 'flash',
  happy_villager = 'happy_villager', // VILLAGER_HAPPY
  heart = 'heart',
  instant_effect = 'instant_effect', // SPELL_INSTANT
  item = 'item', // ITEM_CRACK
  item_slime = 'item_slime', // SLIME
  item_snowball = 'item_snowball', // SNOWBALL
  landing_honey = 'landing_honey',
  landing_lava = 'landing_lava',
  landing_obsidian_tear = 'landing_obsidian_tear',
  large_smoke = 'large_smoke', // SMOKE_LARGE
  lava = 'lava',
  mycelium = 'mycelium', // TOWN_AURA
  nautilus = 'nautilus',
  poof = 'poof', // EXPLOSION_NORMAL
  note = 'note',
  portal = 'portal',
  rain = 'rain', // WATER_DROP
  smoke = 'smoke', // SMOKE_NORMAL
  sneeze = 'sneeze',
  soul = 'soul',
  soul_fire_flame = 'soul_fire_flame',
  spit = 'spit',
  splash = 'splash', // WATER_SPLASH
  squid_ink = 'squid_ink',
  sweep_attack = 'sweep_attack',
  totem_of_undying = 'totem_of_undying', // TOTEM
  underwater = 'underwater', // SUSPENDED
  warped_spore = 'warped_spore',
  white_ash = 'white_ash',
  witch = 'witch', // SPELL_WITCH
  reverse_portal = 'reverse_portal'
}
export type Particle = keyof typeof EParticle
