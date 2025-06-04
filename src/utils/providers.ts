// TODO: Get data from Yumma CSS API
function createUtilities(monaco: any, range: any) {
  return [
    {
      detail: "background-color: white",
      insertText: "bg-white",
      kind: monaco.languages.CompletionItemKind.Constant,
      label: "bg-white",
      range: range,
    },
    {
      detail: "text-align: center",
      insertText: "ta-c",
      kind: monaco.languages.CompletionItemKind.Constant,
      label: "ta-c",
      range: range,
    },
    {
      detail: "padding: 1rem",
      insertText: "p-4",
      kind: monaco.languages.CompletionItemKind.Constant,
      label: "p-4",
      range: range,
    },
  ];
}

export function registerProviders(monaco: any) {
  monaco.languages.registerCompletionItemProvider("html", {
    provideCompletionItems: function (model: any, position: any) {
      var textUntilPosition = model.getValueInRange({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });
      var match = textUntilPosition.match(/class\s*=\s*"(.*?)$/);
      if (!match) {
        return { suggestions: [] };
      }
      var word = model.getWordUntilPosition(position);
      var range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      return {
        suggestions: createUtilities(monaco, range),
      };
    },
  });
}
