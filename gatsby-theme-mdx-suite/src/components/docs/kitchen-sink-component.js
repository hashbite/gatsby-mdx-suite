import React, { useState, useEffect, useRef } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import Link from 'gatsby-link'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import tw from 'twin.macro'
import Observer from '@researchgate/react-intersection-observer'
import { Styled } from 'theme-ui'

import LiveEditor from './live-editor'

const KitchenSinkComponentWrapper = styled.section`
  ${tw`mt-8`}
  &:first-of-type {
    ${tw`mt-0`}
  }
`
const KitchenSinkComponentHeader = styled.header``
const KitchenSinkComponentTitle = tw(Styled.h1)`mt-0 p-4 bg-gray-400`
const KitchenSinkComponentDescription = styled.div`
  ${tw`my-8 p-4`}

  & *:last-of-type {
    ${tw`mb-0`}
  }
`

const EditorWrapper = styled.div(
  ({ renderEditor }) => css`
    ${tw`relative shadow-inner`}

    min-height: 30vh;

    ${renderEditor &&
    `
      &:before {
        content: 'loading...';
        ${tw`absolute font-bold font-heading z-0 text-5xl`}
        opacity: 0.2;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    `}
  `
)

function KitchenSinkComponent({
  id,
  displayName,
  description,
  path,
  examples,
  slug,
  scrollTo,
}) {
  const componentRef = useRef(null)
  const [renderEditor, setRenderEditor] = useState(false)
  const handleComponentIntersection = (event) => {
    setRenderEditor(event.isIntersecting)
    if (event.isIntersecting) {
      window.location.hash = `#${slug}`
    }
  }
  useEffect(() => {
    if (scrollTo && componentRef && componentRef.current) {
      componentRef.current.scrollIntoViewIfNeeded({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, [scrollTo])

  return (
    <Observer
      onChange={handleComponentIntersection}
      threshold={0.2}
      rootMargin="-5% 0px -50% 0px"
    >
      <KitchenSinkComponentWrapper ref={componentRef}>
        <KitchenSinkComponentHeader>
          <KitchenSinkComponentTitle>
            <Link to={path}>{displayName}</Link>
          </KitchenSinkComponentTitle>
        </KitchenSinkComponentHeader>
        {description && (
          <KitchenSinkComponentDescription>
            <MDXRenderer>{description.childMdx.body}</MDXRenderer>
          </KitchenSinkComponentDescription>
        )}
        <EditorWrapper>
          {renderEditor && (
            <LiveEditor
              editorId={id}
              initialValue={examples && examples[0].raw}
            />
          )}
        </EditorWrapper>
      </KitchenSinkComponentWrapper>
    </Observer>
  )
}

KitchenSinkComponent.defaulValue = {
  examples: [],
  scrollTo: false,
}

KitchenSinkComponent.propTypes = {
  slug: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  path: propTypes.string.isRequired,
  displayName: propTypes.string.isRequired,
  examples: propTypes.array,
  description: propTypes.object,
  scrollTo: propTypes.bool,
}

export default KitchenSinkComponent
