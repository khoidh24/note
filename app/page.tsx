"use client";

import Editor from "@/components/editor/Editor";
import OpenOverlay from "@/components/open-overlay/OpenOverlay";
import Preview from "@/components/preview/Preview";
import { useOpenEditStore } from "@/hooks/use-open-edit";
import { useCallback, useState } from "react";
import "./app.css";

export default function Home() {
  const [doc, setDoc] = useState<string>("");
  const { isOpen } = useOpenEditStore();

  const handleDocChange = useCallback((newDoc: string) => setDoc(newDoc), []);

  return (
    <>
      <div className="relative min-h-screen">
        <div
          className="fixed inset-0 bg-cover bg-center z-0 blur-xl"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        />
        <div className="fixed inset-0 bg-black/90 z-0" />

        <div className="relative z-10 flex h-screen app">
          <OpenOverlay />
          {isOpen && <Editor intialDoc={doc} onChange={handleDocChange} />}
          <Preview doc={doc} previewMode={!isOpen} />
        </div>
      </div>
    </>
  );
}
