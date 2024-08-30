/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import "./layout.css"

const Page = ({markdownRemark}) => {
    const {fields, html} = markdownRemark

    // The title in the html is a bit awkward. The wiki shows it, so we have to show it too, or pages look like they have no title. But if pages set an h1 element themselves, it looks stupid
    return (
        <>
            <h1>{fields.title}</h1>
            <div
                dangerouslySetInnerHTML={{__html: html}}
            />
        </>
    )
}

export default Page
