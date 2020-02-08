import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from '@emotion/styled'
import { useMDXComponents } from '@mdx-js/react'
import tw from 'tailwind.macro'

import KitchenSinkComponent from './kitchen-sink-component'

const KitchenSinkWrapper = styled.div`
  ${tw`pt-40`}
`
const KitchenSinkList = styled.div``
const KitchenSinkIntro = styled.div`
  ${tw`px-4`}
`
const KitchenSinkHeader = styled.div`
  ${tw`fixed px-4 bg-gray-800 text-white left-0 top-0 right-0 z-50 shadow-lg`}

  h1 {
    ${tw`my-2`}
  }
`

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
        <Link to="/">
          <h1>Kitchen Sink</h1>
        </Link>
      </KitchenSinkHeader>
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
