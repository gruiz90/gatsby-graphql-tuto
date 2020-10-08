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
                    <Link to={`/products/${product.slug}`}>
                        <h3>{product.name}</h3>
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
