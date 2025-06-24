import { 
  ChevronDownIcon,
  GitBranchIcon,
  ExternalLinkIcon,
  CodeIcon,
  PenToolIcon,
  SearchIcon,
  CommandIcon,
  BotIcon,
  PencilIcon,
  CheckIcon,
  XIcon
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import SpotlightSearch from "./spotlight-search";
import { ModeSwitch } from "./mode-switch";

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
  const [projectTitle, setProjectTitle] = useState("Untitled Project");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(projectTitle);
  const versionMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  // Handle title edit
  const startEditing = () => {
    setIsEditingTitle(true);
    setTempTitle(projectTitle);
    setTimeout(() => {
      titleInputRef.current?.focus();
      titleInputRef.current?.select();
    }, 100);
  };

  const saveTitle = () => {
    if (tempTitle.trim()) {
      setProjectTitle(tempTitle.trim());
    }
    setIsEditingTitle(false);
  };

  const cancelEditing = () => {
    setTempTitle(projectTitle);
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveTitle();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

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
      <div className="flex items-center h-[45px] px-4 bg-[#0a0a0a] border-b border-[#1a1a1a] shadow-lg">
        {/* Left section */}
        <div className="flex items-center gap-3">
          {/* Logo */}
          <button 
            className="flex items-center h-[32px] hover:bg-[#1a1a1a] px-2.5 rounded-lg transition-all duration-200 mr-2 group"
            onClick={resetAppState}
            title="Go to Main"
          >
            <div className="w-5 h-5 mr-2 flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#8cc700" />
                <path d="M2 17L12 22L22 17" stroke="#8cc700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="#8cc700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-semibold text-white tracking-tight text-sm">Codejc</span>
          </button>

          {/* Project Title */}
          <div className="flex items-center h-[32px]">
            <div className="relative flex items-center">
              {isEditingTitle ? (
                <div className="flex items-center bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] shadow-inner">
                  <input
                    ref={titleInputRef}
                    type="text"
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    onKeyDown={handleTitleKeyDown}
                    className="h-[32px] px-3 bg-transparent text-white text-sm focus:outline-none w-[200px]"
                    maxLength={50}
                  />
                  <div className="flex items-center px-2 space-x-1.5">
                    <button
                      onClick={saveTitle}
                      className="p-1.5 hover:bg-[#252525] rounded-md transition-colors"
                    >
                      <CheckIcon size={14} className="text-[#8cc700]" />
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="p-1.5 hover:bg-[#252525] rounded-md transition-colors"
                    >
                      <XIcon size={14} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={startEditing}
                  className="group flex items-center h-[32px] px-3 hover:bg-[#1a1a1a] rounded-lg transition-all duration-200"
                >
                  <span className="text-white text-sm font-medium">{projectTitle}</span>
                  <PencilIcon size={14} className="ml-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              )}
            </div>
          </div>
          
          {/* Branch and Version */}
          <div className="relative" ref={versionMenuRef}>
            <button 
              className="h-[32px] flex items-center text-xs px-3 bg-[#1a1a1a] hover:bg-[#252525] rounded-lg transition-all duration-200 border border-[#2a2a2a] shadow-sm"
              onClick={() => setShowVersionMenu(!showVersionMenu)}
            >
              <span className="font-medium text-[#8cc700]">main</span>
              <div className="mx-2 h-3 w-px bg-[#2a2a2a]"></div>
              <span className="text-gray-400">v4.0.14</span>
              <ChevronDownIcon size={14} className="ml-1.5 text-gray-400" />
            </button>
            
            {showVersionMenu && (
              <div className="absolute top-full left-0 mt-1.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg shadow-xl z-50 w-64">
                <div className="p-2">
                  <button 
                    className="w-full flex items-center justify-center py-2 bg-[#252525] hover:bg-[#303030] rounded-lg transition-all duration-200"
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
        <div className="flex-1 flex items-center justify-center max-w-2xl mx-auto px-4">
          <button 
            className="search-button w-full h-[32px] bg-[#1a1a1a] hover:bg-[#252525] rounded-lg px-3 text-sm text-gray-400 flex items-center border border-[#2a2a2a] shadow-sm transition-all duration-200 group"
            onClick={() => setShowSpotlightSearch(true)}
          >
            <SearchIcon size={14} className="mr-2 text-gray-500 group-hover:text-gray-400 transition-colors" />
            <span className="flex-1 text-left">Search files, commands, settings...</span>
            <div className="flex items-center">
              <div className="bg-[#252525] rounded-md px-2 py-0.5 text-xs text-gray-500 flex items-center border border-[#303030]">
                <CommandIcon size={12} className="mr-1" />
                <span>K</span>
              </div>
            </div>
          </button>
        </div>
        
        {/* Right section */}
        <div className="flex items-center gap-3">
          <ModeSwitch activeMode={activeMode} setActiveMode={setActiveMode} />
          
          {/* AI Assistant button */}
          <button 
            className="flex items-center h-[32px] px-4 bg-[#1a1a1a] hover:bg-[#252525] rounded-lg text-white/90 border border-[#2a2a2a] shadow-sm backdrop-blur-sm transition-all duration-200 text-sm font-medium group"
            onClick={toggleChatSidebar}
            title="AI Assistant"
          >
            <BotIcon size={14} className="mr-1.5 text-[#8cc700] transition-transform duration-200 group-hover:rotate-12" />
            <span>Assistant</span>
          </button>
          
          {/* Visit button */}
          <button className="flex items-center h-[32px] px-4 bg-gradient-to-r from-[#8cc700] to-[#aaff00] rounded-lg text-black font-medium hover:opacity-90 transition-all duration-200 transform hover:scale-[1.02] shadow-[0_2px_8px_0_rgba(140,199,0,0.15)] hover:shadow-[0_2px_12px_0_rgba(140,199,0,0.25)] group">
            <ExternalLinkIcon size={14} className="mr-1.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            <span className="text-sm">Visit</span>
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