import React, { useState, useEffect } from 'react'
import ExecutionEnvironment from 'exenv'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'
import { useMDXComponents } from '@mdx-js/react'
import Layout from './layout/layout'
import LayoutMain from './layout/main'
import LayoutNav from './layout/nav'

import DataProvider from './data-provider'
import KitchenSinkComponent from './kitchen-sink-component'
import Props from './props'

const KitchenSinkList = styled.div``
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
  const [isListeningToHashchange, setIsListeningToHashChange] = useState(false)
  const [scrollToComponent, setScrollToComponent] = useState(false)
  const [activeComponent, setActiveComponent] = useState(null)
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
    const componentToScrollTo = event.currentTarget.hash.substr(1)
    if (componentToScrollTo !== scrollToComponent) {
      setScrollToComponent(componentToScrollTo)
    }
  }

  const handleHashChange = (e) => {
    const newHash = window.location.hash.substr(1)
    if (newHash !== hash) {
      setHash(newHash)
    }
  }

  // Listen to window.hashchange event
  useEffect(() => {
    if (!isListeningToHashchange && ExecutionEnvironment.canUseDOM) {
      if (window.location.hash) {
        setHash(window.location.hash.substr(1))
      }
      window.addEventListener('hashchange', handleHashChange)
      window.onhashchange = handleHashChange
      setIsListeningToHashChange(true)
    }
  }, [ExecutionEnvironment.canUseDOM, isListeningToHashchange])

  // Set active component
  useEffect(() => {
    if (hash && (!activeComponent || activeComponent.slug !== hash)) {
      const res = enabledComponents.find(({ slug }) => slug === hash)
      if (res) {
        setActiveComponent(res)
      }
    }
  }, [hash])

  return (
    <DataProvider>
      <Layout title="Kitchen Sink (Component Overview)">
        <LayoutNav title="Menu">
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
        <LayoutNav title="Props" gridArea="side" inverted>
          {activeComponent && (
            <Props componentProps={activeComponent.componentProps} />
          )}
        </LayoutNav>
      </Layout>
    </DataProvider>
  )
}

KitchenSink.displayName = 'KitchenSink'

export default KitchenSink
