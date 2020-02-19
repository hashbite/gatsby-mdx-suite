import { graphql } from 'gatsby'

export const ComponentProps = graphql`
  fragment ComponentProps on ComponentProp {
    name
    description {
      text
    }
    defaultValue {
      value
    }
    required
    type {
      name
    }
  }
`
