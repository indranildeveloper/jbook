import { useState } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
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
    <div>
      <CodeEditor initialValue={input} onChange={(value) => setInput(value)} />
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
}

export default CodeCell;
