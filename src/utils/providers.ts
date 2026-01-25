import { getUtils } from "./api";
import { registerHoverProvider } from "./hoverProvider";

export function registerProviders(monaco: any) {
  const disposables: any[] = [];

  // register completion provider
  const completionDisposable = monaco.languages.registerCompletionItemProvider(
    "html",
    {
      provideCompletionItems: (model: any, position: any) => {
        const textUntilPosition = model.getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });

        const match = textUntilPosition.match(/class\s*=\s*"([^"]*)$/);
        if (!match) return { suggestions: [] };

        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        try {
          const suggestions = getUtils(monaco);
          const suggestionsWithRange = suggestions.map((suggestion) => ({
            ...suggestion,
            range: range,
          }));

          return { suggestions: suggestionsWithRange };
        } catch (error) {
          console.error("Error getting suggestions:", error);
          return { suggestions: [] };
        }
      },
    },
  );
  disposables.push(completionDisposable);

  // register hover provider
  const hoverDisposable = registerHoverProvider(monaco);
  disposables.push(hoverDisposable);

  return disposables;
}
