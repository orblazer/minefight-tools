import { Particle } from '@/data/minecraft'

type BukkitDictionary<Key extends string> = Readonly<Partial<Record<Key, string>>>

const bukkitParticles: BukkitDictionary<Particle> = Object.freeze({
  ambient_entity_effect: 'spell_mob_ambient',
  angry_villager: 'villager_angry',
  block: 'block_crack',
  bubble: 'water_bubble',
  dripping_lava: 'drip_lava',
  dripping_water: 'drip_water',
  dust: 'redstone',
  effect: 'spell',
  elder_guardian: 'mob_appearance',
  enchanted_hit: 'crit_magic',
  entity_effect: 'spell_mob',
  explosion: 'explosion_large',
  explosion_emitter: 'explosion_huge',
  firework: 'fireworks_spark',
  fishing: 'water_wake',
  happy_villager: 'villager_happy',
  instant_effect: 'spell_instant',
  item: 'item_crack',
  item_slime: 'slime',
  item_snowball: 'snowball',
  large_smoke: 'smoke_large',
  mycelium: 'town_aura',
  poof: 'explosion_normal',
  rain: 'water_drop',
  smoke: 'smoke_normal',
  splash: 'water_splash',
  totem_of_undying: 'totem',
  underwater: 'suspended',
  witch: 'spell_witch'
})

export function particle(particle: Particle): string {
  if (typeof bukkitParticles[particle] === 'string') {
    return bukkitParticles[particle] as string
  } else {
    return particle
  }
}
