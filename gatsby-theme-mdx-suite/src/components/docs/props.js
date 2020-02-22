import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

const PropsWrapper = styled.table`
  ${tw`w-10/12 my-8 mx-auto p-0 border border-solid border-gray-400 bg-gray-100`}

  th {
    ${tw`text-gray-800 bg-gray-200`}
  }
`
const PropWrapper = styled.tr(
  ({ odd }) => css`
    ${tw`bg-gray-100`}
    ${odd && tw`bg-gray-200`}

    td {
      ${tw`py-1 px-2`}
    }
  `
)
const DescriptionWrapper = tw(PropWrapper)`text-sm`

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
          <th>Default Value</th>
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
                  <strong>
                    {name}
                    {required && ' (required)'}
                  </strong>
                </td>
                <td>{type && type.name}</td>
                <td>{defaultValue && defaultValue.value}</td>
              </PropWrapper>
              {description && description.text && (
                <DescriptionWrapper odd={odd}>
                  <td colSpan={3}>{description.text}</td>
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
