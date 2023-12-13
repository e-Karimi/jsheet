import React, { useEffect, useRef } from "react";
import "./Preview.css";

const html = `
<html lang="en">
<head>
 <title>iframe html</title>
 <style> html{background-color: #f6f6f6;}</style>
</head>
<body>
<div id="root"></div>
  <script>
    const HandleError = (err)=>{
      const root = document.getElementById("root")
      let errorHtml = '<div style="color: #db0000;><h5 style={{ margin: "8px 0" }}>RunTime Error :</h5>' + err + '</p>'
      root.insertAdjacentHTML('beforeEnd',errorHtml)
      console.error(err)
    };
   

    window.addEventListener("error",(event) => {
      event.preventDefault()
      HandleError(event.error)
    });

    <!-- Handling Synchronous Error -->
    window.addEventListener("message",(event) => {
    try{
      eval(event.data)
    }catch(err){
      HandleError(err)
    }
      }, false );
  </script>
</body>
</html>
  `;

interface PreviewProps {
  code: string;
  bundlingError: string;
}

const Preview: React.FC<PreviewProps> = ({ code, bundlingError }) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = html;

    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe ref={iframeRef} sandbox="allow-scripts" srcDoc={html} title="code-prview" />
      {bundlingError && (
        <div className="preview-error">
          <h5 style={{ margin: "5px 0" }}>RunTime Error :</h5>
          {bundlingError}
        </div>
      )}
    </div>
  );
};

export default Preview;
