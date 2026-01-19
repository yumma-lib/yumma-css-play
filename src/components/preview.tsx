"use client";

import Frame from "react-frame-component";

interface PreviewProps {
  code: string;
}

export function Preview({ code }: PreviewProps) {
  const initialContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/@yummacss/runtime@latest/dist/index.iife.js"></script>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        background: white;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
  `.trim();

  const handleContainerClick = () => {
    // Blur any focused element to allow global shortcuts to work
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <button
      className="w-full h-full"
      onClick={handleContainerClick}
      onKeyDown={() => {}}
      tabIndex={0}
      type="button"
    >
      <Frame
        initialContent={initialContent}
        mountTarget="#root"
        className="w-full h-full b-0"
        style={{ border: 0, pointerEvents: "auto" }}
      >
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: playground requires rendering user HTML */}
        <div dangerouslySetInnerHTML={{ __html: code }} />
      </Frame>
    </button>
  );
}

export default Preview;
