"use client";

import useCodeMirror from "@/hooks/use-codemirror";
import { EditorState } from "@codemirror/state";
import { FC, useCallback, useEffect } from "react";
import "./editor.css";

type Props = {
  intialDoc: string;
  onChange: (doc: string) => void;
};

const Editor: FC<Props> = (props) => {
  const { onChange, intialDoc } = props;
  const handleChange = useCallback(
    (state: EditorState) => onChange(state.doc.toString()),
    [onChange]
  );
  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDocs: intialDoc,
    onChange: handleChange,
  });

  return <div className="editor--wrapper" ref={refContainer}></div>;
};

export default Editor;
