const MINECRAFT_VERSION = (exports.MINECRAFT_VERSION = '1.16.3')

const { fixEntity, fixEffect } = require('./fix-minecraft-data')
const mcData = require('minecraft-data')(MINECRAFT_VERSION)
const mcAssets = require('minecraft-assets')(MINECRAFT_VERSION)

/**
 * Transform an array to enum ({[key]: {value: 'key'}})
 * @param {array} array
 * @param {string} field
 * @param {()} fix
 * @returns {object} The enum
 */
/* function arrayToEnum(array, fix = (val) => val, field = 'name') {
  return array.reduce((result, item) => {
    if (typeof item === 'string') {
      result[item] = { value: item }
    } else {
      item = fix(item)
      result[item[field]] = { value: item[field] }
    }
    return result
  }, {})
}

/**
 * @param {import('gatsby').NodePluginSchema} schema
 */
exports.builders = ({ buildEnumType }) => [] /* [
  buildEnumType({
    name: 'MinecraftMaterial',
    values: arrayToEnum(mcData.itemsArray)
  }),
  buildEnumType({
    name: 'MinecraftMaterialType',
    values: arrayToEnum(['item', 'block'])
  }),
  buildEnumType({
    name: 'MinecraftEntityType',
    values: arrayToEnum(mcData.entitiesArray, fixEntity)
  }),
  buildEnumType({
    name: 'MinecraftEntityTypeType',
    values: arrayToEnum(['mob', 'object', 'player'])
  }),
  buildEnumType({
    name: 'MinecraftEntityCategory',
    values: arrayToEnum([
      'PassiveMobs',
      'HostileMobs',
      'Projectiles',
      'Vehicles',
      'Blocks',
      'Immobile',
      'Drops',
      'Players',
      'UNKNOWN'
    ])
  }),
  buildEnumType({
    name: 'MinecraftEffectType',
    values: arrayToEnum(mcData.effectsArray, fixEffect)
  }),
  buildEnumType({
    name: 'MinecraftEffectTypeType',
    values: arrayToEnum(['bad', 'good'])
  }),
  buildEnumType({
    name: 'MinecraftEnchantmentType',
    values: arrayToEnum(mcData.enchantmentsArray)
  })
] */
exports.gqlSchema = `type MinecraftItem implements Node @infer {
  name: String!
  type: String!
  texture: String
  stackSize: Int!
}
type MinecraftEntity implements Node @infer {
  name: String!
  type: String!
  category: String!
}
type MinecraftEffect implements Node @infer {
  name: String!
  type: String!
}
type MinecraftEnchantment implements Node @infer {
  name: String!
}`

/**
 * @param {import('gatsby').NodePluginArgs} plugin
 */
exports.createNodes = function ({ actions, createNodeId, createContentDigest }) {
  function createNode(data, type) {
    actions.createNode({
      id: createNodeId(data.name),
      ...data,
      internal: {
        type,
        mediaType: 'application/json',
        content: JSON.stringify(data),
        contentDigest: createContentDigest(data)
      }
    })
  }

  mcData.itemsArray.forEach((item) => {
    const data = {
      name: item.name,
      type: typeof mcData.blocksByName[item.name] === 'undefined' ? 'item' : 'block',
      texture: (mcAssets.textureContent[item.name] || { texture: null }).texture,
      stackSize: item.stackSize
    }
    createNode(data, 'MinecraftItem')
  })

  mcData.entitiesArray.forEach((entity) => {
    entity = fixEntity(entity)
    const data = {
      name: entity.name,
      type: entity.type,
      category: entity.category
    }
    createNode(data, 'MinecraftEntity')
  })

  mcData.effectsArray.forEach((effect) => {
    effect = fixEffect(effect)
    const data = {
      name: effect.name,
      type: effect.type
    }
    createNode(data, 'MinecraftEffect')
  })

  mcData.enchantmentsArray.forEach((enchantment) => {
    const data = {
      name: enchantment.name.toLowerCase().replace('loyality', 'loyalty')
    }
    createNode(data, 'MinecraftEnchantment')
  })
}
