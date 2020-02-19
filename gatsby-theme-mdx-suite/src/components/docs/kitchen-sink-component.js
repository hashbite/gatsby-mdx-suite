import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import Link from 'gatsby-link'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import LiveEditor from './live-editor'
import Props from './props'

const KitchenSinkComponentWrapper = styled.section``
const KitchenSinkComponentHeader = styled.header``
const KitchenSinkComponentTitle = styled.h1`
  margin-top: 4rem;
  padding-top: 4rem;
  border-top: 1px dashed black;
`

function KitchenSinkComponent({
  id,
  displayName,
  componentProps,
  component,
  description,
  path,
}) {
  return (
    <KitchenSinkComponentWrapper>
      <KitchenSinkComponentHeader>
        <KitchenSinkComponentTitle>
          <Link to={path}>{displayName}</Link>
        </KitchenSinkComponentTitle>
      </KitchenSinkComponentHeader>
      {description && <MDXRenderer>{description.childMdx.body}</MDXRenderer>}
      <Props componentProps={componentProps} />
      <LiveEditor
        id={id}
        displayName={displayName}
        component={component}
        componentProps={componentProps}
      />
    </KitchenSinkComponentWrapper>
  )
}

KitchenSinkComponent.propTypes = {
  id: propTypes.string.isRequired,
  path: propTypes.string.isRequired,
  displayName: propTypes.string.isRequired,
  component: propTypes.object.isRequired,
  componentProps: propTypes.array.isRequired,
  description: propTypes.object,
}

export default KitchenSinkComponent
