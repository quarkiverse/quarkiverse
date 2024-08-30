import React from "react"
import {render, screen} from "@testing-library/react"
import Layout from "./layout"
import {useStaticQuery} from "gatsby"

const title = "MockTitle"
const nodeTitle = "Some Content Page"

const mockUseStaticQuery = {
    site: {
        siteMetadata: {
            title
        }
    },

    allMarkdownRemark: {
        edges: [{
            "node": {
                "fields": {
                    "slug": "checklistfornewprojects",
                    "title": nodeTitle,
                    "pageName": "ChecklistForNewProjects"
                },
            }
        }]
    }
}


describe("the layout", () => {

    beforeEach(() => {
        useStaticQuery.mockReturnValue(mockUseStaticQuery)

        render(<Layout><p>Some page content</p></Layout>)
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it("renders the title", () => {
        expect(screen.getByText(title)).toBeTruthy()
    })

    it("renders a navigation", () => {
        // Don't test the details of the navigation, but make sure it's showing up
        expect(screen.getByText(nodeTitle)).toBeTruthy()
    })

    it("renders the children", () => {
        // Don't test the details of the navigation, but make sure it's showing up
        expect(screen.getByText("Some page content")).toBeTruthy()
    })

})

