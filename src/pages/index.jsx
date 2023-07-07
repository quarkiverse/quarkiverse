import * as React from 'react'
import { graphql } from 'gatsby'

    const HomePage = ({data}) => {
        return (
            <div>
                <h2>Quarkiverse Hub</h2>
                <ul>
                {data.allMarkdownRemark.edges.map((edge, i) => edge.node.fields.slug.startsWith("_") || (<li key={i}><a href={edge.node.fields.slug}>{edge.node.fields.title}</a></li>)
                )}

                </ul>

            </div>
        )
}

    export const query = graphql`
  query MyQuery {
  allMarkdownRemark {
    edges {
      node {
        fields {
          slug
          title
        }
      }
    }
  }
}
`

export default HomePage