import * as React from 'react'
import {graphql, Link, useStaticQuery} from 'gatsby'

const Navigation = () => {
    const data = useStaticQuery(graphql`
      query ContentQuery {
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
`)
    return (
        <ul>
            {data.allMarkdownRemark.edges.map((edge, i) => edge.node.fields.slug.startsWith("_") || (
                <li key={i}><Link to={"/" + edge.node.fields.slug}>{edge.node.fields.title}</Link></li>)
            )}
        </ul>

    )
}


export default Navigation