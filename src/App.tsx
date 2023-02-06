import { useEffect } from "react";
import * as esbuild from "esbuild-wasm";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import CellList from "./components/CellList";

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
      <CellList />
    </div>
  );
}

export default App;
