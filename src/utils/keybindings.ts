export const setupKeybindings = (editor: any, monaco: any) => {
  try {
    editor.addCommand(
      monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF,
      () => {},
    );

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      try {
        return editor.trigger("keyboard", "editor.action.formatDocument", null);
      } catch (error) {
        console.warn("Format document failed:", error);
        return null;
      }
    });
  } catch (error) {
    console.error("Failed to setup keybindings:", error);
  }
};
