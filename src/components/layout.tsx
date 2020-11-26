import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import useSiteMetaData from '../hooks/use-site-metadata'
import Navbar from './navbar'
import '../styles/main.scss'

// Initialize font awesome
library.add(fas, far)

export interface LayoutProps {
  hero?: React.FC
  heroRef?: React.RefObject<HTMLElement>
  mainClass?: string
}

const Layout: React.FC<LayoutProps> = ({ hero = null, mainClass = '', heroRef, children }) => {
  const { title } = useSiteMetaData()
  const Hero: React.FC | null = hero

  return (
    <>
      <header>
        {Hero ? (
          <section id="" ref={heroRef} className="hero is-fullheight">
            <div className="hero-head">
              <Navbar title={title} />
            </div>

            <div className="hero-body">
              <div className="container">
                <Hero />
              </div>
            </div>
          </section>
        ) : (
          <Navbar title={title} />
        )}
      </header>
      <main className={`container my-5 ${mainClass}`}>{children}</main>
      <footer className="footer">
        <div className="container">
          <div className="columns is-mobile">
            <div className="column has-text-right">© {new Date().getFullYear()}</div>
          </div>
        </div>
      </footer>
    </>
  )
}
export default Layout
