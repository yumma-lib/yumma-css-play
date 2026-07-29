"use client";

import { Button } from "@base-ui/react";
import { NavArrowDown } from "iconoir-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import {
  Group,
  Panel,
  type PanelImperativeHandle,
  Separator,
} from "react-resizable-panels";
import Navbar from "@/components/navbar";
import GeneratedCSSPanel from "@/components/panels/css";
import MonacoEditor from "@/components/panels/editor";
import Preview from "@/components/panels/preview";
import { initialCode } from "@/constants/code";
import { getCodeFromUrl } from "@/utils/share";

const Home: React.FC = () => {
  const [code, setCode] = useState<string>(initialCode);
  const [isLoading, setIsLoading] = useState(true);
  const [cssPanelOpen, setCssPanelOpen] = useState(false);

  const editorPanelRef = useRef<PanelImperativeHandle>(null);
  const cssPanelRef = useRef<PanelImperativeHandle>(null);
  // biome-ignore lint/suspicious/noExplicitAny: monaco-editor types not installed directly
  const editorRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const sharedCode = getCodeFromUrl();
    if (sharedCode) setCode(sharedCode);
    setIsLoading(false);
  }, []);

  // v4 never fires onResize - not for drags, keyboard resizes, or imperative
  // collapse/expand - so the panel's own size is the only reliable signal for
  // whether the collapsed bar should show.

  // "50%" not 50: v4 reads bare numbers as pixels, strings as percentages.
  const handleResetLayout = () => editorPanelRef.current?.resize("50%");
  const handleFullPreview = () => editorPanelRef.current?.collapse();

  // isCollapsed() is the source of truth for direction: v4 never fires
  // onResize, so cssPanelOpen alone would drift. The Group's onLayoutChange
  // covers drag-driven collapses; this covers the button.
  const handleToggleCSSPanel = () => {
    const panel = cssPanelRef.current;
    if (!panel) return;

    if (panel.isCollapsed()) {
      panel.expand();
      setCssPanelOpen(true);
    } else {
      panel.collapse();
      setCssPanelOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="d-f ai-c jc-c h-dvh bg-surface c-white">
        <div className="ta-c">
          <div className="fs-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-dvh">
      <Group orientation="horizontal" className="h-100%">
        {/* Left column */}
        {/*
         * collapsible is required for handleFullPreview: v4 ignores collapse()
         * on a panel that cannot collapse, so without it the button no-ops.
         */}
        <Panel
          panelRef={editorPanelRef}
          collapsible
          maxSize="80%"
          minSize="20%"
          defaultSize="50%"
        >
          {/*
           * Navbar sits OUTSIDE the vertical Group so the CSS panel
           * can expand all the way up to the navbar's bottom edge.
           */}
          <div className="d-f fd-c h-100%">
            <Navbar
              code={code}
              editorRef={editorRef}
              onResetLayout={handleResetLayout}
              onFullPreview={handleFullPreview}
            />

            {/* Vertical split: editor on top, CSS panel on bottom */}
            <div className="o-h f-1">
              <Group
                orientation="vertical"
                className="h-100%"
                // Keeps the collapsed bar in sync when the panel is dragged
                // shut, which the button handler cannot see.
                onLayoutChange={(layout) =>
                  setCssPanelOpen((layout.css ?? 0) > 0)
                }
              >
                {/* Editor */}
                <Panel minSize="0%" defaultSize="78%">
                  <MonacoEditor
                    code={code}
                    onChange={setCode}
                    onMount={(editor) => {
                      editorRef.current = editor;
                    }}
                  />
                </Panel>

                {/* Vertical resize handle */}
                <Separator className="h-px bg-border c-rr" />

                {/* CSS panel: collapsible, starts collapsed */}
                <Panel
                  id="css"
                  panelRef={cssPanelRef}
                  collapsible
                  minSize="10%"
                  defaultSize="0%"
                  className="o-h"
                >
                  <GeneratedCSSPanel
                    iframeRef={iframeRef}
                    onToggle={handleToggleCSSPanel}
                  />
                </Panel>
              </Group>
            </div>

            {/* Collapsed bar: only rendered when panel is fully collapsed */}
            {!cssPanelOpen && (
              <Button
                type="button"
                onClick={handleToggleCSSPanel}
                className="d-f ai-c g-2 fs-0 px-3 w-100% h-8 bc-border bg-page btw-1 bw-0 c-p"
              >
                <NavArrowDown className="c-muted" />
                <span className="c-accent-dim ff-m tt-u ls-4 fw-500 fs-xss">
                  Generated CSS
                </span>
              </Button>
            )}
          </div>
        </Panel>

        {/* Horizontal resize handle */}
        <Separator className="w-px bg-border c-cr" />

        {/* Preview pane */}
        <Panel defaultSize="50%" minSize="20%" maxSize="80%">
          <Preview ref={iframeRef} code={code} />
        </Panel>
      </Group>
    </div>
  );
};

export default Home;
