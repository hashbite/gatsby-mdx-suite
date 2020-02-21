import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { useMDXComponents } from '@mdx-js/react'

import KitchenSinkComponent from './kitchen-sink-component'

const KitchenSinkWrapper = styled.div``
const KitchenSinkList = styled.div``
const KitchenSinkIntro = styled.div``

function KitchenSink() {
  const mdxComponents = useMDXComponents()

  const result = useStaticQuery(graphql`
    query KitchenSinkQuery {
      allComponentMetadata(sort: { fields: displayName }) {
        nodes {
          id
          displayName
          path
          componentProps: props {
            ...ComponentProps
          }
          description {
            childMdx {
              body
            }
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
      <KitchenSinkIntro>
        This page currently has {enabledComponents.length} MDX components
        enabled. This is an overview of all these components.
      </KitchenSinkIntro>
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
