import React, { useContext, useState } from 'react'
import { graphql } from 'gatsby'
import * as propTypes from 'prop-types'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import tw from 'twin.macro'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'
import mergeContextData from '@gatsby-mdx-suite/helpers/data/merge-context-data'

import LayoutNav from '../components/layout/nav'
import ComponentsMenu from '../components/layout/components-menu'
import Layout from '../components/layout/layout'
import LayoutMain from '../components/layout/main'
import DataProvider from '../components/data-provider'
import LiveEditor from '../components/live-editor/live-editor'
import Props from '../components/props'

const Tabs = styled.div`
  ${tw`flex border-b mb-8`}
`
const Tab = styled.div(
  ({ active }) => css`
    ${active ? tw`-mb-px mr-1` : tw`mr-1`}
  `
)
const TabLink = styled.a(
  ({ active }) => css`
    ${tw`inline-block py-2 px-4 font-semibold cursor-pointer rounded-t `}
    ${active
      ? tw`bg-gray-200 border-l border-t border-r py-2 px-4 text-gray-800`
      : tw``}
  `
)

const ComponentWrapper = styled.div`
  max-width: 1200px;
  padding: 1vw;
  margin: 2rem auto;
`

function DocsComponentTemplate({ data, pageContext }) {
  const MdxSuiteData = useContext(MdxSuiteContext)
  const [activeTab, setActiveTab] = useState(0)

  const { displayName, description, componentProps, examples } =
    data.componentMetadata

  const tabs = [
    `<${displayName} />`,
    ...(examples
      ? examples.map((example, i) => example.caption || `Example ${i + 1}`)
      : []),
  ]

  const hasChildren = componentProps.some(({ name }) => name === 'children')

  const title = hasChildren
    ? `<${displayName}></${displayName}>`
    : `<${displayName} />`

  let content = (
    <>
      <h1>{title}</h1>
      {description && <MDXRenderer>{description.childMdx.body}</MDXRenderer>}
      <h2>Properties:</h2>
      <Props componentProps={componentProps} />
    </>
  )

  if (activeTab > 0) {
    content = (
      <LiveEditor
        key={displayName + activeTab}
        editorId={displayName + activeTab}
        initialValue={examples[activeTab - 1].raw}
      />
    )
  }

  return (
    <MdxSuiteContext.Provider
      value={mergeContextData(MdxSuiteData, {
        pageContext,
      })}
    >
      <DataProvider>
        <Layout title={displayName}>
          <LayoutNav title="Components">
            <ComponentsMenu />
          </LayoutNav>
          <LayoutMain>
            <ComponentWrapper>
              <Tabs>
                {tabs.map((tabTitle, i) => (
                  <Tab key={i} active={i === activeTab}>
                    <TabLink
                      active={i === activeTab}
                      onClick={() => setActiveTab(i)}
                    >
                      {tabTitle}
                    </TabLink>
                  </Tab>
                ))}
              </Tabs>
              {content}
            </ComponentWrapper>
          </LayoutMain>
        </Layout>
      </DataProvider>
    </MdxSuiteContext.Provider>
  )
}

DocsComponentTemplate.propTypes = {
  data: propTypes.object.isRequired,
  pageContext: propTypes.object.isRequired,
}

export default DocsComponentTemplate

export const pageQuery = graphql`
  query docsComponentQuery($id: String!) {
    componentMetadata(id: { eq: $id }) {
      displayName
      description {
        childMdx {
          body
        }
      }
      componentProps: props {
        ...MdxSuiteComponentProps
      }
      examples {
        raw
        caption
      }
    }
  }
`
