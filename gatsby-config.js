const { resolve } = require('path')

/**
 * @type import('gatsby-plugin-typegen/types').PluginOptions
 */
const typegenOption = {
  outputPath: 'types/gatsby-types.d.ts',
  emitSchema: {
    'types/gatsby-introspection.json': true
  },
  // TODO: Broken until 'gatsby-plugin-typegen' V3
  emitPluginDocuments: {
    'types/gatsby-plugin-documents.graphql': true
  }
}

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  pathPrefix: '/tools',
  siteMetadata: {
    siteUrl: process.env.URL || 'http://localhost:8000',
    websiteUrl: 'https://www.minefight.fr/',
    defaultLanguage: 'fr',
    title: 'Outils Minefight',
    titleTemplate: '%s | Outils Minefight',
    description: 'Outils pour minefight'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    // Sources
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'translations',
        path: resolve('src', 'locales')
      }
    },
    // Build plugins
    {
      resolve: `gatsby-alias-imports`,
      options: {
        aliases: {
          '@': `src/`
        }
      }
    },
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        allExtensions: true // defaults to false
      }
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false
        }
      }
    },
    {
      resolve: 'gatsby-plugin-typegen',
      /**
       * @type import('gatsby-plugin-typegen/types').PluginOptions
       */
      options: typegenOption
    }
  ]
}
