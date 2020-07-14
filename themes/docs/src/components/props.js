import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const PropsWrapper = styled.table`
  ${tw`w-10/12 my-8 w-full p-0`}

  th {
    ${tw`text-gray-500`}
  }
`
const PropWrapper = styled.tr(
  ({ odd }) => css`
    ${tw`whitespace-no-wrap`}
    ${odd && tw`bg-gray-600`}

    td {
      ${tw`py-2 px-2`}
    }
  `
)
const DescriptionWrapper = styled(PropWrapper)`
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
          <th colSpan="2">Name</th>
          <th>Default</th>
        </tr>
      </thead>
      <tbody>
        {componentProps.map((propData, i) => {
          const { name, type, required, defaultValue, description } = propData
          const odd = i % 2 !== 0
          return (
            <>
              <PropWrapper key={name} odd={odd}>
                <td>
                  <PropTitle>{name}</PropTitle>
                </td>
                <td>
                  {type && <Type>{type.name}</Type>}
                  {required && <Required>required</Required>}
                </td>
                <td>{defaultValue && defaultValue.value}</td>
              </PropWrapper>
              {description && description.text && description.childMdx && (
                <DescriptionWrapper odd={odd}>
                  <td colSpan={3}>
                    <MDXRenderer>{description.childMdx.body}</MDXRenderer>
                  </td>
                </DescriptionWrapper>
              )}
            </>
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
