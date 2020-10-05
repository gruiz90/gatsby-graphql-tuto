import { Link } from 'gatsby'
import React from 'react'

const gatsbyLogo = require('../images/gatsby-icon.png')

interface Props {
    siteTitle: string
}

const Header = ({ siteTitle }: Props) => (
    <header
        style={{
            background: `rebeccapurple`,
            marginBottom: `1.45rem`,
        }}
    >
        <div
            style={{
                margin: `0 auto`,
                maxWidth: 960,
                padding: `1.45rem 1.0875rem`,
            }}
        >
            {/* Title / Logo */}
            <span style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src={gatsbyLogo}
                    alt="Gatsby Garb Logo"
                    style={{
                        borderRadius: '50%',
                        border: '3px solid orange',
                        margin: '0 5px',
                        width: '50px',
                    }}
                />
                <h1 style={{ margin: 0 }}>
                    <Link
                        to="/"
                        style={{
                            color: `white`,
                            textDecoration: `none`,
                        }}
                    >
                        {siteTitle}
                    </Link>
                </h1>
            </span>
        </div>
    </header>
)

export default Header
