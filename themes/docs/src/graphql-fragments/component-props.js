import { graphql } from 'gatsby'

export const MdxSuiteComponentPropsFragment = graphql`
  fragment MdxSuiteComponentProps on ComponentProp {
    name
    description {
      text # keep to check if description is given
      childMdx {
        body
      }
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
