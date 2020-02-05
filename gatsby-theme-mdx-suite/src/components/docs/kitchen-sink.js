import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { useThemeUI } from 'theme-ui'
import styled from '@emotion/styled'

import components from 'gatsby-theme-mdx-suite/src/gatsby-plugin-theme-ui/components'

import { useMDXComponents } from '@mdx-js/react'

const KitchenSinkWrapper = styled.div``

function KitchenSink() {
  const context = useThemeUI()
  const mdxComponents = useMDXComponents()

  const result = useStaticQuery(graphql`
    query KitchenSinkQuery {
      allComponentMetadata {
        nodes {
          displayName
          props {
            name
            description {
              text
            }
            defaultValue {
              value
            }
          }
          description {
            text
          }
        }
      }
    }
  `)

  console.log({ result, components, context, mdxComponents })

  const availableComponents = Object.keys(mdxComponents)

  const ourComponents = result.allComponentMetadata.nodes.filter(
    ({ displayName }) => availableComponents.includes(displayName)
  )

  return (
    <KitchenSinkWrapper>
      <h1>Kitchen Sink</h1>
      <ul>
        {ourComponents.map((component) => (
          <li key={component.id}>{component.displayName}</li>
        ))}
      </ul>
    </KitchenSinkWrapper>
  )
}

KitchenSink.displayName = 'KitchenSink'

export default KitchenSink
