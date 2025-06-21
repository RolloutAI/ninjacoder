import { useState, useEffect, useRef } from 'react';
import { 
  Copy, 
  Clipboard, 
  Scissors, 
  Trash2, 
  Edit2, 
  FolderPlus, 
  FilePlus, 
  RefreshCw,
  Download,
  Eye,
  FileText,
  Save,
  Undo,
  Redo,
  Search,
  Settings
} from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  type: 'file' | 'folder' | 'empty';
  itemName: string;
  onAction: (action: string, itemName: string) => void;
}

export default function ContextMenu({ x, y, onClose, type, itemName, onAction }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Adjust position if menu would go off screen
  const [position, setPosition] = useState({ x, y });
  
  useEffect(() => {
    const handleResize = () => {
      if (menuRef.current) {
        const menuRect = menuRef.current.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        let newX = x;
        let newY = y;
        
        if (x + menuRect.width > windowWidth) {
          newX = windowWidth - menuRect.width - 10;
        }
        
        if (y + menuRect.height > windowHeight) {
          newY = windowHeight - menuRect.height - 10;
        }
        
        setPosition({ x: newX, y: newY });
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [x, y]);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  // File-specific menu items
  const fileMenuItems = [
    { id: 'open', label: 'Open', icon: <Eye size={14} /> },
    { id: 'edit', label: 'Edit', icon: <Edit2 size={14} /> },
    { id: 'copy', label: 'Copy', icon: <Copy size={14} /> },
    { id: 'cut', label: 'Cut', icon: <Scissors size={14} /> },
    { id: 'rename', label: 'Rename', icon: <Edit2 size={14} /> },
    { id: 'delete', label: 'Delete', icon: <Trash2 size={14} /> },
    { id: 'download', label: 'Download', icon: <Download size={14} /> }
  ];
  
  // Folder-specific menu items
  const folderMenuItems = [
    { id: 'open', label: 'Open', icon: <Eye size={14} /> },
    { id: 'copy', label: 'Copy', icon: <Copy size={14} /> },
    { id: 'cut', label: 'Cut', icon: <Scissors size={14} /> },
    { id: 'paste', label: 'Paste', icon: <Clipboard size={14} /> },
    { id: 'newFile', label: 'New File', icon: <FilePlus size={14} /> },
    { id: 'newFolder', label: 'New Folder', icon: <FolderPlus size={14} /> },
    { id: 'rename', label: 'Rename', icon: <Edit2 size={14} /> },
    { id: 'delete', label: 'Delete', icon: <Trash2 size={14} /> },
    { id: 'refresh', label: 'Refresh', icon: <RefreshCw size={14} /> }
  ];
  
  // Empty area menu items
  const emptyMenuItems = [
    { id: 'paste', label: 'Paste', icon: <Clipboard size={14} /> },
    { id: 'newFile', label: 'New File', icon: <FilePlus size={14} /> },
    { id: 'newFolder', label: 'New Folder', icon: <FolderPlus size={14} /> },
    { id: 'refresh', label: 'Refresh', icon: <RefreshCw size={14} /> },
    { id: 'search', label: 'Find in Files', icon: <Search size={14} /> },
    { id: 'settings', label: 'Explorer Settings', icon: <Settings size={14} /> }
  ];
  
  // Select menu items based on type
  const menuItems = type === 'file' 
    ? fileMenuItems 
    : type === 'folder' 
      ? folderMenuItems 
      : emptyMenuItems;
  
  const handleMenuItemClick = (action: string) => {
    onAction(action, itemName);
    onClose();
  };

  // Group menu items by category
  const groupedMenuItems: { [key: string]: typeof menuItems } = {
    main: [],
    edit: [],
    create: [],
    other: []
  };

  // Categorize menu items
  menuItems.forEach(item => {
    if (['open', 'edit'].includes(item.id)) {
      groupedMenuItems.main.push(item);
    } else if (['copy', 'cut', 'paste', 'rename', 'delete'].includes(item.id)) {
      groupedMenuItems.edit.push(item);
    } else if (['newFile', 'newFolder'].includes(item.id)) {
      groupedMenuItems.create.push(item);
    } else {
      groupedMenuItems.other.push(item);
    }
  });

  return (
    <div 
      ref={menuRef}
      className="absolute bg-[#1a1a1a] border border-[#333] rounded shadow-lg z-50 min-w-[180px] py-1 font-sans animate-fadeIn"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
      }}
    >
      {/* Main actions */}
      {groupedMenuItems.main.length > 0 && (
        <>
          {groupedMenuItems.main.map((item, index) => (
            <button
              key={item.id}
              className="flex items-center w-full px-3 py-1.5 hover:bg-[#333] text-left text-sm text-gray-200 transition-colors duration-150 animate-fadeIn"
              onClick={() => handleMenuItemClick(item.id)}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <span className="mr-2 text-gray-400 w-4 h-4 flex items-center justify-center">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
          <div className="border-t border-[#333] my-1"></div>
        </>
      )}
      
      {/* Edit actions */}
      {groupedMenuItems.edit.length > 0 && (
        <>
          {groupedMenuItems.edit.map((item, index) => (
            <button
              key={item.id}
              className="flex items-center w-full px-3 py-1.5 hover:bg-[#333] text-left text-sm text-gray-200 transition-colors duration-150 animate-fadeIn"
              onClick={() => handleMenuItemClick(item.id)}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <span className="mr-2 text-gray-400 w-4 h-4 flex items-center justify-center">{item.icon}</span>
              <span>{item.label}</span>
              {item.id === 'copy' && <span className="ml-auto text-xs text-gray-500">Ctrl+C</span>}
              {item.id === 'cut' && <span className="ml-auto text-xs text-gray-500">Ctrl+X</span>}
              {item.id === 'paste' && <span className="ml-auto text-xs text-gray-500">Ctrl+V</span>}
            </button>
          ))}
          {(groupedMenuItems.create.length > 0 || groupedMenuItems.other.length > 0) && (
            <div className="border-t border-[#333] my-1"></div>
          )}
        </>
      )}
      
      {/* Create actions */}
      {groupedMenuItems.create.length > 0 && (
        <>
          {groupedMenuItems.create.map((item, index) => (
            <button
              key={item.id}
              className="flex items-center w-full px-3 py-1.5 hover:bg-[#333] text-left text-sm text-gray-200 transition-colors duration-150 animate-fadeIn"
              onClick={() => handleMenuItemClick(item.id)}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <span className="mr-2 text-gray-400 w-4 h-4 flex items-center justify-center">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
          {groupedMenuItems.other.length > 0 && (
            <div className="border-t border-[#333] my-1"></div>
          )}
        </>
      )}
      
      {/* Other actions */}
      {groupedMenuItems.other.map((item, index) => (
        <button
          key={item.id}
          className="flex items-center w-full px-3 py-1.5 hover:bg-[#333] text-left text-sm text-gray-200 transition-colors duration-150 animate-fadeIn"
          onClick={() => handleMenuItemClick(item.id)}
          style={{ animationDelay: `${index * 30}ms` }}
        >
          <span className="mr-2 text-gray-400 w-4 h-4 flex items-center justify-center">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}