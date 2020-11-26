import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'gatsby'
import useSiteMetadata from '@/hooks/use-site-metadata'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface NavbarProps {
  title: string
}

export interface NavbarMenuProps {
  className?: string
}

export const NavbarMenu: React.FC<NavbarMenuProps> = ({ className }) => {
  const { websiteUrl } = useSiteMetadata()
  const { t } = useTranslation()

  return (
    <div className={className}>
      <Link to="/" className="navbar-item" activeClassName="is-active">
        {t('navbar.home')}
      </Link>

      <div className="navbar-item has-dropdown is-hoverable">
        <Link to="/invasion" className="navbar-link" activeClassName="is-active" partiallyActive>
          {t('navbar.invasion.title')}
        </Link>

        <div className="navbar-dropdown">
          <Link to="/invasion/monster-generator" className="navbar-item" activeClassName="is-active">
            {t('navbar.invasion.monster-generator')}
          </Link>
        </div>
      </div>

      <a href={websiteUrl} className="ml-4 navbar-item" title={t('navbar.website')} target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon="sitemap" />
      </a>
    </div>
  )
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const [opened, setOpen] = useState(false)

  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main dropdown navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <span>{title}</span>
          </Link>

          <a
            role="button"
            className={`navbar-burger${opened ? ' is-active' : ''}`}
            aria-label="menu"
            aria-expanded={opened}
            data-target="navbar"
            onClick={() => setOpen(!opened)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div id="navbar" className={`navbar-menu${opened ? ' is-active' : ''}`}>
          <NavbarMenu className="navbar-end" />
        </div>
      </div>
    </nav>
  )
}
export default Navbar
