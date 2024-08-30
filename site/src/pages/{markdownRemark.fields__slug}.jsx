import * as React from "react"
import {graphql} from "gatsby"
import Layout from "../components/layout"
import Page from "../components/page"

export default function DocsPageTemplate({
                                             data, // this prop will be injected by the GraphQL query below.
                                         }) {
    const {markdownRemark} = data // data.markdownRemark holds your post data
    const {fields} = markdownRemark

    return (
        <Layout pageName={fields.pageName}>
            <Page markdownRemark={markdownRemark}/>
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