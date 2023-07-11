/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import {graphql, useStaticQuery} from "gatsby"

import Header from "./header"
import "./layout.css"
import Footer from "./footer";
import Navigation from "./Navigation";

const Layout = ({children, pageName}) => {
    const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

    return (
        <>
            <Header siteTitle={data.site.siteMetadata?.title || `Title`} pageName={pageName}/>
            <div
                style={{
                    margin: `0 auto`,
                    maxWidth: `var(--size-content)`,
                    padding: `var(--size-gutter)`,
                    display: 'flex',
                    flexDirection: 'row',
                    columnGap: '40px'
                }}
            >
                <Navigation/>
                <main>{children}</main>
            </div>
            <Footer/>
        </>
    )
}

export default Layout
