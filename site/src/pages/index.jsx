import * as React from 'react'
import Layout from "../components/layout";
import {graphql} from "gatsby";

const HomePage = ({data}) => {
    const {markdownRemark} = data // data.markdownRemark holds your post data
    const {fields, html} = markdownRemark
    return (
        <Layout pageName={fields.pageName}>
            {/*No title here, since it will be 'home'*/}
            <div
                dangerouslySetInnerHTML={{__html: html}}
            />
        </Layout>
    )
}

export const query = graphql`
  query Home {
  markdownRemark(fields: {slug: {eq: "home"}}) {
    fields {
      slug
      title
      pageName
    }
    html
  }
}
`

export default HomePage