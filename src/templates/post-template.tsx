import React from 'react'
import { graphql, PageProps } from 'gatsby'

import Layout from '../components/layout'

type DataProps = {
    markdownRemark: {
        html: string
        timeToRead: number
        frontmatter: {
            title: string
        }
    }
}
type DataPageProps = PageProps<DataProps>

const PostTemplate = ({ data: post }: DataPageProps) => (
    <Layout>
        <h1>{post.markdownRemark.frontmatter.title}</h1>
        <h4>
            {post.markdownRemark.timeToRead}{' '}
            {post.markdownRemark.timeToRead > 1 ? 'minutes' : 'minute'}
        </h4>
        <div dangerouslySetInnerHTML={{ __html: post.markdownRemark.html }} />
    </Layout>
)

export const query = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            timeToRead
            frontmatter {
                title
            }
        }
    }
`

export default PostTemplate
