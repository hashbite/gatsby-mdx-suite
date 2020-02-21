import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import tw from 'twin.macro'

const PropsWrapper = styled.table`
  ${tw`w-10/12 my-8 mx-auto p-0 border border-solid border-gray-400 bg-gray-100`}

  th {
    ${tw`text-gray-800 bg-gray-200`}
  }
`
const PropWrapper = styled.tr`
  &:nth-child(2n) {
    ${tw`bg-gray-200`}
  }

  td {
    ${tw`py-1 px-2`}
  }
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
          <th>Default Value</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {componentProps.map((propData) => {
          const { name, type, required, defaultValue, description } = propData
          return (
            <PropWrapper key={name}>
              <td>
                <strong>
                  {name}
                  {required && ' (required)'}
                </strong>
              </td>
              <td>{type && type.name}</td>
              <td>{defaultValue && defaultValue.value}</td>
              <td>{description && description.text}</td>
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
