import { FC, useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useActions } from "../hooks/useActions";
import { Cell } from "../state";
import "./TextEditor.css";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: FC<TextEditorProps> = ({ cell }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState<boolean>(false);

  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        editorRef.current &&
        event.target &&
        editorRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };

    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={editorRef}>
        <MDEditor
          value={cell.content}
          onChange={(value) => updateCell(cell.id, value || "")}
        />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || "Click to edit"} />
      </div>
    </div>
  );
};

export default TextEditor;
