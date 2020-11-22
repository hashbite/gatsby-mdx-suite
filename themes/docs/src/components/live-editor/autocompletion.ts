import { monaco, Monaco } from '@monaco-editor/react'
import { useEffect, useMemo, useState } from 'react'
import { useMDXComponents } from '@mdx-js/react'

interface Range {
  startLineNumber: number
  endLineNumber: number
  startColumn: number
  endColumn: number
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
    const requiredProps = componentDescriptor.props.filter(
      ({ required }) => !!required
    )
    const requirePropsSnippets = requiredProps
      .map(({ name }, i) => `${name}="\${${i + 1}}"`)
      .join(` `)
    const cursorPos = requiredProps.length + 1
    const snippetCloseTag = hasChildren
      ? `>\${${requiredProps.length + 2}:}</${componentDescriptor.name}`
      : `/`

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
  return component.props.map((prop) => {
    return {
      label: prop.name,
      kind: monaco.languages.CompletionItemKind.Property,
      documentation: prop.description,
      insertText: prop.name,
      range: range,
    }
  })
}

export function registerMdxComponentPropertyAutocomplete({
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

export function useMonaco() {
  const [monacoInstance, setMonacoInstance] = useState<Monaco>(null)

  useEffect(() => {
    monaco.init().then((monaco) => {
      setMonacoInstance(monaco)
    })
  }, [setMonacoInstance])

  return monacoInstance
}

export const MATCH_COMPONENT_NAME = /<(\w+)(?:\s+[^>]+)?\s+$/

export function useComponentDescriptorMap(result: any): ComponentDescriptorMap {
  const mdxComponents = useMDXComponents()
  const memoizedComponentDescriptorMap = useMemo(() => {
    const rawComponentDescriptors = result.allComponentMetadata.nodes.filter(
      (n) => mdxComponents.hasOwnProperty(n.displayName)
    )
    const componentDescriptors = (rawComponentDescriptors as any[]).map<
      ComponentDescriptor
    >((raw) => {
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
    })

    return new Map<string, ComponentDescriptor>(
      componentDescriptors.map((d) => [d.name, d])
    )
  }, [result, mdxComponents])

  return memoizedComponentDescriptorMap
}
