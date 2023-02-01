import { FC, useState, useCallback } from "react";
import MonacoEditor, { OnChange } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
// import codeShift from "jscodeshift";
import MonacoJSXHighliter from "monaco-jsx-highlighter";
import traverse from "@babel/traverse";
import { parse } from "@babel/parser";

import "./CodeEditor.css";
import "./SyntaxHighlighting.css";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const [code, setCode] = useState(initialValue);

  const handleChange: OnChange = (text) => {
    onChange(text || "");
    setCode(text || "");
  };

  const handleFormat = () => {
    // Get current value
    const unformatted = initialValue;
    // format the value
    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: false,
      })
      .replace(/\n$/, "");
    // set formatted value in the editor
    setCode(formatted);
  };

  // JSX Syntax Highlighting

  const activateMonacoJSXHighlighter = async (
    monacoEditor: any,
    monaco: any
  ) => {
    const monacoJSXHighlighter = new MonacoJSXHighliter(
      monaco,
      parse,
      traverse,
      monacoEditor
    );

    monacoJSXHighlighter.highlightOnDidChangeModelContent();
    monacoJSXHighlighter.addJSXCommentCommand();

    return {
      monacoJSXHighlighter,
    };
  };

  const handleEditorDidMount = useCallback(async (editor: any, monaco: any) => {
    activateMonacoJSXHighlighter(editor, monaco);
  }, []);

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={handleFormat}
      >
        Format
      </button>
      <MonacoEditor
        value={code}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        language="javascript"
        theme="vs-dark"
        height="500px"
        options={{
          wordWrap: "on",
          tabSize: 2,
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          fontFamily: "Fira Code",
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
