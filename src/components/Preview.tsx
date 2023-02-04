import { FC, useEffect, useRef } from "react";
import "./Preview.css";
import { clearConfigCache } from "prettier";

interface PreviewProps {
  code: string;
  bundlingError: string;
}

const html = `
<html>
  <head>
    <style>html { background-color: #ffffff }</style>
  </head>
  <body style="font-family: sans-serif;">
    <div id="root"></div>
    <script>
      const handleError = (error) => {
        const root = document.querySelector("#root");
        root.innerHTML = "<div style='color: red;'><h4>Runtime Error</h4>" + error + "</div>";
        console.error(error);
      };

      window.addEventListener("error", (event) => {
        event.preventDefault();
        handleError(event.error);
      });

      window.addEventListener("message", (event) => {
        try{
          eval(event.data);
        } catch(error) {
         handleError(error);
        }
      }, false);
    </script>
  </body>
</html>
`;

const Preview: FC<PreviewProps> = ({ code, bundlingError }) => {
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
      {bundlingError && <div className="preview-error">{bundlingError}</div>}
    </div>
  );
};

export default Preview;
