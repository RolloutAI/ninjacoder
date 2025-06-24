import { ChevronDownIcon, ChevronRightIcon, FolderIcon, FileIcon, FolderOpenIcon, PlusIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ContextMenu from "./context-menu";

interface SidebarProps {
  files: { [key: string]: string };
  activeFile: string;
  setActiveFile: (file: string) => void;
  openFiles: string[];
  onCloseFile: (file: string) => void;
  onNewItem: (item: string) => void;
  closeSidebar?: () => void;
}

export default function Sidebar({
  files,
  activeFile,
  setActiveFile,
  openFiles,
  onCloseFile,
  onNewItem,
  closeSidebar,
}: SidebarProps) {
  const [expandedFolders, setExpandedFolders] = useState<{ [key: string]: boolean }>({
    "app/dev/Projects": true,
    "website": true,
    "src": true,
    "components": true,
  });
  
  // Context menu state
  const [contextMenu, setContextMenu] = useState<{
    show: boolean;
    x: number;
    y: number;
    type: 'file' | 'folder' | 'empty';
    itemName: string;
  }>({
    show: false,
    x: 0,
    y: 0,
    type: 'empty',
    itemName: '',
  });
  
  // Clipboard state
  const [clipboard, setClipboard] = useState<{
    action: 'copy' | 'cut' | null;
    itemType: 'file' | 'folder' | 'empty' | null;
    itemName: string;
  }>({
    action: null,
    itemType: null,
    itemName: '',
  });
  
  // Rename state
  const [renameState, setRenameState] = useState<{
    isRenaming: boolean;
    itemName: string;
    newName: string;
  }>({
    isRenaming: false,
    itemName: '',
    newName: '',
  });
  
  // New item state
  const [newItemState, setNewItemState] = useState<{
    isCreating: boolean;
    parentFolder: string;
    itemType: 'file' | 'folder';
    itemName: string;
  }>({
    isCreating: false,
    parentFolder: '',
    itemType: 'file',
    itemName: '',
  });
  
  const renameInputRef = useRef<HTMLInputElement>(null);
  const newItemInputRef = useRef<HTMLInputElement>(null);
  
  // Focus rename input when renaming starts
  useEffect(() => {
    if (renameState.isRenaming && renameInputRef.current) {
      renameInputRef.current.focus();
    }
  }, [renameState.isRenaming]);
  
  // Focus new item input when creating starts
  useEffect(() => {
    if (newItemState.isCreating && newItemInputRef.current) {
      newItemInputRef.current.focus();
    }
  }, [newItemState.isCreating]);
  
  const handleFileClick = (file: string) => {
    // Add animation to the clicked file
    const fileElement = document.querySelector(`.explorer-file[data-file="${file}"]`);
    if (fileElement) {
      fileElement.classList.add('file-click-animation');
      setTimeout(() => {
        fileElement.classList.remove('file-click-animation');
      }, 300);
    }
    
    setActiveFile(file);
    if (closeSidebar) {
      closeSidebar();
    }
  };

  const toggleFolder = (folder: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Add animation to the chevron icon
    const chevronIcon = e.currentTarget.querySelector('svg');
    if (chevronIcon) {
      chevronIcon.classList.add('animate-rotate');
      setTimeout(() => {
        chevronIcon.classList.remove('animate-rotate');
      }, 300);
    }
    
    setExpandedFolders(prev => ({
      ...prev,
      [folder]: !prev[folder]
    }));
  };
  
  // Handle context menu
  const handleContextMenu = (e: React.MouseEvent, type: 'file' | 'folder' | 'empty', itemName: string = '') => {
    e.preventDefault();
    e.stopPropagation();
    
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
      type,
      itemName,
    });
  };
  
  // Handle add new item
  const handleAddNewItem = (parentFolder: string, itemType: 'file' | 'folder') => {
    setNewItemState({
      isCreating: true,
      parentFolder,
      itemType,
      itemName: itemType === 'file' ? 'new-file.html' : 'new-folder',
    });
  };
  
  // Handle new item input change
  const handleNewItemInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItemState(prev => ({
      ...prev,
      itemName: e.target.value,
    }));
  };
  
  // Handle new item submit
  const handleNewItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newItemState.itemName.trim()) {
      // In a real app, you would implement the actual file/folder creation here
      alert(`Created new ${newItemState.itemType}: ${newItemState.itemName} in ${newItemState.parentFolder}`);
      
      // Ensure the parent folder is expanded
      setExpandedFolders(prev => ({
        ...prev,
        [newItemState.parentFolder]: true,
      }));
      
      setNewItemState({
        isCreating: false,
        parentFolder: '',
        itemType: 'file',
        itemName: '',
      });
    }
  };
  
  // Handle new item cancel
  const handleNewItemCancel = () => {
    setNewItemState({
      isCreating: false,
      parentFolder: '',
      itemType: 'file',
      itemName: '',
    });
  };
  
  // Handle context menu actions
  const handleContextMenuAction = (action: string, itemName: string) => {
    console.log(`Action: ${action}, Item: ${itemName}`);
    
    switch (action) {
      case 'copy':
        setClipboard({
          action: 'copy',
          itemType: contextMenu.type,
          itemName,
        });
        break;
        
      case 'cut':
        setClipboard({
          action: 'cut',
          itemType: contextMenu.type,
          itemName,
        });
        break;
        
      case 'paste':
        if (clipboard.action && clipboard.itemName) {
          // In a real app, you would implement the actual file/folder operations here
          alert(`${clipboard.action === 'copy' ? 'Copied' : 'Moved'} ${clipboard.itemName} to ${itemName}`);
          
          // Clear clipboard after cut operation
          if (clipboard.action === 'cut') {
            setClipboard({
              action: null,
              itemType: null,
              itemName: '',
            });
          }
        }
        break;
        
      case 'rename':
        setRenameState({
          isRenaming: true,
          itemName,
          newName: itemName,
        });
        break;
        
      case 'delete':
        if (confirm(`Are you sure you want to delete ${itemName}?`)) {
          // In a real app, you would implement the actual delete operation here
          alert(`Deleted ${itemName}`);
        }
        break;
        
      case 'newFile':
        handleAddNewItem(itemName, 'file');
        break;
        
      case 'newFolder':
        handleAddNewItem(itemName, 'folder');
        break;
        
      case 'open':
        if (contextMenu.type === 'file') {
          handleFileClick(itemName);
        } else if (contextMenu.type === 'folder') {
          setExpandedFolders(prev => ({
            ...prev,
            [itemName]: !prev[itemName]
          }));
        }
        break;
        
      case 'refresh':
        // In a real app, you would implement the actual refresh operation here
        alert('Refreshing explorer');
        break;
        
      case 'download':
        // In a real app, you would implement the actual download operation here
        alert(`Downloading ${itemName}`);
        break;
    }
  };
  
  // Handle rename input change
  const handleRenameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRenameState(prev => ({
      ...prev,
      newName: e.target.value,
    }));
  };
  
  // Handle rename submit
  const handleRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (renameState.newName.trim()) {
      // In a real app, you would implement the actual rename operation here
      alert(`Renamed ${renameState.itemName} to ${renameState.newName}`);
      
      setRenameState({
        isRenaming: false,
        itemName: '',
        newName: '',
      });
    }
  };
  
  // Handle rename cancel
  const handleRenameCancel = () => {
    setRenameState({
      isRenaming: false,
      itemName: '',
      newName: '',
    });
  };
  
  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (contextMenu.show) {
        setContextMenu(prev => ({ ...prev, show: false }));
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [contextMenu.show]);

  // Get file icon color based on extension
  const getFileIconColor = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'html':
        return "text-orange-400";
      case 'css':
        return "text-blue-400";
      case 'js':
        return "text-yellow-400";
      case 'json':
        return "text-yellow-300";
      case 'md':
        return "text-gray-400";
      default:
        return "text-[#61afef]";
    }
  };

  // Common header height class
  const headerHeightClass = "h-[32px] flex items-center";

  return (
    <div 
      className="w-full h-full bg-[#111] overflow-y-auto shadow-md flex flex-col"
      onContextMenu={(e) => handleContextMenu(e, 'empty')}
    >
      {/* EXPLORER Section */}
      <div className="flex-1 flex flex-col">
        {/* EXPLORER Header */}
        <div className={`px-4 bg-[#0d0d0d] border-b border-[#222] flex items-center justify-between ${headerHeightClass}`}>
          <span className="text-xs font-semibold tracking-wider text-gray-400">EXPLORER</span>
          <div className="flex space-x-1">
            <button 
              className="text-gray-500 hover:text-gray-300 p-0.5 rounded"
              onClick={() => handleAddNewItem("src", "file")}
              title="New File"
            >
              <PlusIcon size={14} />
            </button>
            <button className="text-gray-500 hover:text-gray-300 p-0.5 rounded">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* File Tree */}
        <div className="p-2 flex-1 overflow-y-auto">
          {/* Root Folder */}
          <div className="explorer-item">
            <div 
              className={`explorer-folder ${expandedFolders["app/dev/Projects"] ? "active" : ""}`}
              onClick={(e) => toggleFolder("app/dev/Projects", e)}
              onContextMenu={(e) => handleContextMenu(e, 'folder', "app/dev/Projects")}
            >
              <div className="explorer-icon">
                {expandedFolders["app/dev/Projects"] ? 
                  <ChevronDownIcon size={14} className="transform transition-transform duration-200" /> : 
                  <ChevronRightIcon size={14} className="transform transition-transform duration-200" />
                }
              </div>
              <div className="explorer-icon">
                {expandedFolders["app/dev/Projects"] ? 
                  <FolderOpenIcon size={14} className="text-[#e8c07d]" /> : 
                  <FolderIcon size={14} className="text-[#e8c07d]" />
                }
              </div>
              <span className="explorer-label text-gray-500">app/dev/Projects</span>
            </div>
            
            {/* First Level Children */}
            <div className={`explorer-children ${expandedFolders["app/dev/Projects"] ? "expanded" : ""}`}>
              {/* website Folder */}
              <div className="explorer-item">
                <div 
                  className={`explorer-folder ${expandedFolders["website"] ? "active" : ""}`}
                  onClick={(e) => toggleFolder("website", e)}
                  onContextMenu={(e) => handleContextMenu(e, 'folder', "website")}
                >
                  <div className="explorer-icon">
                    {expandedFolders["website"] ? 
                      <ChevronDownIcon size={14} className="transform transition-transform duration-200" /> : 
                      <ChevronRightIcon size={14} className="transform transition-transform duration-200" />
                    }
                  </div>
                  <div className="explorer-icon">
                    {expandedFolders["website"] ? 
                      <FolderOpenIcon size={14} className="text-[#e8c07d]" /> : 
                      <FolderIcon size={14} className="text-[#e8c07d]" />
                    }
                  </div>
                  <span className="explorer-label">website</span>
                </div>
                
                {/* website Children */}
                <div className={`explorer-children ${expandedFolders["website"] ? "expanded" : ""}`}>
                  {/* src Folder */}
                  <div className="explorer-item">
                    <div 
                      className={`explorer-folder ${expandedFolders["src"] ? "active" : ""}`}
                      onClick={(e) => toggleFolder("src", e)}
                      onContextMenu={(e) => handleContextMenu(e, 'folder', "src")}
                    >
                      <div className="explorer-icon">
                        {expandedFolders["src"] ? 
                          <ChevronDownIcon size={14} className="transform transition-transform duration-200" /> : 
                          <ChevronRightIcon size={14} className="transform transition-transform duration-200" />
                        }
                      </div>
                      <div className="explorer-icon">
                        {expandedFolders["src"] ? 
                          <FolderOpenIcon size={14} className="text-[#e8c07d]" /> : 
                          <FolderIcon size={14} className="text-[#e8c07d]" />
                        }
                      </div>
                      <span className="explorer-label">src</span>
                    </div>
                    
                    {/* New Item Input (if creating in src folder) */}
                    {newItemState.isCreating && newItemState.parentFolder === "src" && (
                      <div className="pl-6 mt-1">
                        <form onSubmit={handleNewItemSubmit} className="flex items-center w-full">
                          <div className="explorer-icon mr-1">
                            {newItemState.itemType === 'folder' ? (
                              <FolderIcon size={14} className="text-[#e8c07d]" />
                            ) : (
                              <FileIcon size={14} className="text-orange-400" />
                            )}
                          </div>
                          <input
                            ref={newItemInputRef}
                            type="text"
                            value={newItemState.itemName}
                            onChange={handleNewItemInputChange}
                            onBlur={handleNewItemCancel}
                            className="bg-[#333] text-white text-xs px-1 py-0.5 rounded border border-[#8cc700] w-full font-sans"
                            onKeyDown={(e) => e.key === 'Escape' && handleNewItemCancel()}
                          />
                        </form>
                      </div>
                    )}
                    
                    {/* src Children (Files) */}
                    <div className={`explorer-children ${expandedFolders["src"] ? "expanded" : ""}`}>
                      {/* index.html */}
                      <div 
                        className={`explorer-file ${activeFile === "index.html" ? "active" : ""}`}
                        data-file="index.html"
                        onClick={() => handleFileClick("index.html")}
                        onContextMenu={(e) => handleContextMenu(e, 'file', "index.html")}
                      >
                        {renameState.isRenaming && renameState.itemName === "index.html" ? (
                          <form onSubmit={handleRenameSubmit} className="flex items-center w-full">
                            <input
                              ref={renameInputRef}
                              type="text"
                              value={renameState.newName}
                              onChange={handleRenameInputChange}
                              onBlur={handleRenameCancel}
                              className="bg-[#333] text-white text-xs px-1 py-0.5 rounded border border-[#8cc700] w-full font-sans"
                              onKeyDown={(e) => e.key === 'Escape' && handleRenameCancel()}
                            />
                          </form>
                        ) : (
                          <>
                            <div className="explorer-icon">
                              <div className={`file-indicator ${activeFile === "index.html" ? "active" : ""}`}></div>
                            </div>
                            <div className="explorer-icon">
                              <FileIcon size={14} className="text-orange-400" />
                            </div>
                            <span className="explorer-label">index.html</span>
                          </>
                        )}
                      </div>
                      
                      {/* styles.css */}
                      <div 
                        className={`explorer-file ${activeFile === "styles.css" ? "active" : ""}`}
                        data-file="styles.css"
                        onClick={() => handleFileClick("styles.css")}
                        onContextMenu={(e) => handleContextMenu(e, 'file', "styles.css")}
                      >
                        {renameState.isRenaming && renameState.itemName === "styles.css" ? (
                          <form onSubmit={handleRenameSubmit} className="flex items-center w-full">
                            <input
                              ref={renameInputRef}
                              type="text"
                              value={renameState.newName}
                              onChange={handleRenameInputChange}
                              onBlur={handleRenameCancel}
                              className="bg-[#333] text-white text-xs px-1 py-0.5 rounded border border-[#8cc700] w-full font-sans"
                              onKeyDown={(e) => e.key === 'Escape' && handleRenameCancel()}
                            />
                          </form>
                        ) : (
                          <>
                            <div className="explorer-icon">
                              <div className={`file-indicator ${activeFile === "styles.css" ? "active" : ""}`}></div>
                            </div>
                            <div className="explorer-icon">
                              <FileIcon size={14} className="text-blue-400" />
                            </div>
                            <span className="explorer-label">styles.css</span>
                          </>
                        )}
                      </div>
                      
                      {/* main.js */}
                      <div 
                        className={`explorer-file ${activeFile === "main.js" ? "active" : ""}`}
                        data-file="main.js"
                        onClick={() => handleFileClick("main.js")}
                        onContextMenu={(e) => handleContextMenu(e, 'file', "main.js")}
                      >
                        {renameState.isRenaming && renameState.itemName === "main.js" ? (
                          <form onSubmit={handleRenameSubmit} className="flex items-center w-full">
                            <input
                              ref={renameInputRef}
                              type="text"
                              value={renameState.newName}
                              onChange={handleRenameInputChange}
                              onBlur={handleRenameCancel}
                              className="bg-[#333] text-white text-xs px-1 py-0.5 rounded border border-[#8cc700] w-full font-sans"
                              onKeyDown={(e) => e.key === 'Escape' && handleRenameCancel()}
                            />
                          </form>
                        ) : (
                          <>
                            <div className="explorer-icon">
                              <div className={`file-indicator ${activeFile === "main.js" ? "active" : ""}`}></div>
                            </div>
                            <div className="explorer-icon">
                              <FileIcon size={14} className="text-yellow-400" />
                            </div>
                            <span className="explorer-label">main.js</span>
                          </>
                        )}
                      </div>
                      
                      {/* components Folder */}
                      <div className="explorer-item">
                        <div 
                          className={`explorer-folder ${expandedFolders["components"] ? "active" : ""}`}
                          onClick={(e) => toggleFolder("components", e)}
                          onContextMenu={(e) => handleContextMenu(e, 'folder', "components")}
                        >
                          <div className="explorer-icon">
                            {expandedFolders["components"] ? 
                              <ChevronDownIcon size={14} className="transform transition-transform duration-200" /> : 
                              <ChevronRightIcon size={14} className="transform transition-transform duration-200" />
                            }
                          </div>
                          <div className="explorer-icon">
                            {expandedFolders["components"] ? 
                              <FolderOpenIcon size={14} className="text-[#e8c07d]" /> : 
                              <FolderIcon size={14} className="text-[#e8c07d]" />
                            }
                          </div>
                          <span className="explorer-label">components</span>
                        </div>
                        
                        {/* components Children (Files) */}
                        <div className={`explorer-children ${expandedFolders["components"] ? "expanded" : ""}`}>
                          {/* header.js */}
                          <div 
                            className={`explorer-file ${activeFile === "header.js" ? "active" : ""}`}
                            data-file="header.js"
                            onClick={() => handleFileClick("header.js")}
                            onContextMenu={(e) => handleContextMenu(e, 'file', "header.js")}
                          >
                            <div className="explorer-icon">
                              <div className={`file-indicator ${activeFile === "header.js" ? "active" : ""}`}></div>
                            </div>
                            <div className="explorer-icon">
                              <FileIcon size={14} className="text-yellow-400" />
                            </div>
                            <span className="explorer-label">header.js</span>
                          </div>
                          
                          {/* footer.js */}
                          <div 
                            className={`explorer-file ${activeFile === "footer.js" ? "active" : ""}`}
                            data-file="footer.js"
                            onClick={() => handleFileClick("footer.js")}
                            onContextMenu={(e) => handleContextMenu(e, 'file', "footer.js")}
                          >
                            <div className="explorer-icon">
                              <div className={`file-indicator ${activeFile === "footer.js" ? "active" : ""}`}></div>
                            </div>
                            <div className="explorer-icon">
                              <FileIcon size={14} className="text-yellow-400" />
                            </div>
                            <span className="explorer-label">footer.js</span>
                          </div>
                          
                          {/* navigation.js */}
                          <div 
                            className={`explorer-file ${activeFile === "navigation.js" ? "active" : ""}`}
                            data-file="navigation.js"
                            onClick={() => handleFileClick("navigation.js")}
                            onContextMenu={(e) => handleContextMenu(e, 'file', "navigation.js")}
                          >
                            <div className="explorer-icon">
                              <div className={`file-indicator ${activeFile === "navigation.js" ? "active" : ""}`}></div>
                            </div>
                            <div className="explorer-icon">
                              <FileIcon size={14} className="text-yellow-400" />
                            </div>
                            <span className="explorer-label">navigation.js</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* package.json */}
                      <div 
                        className={`explorer-file ${activeFile === "package.json" ? "active" : ""}`}
                        data-file="package.json"
                        onClick={() => handleFileClick("package.json")}
                        onContextMenu={(e) => handleContextMenu(e, 'file', "package.json")}
                      >
                        <div className="explorer-icon">
                          <div className={`file-indicator ${activeFile === "package.json" ? "active" : ""}`}></div>
                        </div>
                        <div className="explorer-icon">
                          <FileIcon size={14} className="text-yellow-300" />
                        </div>
                        <span className="explorer-label">package.json</span>
                      </div>
                      
                      {/* README.md */}
                      <div 
                        className={`explorer-file ${activeFile === "README.md" ? "active" : ""}`}
                        data-file="README.md"
                        onClick={() => handleFileClick("README.md")}
                        onContextMenu={(e) => handleContextMenu(e, 'file', "README.md")}
                      >
                        <div className="explorer-icon">
                          <div className={`file-indicator ${activeFile === "README.md" ? "active" : ""}`}></div>
                        </div>
                        <div className="explorer-icon">
                          <FileIcon size={14} className="text-gray-400" />
                        </div>
                        <span className="explorer-label">README.md</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* assets Folder */}
                  <div className="explorer-item">
                    <div 
                      className="explorer-folder"
                      onContextMenu={(e) => handleContextMenu(e, 'folder', "assets")}
                    >
                      <div className="explorer-icon">
                        <ChevronRightIcon size={14} className="transform transition-transform duration-200" />
                      </div>
                      <div className="explorer-icon">
                        <FolderIcon size={14} className="text-[#e8c07d]" />
                      </div>
                      <span className="explorer-label">assets</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* docs Folder */}
              <div className="explorer-item">
                <div 
                  className="explorer-folder"
                  onContextMenu={(e) => handleContextMenu(e, 'folder', "docs")}
                >
                  <div className="explorer-icon">
                    <ChevronRightIcon size={14} className="transform transition-transform duration-200" />
                  </div>
                  <div className="explorer-icon">
                    <FolderIcon size={14} className="text-[#e8c07d]" />
                  </div>
                  <span className="explorer-label">docs</span>
                </div>
              </div>
              
              {/* tests Folder */}
              <div className="explorer-item">
                <div 
                  className="explorer-folder"
                  onContextMenu={(e) => handleContextMenu(e, 'folder', "tests")}
                >
                  <div className="explorer-icon">
                    <ChevronRightIcon size={14} className="transform transition-transform duration-200" />
                  </div>
                  <div className="explorer-icon">
                    <FolderIcon size={14} className="text-[#e8c07d]" />
                  </div>
                  <span className="explorer-label">tests</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Context Menu */}
      {contextMenu.show && (
        <ContextMenu 
          x={contextMenu.x}
          y={contextMenu.y}
          type={contextMenu.type}
          itemName={contextMenu.itemName}
          onClose={() => setContextMenu(prev => ({ ...prev, show: false }))}
          onAction={handleContextMenuAction}
        />
      )}
    </div>
  );
}