import { useState } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizable from "./Resizable";
import bundleCode from "../bundler";

function CodeCell() {
  const [input, setInput] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const handleSubmit = async () => {
    // TODO: return if the test input is empty
    const output = await bundleCode(input);
    setCode(output);
  };

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={input}
            onChange={(value) => setInput(value)}
          />
        </Resizable>

        <Preview code={code} />
      </div>
    </Resizable>
  );
}

export default CodeCell;
