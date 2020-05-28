import React, { useContext, useState } from 'react'
import { graphql } from 'gatsby'
import * as propTypes from 'prop-types'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'
import { Styled } from 'theme-ui'
import tw from 'twin.macro'

import LayoutNav from '../components/docs/layout/nav'
import ComponentsMenu from '../components/docs/layout/components-menu'
import Layout from '../components/docs/layout/layout'
import LayoutMain from '../components/docs/layout/main'
import DataProvider from '../components/docs/data-provider'
import LiveEditor from '../components/docs/live-editor'
import Props from '../components/docs/props'

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
    ${tw`bg-white inline-block py-2 px-4 text-gray-400 font-semibold cursor-pointer`}
    ${active
      ? tw`border-l border-t border-r rounded-t py-2 px-4 text-gray-800`
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

  const {
    displayName,
    description,
    longDescription,
    componentProps,
    examples,
  } = data.componentMetadata

  const tabs = [
    displayName,
    'Props',
    ...(examples ? examples.map((v, i) => `Example ${i + 1}`) : []),
  ]

  let content = (
    <>
      <Styled.h1>{displayName}</Styled.h1>
      {description && <MDXRenderer>{description.childMdx.body}</MDXRenderer>}
      {longDescription && <MDXRenderer>{longDescription.body}</MDXRenderer>}
    </>
  )

  if (activeTab === 1) {
    content = <Props componentProps={componentProps} />
  }

  if (activeTab > 1) {
    content = (
      <LiveEditor
        editorId={displayName + activeTab}
        initialValue={examples[activeTab - 2].raw}
      />
    )
  }

  return (
    <MdxSuiteContext.Provider
      value={{
        ...MdxSuiteData,
        pageContext,
      }}
    >
      <DataProvider>
        <Layout>
          <LayoutNav title="Menu">
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
      longDescription {
        body
      }
      componentProps: props {
        ...ComponentProps
      }
      examples {
        raw
      }
    }
  }
`
