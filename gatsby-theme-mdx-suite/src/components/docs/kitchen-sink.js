import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { useMDXComponents } from '@mdx-js/react'

import KitchenSinkComponent from './kitchen-sink-component'

const KitchenSinkWrapper = styled.div``
const KitchenSinkList = styled.div``

function KitchenSink() {
  const mdxComponents = useMDXComponents()

  const result = useStaticQuery(graphql`
    query KitchenSinkQuery {
      allComponentMetadata {
        nodes {
          displayName
          componentProps: props {
            name
            description {
              text
            }
            defaultValue {
              value
            }
            required
            type {
              name
            }
          }
          description {
            text
          }
        }
      }
    }
  `)

  const availableComponents = Object.keys(mdxComponents)

  const enabledComponents = result.allComponentMetadata.nodes
    .filter(({ displayName }) => availableComponents.includes(displayName))
    .map((componentData) => ({
      ...componentData,
      component: mdxComponents[componentData.displayName],
    }))

  return (
    <KitchenSinkWrapper>
      <h1>Kitchen Sink</h1>
      <KitchenSinkList>
        {enabledComponents.map((component) => (
          <KitchenSinkComponent key={component.id} {...component} />
        ))}
      </KitchenSinkList>
    </KitchenSinkWrapper>
  )
}

KitchenSink.displayName = 'KitchenSink'

export default KitchenSink
