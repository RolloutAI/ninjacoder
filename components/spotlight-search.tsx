import { useState, useRef, useEffect } from 'react';
import {
  SearchIcon,
  FileIcon,
  FolderIcon,
  CommandIcon,
  GitBranchIcon,
  CodeIcon,
  PenToolIcon,
  SettingsIcon,
  ClockIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  BookOpenIcon,
  PackageIcon,
  TerminalIcon,
  KeyboardIcon
} from 'lucide-react';

interface SpotlightSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onVersionHistoryClick?: () => void;
  activeMode: 'code' | 'design';
  setActiveMode: (mode: 'code' | 'design') => void;
}

type SearchResult = {
  id: string;
  type: 'file' | 'folder' | 'command' | 'setting' | 'doc';
  title: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
  category: string;
};

export default function SpotlightSearch({
  isOpen,
  onClose,
  onVersionHistoryClick,
  activeMode,
  setActiveMode
}: SpotlightSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const selectedItemRef = useRef<HTMLDivElement>(null);

  // Sample data for search results
  const allSearchResults: SearchResult[] = [
    // Files
    {
      id: 'file-1',
      type: 'file',
      title: 'index.html',
      description: 'Main HTML file',
      icon: <FileIcon size={16} className="text-orange-400" />,
      action: () => console.log('Opening index.html'),
      category: 'Recent Files'
    },
    {
      id: 'file-2',
      type: 'file',
      title: 'styles.css',
      description: 'Main stylesheet',
      icon: <FileIcon size={16} className="text-blue-400" />,
      action: () => console.log('Opening styles.css'),
      category: 'Recent Files'
    },
    {
      id: 'file-3',
      type: 'file',
      title: 'main.js',
      description: 'JavaScript entry point',
      icon: <FileIcon size={16} className="text-yellow-400" />,
      action: () => console.log('Opening main.js'),
      category: 'Recent Files'
    },
    {
      id: 'file-4',
      type: 'file',
      title: 'package.json',
      description: 'Project dependencies',
      icon: <FileIcon size={16} className="text-yellow-300" />,
      action: () => console.log('Opening package.json'),
      category: 'Project Files'
    },
    {
      id: 'file-5',
      type: 'file',
      title: 'README.md',
      description: 'Project documentation',
      icon: <FileIcon size={16} className="text-gray-400" />,
      action: () => console.log('Opening README.md'),
      category: 'Project Files'
    },

    // Folders
    {
      id: 'folder-1',
      type: 'folder',
      title: 'components',
      description: 'UI components',
      icon: <FolderIcon size={16} className="text-[#e8c07d]" />,
      action: () => console.log('Opening components folder'),
      category: 'Folders'
    },
    {
      id: 'folder-2',
      type: 'folder',
      title: 'assets',
      description: 'Static assets',
      icon: <FolderIcon size={16} className="text-[#e8c07d]" />,
      action: () => console.log('Opening assets folder'),
      category: 'Folders'
    },

    // Commands
    {
      id: 'command-1',
      type: 'command',
      title: activeMode === 'code' ? 'Exit Code Mode' : 'Enter Code Mode',
      icon: <CodeIcon size={16} className="text-[#8cc700]" />,
      action: () => {
        setActiveMode(activeMode === 'code' ? 'design' : 'code');
        onClose();
      },
      shortcut: '⌘+E',
      category: 'Commands'
    },
    {
      id: 'command-3',
      type: 'command',
      title: 'View Version History',
      icon: <ClockIcon size={16} className="text-[#8cc700]" />,
      action: () => {
        if (onVersionHistoryClick) {
          onVersionHistoryClick();
          onClose();
        }
      },
      shortcut: '⌘+H',
      category: 'Commands'
    },
    {
      id: 'command-4',
      type: 'command',
      title: 'Switch Branch',
      icon: <GitBranchIcon size={16} className="text-[#8cc700]" />,
      action: () => console.log('Switching branch'),
      shortcut: '⌘+B',
      category: 'Git'
    },
    {
      id: 'command-5',
      type: 'command',
      title: 'Commit Changes',
      icon: <GitBranchIcon size={16} className="text-[#8cc700]" />,
      action: () => console.log('Committing changes'),
      shortcut: '⌘+K',
      category: 'Git'
    },

    // Settings
    {
      id: 'setting-1',
      type: 'setting',
      title: 'Editor Settings',
      icon: <SettingsIcon size={16} className="text-gray-400" />,
      action: () => console.log('Opening editor settings'),
      category: 'Settings'
    },
    {
      id: 'setting-2',
      type: 'setting',
      title: 'User Preferences',
      icon: <SettingsIcon size={16} className="text-gray-400" />,
      action: () => console.log('Opening user preferences'),
      category: 'Settings'
    },

    // Documentation
    {
      id: 'doc-1',
      type: 'doc',
      title: 'Keyboard Shortcuts',
      icon: <KeyboardIcon size={16} className="text-blue-400" />,
      action: () => console.log('Opening keyboard shortcuts'),
      category: 'Documentation'
    },
    {
      id: 'doc-2',
      type: 'doc',
      title: 'API Reference',
      icon: <BookOpenIcon size={16} className="text-blue-400" />,
      action: () => console.log('Opening API reference'),
      category: 'Documentation'
    }
  ];

  // Filter results based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      // Show recent files and common commands when no search query
      const recentFiles = allSearchResults.filter(result =>
        result.category === 'Recent Files' ||
        result.category === 'Commands'
      );
      setFilteredResults(recentFiles);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = allSearchResults.filter(result => {
        const titleMatch = result.title.toLowerCase().includes(query);
        const descMatch = result.description?.toLowerCase().includes(query) || false;
        const categoryMatch = result.category.toLowerCase().includes(query);
        return titleMatch || descMatch || categoryMatch;
      });
      setFilteredResults(filtered);
    }

    // Reset selected index when results change
    setSelectedIndex(0);
  }, [searchQuery, activeMode]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedItemRef.current && resultsContainerRef.current) {
      selectedItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [selectedIndex]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < filteredResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredResults[selectedIndex]) {
          filteredResults[selectedIndex].action();
        }
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
    }
  };

  // Group results by category
  const groupedResults: Record<string, SearchResult[]> = {};
  filteredResults.forEach(result => {
    if (!groupedResults[result.category]) {
      groupedResults[result.category] = [];
    }
    groupedResults[result.category].push(result);
  });

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-20 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-[rgba(26,26,26,0.7)] rounded-xl shadow-2xl w-full max-w-3xl border border-[#333] overflow-hidden animate-slideDown backdrop-blur-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="p-4 border-b border-[#333] flex items-center">
          <SearchIcon size={20} className="text-[#8cc700] mr-4" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search files, commands, or settings..."
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="bg-[#252525] rounded-md px-2 py-1 text-xs text-gray-400">
            ESC
          </div>
        </div>

        {/* Results */}
        <div ref={resultsContainerRef} className="max-h-[50vh] overflow-y-auto p-2 custom-scrollbar">
          {Object.entries(groupedResults).length > 0 ? (
            Object.entries(groupedResults).map(([category, results]) => (
              <div key={category} className="mb-2">
                <h3 className="text-xs text-gray-500 font-semibold px-3 pt-2 pb-1 uppercase tracking-wider">{category}</h3>
                {results.map((result, index) => {
                  const globalIndex = filteredResults.findIndex(r => r.id === result.id);
                  const isSelected = selectedIndex === globalIndex;
                  
                  return (
                    <div
                      key={result.id}
                      ref={isSelected ? selectedItemRef : null}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-150 ${
                        isSelected ? 'bg-white/10' : 'hover:bg-white/5'
                      }`}
                      onClick={() => result.action()}
                    >
                      <div className="w-8 h-8 flex items-center justify-center mr-3 bg-white/5 rounded-md border border-white/10">
                        {result.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{result.title}</p>
                        {result.description && (
                          <p className="text-gray-400 text-xs">{result.description}</p>
                        )}
                      </div>
                      {result.shortcut && (
                        <div className="flex items-center space-x-1">
                          {result.shortcut.split('+').map(key => (
                            <span key={key} className="bg-[#252525] rounded px-1.5 py-0.5 text-xs text-gray-400 border border-[#333]">
                              {key === '⌘' ? 'Cmd' : key}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          ) : (
            <div className="text-center p-10 text-gray-500">
              <p>No results found for "{searchQuery}"</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#333] p-3 bg-black/20">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="px-1.5 py-0.5 bg-[#252525] rounded mr-1.5 border border-[#333]">↑</span>
                <span className="px-1.5 py-0.5 bg-[#252525] rounded mr-1.5 border border-[#333]">↓</span>
                <span>to navigate</span>
              </div>
              <div className="flex items-center">
                <span className="px-1.5 py-0.5 bg-[#252525] rounded mr-1.5 border border-[#333]">Enter</span>
                <span>to select</span>
              </div>
            </div>
            <div className="flex items-center">
              <KeyboardIcon size={12} className="mr-1.5" />
              <span>Press ? for keyboard shortcuts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}