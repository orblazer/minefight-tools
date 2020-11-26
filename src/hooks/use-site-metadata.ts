import { useStaticQuery, graphql } from 'gatsby'

export type SiteMetadata = Pick<
  GatsbyTypes.SiteSiteMetadata,
  'siteUrl' | 'websiteUrl' | 'defaultLanguage' | 'title' | 'titleTemplate' | 'description'
>

export default function useSiteMetadata(): SiteMetadata {
  const { site } = useStaticQuery<GatsbyTypes.SiteMetadataQuery>(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          siteUrl
          websiteUrl
          defaultLanguage
          title
          titleTemplate
          description
        }
      }
    }
  `)
  if (typeof site === 'undefined' || typeof site?.siteMetadata === 'undefined') {
    throw new Error('Could not found site metadata')
  }

  return site.siteMetadata
}
