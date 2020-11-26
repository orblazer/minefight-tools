const { default: axios } = require('axios')
const { MINECRAFT_VERSION } = require('./gen-minecraft-data')

const versionManifestUrl = 'https://launchermeta.mojang.com/mc/game/version_manifest.json'
const resourcesUrl = 'http://resources.download.minecraft.net/'
const LANGS = ['fr_fr']

/**
 * Set an value in deep object with doted path
 * @param {object} obj The object
 * @param {string} path The doted path
 * @param {*} value The value
 */
function set(obj, path, value) {
  const [key, ...rest] = path.split('.')

  if (rest.length === 0) {
    obj[key] = value
  } else {
    if (typeof obj[key] === 'undefined') {
      obj[key] = {}
    } else if (typeof obj[key] === 'string') {
      obj[key] = {
        name: obj[key]
      }
    }

    set(obj[key], rest.join('.'), value)
  }
}

/**
 * Get resource from hash
 * @param {string} hash The asset hash
 * @returns {Promise<string>}
 */
async function getResource(hash) {
  return (await axios.get(resourcesUrl + hash.substring(0, 2) + '/' + hash)).data
}

/**
 * @param {import('gatsby').NodePluginArgs} plugin
 */
module.exports = async ({ actions: { createNode }, createNodeId, createContentDigest }) => {
  // Retrieve version manifest
  let data = (await axios.get(versionManifestUrl)).data
  const manifest = data.versions.find((version) => version.id === MINECRAFT_VERSION)
  if (typeof manifest === 'undefined') {
    return Promise.reject(new Error(`The manifest for version ${MINECRAFT_VERSION} could not be found`))
  }

  // Retrieve asset objects
  data = (await axios.get(manifest.url).then(({ data }) => axios.get(data.assetIndex.url))).data.objects
  if (typeof data === 'undefined') {
    return Promise.reject(new Error(`The asset objects for version ${MINECRAFT_VERSION} could not be found`))
  }

  // Retrieve languages
  const langs = await Promise.all(
    LANGS.map(async (lang) => {
      const langAsset = data[`minecraft/lang/${lang}.json`]
      if (typeof langAsset === 'undefined') {
        throw new Error(`The lang asset ${lang} for version ${MINECRAFT_VERSION} could not be found`)
      }
      return {
        lang: lang.replace(/_\w+/, ''),
        content: await getResource(langAsset.hash)
      }
    })
  )

  langs.forEach((lang) => {
    const content = {}
    Object.entries(lang.content).forEach(([key, value]) => {
      // Fix attribute name
      if (key.startsWith('attribute.name')) {
        set(
          content,
          'attribute.' + key.replace('attribute.name.', '').replace(/\./g, '_'),
          value.replace(/./, (m) => m.toUpperCase())
        )
      }
      // Fix item name
      else if (key.startsWith('item.minecraft')) {
        key = key.replace('item.minecraft.', '')
        if (key.endsWith('.desc')) {
          key = key.replace('.desc', '')
          value = `${content.item[key]} (${value})`
        }
        set(content, 'item.' + key, value)
      } else {
        // Fix name for some namespace
        const ns = ['block', 'entity', 'effect', 'color', 'enchantment'].find((ns) => key.startsWith(`${ns}.minecraft`))
        if (typeof ns !== 'undefined') {
          set(content, `${ns}.${key.replace(`${ns}.minecraft.`, '')}`, value)
        }
      }

      // Other translation is not keeped
    })

    const data = {
      namespace: 'minecraft',
      lang: lang.lang,
      content: JSON.stringify(content)
    }
    createNode({
      id: createNodeId(`${data.namespace}:${data.lang} >>> Translation`),
      ...data,
      internal: {
        contentDigest: createContentDigest(data),
        type: 'Translation'
      }
    })
  })
}
