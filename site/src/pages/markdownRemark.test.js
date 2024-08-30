import React from "react"
import {render, screen} from "@testing-library/react"
import {useStaticQuery} from "gatsby"
import DocsPageTemplate from "./{markdownRemark.fields__slug}"

const nodeTitle1 = "SomeContentPage"
const nodeTitle2 = "AnotherContentPage"

const mockUseStaticQuery = {
    site: {
        siteMetadata: {
            title: "site title"
        }
    },

    allMarkdownRemark: {
        edges: [{
            "node": {
                "fields": {
                    "slug": "checklistfornewprojects",
                    "title": "SomeContentPage",
                    "pageName": "SomeContentPage"
                },
            }
        }]
    },

    markdownRemark: {

        "fields": {
            "slug": "checklistfornewprojects",
            "title": nodeTitle2,
            "pageName": "ChecklistForNewProjects"

        },
        html: "<p>Some page content</p>"
    }
}


describe("the page content", () => {

    beforeEach(() => {
        useStaticQuery.mockReturnValue(mockUseStaticQuery)

        render(<DocsPageTemplate data={mockUseStaticQuery}/>)
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it("renders the elements of the navigation", () => {
        expect(screen.getByText(nodeTitle1)).toBeTruthy()
        expect(screen.getByText(nodeTitle2)).toBeTruthy()
    })

    it("renders the page contents", () => {
        expect(screen.getByText("Some page content")).toBeTruthy()
    })

})

