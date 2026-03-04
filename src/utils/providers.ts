import {
  registerCodeActionsProvider,
  registerColorProvider,
  registerCompletionProvider,
  registerConflictMarkers,
  registerHoverProvider,
  registerSortAction,
} from "@yummacss/intellisense/monaco";

export function registerProviders(monaco: any, editor: any): void {
  registerCompletionProvider(monaco);
  registerHoverProvider(monaco);
  registerColorProvider(monaco);
  registerCodeActionsProvider(monaco);
  registerConflictMarkers(monaco, editor);
  registerSortAction(monaco, editor);
}