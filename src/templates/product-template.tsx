import React from 'react'
import { graphql, PageProps } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

import Layout from '../components/layout'

interface DataProps {
    contentfulProduct: {
        name: string
        slug: string
        price: number
        description: string
        createdAt: Date
        image: {
            fluid: FluidObject
            file: {
                url: string
            }
        }
    }
}
type DataPageProps = PageProps<DataProps>

const ProductTemplate = ({
    data: { contentfulProduct },
    location,
}: DataPageProps) => (
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
            <h4>${contentfulProduct.price}</h4>
            <p>{contentfulProduct.description}</p>
            <button
                className="snipcart-add-item"
                data-item-id={contentfulProduct.slug}
                data-item-price={contentfulProduct.price}
                data-item-image={contentfulProduct.image.file.url}
                data-item-name={contentfulProduct.name}
                data-item-url={location.pathname}
                style={{
                    background: 'darkorange',
                    color: 'white',
                    padding: '0.3em',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Add to Cart
            </button>
            <Img
                style={{ margin: '10px auto', maxWidth: 600 }}
                fluid={contentfulProduct.image.fluid}
            />
        </div>
    </Layout>
)

export const query = graphql`
    query($slug: String!) {
        contentfulProduct(slug: { eq: $slug }) {
            name
            slug
            price
            description
            createdAt(formatString: "MMMM Do, YYYY, h:mm:ss a")
            image {
                fluid(maxWidth: 800) {
                    ...GatsbyContentfulFluid
                }
                file {
                    url
                }
            }
        }
    }
`

export default ProductTemplate
