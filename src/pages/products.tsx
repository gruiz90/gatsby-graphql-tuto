import React from 'react'
import { graphql, Link, PageProps } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
import netlifyIdentity from 'netlify-identity-widget'

import Layout from '../components/layout'

interface EdgeObject {
    node: {
        id: string
        slug: string
        name: string
        price: number
        private: boolean
        image: {
            fluid: FluidObject
        }
    }
}
interface DataProps {
    allContentfulProduct: {
        edges: EdgeObject[]
    }
}
type DataPageProps = PageProps<DataProps>

interface MyState {
    products: EdgeObject[]
}

class Products extends React.Component<DataPageProps, MyState> {
    state: MyState = {
        products: [],
    }

    componentDidMount() {
        this.getProducts()
        netlifyIdentity.on('login', user => this.getProducts(user))
        netlifyIdentity.on('logout', () => this.getProducts())
    }

    getProducts = (user?: netlifyIdentity.User) => {
        console.log('Current User', user)
        const allProducts = this.props.data.allContentfulProduct.edges
        const products =
            netlifyIdentity.currentUser() !== null
                ? allProducts
                : allProducts.filter(({ node: product }) => !product.private)
        this.setState({ products })
    }

    render() {
        const { products } = this.state
        return (
            <Layout>
                <div>
                    {/* Products List */}
                    <h2>My Products</h2>
                    {products.map(({ node: product }) => (
                        <div key={product.id}>
                            <Link
                                to={`/products/${product.slug}`}
                                style={{
                                    textDecoration: 'none',
                                    color: 'darkblue',
                                }}
                            >
                                <h3>
                                    {product.name} -{' '}
                                    <span
                                        style={{
                                            fontSize: '1.2rem',
                                            fontWeight: 300,
                                            color: '#f60',
                                        }}
                                    >
                                        ${product.price}
                                    </span>
                                </h3>
                            </Link>
                            <Img
                                style={{ maxWidth: 400 }}
                                fluid={product.image.fluid}
                            />
                        </div>
                    ))}
                </div>
            </Layout>
        )
    }
}

export const query = graphql`
    query {
        allContentfulProduct {
            edges {
                node {
                    id
                    slug
                    name
                    price
                    private
                    image {
                        fluid(maxWidth: 400) {
                            ...GatsbyContentfulFluid
                        }
                    }
                }
            }
        }
    }
`

export default Products
