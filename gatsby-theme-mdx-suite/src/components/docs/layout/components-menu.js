import React from 'react'
import propTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'
import { useMDXComponents } from '@mdx-js/react'

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

function ComponentsMenu() {
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
          examples {
            raw
          }
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

  return (
    <>
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
                <KitchenSinkMenuLink href={component.path}>
                  {component.displayName}
                </KitchenSinkMenuLink>
              </li>
            ))}
          </ul>
        </KitchenSinkMenuPackage>
      ))}
    </>
  )
}

ComponentsMenu.protoTypes = {
  pageTitle: propTypes.string.isRequired,
  componentsByPackage: propTypes.array.isRequired,
}

export default ComponentsMenu
