import React, { useState, useEffect } from 'react'
import ExecutionEnvironment from 'exenv'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'
import { useMDXComponents } from '@mdx-js/react'

import KitchenSinkComponent from './kitchen-sink-component'
import Layout from './layout/layout'
import LayoutMain from './layout/main'
import LayoutNav from './layout/nav'
import DataProvider from './data-provider'

const KitchenSinkList = styled.div``
const KitchenSinkIntro = styled.div``
const KitchenSinkMenuLink = styled.a(
  ({ active }) => css`
    ${tw`
      block p-2
      border-t border-gray-700
      bg-gray-800
      text-white hover:text-blue-500
    `}

    ${active && tw`text-blue-500 bg-gray-900`}
  `
)
const KitchenSinkMenuPackage = tw.div``
const KitchenSinkMenuPackageName = tw.div`
  pt-8 px-2 pb-1
  shadow-inner
  text-sm whitespace-no-wrap text-gray-500`

function KitchenSink() {
  const [hash, setHash] = useState(null)
  const [isListening, setIsListening] = useState(false)
  const [scrollToComponent, setScrollToComponent] = useState(false)
  const mdxComponents = useMDXComponents()

  const result = useStaticQuery(graphql`
    query KitchenSinkQuery {
      site {
        siteMetadata {
          title
        }
      }
      allComponentMetadata(sort: { fields: displayName }) {
        nodes {
          id
          displayName
          packageName
          path
          slug
          componentProps: props {
            ...ComponentProps
          }
          description {
            childMdx {
              body
            }
          }
          examples
        }
      }
    }
  `)

  const availableComponents = Object.keys(mdxComponents)

  const enabledComponents = result.allComponentMetadata.nodes
    .filter(({ displayName }) => availableComponents.includes(displayName))
    .sort((a, b) => {
      const aPackageName = a.packageName || ''
      const bPackageName = b.packageName || ''
      return (
        aPackageName.localeCompare(bPackageName) ||
        a.displayName.localeCompare(b.displayName)
      )
    })

  const componentsByPackage = enabledComponents.reduce(
    (rv, components) => ({
      ...rv,
      [components.packageName]: [
        ...(rv[components.packageName] || []),
        components,
      ],
    }),
    {}
  )

  const handleLinkClick = (event) => {
    setScrollToComponent(event.currentTarget.hash.substr(1))
  }

  const handleHashChange = (e) => {
    setHash(window.location.hash.substr(1))
  }

  useEffect(() => {
    if (!isListening && ExecutionEnvironment.canUseDOM) {
      if (window.location.hash) {
        setHash(window.location.hash.substr(1))
      }
      window.addEventListener('hashchange', handleHashChange)
      window.onhashchange = handleHashChange
      setIsListening(true)
    }
  }, [ExecutionEnvironment.canUseDOM, isListening])

  useEffect(() => {
    if (!scrollToComponent && hash) {
      setScrollToComponent(hash)
    }
  }, [hash])

  return (
    <DataProvider>
      <Layout title="Kitchen Sink">
        <LayoutNav>
          {Object.keys(componentsByPackage).map((packageName) => (
            <KitchenSinkMenuPackage key={packageName}>
              <KitchenSinkMenuPackageName>
                {packageName === 'null'
                  ? `Developed for ${result.site.siteMetadata.title}`
                  : packageName}
                :
              </KitchenSinkMenuPackageName>
              <ul>
                {componentsByPackage[packageName].map((component) => (
                  <li key={component.id}>
                    <KitchenSinkMenuLink
                      active={component.slug === hash}
                      href={`#${component.slug}`}
                      onClick={handleLinkClick}
                    >
                      {component.displayName}
                    </KitchenSinkMenuLink>
                  </li>
                ))}
              </ul>
            </KitchenSinkMenuPackage>
          ))}
        </LayoutNav>
        <LayoutMain>
          <KitchenSinkIntro>
            This page currently has {enabledComponents.length} MDX components
            enabled. This is an overview of all these components.
          </KitchenSinkIntro>
          <KitchenSinkList>
            {enabledComponents.map((component) => (
              <KitchenSinkComponent
                key={component.id}
                {...component}
                scrollTo={scrollToComponent === component.slug}
              />
            ))}
          </KitchenSinkList>
        </LayoutMain>
      </Layout>
    </DataProvider>
  )
}

KitchenSink.displayName = 'KitchenSink'

export default KitchenSink
