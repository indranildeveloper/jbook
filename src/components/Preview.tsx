import { FC, useEffect, useRef } from "react";
import "./Preview.css";

interface PreviewProps {
  code: string;
}

const html = `
<html>
  <head>
    <style>html { background-color: #ffffff }</style>
  </head>
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

const Preview: FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframe}
        srcDoc={html}
        title="code-runner"
        sandbox="allow-scripts"
      ></iframe>
    </div>
  );
};

export default Preview;
