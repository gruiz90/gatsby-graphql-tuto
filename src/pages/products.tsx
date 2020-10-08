import React from 'react'
import { graphql, Link, PageProps } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

import Layout from '../components/layout'

interface DataProps {
    allContentfulProduct: {
        edges: [
            {
                node: {
                    id: string
                    slug: string
                    name: string
                    price: number
                    image: {
                        fluid: FluidObject
                    }
                }
            }
        ]
    }
}
type DataPageProps = PageProps<DataProps>

const Products = ({ data: { allContentfulProduct } }: DataPageProps) => (
    <Layout>
        <div>
            {/* Products List */}
            {allContentfulProduct.edges.map(({ node: product }) => (
                <div key={product.id}>
                    <h2>Garb Products</h2>
                    <Link
                        to={`/products/${product.slug}`}
                        style={{ textDecoration: 'none', color: 'darkblue' }}
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

export const query = graphql`
    query {
        allContentfulProduct {
            edges {
                node {
                    id
                    slug
                    name
                    price
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
