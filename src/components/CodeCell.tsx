import { useState, useEffect } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizable from "./Resizable";
import bundleCode from "../bundler";

function CodeCell() {
  const [input, setInput] = useState<string>("");
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundleCode(input);
      setCode(output);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

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
