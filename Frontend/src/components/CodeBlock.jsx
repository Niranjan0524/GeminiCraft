import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { style } from "react-syntax-highlighter/dist/esm/styles";


const CodeBlock=({code,language})=>{

  
  const copyToClipboard = () => {
      navigator.clipboard.writeText(code);
      alert('Code copied to clipboard!');
  };


  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={copyToClipboard}
        style={{ position: "absolute", top: "5px", right: "5px"  }}
      >
        Copy
      </button>
      <SyntaxHighlighter language={language} style={dark}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeBlock;