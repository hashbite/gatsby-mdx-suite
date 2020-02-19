import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const PropsWrapper = styled.table`
  margin: 2rem 0;
  padding: 1rem;
  border: 1px solid black;
  width: 100%;
  font-size: 0.8em;
`

const PropWrapper = styled.tr`
  &:nth-child(2n) {
    background-color: #f0f0f0;
  }

  td {
    padding: 0.25rem 0.5rem;
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
