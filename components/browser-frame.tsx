interface BrowserFrameProps {
  html: string;
  css: string;
  js: string;
}

export default function BrowserFrame({ html, css, js }: BrowserFrameProps) {
  const iframeContent = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
    </html>
  `;

  return (
    <div className="flex-1 flex flex-col bg-[#1a1a1a] overflow-hidden">
      <div className="bg-[#222] h-8 flex items-center px-3">
        {/* Address bar simulation */}
        <div className="bg-[#111] rounded-full text-xs text-gray-400 px-3 py-1 w-full text-center">
          localhost:3000
        </div>
      </div>
      <iframe
        srcDoc={iframeContent}
        title="Live Preview"
        className="flex-1 w-full h-full border-0 bg-white"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}