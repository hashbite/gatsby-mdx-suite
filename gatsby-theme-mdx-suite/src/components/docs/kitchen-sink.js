import React, { useState, useEffect } from 'react'
import ExecutionEnvironment from 'exenv'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'
import { useMDXComponents } from '@mdx-js/react'

import KitchenSinkComponent from './kitchen-sink-component'

const KitchenSinkWrapper = styled.div(
  ({ theme }) => css`
    position: absolute;
    top: ${theme.sizes['16']};
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: min-content 1fr;
  `
)
const KitchenSinkMenu = tw.nav`
  pb-8
  px-4
  text-sm
  bg-gray-200 overflow-x-scroll
`
const KitchenSinkContent = tw.div`my-8 px-8 overflow-x-scroll`
const KitchenSinkList = styled.div``
const KitchenSinkIntro = styled.div``
const KitchenSinkMenuLink = styled.a(
  ({ active }) => css`
    ${tw`block mt-2`}
    ${active && tw`text-blue-600`}
  `
)
const KitchenSinkMenuPackage = tw.div``
const KitchenSinkMenuPackageName = tw.div`font-bold whitespace-no-wrap text-gray-600 mt-8`

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
    <KitchenSinkWrapper>
      <KitchenSinkMenu>
        {Object.keys(componentsByPackage).map((packageName) => (
          <KitchenSinkMenuPackage key={packageName}>
            <KitchenSinkMenuPackageName>
              {packageName === 'null'
                ? `Developed for ${result.site.siteMetadata.title}`
                : packageName}
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
      </KitchenSinkMenu>
      <KitchenSinkContent>
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
      </KitchenSinkContent>
    </KitchenSinkWrapper>
  )
}

KitchenSink.displayName = 'KitchenSink'

export default KitchenSink
