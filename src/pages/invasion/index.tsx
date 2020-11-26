import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'gatsby'
import Layout from '@/components/layout'
import Seo from '@/components/seo'

const InvasionPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Layout>
      <Seo title={t('pages.invasion.title')} />

      <h1 className="title">{t('tools')}</h1>

      <ul>
        <li>
          <Link to="/invasion/monster-generator">{t('monster-generator.title', { ns: 'invasion' })}</Link>
        </li>
      </ul>
    </Layout>
  )
}
export default InvasionPage
