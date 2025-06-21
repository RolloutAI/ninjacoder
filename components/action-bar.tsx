import { ArrowRightIcon, GitBranchIcon, ClockIcon } from "lucide-react";

interface ActionBarProps {
  onVersionHistoryClick?: () => void;
}

export default function ActionBar({ onVersionHistoryClick }: ActionBarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-[#111] border-t border-[#222]">
      <div className="flex space-x-4">
        <button className="px-4 py-1.5 bg-[#222] hover:bg-[#333] text-white rounded-md text-sm font-medium transition-colors">
          Share
        </button>
        <button className="px-4 py-1.5 bg-[#222] hover:bg-[#333] text-white rounded-md text-sm font-medium transition-colors">
          Duplicate codebase
        </button>
        <button 
          className="px-4 py-1.5 bg-[#222] hover:bg-[#333] text-white rounded-md text-sm font-medium transition-colors flex items-center"
          onClick={onVersionHistoryClick}
        >
          <ClockIcon size={14} className="mr-2" />
          History
        </button>
      </div>
      <div className="flex items-center">
        <ArrowRightIcon size={16} className="text-[#8cc700] mr-2" />
        <span className="text-gray-400 text-sm">key activation/yearly</span>
      </div>
    </div>
  );
}