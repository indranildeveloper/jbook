import { useEffect } from "react";
import * as esbuild from "esbuild-wasm";
import CodeCell from "./components/CodeCell";
import "bulmaswatch/superhero/bulmaswatch.min.css";

function App() {
  useEffect(() => {
    async function esbuildInitialize() {
      await esbuild.initialize({
        worker: true,
        wasmURL: "https://unpkg.com/esbuild-wasm@0.17.5/esbuild.wasm",
      });
    }
    esbuildInitialize();
  }, []);

  return (
    <div>
      <CodeCell />
      <CodeCell />
    </div>
  );
}

export default App;
