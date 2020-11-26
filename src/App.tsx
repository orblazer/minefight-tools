import React, { useMemo } from 'react'
import { I18nextProvider } from 'react-i18next'
import initI18n, { LoadLanguage } from './lib/i18next'
import { PageContext, PageProvider } from './utils/page-context'

const App: React.FC<{ defaultLanguage: string; pageContext: PageContext }> = ({
  children,
  defaultLanguage,
  pageContext
}) => {
  // Init i18n
  const ressources = LoadLanguage()
  const i18n = useMemo(() => initI18n(defaultLanguage, ressources), [defaultLanguage, ressources])

  return (
    <I18nextProvider i18n={i18n}>
      <PageProvider value={pageContext} defaultLanguage={defaultLanguage}>
        {children}
      </PageProvider>
    </I18nextProvider>
  )
}
export default App
