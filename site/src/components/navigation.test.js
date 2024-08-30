import React from "react"
import {render, screen} from "@testing-library/react"
import {useStaticQuery} from "gatsby"
import Navigation from "./navigation"

const nodeTitle1 = "SomeContentPage"
const nodeTitle2 = "AnotherContentPage"

const mockUseStaticQuery = {

    allMarkdownRemark: {
        edges: [{
            "node": {
                "fields": {
                    "slug": "checklistfornewprojects",
                    "title": nodeTitle1,
                    "pageName": "ChecklistForNewProjects"
                },
            }
        }, {
            "node": {
                "fields": {
                    "slug": "checklistfornewprojects",
                    "title": nodeTitle2,
                    "pageName": "ChecklistForNewProjects"
                },
            }
        }]
    }
}


describe("the navigation", () => {

    beforeEach(() => {
        useStaticQuery.mockReturnValue(mockUseStaticQuery)

        render(<Navigation><p>Some page content</p></Navigation>)
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it("renders the elements of the navigation", () => {
        expect(screen.getByText(nodeTitle1)).toBeTruthy()
        expect(screen.getByText(nodeTitle2)).toBeTruthy()
    })

})

