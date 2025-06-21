import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from 'lucide-react';

export default function ViewSwitcher() {
  const [showVersionMenu, setShowVersionMenu] = useState(false);
  const [activeLayout, setActiveLayout] = useState<'vertical' | 'horizontal' | 'preview' | 'responsive'>('vertical');
  const versionMenuRef = useRef<HTMLDivElement>(null);
  
  const versions = [
    { version: 'v4.0.14', isLatest: true },
    { version: 'v4.0.13', isLatest: false },
    { version: 'v4.0.12', isLatest: false },
    { version: 'v3.9.0', isLatest: false },
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (versionMenuRef.current && !versionMenuRef.current.contains(event.target as Node)) {
        setShowVersionMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center">
      {/* Version Dropdown */}
      <div className="relative" ref={versionMenuRef}>
        <button 
          className="text-gray-500 text-xs leading-5 font-semibold bg-gray-400/10 rounded-full py-1 px-3 flex items-center hover:bg-gray-400/20 dark:bg-[#1d1f23] dark:text-gray-400 dark:hover:bg-[#343539]"
          onClick={() => setShowVersionMenu(!showVersionMenu)}
        >
          v4.0.14
          <ChevronDownIcon size={12} className="ml-1" />
        </button>
        
        {showVersionMenu && (
          <div className="absolute top-full right-0 mt-2 bg-[#0b0d10] border border-[#1d1f23] rounded-lg shadow-lg z-50 w-32">
            <div className="py-1">
              {versions.map((item) => (
                <button 
                  key={item.version}
                  className="flex items-center w-full px-3 py-2 hover:bg-[#1d1f23] text-left text-xs"
                >
                  <span>{item.version}</span>
                  {item.isLatest && (
                    <span className="ml-2 px-1.5 py-0.5 bg-[#e98463] text-black rounded-full text-[10px]">
                      Latest
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Layout Switcher */}
      <div className="hidden lg:flex items-center ml-6 rounded-md ring-1 ring-[#1d1f23] shadow-sm dark:ring-0 dark:bg-[#1d1f23] dark:shadow-highlight/4">
        {/* Vertical Split Layout */}
        <button 
          type="button" 
          className="group focus:outline-none focus-visible:ring-2 rounded-md focus-visible:ring-[#e98463] dark:focus-visible:ring-[#e98463]"
          onClick={() => setActiveLayout('vertical')}
        >
          <span className="sr-only">Switch to vertical split layout</span>
          <svg 
            width="42" 
            height="36" 
            viewBox="-8 -7 42 36" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={activeLayout === 'vertical' 
              ? "fill-[#e98463]/20 stroke-[#e98463] dark:fill-[#e98463]/20 dark:stroke-[#e98463]" 
              : "fill-gray-100/10 stroke-gray-400/70 hover:fill-gray-200/20 hover:stroke-gray-400 dark:fill-gray-400/10 dark:stroke-gray-500 dark:hover:fill-gray-400/20 dark:hover:stroke-gray-400"
            }
          >
            <path d="M12 3h9a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-9" fill="none"></path>
            <path d="M3 17V5a2 2 0 0 1 2-2h7a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2Z"></path>
          </svg>
        </button>
        
        {/* Horizontal Split Layout */}
        <button 
          type="button" 
          className="group focus:outline-none focus-visible:ring-2 rounded-md focus-visible:ring-gray-400/70 dark:focus-visible:ring-gray-500"
          onClick={() => setActiveLayout('horizontal')}
        >
          <span className="sr-only">Switch to horizontal split layout</span>
          <svg 
            width="42" 
            height="36" 
            viewBox="-8 -7 42 36" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={activeLayout === 'horizontal' 
              ? "fill-[#e98463]/20 stroke-[#e98463] dark:fill-[#e98463]/20 dark:stroke-[#e98463]" 
              : "fill-gray-100/10 stroke-gray-400/70 hover:fill-gray-200/20 hover:stroke-gray-400 dark:fill-gray-400/10 dark:stroke-gray-500 dark:hover:fill-gray-400/20 dark:hover:stroke-gray-400"
            }
          >
            <path d="M23 11V3H3v8h20Z" strokeWidth="0"></path>
            <path d="M23 17V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2ZM22 11H4" fill="none"></path>
          </svg>
        </button>
        
        {/* Preview Only Layout */}
        <button 
          type="button" 
          className="group focus:outline-none focus-visible:ring-2 rounded-md focus-visible:ring-gray-400/70 dark:focus-visible:ring-gray-500"
          onClick={() => setActiveLayout('preview')}
        >
          <span className="sr-only">Switch to preview-only layout</span>
          <svg 
            width="42" 
            height="36" 
            viewBox="-8 -7 42 36" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={activeLayout === 'preview' 
              ? "fill-[#e98463]/20 stroke-[#e98463] dark:fill-[#e98463]/20 dark:stroke-[#e98463]" 
              : "fill-gray-100/10 stroke-gray-400/70 hover:fill-gray-200/20 hover:stroke-gray-400 dark:fill-gray-400/10 dark:stroke-gray-500 dark:hover:fill-gray-400/20 dark:hover:stroke-gray-400"
            }
          >
            <path d="M23 17V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z" fill="none"></path>
          </svg>
        </button>
        
        {/* Responsive Design Mode */}
        <button 
          type="button" 
          className="hidden md:block group focus:outline-none focus-visible:ring-2 rounded-md focus-visible:ring-gray-400/70 dark:focus-visible:ring-gray-500"
          onClick={() => setActiveLayout('responsive')}
        >
          <span className="sr-only">Toggle responsive design mode</span>
          <svg 
            width="42" 
            height="36" 
            viewBox="-8 -7 42 36" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={activeLayout === 'responsive' 
              ? "fill-[#e98463]/20 stroke-[#e98463] dark:fill-[#e98463]/20 dark:stroke-[#e98463]" 
              : "fill-gray-100/10 stroke-gray-400/70 hover:fill-gray-200/20 hover:stroke-gray-400 dark:fill-gray-400/10 dark:stroke-gray-500 dark:hover:fill-gray-400/20 dark:hover:stroke-gray-400"
            }
          >
            <path d="M15 19h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4a1 1 0 0 0-1 1" fill="none"></path>
            <path d="M12 17V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}