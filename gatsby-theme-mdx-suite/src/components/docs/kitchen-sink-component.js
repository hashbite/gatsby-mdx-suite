import React, { useEffect, useRef } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import Link from 'gatsby-link'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import tw from 'twin.macro'
import Observer from '@researchgate/react-intersection-observer'
import { useStaticQuery, graphql } from 'gatsby'

import LiveEditor from './live-editor'
import Props from './props'

const KitchenSinkComponentWrapper = styled.section``
const KitchenSinkComponentHeader = styled.header``
const KitchenSinkComponentTitle = styled.h1`
  ${tw`mt-32 p-4 bg-gray-400`}
`

function KitchenSinkComponent({
  id,
  displayName,
  componentProps,
  description,
  path,
  examples,
  slug,
  scrollTo,
}) {
  const componentRef = useRef(null)
  const handleComponentIntersection = (event) => {
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
        {description && <MDXRenderer>{description.childMdx.body}</MDXRenderer>}
        <Props componentProps={componentProps} />
        <LiveEditor editorId={id} initialValue={examples && examples[0]} />
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
  componentProps: propTypes.array.isRequired,
  examples: propTypes.array,
  description: propTypes.object,
  scrollTo: propTypes.bool,
}

export default KitchenSinkComponent
