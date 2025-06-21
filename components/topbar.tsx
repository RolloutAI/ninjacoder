import { 
  ChevronDownIcon,
  GitBranchIcon,
  ExternalLinkIcon,
  CodeIcon,
  PenToolIcon,
  SearchIcon,
  CommandIcon,
  BotIcon
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import SpotlightSearch from "./spotlight-search";

interface TopbarProps {
  onVersionHistoryClick?: () => void;
  activeMode: 'code' | 'design';
  setActiveMode: (mode: 'code' | 'design') => void;
  resetAppState: () => void;
  toggleChatSidebar: () => void;
}

export default function Topbar({ onVersionHistoryClick, activeMode, setActiveMode, resetAppState, toggleChatSidebar }: TopbarProps) {
  const [showVersionMenu, setShowVersionMenu] = useState(false);
  const [showSpotlightSearch, setShowSpotlightSearch] = useState(false);
  const versionMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Toggle between code and design modes
  const toggleCodeMode = () => {
    setActiveMode(activeMode === 'code' ? 'design' : 'code');
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (versionMenuRef.current && !versionMenuRef.current.contains(event.target as Node)) {
        setShowVersionMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Enhanced keyboard shortcut handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSpotlightSearch(true);
        // Add visual feedback for the shortcut
        const searchButton = document.querySelector('.search-button');
        if (searchButton) {
          searchButton.classList.add('shortcut-pressed');
          setTimeout(() => {
            searchButton.classList.remove('shortcut-pressed');
          }, 200);
        }
      }
      
      // Toggle code mode with Cmd/Ctrl+E
      if ((e.metaKey || e.ctrlKey) && e.key === 'e') {
        e.preventDefault();
        toggleCodeMode();
        // Add visual feedback
        const codeButton = document.querySelector('.code-mode-button');
        if (codeButton) {
          codeButton.classList.add('shortcut-pressed');
          setTimeout(() => {
            codeButton.classList.remove('shortcut-pressed');
          }, 200);
        }
      }
      
      // Toggle version history with Cmd/Ctrl+H
      if ((e.metaKey || e.ctrlKey) && e.key === 'h') {
        e.preventDefault();
        if (onVersionHistoryClick) {
          onVersionHistoryClick();
        }
      }
      
      // Close search is handled by the SpotlightSearch component
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleCodeMode, onVersionHistoryClick]);

  return (
    <>
      <div className="flex items-center h-[40px] px-4 bg-[#0a0a0a] border-b border-[#222] shadow-sm">
        {/* Left section */}
        <div className="flex items-center">
          {/* Logo */}
          <button 
            className="flex items-center h-full hover:bg-[#1a1a1a] px-2 rounded-md transition-colors mr-4"
            onClick={resetAppState}
            title="Go to Main"
          >
            <div className="w-5 h-5 mr-2 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#8cc700" />
                <path d="M2 17L12 22L22 17" stroke="#8cc700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="#8cc700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-semibold text-white tracking-tight text-sm">Codejc</span>
          </button>
          
          {/* Branch and Version */}
          <div className="relative" ref={versionMenuRef}>
            <button 
              className="h-[28px] flex items-center text-xs text-[#8cc700] px-2 bg-transparent hover:bg-[#252525] transition-colors"
              onClick={() => setShowVersionMenu(!showVersionMenu)}
            >
              <span className="font-medium">main</span>
              <div className="mx-1.5 h-3 w-px bg-gray-600"></div>
              <span className="text-gray-400">v4.0.14</span>
              <ChevronDownIcon size={14} className="ml-1 text-gray-400" />
            </button>
            
            {showVersionMenu && (
              <div className="absolute top-full left-0 mt-1 bg-[#1a1a1a] border border-[#333] rounded-md shadow-lg z-50 w-64">
                <div className="p-3">
                  <button 
                    className="w-full flex items-center justify-center py-2 bg-[#252525] hover:bg-[#333] rounded-md transition-colors"
                    onClick={() => {
                      onVersionHistoryClick?.();
                      setShowVersionMenu(false);
                    }}
                  >
                    <span className="text-sm text-gray-300">Version History</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Center section - Search */}
        <div className="flex-1 flex items-center justify-center">
          {/* Search Bar */}
          <div className="w-96">
            <button 
              className="search-button w-full h-[30px] bg-[#1a1a1a] rounded-md px-3 text-xs text-gray-400 flex items-center hover:bg-[#252525] transition-all duration-300"
              onClick={() => setShowSpotlightSearch(true)}
            >
              <SearchIcon size={14} className="mr-2" />
              <span className="flex-1 text-left">Search files, commands, settings...</span>
              <div className="flex items-center space-x-1">
                <div className="bg-[#252525] rounded px-1.5 py-0.5 text-xs text-gray-500 flex items-center">
                  <CommandIcon size={10} className="mr-0.5" />
                  <span>K</span>
                </div>
              </div>
            </button>
          </div>
        </div>
        
        {/* Right section */}
        <div className="flex items-center space-x-3">
          {/* Code Mode Toggle button */}
          <button 
            className={`code-mode-button flex items-center h-[30px] px-3 rounded-md text-white transition-all duration-300 transform hover:scale-105 ${
              activeMode === 'code' 
                ? 'bg-[#8cc700] text-black hover:bg-[#9dd700] mode-toggle-active' 
                : 'bg-[#222] hover:bg-[#333]'
            }`}
            onClick={toggleCodeMode}
            title={activeMode === 'code' ? 'Switch to Design Mode (⌘E)' : 'Switch to Code Mode (⌘E)'}
          >
            <CodeIcon size={14} className={`mr-1.5 transition-transform duration-300 ${activeMode === 'code' ? 'rotate-0' : '-rotate-12'}`} />
            <span className="text-xs">{activeMode === 'code' ? 'Code Mode' : 'Code'}</span>
          </button>
          
          {/* AI Assistant button */}
          <button 
            className="flex items-center h-[30px] px-3 bg-[#222] rounded-md text-white hover:bg-[#333] transition-all duration-300 transform hover:scale-105"
            onClick={toggleChatSidebar}
            title="AI Assistant"
          >
            <BotIcon size={14} className="mr-1.5 text-[#8cc700] transition-transform duration-300 hover:rotate-12" />
            <span className="text-xs">Assistant</span>
          </button>
          
          {/* Visit button */}
          <button className="flex items-center h-[30px] px-4 bg-[#8cc700] rounded-md text-black font-medium hover:bg-[#9dd700] transition-all duration-300 transform hover:scale-105 hover:shadow-glow">
            <ExternalLinkIcon size={14} className="mr-1.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            <span className="text-xs">Visit</span>
          </button>
        </div>
      </div>
      
      {/* Spotlight Search */}
      <SpotlightSearch 
        isOpen={showSpotlightSearch}
        onClose={() => setShowSpotlightSearch(false)}
        onVersionHistoryClick={onVersionHistoryClick}
        activeMode={activeMode}
        setActiveMode={setActiveMode}
      />
    </>
  );
}