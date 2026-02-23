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
    <script src="https://unpkg.com/@yummacss/runtime"></script>
    <style>
      html, body {
        background: white;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
  `.trim();

  return (
    <Frame
      initialContent={initialContent}
      mountTarget="#root"
      className="b-0 w-full h-full"
      style={{ border: 0 }}
    >
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: playground requires rendering user HTML */}
      <div dangerouslySetInnerHTML={{ __html: code }} />
    </Frame>
  );
}

export default Preview;
