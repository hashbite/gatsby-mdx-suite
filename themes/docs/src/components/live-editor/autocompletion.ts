import { Monaco, useMonaco } from '@monaco-editor/react'
import { useEffect, useMemo, useState } from 'react'
import { useMDXComponents } from '@mdx-js/react'
import { graphql, useStaticQuery } from 'gatsby'

const COMPONENT_DESCRIPTOR_QUERY = graphql`
  query MonacoCompletinoComponentDescriptors {
    allComponentMetadata {
      nodes {
        displayName
        description {
          text
        }
        props {
          name
          type {
            name
          }
          required
          defaultValue {
            value
          }
          description {
            text
          }
        }
      }
    }
  }
`

interface Range {
  startLineNumber: number
  endLineNumber: number
  startColumn: number
  endColumn: number
}

function getPropertySnippet({ name, type }, index = 1) {
  if (type === 'bool') {
    return name
  }

  if (type === 'object') {
    return `${name}={{\${${index}:}}}`
  }

  return `${name}="\${${index}:}"`
}

function createMdxComponentProposals({
  monaco,
  components,
  range,
}: {
  monaco: Monaco
  components: ComponentDescriptorMap
  range: Range
}) {
  const completionProposals = []
  for (const componentDescriptor of components.values()) {
    const hasChildren = componentDescriptor.props.find(
      ({ name }) => name === 'children'
    )
    const requiredProps = componentDescriptor.props
      .filter(({ required }) => !!required)
      .filter(({ name }) => name !== 'children')
    const requirePropsSnippets = requiredProps
      .map((prop, i) => getPropertySnippet(prop, i + 1))
      .join(` `)
    const cursorPos = requiredProps.length + 1
    const snippetCloseTag = hasChildren
      ? `>\${${requiredProps.length + 2}:}</${componentDescriptor.name}>`
      : `/>`

    completionProposals.push({
      label: componentDescriptor.name,
      kind: monaco.languages.CompletionItemKind.Function,
      detail: componentDescriptor.description,
      insertText: `${componentDescriptor.name} ${requirePropsSnippets}\${${cursorPos}:}${snippetCloseTag}`,
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      range: range,
    })
  }
  return completionProposals
}

export function registerMdxComponentAutocomplete({
  monaco,
  components,
}: {
  monaco: Monaco
  components: ComponentDescriptorMap
}) {
  monaco.languages.registerCompletionItemProvider('markdown', {
    triggerCharacters: ['<'],
    provideCompletionItems: function (model, position) {
      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: Math.min(0, position.column - 1),
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      })
      const match = textUntilPosition === '<'
      if (!match) {
        return { suggestions: [] }
      }
      const word = model.getWordUntilPosition(position)
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      }
      return {
        suggestions: createMdxComponentProposals({ monaco, components, range }),
      }
    },
  })
}

interface ComponentProps {
  name: string
  description: string
  defaultValue: any
  required: boolean
  type: string
}

interface ComponentDescriptor {
  name: string
  props: ComponentProps[]
  description?: string
}

type ComponentDescriptorMap = Map<string, ComponentDescriptor>

function createMdxComponentPropsProposals({
  monaco,
  component,
  range,
}: {
  monaco: Monaco
  component: ComponentDescriptor
  range: Range
}) {
  return component.props
    .filter(({ name }) => name !== 'children')
    .map(({ name, description, type }) => {
      return {
        label: name,
        kind: monaco.languages.CompletionItemKind.Property,
        documentation: description,
        insertText: getPropertySnippet({ name, type }),
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range,
      }
    })
}

function registerMdxComponentPropertyAutocomplete({
  monaco,
  components,
}: {
  monaco: Monaco
  components: ComponentDescriptorMap
}) {
  monaco.languages.registerCompletionItemProvider('markdown', {
    triggerCharacters: [' '],
    provideCompletionItems: function (model, position) {
      const textUntilPosition = model.getValueInRange({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      })
      const match = textUntilPosition.match(MATCH_COMPONENT_NAME)
      if (!match) {
        return { suggestions: [] }
      }
      const component = match[1]

      const componentDescriptor = components.get(component)

      const word = model.getWordUntilPosition(position)
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      }
      return {
        suggestions: createMdxComponentPropsProposals({
          monaco,
          component: componentDescriptor,
          range,
        }),
      }
    },
  })
}

const MATCH_COMPONENT_NAME = /<(\w+)(?:\s+[^>]+)?\s+$/

function useComponentDescriptorMap(result: any): ComponentDescriptorMap {
  const mdxComponents = useMDXComponents()
  const memoizedComponentDescriptorMap = useMemo(() => {
    const rawComponentDescriptors = result.allComponentMetadata.nodes.filter(
      (n) => mdxComponents.hasOwnProperty(n.displayName)
    )
    const componentDescriptors = (rawComponentDescriptors as any[]).map<ComponentDescriptor>(
      (raw) => {
        return {
          name: raw.displayName,
          description: raw.description.text,
          props: (raw.props as any[]).map((rawProp) => {
            return {
              name: rawProp.name,
              type: rawProp.type?.name,
              defaultValue: rawProp.defaultValue?.value,
              description: rawProp.description.text,
              required: rawProp.required,
            }
          }),
        }
      }
    )

    return new Map<string, ComponentDescriptor>(
      componentDescriptors.map((d) => [d.name, d])
    )
  }, [result, mdxComponents])

  return memoizedComponentDescriptorMap
}

export function useRegisterAutocomplete() {
  const monaco = useMonaco()
  const componentDescriptorsResult = useStaticQuery(COMPONENT_DESCRIPTOR_QUERY)
  const componentDescriptorMap = useComponentDescriptorMap(
    componentDescriptorsResult
  )
  const [register, setRegister] = useState(false)

  useEffect(() => {
    if (!monaco || !register) {
      return
    }
    registerMdxComponentAutocomplete({
      monaco,
      components: componentDescriptorMap,
    })
    registerMdxComponentPropertyAutocomplete({
      monaco,
      components: componentDescriptorMap,
    })
  }, [monaco, componentDescriptorMap, register])

  return () => setRegister(true)
}
