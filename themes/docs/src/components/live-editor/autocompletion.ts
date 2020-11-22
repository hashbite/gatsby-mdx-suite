import { monaco, Monaco } from "@monaco-editor/react";
import { useEffect, useState } from "react";

interface Range {
  startLineNumber: number
  endLineNumber: number
  startColumn: number
  endColumn: number
}

function createMdxComponentProposals({ monaco, components, range }: { monaco: Monaco, components: any[], range: Range }) {
  return components.map((componentName) => {
    return {
      label: componentName,
      kind: monaco.languages.CompletionItemKind.Function,
      // documentation: "An image component.",
      insertText: componentName,
      range: range,
    }
  })
}


export function registerAutocomplete ({ monaco, components }: { monaco: Monaco, components: any[] }) {
  monaco.languages.registerCompletionItemProvider('markdown', {
    triggerCharacters: ['<'],
    provideCompletionItems: function(model, position) {
        // find out if we are completing a property in the 'dependencies' object.
        var textUntilPosition = model.getValueInRange({startLineNumber: position.lineNumber, startColumn: Math.min(0, position.column - 1), endLineNumber: position.lineNumber, endColumn: position.column});
        var match = textUntilPosition === '<'
        if (!match) {
            return { suggestions: [] };
        }
        var word = model.getWordUntilPosition(position);
        var range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn
        };
        return {

            suggestions: createMdxComponentProposals({ monaco, components, range })
        };
    }
  });
}


export function useMonaco () {
  const [monacoInstance, setMonacoInstance] = useState<Monaco>(null)

  useEffect(() => {
    monaco.init().then(monaco => {
      console.log('monaco inited')
      setMonacoInstance(monaco)
    });
  }, [setMonacoInstance])

  return monacoInstance
}
