/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.css'

interface Props {
    children?: any
}

const getSiteMetadata = graphql`
    {
        site {
            siteMetadata {
                title
                author
                createdAt
            }
        }
    }
`

const Layout = ({ children }: Props) => {
    const data = useStaticQuery(getSiteMetadata)

    return (
        <>
            <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
            <div
                style={{
                    margin: `0 auto`,
                    maxWidth: 960,
                    padding: `0 1.0875rem 1.45rem`,
                }}
            >
                <main>{children}</main>
                <footer
                    style={{
                        marginTop: `2rem`,
                    }}
                >
                    Built by {data.site.siteMetadata.author}, Created{' '}
                    {data.site.siteMetadata.createdAt}
                </footer>
            </div>
        </>
    )
}

export default Layout