import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'

const getMarkdownPosts = graphql`
    {
        allMarkdownRemark {
            totalCount
            edges {
                node {
                    id
                    excerpt
                    frontmatter {
                        title
                        date
                    }
                }
            }
        }
    }
`

interface postProps {
    allMarkdownRemark: {
        totalCount: number
        edges: [
            {
                node: {
                    id: string
                    excerpt: string
                    frontmatter: {
                        title: string
                        date: Date
                    }
                }
            }
        ]
    }
}

export default () => {
    const data: postProps = useStaticQuery(getMarkdownPosts)

    return (
        <Layout>
            <div>
                <h1
                    style={{
                        display: 'inlineBlock',
                        borderBottom: '1px solid',
                    }}
                >
                    Gatsby Garb Blog
                </h1>
                <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
                {data.allMarkdownRemark.edges.map(({ node }) => (
                    <div key={node.id}>
                        <h3>
                            {node.frontmatter.title}
                            <span style={{ color: '#bbb' }}>
                                {' '}
                                - {node.frontmatter.date}
                            </span>
                        </h3>
                        <p>{node.excerpt}</p>
                    </div>
                ))}
            </div>
        </Layout>
    )
}
