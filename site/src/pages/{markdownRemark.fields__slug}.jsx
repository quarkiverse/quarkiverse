import * as React from "react"
import {graphql} from "gatsby"
import Layout from "../components/layout";

export default function DocsPageTemplate({
                                             data, // this prop will be injected by the GraphQL query below.
                                         }) {
    const {markdownRemark} = data // data.markdownRemark holds your post data
    const {fields, html} = markdownRemark
    return (
        <Layout pageName={fields.pageName}>
            <h1>{fields.title}</h1>
            <div
                dangerouslySetInnerHTML={{__html: html}}
            />
        </Layout>
    )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
        title
        pageName
     }
    }
  }
  `