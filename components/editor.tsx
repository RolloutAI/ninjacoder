import { useState, useEffect, useRef } from "react";
import { XIcon } from "lucide-react";

interface EditorProps {
  files: Record<string, string>;
  activeFile: string;
  setActiveFile: (file: string) => void;
  openFiles: string[];
  onCloseFile: (file: string) => void;
}

export default function Editor({ files, activeFile, setActiveFile, openFiles, onCloseFile }: EditorProps) {
  const [content, setContent] = useState(files[activeFile] || '');
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  // Update content when active file changes
  useEffect(() => {
    setContent(files[activeFile] || '');
  }, [activeFile, files]);

  // Sync scroll between textarea and highlighted view
  useEffect(() => {
    const textarea = editorRef.current;
    const highlight = highlightRef.current;
    
    if (!textarea || !highlight) return;
    
    const syncScroll = () => {
      highlight.scrollTop = textarea.scrollTop;
      highlight.scrollLeft = textarea.scrollLeft;
    };
    
    textarea.addEventListener('scroll', syncScroll);
    return () => textarea.removeEventListener('scroll', syncScroll);
  }, []);

  const handleTabClick = (file: string) => {
    setActiveFile(file);
  };

  // Handle tab close
  const handleTabClose = (e: React.MouseEvent, file: string) => {
    e.stopPropagation(); // Prevent tab selection when closing
    onCloseFile(file);
  };

  // Handle content change
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    // Here you would typically update the files state in the parent component
  };

  // Handle tab key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newContent = content.substring(0, start) + '  ' + content.substring(end);
      setContent(newContent);
      
      // Move cursor after the inserted tab
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.selectionStart = editorRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  // Get file language based on extension
  const getFileLanguage = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'js':
        return 'javascript';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      default:
        return 'plaintext';
    }
  };

  // Syntax highlighting based on file type
  const highlightCode = (code: string, language: string) => {
    const lines = code.split('\n');
    
    return lines.map((line, lineIndex) => {
      // Simple syntax highlighting based on language
      let highlightedLine = line;
      
      if (language === 'html') {
        // HTML tags
        highlightedLine = highlightedLine.replace(
          /<(\/?)([\w\-]+)([^>]*?)(>)/g,
          '<span class="text-[#e06c75]">&lt;$1$2$3&gt;</span>'
        );
        
        // HTML attributes
        highlightedLine = highlightedLine.replace(
          /(\s+)([\w\-:]+)(=)/g,
          '$1<span class="text-[#d19a66]">$2</span>$3'
        );
        
        // HTML attribute values
        highlightedLine = highlightedLine.replace(
          /(=)(".*?")/g,
          '$1<span class="text-[#98c379]">$2</span>'
        );
      } else if (language === 'javascript') {
        // JavaScript keywords
        highlightedLine = highlightedLine.replace(
          /\b(const|let|var|function|return|if|else|for|while|class|import|export|default|from|async|await|try|catch|throw|new|this|super|extends|static|get|set)\b/g,
          '<span class="text-[#c678dd]">$1</span>'
        );
        
        // JavaScript strings
        highlightedLine = highlightedLine.replace(
          /(".*?"|'.*?'|`.*?`)/g,
          '<span class="text-[#98c379]">$1</span>'
        );
        
        // JavaScript numbers
        highlightedLine = highlightedLine.replace(
          /\b(\d+(\.\d+)?)\b/g,
          '<span class="text-[#d19a66]">$1</span>'
        );
        
        // JavaScript functions
        highlightedLine = highlightedLine.replace(
          /\b([\w]+)(?=\s*\()/g,
          '<span class="text-[#61afef]">$1</span>'
        );
      }
      
      return (
        <div key={lineIndex} className="editor-line whitespace-pre">
          <div dangerouslySetInnerHTML={{ __html: highlightedLine || '&nbsp;' }} />
        </div>
      );
    });
  };

  return (
    <div className="flex-1 overflow-hidden bg-[#000] relative flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-[#222] bg-[#111] items-center overflow-x-auto h-[32px]">
        {/* Tabs container */}
        <div className="flex-1 flex h-full">
          {openFiles.map((file) => (
            <div 
              key={file}
              className={`h-full flex items-center cursor-pointer whitespace-nowrap transition-colors duration-150 group ${
                activeFile === file 
                  ? "bg-[#000] border-b-2 border-[#8cc700]" 
                  : "bg-[#111] border-b-2 border-transparent hover:bg-[#1a1a1a]"
              }`}
              onClick={() => handleTabClick(file)}
            >
              <span className={`text-xs font-medium px-3 ${activeFile === file ? "text-white" : "text-gray-500"}`}>
                {file}
              </span>
              
              {/* Close button */}
              <button 
                className={`mr-1 p-0.5 rounded-sm ${
                  activeFile === file 
                    ? "text-gray-400 hover:text-white hover:bg-[#333]" 
                    : "text-gray-600 hover:text-gray-400 hover:bg-[#222] opacity-0 group-hover:opacity-100"
                } transition-opacity`}
                onClick={(e) => handleTabClose(e, file)}
                title={`Close ${file}`}
              >
                <XIcon size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Editor content */}
      <div className="flex-1 overflow-auto custom-selection hide-scrollbar">
        <div className="flex min-w-full h-full">
          {/* Line numbers */}
          <div className="bg-[#111] text-gray-500 py-2 pr-4 pl-4 select-none w-12 flex-shrink-0">
            {content.split('\n').map((_, index) => (
              <div key={index} className="editor-line">
                <span className="line-number text-xs">
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
          
          {/* Code content */}
          <div className="py-2 code-font overflow-x-auto flex-1 custom-selection hide-scrollbar relative">
            {/* Syntax highlighted code */}
            <div 
              ref={highlightRef}
              className="absolute top-0 left-0 w-full h-full pointer-events-none text-xs p-2"
              aria-hidden="true"
            >
              {highlightCode(content, getFileLanguage(activeFile))}
            </div>

            {/* Editable textarea */}
            <textarea
              ref={editorRef}
              value={content}
              onChange={handleContentChange}
              onKeyDown={handleKeyDown}
              className="absolute top-0 left-0 w-full h-full bg-transparent text-transparent caret-white font-mono text-xs p-2 resize-none outline-none border-none"
              spellCheck="false"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              data-gramm="false"
              data-gramm_editor="false"
              data-enable-grammarly="false"
            />
          </div>
        </div>
      </div>
    </div>
  );
}