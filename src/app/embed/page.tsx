"use client";

import { OpenNewWindow } from "iconoir-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import MonacoEditor from "@/components/panels/editor";
import Preview from "@/components/panels/preview";
import { embedCode } from "@/constants/code";
import { getEmbedCodeFromUrl } from "@/utils/share";

/**
 * A playground stripped down to fit in someone else's page.
 *
 * No navbar, no share button, no generated-CSS panel & no resizable splits:
 * an embed is a demo, not a workspace, and every control here is one more
 * thing to explain before the point lands. The escape hatch to the real
 * playground carries the current code with it, so nothing typed is lost.
 */
const Embed: React.FC = () => {
  const [code, setCode] = useState<string>(embedCode);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const fromUrl = getEmbedCodeFromUrl();
    if (fromUrl) setCode(fromUrl);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="d-f ai-c jc-c h-dvh bg-surface c-white">
        <div className="fs-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="d-f fd-c h-dvh bg-page">
      {/*
       * Stacked below the `md` breakpoint. The media query resolves against
       * the iframe's own width, not the host page's, so a narrow embed in a
       * wide page stacks correctly.
       */}
      <div className="d-f fd-c o-h f-1 @md:fd-r">
        <div className="o-h h-50% @md:h-100% @md:w-50%">
          <MonacoEditor code={code} onChange={setCode} />
        </div>

        <div className="btw-1 bc-border h-50% @md:btw-0 @md:blw-1 @md:h-100% @md:w-50%">
          <Preview ref={iframeRef} code={code} />
        </div>
      </div>

      <a
        href={`/?code=${encodeURIComponent(code)}`}
        target="_blank"
        rel="noreferrer"
        className="d-f ai-c jc-c g-2 px-3 h-8 btw-1 bc-border bg-page c-accent-dim fs-xs fw-500 td-none"
      >
        <OpenNewWindow className="w-4 h-4" />
        Open in the Yumma CSS playground
      </a>
    </div>
  );
};

export default Embed;
