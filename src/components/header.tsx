import { GatsbyLinkProps, Link } from 'gatsby'
import React from 'react'

const gatsbyLogo = require('../images/gatsby-icon.png')

const isActive = ({ isCurrent }: any) => {
    return { className: isCurrent ? 'active' : 'navlink' }
}

const NavLink = (
    props: JSX.IntrinsicAttributes &
        JSX.IntrinsicClassAttributes<Link<unknown>> &
        Readonly<GatsbyLinkProps<unknown>> &
        Readonly<{ children?: React.ReactNode }>
) => <Link getProps={isActive} {...props} />

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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
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
                    <NavLink to="/">{siteTitle}</NavLink>
                </h1>
            </span>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/products">Store</NavLink>
            {/* Shopping Cart Summary */}
            <div
                style={{ color: 'white', cursor: 'pointer' }}
                className="snipcart-summary snipcart-checkout"
            >
                <div>
                    <strong>My Cart</strong>
                </div>
                <div>
                    <span
                        style={{ fontWeight: 'bold' }}
                        className="snipcart-total-items"
                    ></span>{' '}
                    Items in Cart
                </div>
                <div>
                    Total price{' '}
                    <span
                        style={{ fontWeight: 'bold' }}
                        className="snipcart-total-price"
                    ></span>
                </div>
            </div>
        </div>
    </header>
)

export default Header
