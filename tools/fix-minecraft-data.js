/**
 * @typedef {'Passive mobs'|'Hostile mobs'|'Projectiles'|'Vehicles'|'Blocks'|'Immobile'|'Drops'|'Players'|'UNKNOWN'} EntityCategory
 * @typedef {Object} Entity
 * @property {number} id
 * @property {number} internalId
 * @property {string} name
 * @property {string} displayName
 * @property {number} width
 * @property {number} height
 * @property {'mob'|'object'|'player'} type
 * @property {EntityCategory} category
 *
 * @typedef {Object} Effect
 * @property {number} id
 * @property {string} name
 * @property {string} displayName
 * @property {'good'|'bad'} type
 */

/**
 * @type {Object.<string, EntityCategory>}
 * @constant
 */
const entitiesCategory = {
  bee: 'Passive mobs',
  fox: 'Passive mobs',
  hoglin: 'Hostile mobs',
  piglin: 'Hostile mobs',
  piglin_brute: 'Hostile mobs',
  strider: 'Passive mobs',
  zoglin: 'Hostile mobs',
  zombified_piglin: 'Hostile mobs',
  player: 'Players'
}

/**
 * Fix entity type and category
 * @param {Entity} entity The entity want fix
 * @returns {Entity} the fixed entity
 */
exports.fixEntity = (entity) => {
  if (typeof entity === 'undefined' || typeof entity.name === 'undefined' || typeof entity.category === 'undefined') {
    return entity
  }

  const fixedCategory = entitiesCategory[entity.name] || entity.category
  return {
    ...entity,
    type: fixedCategory.endsWith('mobs') ? 'mob' : fixedCategory === 'Players' ? 'player' : 'object',
    category: fixedCategory.replace(/ [a-z]/g, (match) => match.trim().toUpperCase())
  }
}

/**
 * Fix the effect name
 * @param {Effect} effect The effect want fixed
 * @returns {Effect} The fixed effect
 */
exports.fixEffect = (effect) => {
  if (typeof effect === 'undefined' || typeof effect.name === 'undefined') {
    return effect
  }
  if (effect.name === 'BadLuck') {
    effect.name = 'unluck'
  }

  return {
    ...effect,
    name: effect.name.replace(/[A-Z]/g, (match, offset) => (offset > 0 ? '_' : '') + match.toLowerCase())
  }
}
