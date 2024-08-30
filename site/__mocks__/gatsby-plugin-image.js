const React = require("react")
const plugin = jest.requireActual("gatsby-plugin-image")

const mockStaticImage = ({ imgClassName, backgroundColor, ...props }) =>
  React.createElement("img", {
    ...props,
    className: imgClassName,
  })

const mockGatsbyImage = ({ imgClassName, backgroundColor, ...props }) =>
  React.createElement("img", {
    ...props?.image?.props,
    alt: props?.alt,
    className: imgClassName,
  })

module.exports = {
  ...plugin,
  GatsbyImage: jest.fn().mockImplementation(mockGatsbyImage),
  StaticImage: jest.fn().mockImplementation(mockStaticImage),
  // For ease of testing, have getImage just return back the un-nested object we give it
  getImage: jest.fn().mockImplementation(obj =>
    obj?.childImageSharp?.gatsbyImageData
      ? {
          props: {
            src: obj?.childImageSharp?.gatsbyImageData,
          },
        }
      : undefined
  ),
}
