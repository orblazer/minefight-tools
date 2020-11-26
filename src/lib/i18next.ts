import i18n, { i18n as Ti18n, Resource, ResourceKey } from 'i18next'
import { initReactI18next } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'
import { useMemo } from 'react'
import { mergeWith } from 'lodash'

export default function initI18n(defaultLang: string, resources: Resource = {}): Ti18n {
  i18n
    /**
     * Pass i18n instance to react-i18next.
     */
    .use(initReactI18next)
    /**
     * Initialize i18next configuration.
     * @see Docs {@link https://react.i18next.com/latest/i18next-instance}
     * @see Options {@link https://www.i18next.com/overview/configuration-options}
     */
    .init({
      lng: defaultLang,
      resources,
      fallbackLng: defaultLang,
      partialBundledLanguages: true,
      debug: process.env.NODE_ENV === 'development',

      interpolation: {
        escapeValue: false // not needed for react!!
      },

      react: {
        useSuspense: false
      }
    })

  return i18n
}

export function LoadLanguage(): Resource {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {
    allTranslation: { nodes }
  } = useStaticQuery<GatsbyTypes.allTranslationQuery>(graphql`
    query allTranslation {
      allTranslation {
        nodes {
          lang
          namespace
          content
        }
      }
    }
  `)

  return useMemo(() => {
    const ressources: Resource = {}
    nodes.forEach((node) => {
      if (typeof ressources[node.lang] === 'undefined') {
        ressources[node.lang] = {}
      }
      if (typeof ressources[node.lang][node.namespace] === 'undefined') {
        ressources[node.lang][node.namespace] = JSON.parse(node.content)
      } else {
        Object.entries(JSON.parse(node.content)).forEach(([key, value]) => {
          const obj = (ressources[node.lang][node.namespace] as { [key: string]: ResourceKey })[key]
          if (typeof obj === 'undefined') {
            ;(ressources[node.lang][node.namespace] as { [key: string]: ResourceKey })[key] = value as ResourceKey
          } else {
            mergeWith(obj, value as ResourceKey, (newVal, src) => {
              if (typeof newVal !== 'undefined') {
                if (typeof src === 'string') {
                  return {
                    name: src,
                    ...newVal
                  }
                } else {
                  return { ...src, ...newVal }
                }
              }
            })
          }
        })
      }
    })

    return ressources
  }, [nodes])
}
