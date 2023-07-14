import * as React from "react"
import {Link, Script} from "gatsby"
import {StaticImage} from "gatsby-plugin-image";
import styled from "styled-components";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'; // Not used directly, but fixes size flash
import {faPencil} from '@fortawesome/free-solid-svg-icons'

const Logo = styled(props => <a {...props} />)`
  background-color: var(--black);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-weight: var(--font-weight-bold);
  margin-left: 7px;
`

const PaddedAnchor = styled(props => <a {...props}/>)`
  display: flex;
  column-gap: 10px;
  justify-content: space-between;
  align-items: center;
`

// Avoid CSS on this class because the css is slow to load, causing flashes
const PaddedIcon = styled(props => <FontAwesomeIcon {...props} width="16px"/>)`
  height: var(--font-md);
`

const Header = ({siteTitle, pageName}) => (
    <header
        style={{
            margin: `0 auto`,
            padding: `var(--space-4) var(--size-gutter)`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `space-between`
        }}
    >
        <div style={{
            display: `flex`,
            alignItems: `center`,
            justifyContent: `start`,
            columnGap: '40px'
        }}>
            <Logo href="https://www.quarkiverse.io/">
                <StaticImage
                    className="logo"
                    placeholder="none"
                    backgroundColor="white"
                    layout="constrained"
                    formats={["auto", "webp", "avif"]}
                    src="../images/quarkiverse-logo.png"
                    alt="Quarkiverse logo"
                    height={36}
                    width={36}
                />
            </Logo>
            <Link
                to="/"
                style={{
                    fontSize: `var(--font-sm)`,
                    textDecoration: `none`,
                }}
            >
                <h1>{siteTitle}</h1>
            </Link>
        </div>
        <div>
            {pageName &&
                <PaddedAnchor href={`https://github.com/quarkiverse/quarkiverse/edit/main/docs/${pageName}.md`}
                              target="_blank">
                    <PaddedIcon icon={faPencil}/>
                    Edit this Page
                </PaddedAnchor>}
        </div>
        <Script defer src="/static/fontawesome/fontawesome-all.js"/>
    </header>
)

export default Header
