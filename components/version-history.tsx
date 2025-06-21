import { useState } from "react";
import { GitCommitIcon, GitBranchIcon, ClockIcon, UserIcon, ChevronRightIcon, XIcon, ArrowLeftIcon } from "lucide-react";

interface Commit {
  id: string;
  message: string;
  author: string;
  date: string;
  changes: {
    added: number;
    removed: number;
    modified: number;
  };
  files: string[];
}

interface VersionHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VersionHistory({ isOpen, onClose }: VersionHistoryProps) {
  const [selectedCommit, setSelectedCommit] = useState<string | null>(null);
  
  // Sample commit history data
  const commits: Commit[] = [
    {
      id: "a1b2c3d",
      message: "Fix navigation bar responsiveness",
      author: "Sarah Chen",
      date: "Today, 11:23 AM",
      changes: { added: 12, removed: 5, modified: 3 },
      files: ["navbar.swift", "app.swift"]
    },
    {
      id: "e4f5g6h",
      message: "Add modal component with animations",
      author: "Sarah Chen",
      date: "Today, 10:05 AM",
      changes: { added: 45, removed: 0, modified: 0 },
      files: ["modal.swift"]
    },
    {
      id: "i7j8k9l",
      message: "Implement input field validation",
      author: "Alex Johnson",
      date: "Yesterday, 4:32 PM",
      changes: { added: 18, removed: 2, modified: 5 },
      files: ["inputField.swift"]
    },
    {
      id: "m1n2o3p",
      message: "Initial project setup",
      author: "Alex Johnson",
      date: "Yesterday, 2:15 PM",
      changes: { added: 120, removed: 0, modified: 0 },
      files: ["app.swift", "navbar.swift", "modal.swift", "inputField.swift"]
    }
  ];

  const toggleCommit = (commitId: string) => {
    if (selectedCommit === commitId) {
      setSelectedCommit(null);
    } else {
      setSelectedCommit(commitId);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-[#111] z-20 flex flex-col border-l border-[#222] shadow-lg animate-slideIn">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#222] bg-[#0d0d0d]">
        <div className="flex items-center">
          <button 
            className="mr-3 text-gray-400 hover:text-white p-1 rounded hover:bg-[#222] transition-colors"
            onClick={onClose}
            title="Back to Editor"
          >
            <ArrowLeftIcon size={18} />
          </button>
          <GitBranchIcon size={16} className="text-[#8cc700] mr-2" />
          <span className="text-sm font-medium text-white">Version History</span>
        </div>
        <button 
          className="text-gray-400 hover:text-white p-1 rounded hover:bg-[#222] transition-colors"
          onClick={onClose}
          title="Close Version History"
        >
          <XIcon size={18} />
        </button>
      </div>
      
      {/* Branch selector */}
      <div className="flex items-center px-4 py-2 border-b border-[#222] bg-[#0d0d0d]">
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-400">Branch:</span>
          <div className="flex items-center bg-[#222] rounded px-2 py-1 text-white">
            <GitBranchIcon size={14} className="mr-1.5" />
            <span>main</span>
            <ChevronRightIcon size={14} className="ml-1" />
          </div>
        </div>
      </div>
      
      {/* Commit list */}
      <div className="flex-1 overflow-y-auto">
        {commits.map((commit, index) => (
          <div key={commit.id} className="border-b border-[#222]">
            {/* Commit header */}
            <div 
              className="flex items-start px-4 py-3 cursor-pointer hover:bg-[#1a1a1a] transition-all duration-200 animate-fadeIn"
              onClick={() => toggleCommit(commit.id)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex-shrink-0 mr-3">
                <div className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center text-[#8cc700]">
                  <GitCommitIcon size={16} />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-white truncate">{commit.message}</h3>
                  <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">{commit.date}</span>
                </div>
                
                <div className="flex items-center mt-1 text-xs text-gray-400">
                  <UserIcon size={12} className="mr-1" />
                  <span className="mr-3">{commit.author}</span>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">+{commit.changes.added}</span>
                    <span className="text-red-500">-{commit.changes.removed}</span>
                    {commit.changes.modified > 0 && (
                      <span className="text-blue-400">~{commit.changes.modified}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Commit details */}
            {selectedCommit === commit.id && (
              <div className="bg-[#1a1a1a] px-4 py-3 border-t border-[#222]">
                <div className="text-xs text-gray-400 mb-2">
                  <span className="font-medium text-gray-300">Commit:</span> {commit.id}
                </div>
                
                <div className="text-xs mb-3">
                  <span className="font-medium text-gray-300">Files changed:</span>
                </div>
                
                <div className="space-y-2">
                  {commit.files.map((file) => (
                    <div key={file} className="flex items-center text-xs">
                      <div className="w-4 h-4 mr-2 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#8cc700]"></div>
                      </div>
                      <span className="text-white">{file}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 flex justify-end">
                  <button className="text-xs bg-[#333] hover:bg-[#444] text-white px-3 py-1.5 rounded transition-colors">
                    View Changes
                  </button>
                  <button className="text-xs bg-[#8cc700] hover:bg-[#9dd700] text-black px-3 py-1.5 rounded ml-2 transition-colors">
                    Restore Version
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Fixed bottom bar with close button */}
      <div className="border-t border-[#222] bg-[#0d0d0d] p-3 flex justify-between items-center">
        <span className="text-xs text-gray-400">4 commits</span>
        <button 
          className="px-4 py-2 bg-[#222] hover:bg-[#333] text-white rounded-md text-sm transition-colors"
          onClick={onClose}
        >
          Back to Editor
        </button>
      </div>
    </div>
  );
}