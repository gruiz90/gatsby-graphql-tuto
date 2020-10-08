import React from 'react'
import { graphql, PageProps } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

import Layout from '../components/layout'

interface DataProps {
    contentfulProduct: {
        name: string
        price: number
        description: string
        createdAt: Date
        image: {
            fluid: FluidObject
        }
    }
}
type DataPageProps = PageProps<DataProps>

const ProductTemplate = ({ data: { contentfulProduct } }: DataPageProps) => (
    <Layout>
        <div
            style={{
                marginLeft: '0 auto',
                width: '100%',
                textAlign: 'center',
            }}
        >
            {/* Product info */}
            <h2>
                {contentfulProduct.name} -{' '}
                <span style={{ color: '#ccc' }}>
                    Added on {contentfulProduct.createdAt}
                </span>
            </h2>
            <p>{contentfulProduct.description}</p>
            <Img
                style={{ margin: '0 auto', maxWidth: 600 }}
                fluid={contentfulProduct.image.fluid}
            />
        </div>
    </Layout>
)

export const query = graphql`
    query($slug: String!) {
        contentfulProduct(slug: { eq: $slug }) {
            name
            price
            description
            createdAt(formatString: "MMMM Do, YYYY, h:mm:ss a")
            image {
                fluid(maxWidth: 800) {
                    ...GatsbyContentfulFluid
                }
            }
        }
    }
`

export default ProductTemplate
