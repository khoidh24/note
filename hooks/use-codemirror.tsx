import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import {
  bracketMatching,
  HighlightStyle,
  indentOnInput,
  syntaxHighlighting,
} from "@codemirror/language";
import { languages } from "@codemirror/language-data";
import { EditorState } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import {
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  keymap,
  lineNumbers,
} from "@codemirror/view";
import { tags as t } from "@lezer/highlight";
import { createTheme } from "@uiw/codemirror-themes";
import { RefObject, useEffect, useRef, useState } from "react";

export const TransparentTheme = EditorView.theme({
  "&": {
    background: "transparent !important",
    height: "100%",
  },
});

export const oneLightTheme = createTheme({
  theme: "dark",
  settings: {
    background: "#fafafa",
    foreground: "#383a42",
    caret: "#526eff",
    selection: "#e5e5e6",
    selectionMatch: "#d6d6d6",
    lineHighlight: "#f0f0f0",
    gutterBackground: "#fafafa",
    gutterForeground: "#9e9e9e",
  },
  styles: [
    { tag: t.comment, color: "#a0a1a7", fontStyle: "italic" },
    { tag: t.variableName, color: "#e45649" },
    { tag: [t.string, t.special(t.brace)], color: "#50a14f" },
    { tag: t.number, color: "#986801" },
    { tag: t.bool, color: "#986801" },
    { tag: t.null, color: "#986801" },
    { tag: t.keyword, color: "#a626a4", fontWeight: "bold" },
    { tag: t.operator, color: "#0184bc" },
    { tag: t.className, color: "#c18401" },
    { tag: t.definition(t.typeName), color: "#4078f2" },
    { tag: t.typeName, color: "#4078f2" },
    { tag: t.angleBracket, color: "#383a42" },
    { tag: t.tagName, color: "#e45649" },
    { tag: t.attributeName, color: "#986801" },
    { tag: t.function(t.variableName), color: "#4078f2" },
    { tag: t.meta, color: "#4078f2" },
    { tag: t.link, color: "#0184bc", textDecoration: "underline" },
    { tag: t.heading, fontWeight: "bold", color: "#4078f2" },
    { tag: t.strong, fontWeight: "bold" },
    { tag: t.emphasis, fontStyle: "italic" },
  ],
});

const customSyntaxHighlight = HighlightStyle.define([
  {
    tag: t.heading1,
    fontSize: "1.6rem",
    fontWeight: "bold",
  },
  {
    tag: t.heading2,
    fontSize: "1.4rem",
    fontWeight: "bold",
  },
  {
    tag: t.heading3,
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
]);

type Props = {
  initialDocs: string;
  onChange: (state: EditorState) => void;
};

const useCodeMirror = <T extends Element>(
  props: Props
): [RefObject<T | null>, EditorView?] => {
  const refContainer = useRef<T>(null);
  const [editorView, setEditorView] = useState<EditorView>();
  const { onChange } = props;

  useEffect(() => {
    if (!refContainer.current) return;
    const startState = EditorState.create({
      doc: props.initialDocs,
      extensions: [
        keymap.of([...defaultKeymap, ...historyKeymap]),
        lineNumbers(),
        highlightActiveLineGutter(),
        history(),
        indentOnInput(),
        bracketMatching(),
        highlightActiveLine(),
        EditorView.lineWrapping,
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
          addKeymap: true,
        }),
        oneDark,
        TransparentTheme,
        syntaxHighlighting(customSyntaxHighlight),
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            onChange && onChange(update.state);
          }
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: refContainer.current,
    });
    setEditorView(view);

    return () => {
      view.destroy();
    };
  }, [refContainer]);

  return [refContainer, editorView];
};

export default useCodeMirror;
