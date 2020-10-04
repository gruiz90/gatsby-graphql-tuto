import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'

import Layout from '../components/layout'

const getImageData = graphql`
    {
        allFile(filter: { sourceInstanceName: { eq: "images" } }) {
            edges {
                node {
                    relativePath
                    size
                    birthTime
                    extension
                }
            }
        }
    }
`

interface imageProps {
    allFile: {
        edges: [
            {
                node: {
                    relativePath: string
                    size: number
                    birthTime: Date
                    extension: string
                }
            }
        ]
    }
}

export default () => {
    const data: imageProps = useStaticQuery(getImageData)

    return (
        <Layout>
            <h1>Hello from Page3!</h1>
            <h3>Image file data</h3>
            <table>
                <thead>
                    <tr>
                        <th>Relative Path</th>
                        <th>Size of Image</th>
                        <th>Extension</th>
                        <th>Birthtime</th>
                    </tr>
                </thead>
                <tbody>
                    {data.allFile.edges.map(({ node }, index: number) => (
                        <tr key={index}>
                            <td>{node.relativePath}</td>
                            <td>{node.size}</td>
                            <td>{node.extension}</td>
                            <td>{node.birthTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/page-2">Go to page 2</Link>
        </Layout>
    )
}
