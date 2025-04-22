import { EditorView } from "@codemirror/view";
import customSpTheme from "./spMidnight";

export const midnight = EditorView.theme({
  ".cm-tooltip": {
    backgroundColor: customSpTheme.colors.surface1,
    color: `${customSpTheme.syntax.plain}`,
    border: `1px solid ${customSpTheme.colors.clickable}`,
    borderRadius: "4px",
    fontFamily: customSpTheme.font.body,
    fontSize: customSpTheme.font.size,
    lineHeight: customSpTheme.font.lineHeight,
  },

  ".cm-tooltip-autocomplete .cm-completionLabel": {
    color: `${customSpTheme.syntax.keyword}`,
    fontSize: customSpTheme.font.size,
    fontWeight: "semibold",
  },

  ".cm-tooltip-autocomplete .cm-completionInfo": {
    color: `${customSpTheme.syntax.punctuation}`,
    fontSize: "13px",
  },

  ".cm-tooltip-autocomplete .cm-completion-selected": {
    backgroundColor: customSpTheme.colors.accent,
    color: customSpTheme.colors.surface1,
  },
});
