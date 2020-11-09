import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const PropsWrapper = styled.table`
  ${tw`table-auto`}
  border-collapse: collapse;

  th {
    ${tw`px-4 py-2`}
  }
`
const PropWrapper = styled.tr(
  ({ odd }) => css`
    td {
      ${tw`border border-solid border-gray-300 py-2 px-2 bg-gray-100 text-gray-900`}
      ${odd && tw`bg-gray-200`}
    }
  `
)
const DescriptionWrapper = styled.div`
  ${tw`text-sm whitespace-normal`}
  & ul {
    list-style-type: disc;
  }
  & li {
    padding-bottom: 0;
    margin-bottom: 0.1rem;
  }
  & a {
    color: inherit;
    text-decoration: underline;
  }
`

const PropTitle = styled.div``
const Required = tw.span`
  rounded-full py-1 px-2 mr-2 mt-2
  bg-red-500 shadow-md
  text-red-100 text-xs
`
const Type = tw.span`
  rounded-full py-1 px-2 mr-2 mt-2
  bg-gray-500 shadow-md
  text-gray-100 text-xs
`

function Props({ componentProps }) {
  if (!componentProps.length) {
    return null
  }

  return (
    <PropsWrapper>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {componentProps.map((propData, i) => {
          const { name, type, required, defaultValue, description } = propData
          const odd = i % 2 !== 0
          return (
            <PropWrapper key={name} odd={odd}>
              <td>
                <PropTitle>{name}</PropTitle>
              </td>
              <td>
                {type && <Type>{type.name}</Type>}
                {required && <Required>required</Required>}
              </td>
              <td>{defaultValue && defaultValue.value}</td>
              <td>
                {description && description.text && description.childMdx && (
                  <DescriptionWrapper>
                    <MDXRenderer>{description.childMdx.body}</MDXRenderer>
                  </DescriptionWrapper>
                )}
              </td>
            </PropWrapper>
          )
        })}
      </tbody>
    </PropsWrapper>
  )
}

Props.propTypes = {
  componentProps: propTypes.array.isRequired,
}

export default Props
