import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { useMDXComponents } from '@mdx-js/react'

import KitchenSinkComponent from './kitchen-sink-component'

const KitchenSinkWrapper = styled.div`
  max-width: 1200px;
  padding: 1vw;
  margin: 2rem auto;
`
const KitchenSinkHeader = styled.div`
  margin-bottom: 4rem;
`
const KitchenSinkList = styled.div``

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
      <KitchenSinkHeader>
        <h1>Kitchen Sink</h1>
        <p>A list of all components of this website.</p>
      </KitchenSinkHeader>
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
