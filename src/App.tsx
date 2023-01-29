import { useState, useEffect, useRef, MouseEvent } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

function App() {
  const iframe = useRef<any>();
  const [input, setInput] = useState<string>("");

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.17.5/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    // TODO: return if the test input is empty

    iframe.current.srcdoc = html;

    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    // setCode(result.outputFiles[0].text);
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
  };

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener("message", (event) => {
            try{
              eval(event.data);
            } catch(error) {
              const root = document.querySelector("#root");
              root.innerHTML = "<div style='color: red;'><h4>Runtime Error</h4>" + error + "</div>";
              console.error(error);
            }
          }, false)
        </script>
      </body>
    </html>
  `;

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <iframe
        ref={iframe}
        srcDoc={html}
        title="code-runner"
        sandbox="allow-scripts"
      ></iframe>
    </div>
  );
}

export default App;
