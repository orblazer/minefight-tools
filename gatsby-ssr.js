/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'
import App from './src/App'
import config from './gatsby-config'

/**
 * Wrap all pages with a Translation provider and set the language on SSR time
 */
/* export const wrapRootElement = ({ element }) => {
  return <App defaultLanguage={config.siteMetadata.defaultLanguage}>{element}</App>
} */

/**
 * Wrap all pages with a Translation provider and set the language on SSR time
 */
export const wrapPageElement = ({ element, props }) => {
  return (
    <App defaultLanguage={config.siteMetadata.defaultLanguage} pageContext={props.pageContext}>
      {element}
    </App>
  )
}
