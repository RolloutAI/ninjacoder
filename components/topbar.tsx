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

          {/* Project Title */}
          <div className="flex items-center h-[30px] mr-4">
            <div className="relative flex items-center">
              {isEditingTitle ? (
                <div className="flex items-center bg-[#1a1a1a] rounded-md">
                  <input
                    ref={titleInputRef}
                    type="text"
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    onKeyDown={handleTitleKeyDown}
                    className="h-[30px] px-3 bg-transparent text-white text-sm focus:outline-none"
                    maxLength={50}
                  />
                  <div className="flex items-center px-2 space-x-1">
                    <button
                      onClick={saveTitle}
                      className="p-1 hover:bg-[#252525] rounded-md"
                    >
                      <CheckIcon size={14} className="text-[#8cc700]" />
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="p-1 hover:bg-[#252525] rounded-md"
                    >
                      <XIcon size={14} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={startEditing}
                  className="group flex items-center h-[30px] px-3 hover:bg-[#1a1a1a] rounded-md transition-colors"
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
          <ModeSwitch activeMode={activeMode} setActiveMode={setActiveMode} />
          
          {/* AI Assistant button */}
          <button 
            className="flex items-center h-[30px] px-4 bg-[rgba(35,35,35,0.7)] rounded-xl text-white/80 hover:bg-white/5 border border-[#232323] backdrop-blur-md shadow-sm transition-all duration-300 text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8cc700]/60"
            onClick={toggleChatSidebar}
            title="AI Assistant"
          >
            <BotIcon size={14} className="mr-1.5 text-[#8cc700] transition-transform duration-300 hover:rotate-12" />
            <span className="text-xs">Assistant</span>
          </button>
          
          {/* Visit button */}
          <button className="flex items-center h-[30px] px-4 bg-gradient-to-tr from-[#aaff00]/80 to-[#8cc700]/90 rounded-xl text-black font-semibold hover:from-[#aaff00]/90 hover:to-[#8cc700]/100 transition-all duration-300 transform hover:scale-[1.02] shadow-[0_2px_8px_0_rgba(140,199,0,0.15)] hover:shadow-[0_2px_16px_0_rgba(140,199,0,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8cc700]/80">
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