import React from "react"
import {render, screen} from "@testing-library/react"
import Page from "./page"

const nodeTitle = "AnotherContentPage"


const markdownRemark = {

    "fields": {
        "slug": "checklistfornewprojects",
        "title": nodeTitle,
        "pageName": "ChecklistForNewProjects"

    },
    html: "<p>Some page content</p>"
}


describe("the page content", () => {

    beforeEach(() => {
        render(<Page markdownRemark={markdownRemark}/>)
    })


    it("renders the page contents", () => {
        expect(screen.getByText("Some page content")).toBeTruthy()
    })

})

