import { 
  CodeIcon,
  PenToolIcon
} from "lucide-react";

interface NavbarProps {
  activeMode: 'code' | 'design';
}

export default function Navbar({ activeMode }: NavbarProps) {
  // Common button height class to match topbar
  const buttonHeightClass = "h-[35px]";

  return (
    <div className="flex items-center justify-center px-2 py-1 bg-[#111] border-b border-[#222] text-sm shadow-sm">
      {/* Mode Switcher */}
      <div className="flex border border-[#333] rounded overflow-hidden">
        <button 
          className={`px-3 flex items-center text-xs font-medium transition-colors ${buttonHeightClass} ${
            activeMode === 'code' 
              ? 'bg-[#222] text-white' 
              : 'bg-[#111] text-gray-400 hover:bg-[#1a1a1a]'
          }`}
          onClick={() => setActiveMode('code')}
        >
          <CodeIcon size={14} className="mr-1.5" />
          Code Mode
        </button>
        <button 
          className={`px-3 flex items-center text-xs font-medium transition-colors ${buttonHeightClass} ${
            activeMode === 'design' 
              ? 'bg-[#222] text-white' 
              : 'bg-[#111] text-gray-400 hover:bg-[#1a1a1a]'
          }`}
          onClick={() => setActiveMode('design')}
        >
          <PenToolIcon size={14} className="mr-1.5" />
          Design Mode
        </button>
      </div>
    </div>
  );
}