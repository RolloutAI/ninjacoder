import { useState } from 'react';
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Layers, 
  Move, 
  Type, 
  Image as ImageIcon, 
  Square, 
  Circle, 
  Sliders, 
  EyeIcon,
  PlusIcon,
  MinusIcon,
  RotateCwIcon,
  Grid,
  ChevronDownIcon,
  ChevronRightIcon,
  FolderIcon,
  FileIcon,
  FolderOpenIcon
} from 'lucide-react';

interface DesignViewProps {
  activeFile: string;
}

export default function DesignView({ activeFile }: DesignViewProps) {
  const [zoom, setZoom] = useState(100);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [devicePreview, setDevicePreview] = useState<'phone' | 'tablet' | 'desktop'>('phone');
  const [expandedFolders, setExpandedFolders] = useState<{ [key: string]: boolean }>({
    "app/dev/Projects": true,
    "mc1": true,
    "components": true,
  });

  // Add state for sidebar properties
  const [sidebarProps, setSidebarProps] = useState({
    width: "100%",
    height: "auto",
    padding: "20",
    margin: "0",
    background: "#f0e6dc",
    borderRadius: "0",
    opacity: 100,
    fontSize: "16",
    color: "#FFFFFF",
  });

  const handleZoomIn = () => {
    if (zoom < 200) setZoom(zoom + 10);
  };

  const handleZoomOut = () => {
    if (zoom > 50) setZoom(zoom - 10);
  };

  const handleZoomReset = () => {
    setZoom(100);
  };

  const toggleFolder = (folder: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedFolders(prev => ({
      ...prev,
      [folder]: !prev[folder]
    }));
  };

  // Get preview dimensions based on device
  const getPreviewDimensions = () => {
    switch (devicePreview) {
      case 'phone':
        return { width: 375, height: 667 };
      case 'tablet':
        return { width: 768, height: 1024 };
      case 'desktop':
        return { width: 1280, height: 800 };
    }
  };

  const dimensions = getPreviewDimensions();

  // Common button style for toolbar
  const toolbarButtonClass = "h-full flex items-center justify-center px-2 text-gray-400 hover:text-gray-300 hover:bg-[#1a1a1a] transition-colors";
  const activeToolbarButtonClass = "h-full flex items-center justify-center px-2 text-white bg-[#1a1a1a] transition-colors";

  return (
    <div className="flex-1 flex h-full flex-col overflow-hidden bg-[#0d0d0d]">
      {/* Top toolbar */}
      <div className="h-[32px] bg-[#111] border-b border-[#222] flex items-stretch z-10">
        {/* Left section - Explorer and Components */}
        <div className="h-full px-4 flex items-center font-medium text-xs text-gray-400 border-r border-[#222]">
          COMPONENTS
        </div>
        
        {/* Center section - Device preview and zoom controls */}
        <div className="flex-1 flex items-stretch justify-center">
          {/* Device preview buttons */}
          <div className="flex items-stretch h-full">
            <button 
              className={devicePreview === 'phone' ? activeToolbarButtonClass : toolbarButtonClass}
              onClick={() => setDevicePreview('phone')}
              title="Phone"
            >
              <Smartphone size={14} />
            </button>
            <button 
              className={devicePreview === 'tablet' ? activeToolbarButtonClass : toolbarButtonClass}
              onClick={() => setDevicePreview('tablet')}
              title="Tablet"
            >
              <Tablet size={14} />
            </button>
            <button 
              className={devicePreview === 'desktop' ? activeToolbarButtonClass : toolbarButtonClass}
              onClick={() => setDevicePreview('desktop')}
              title="Desktop"
            >
              <Monitor size={14} />
            </button>
          </div>
          
          {/* Zoom controls */}
          <div className="flex items-stretch h-full ml-4">
            <button 
              className={toolbarButtonClass}
              onClick={handleZoomOut}
              title="Zoom Out"
            >
              <MinusIcon size={14} />
            </button>
            <div className="h-full flex items-center px-2 text-xs text-gray-300">
              {zoom}%
            </div>
            <button 
              className={toolbarButtonClass}
              onClick={handleZoomIn}
              title="Zoom In"
            >
              <PlusIcon size={14} />
            </button>
            <button 
              className={toolbarButtonClass}
              onClick={handleZoomReset}
              title="Reset Zoom"
            >
              <RotateCwIcon size={14} />
            </button>
          </div>
          
          {/* Grid and preview buttons */}
          <div className="flex items-stretch h-full ml-4">
            <button 
              className={showGrid ? activeToolbarButtonClass : toolbarButtonClass}
              onClick={() => setShowGrid(!showGrid)}
              title="Toggle Grid"
            >
              <Grid size={14} />
            </button>
            <button 
              className={toolbarButtonClass}
              title="Preview"
            >
              <EyeIcon size={14} />
            </button>
          </div>
        </div>
        
        {/* Right section - Properties */}
        <div className="h-full px-4 flex items-center font-medium text-xs text-gray-400 border-l border-[#222]">
          PROPERTIES
        </div>
      </div>
      
      {/* Main content with sidebar and canvas */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left sidebar - Explorer */}
        
        
        {/* Center section - Components and Canvas */}
        <div className="flex flex-1 overflow-hidden">
          {/* Components sidebar */}
          <div className="w-[240px] border-r border-[#222] bg-[#111] flex flex-col">
            <div className="flex-1 overflow-y-auto p-2">
              <div className="space-y-1">
                <div className="text-xs text-gray-500 px-2 py-1">LAYOUT</div>
                
                <div className="flex items-center px-2 py-1.5 rounded hover:bg-[#222] cursor-pointer">
                  <div className="w-5 h-5 mr-2 flex items-center justify-center text-gray-400">
                    <Layers size={16} />
                  </div>
                  <span className="text-sm text-gray-300">Stack</span>
                </div>
                
                <div className="flex items-center px-2 py-1.5 rounded hover:bg-[#222] cursor-pointer">
                  <div className="w-5 h-5 mr-2 flex items-center justify-center text-gray-400">
                    <Square size={16} />
                  </div>
                  <span className="text-sm text-gray-300">HStack</span>
                </div>
                
                <div className="flex items-center px-2 py-1.5 rounded hover:bg-[#222] cursor-pointer">
                  <div className="w-5 h-5 mr-2 flex items-center justify-center text-gray-400">
                    <Square size={16} />
                  </div>
                  <span className="text-sm text-gray-300">VStack</span>
                </div>
                
                <div className="flex items-center px-2 py-1.5 rounded hover:bg-[#222] cursor-pointer">
                  <div className="w-5 h-5 mr-2 flex items-center justify-center text-gray-400">
                    <Layers size={16} />
                  </div>
                  <span className="text-sm text-gray-300">ZStack</span>
                </div>
                
                <div className="text-xs text-gray-500 px-2 py-1 mt-3">UI ELEMENTS</div>
                
                <div className="flex items-center px-2 py-1.5 rounded hover:bg-[#222] cursor-pointer">
                  <div className="w-5 h-5 mr-2 flex items-center justify-center text-gray-400">
                    <Type size={16} />
                  </div>
                  <span className="text-sm text-gray-300">Text</span>
                </div>
                
                <div className="flex items-center px-2 py-1.5 rounded hover:bg-[#222] cursor-pointer">
                  <div className="w-5 h-5 mr-2 flex items-center justify-center text-gray-400">
                    <Square size={16} />
                  </div>
                  <span className="text-sm text-gray-300">Button</span>
                </div>
                
                <div className="flex items-center px-2 py-1.5 rounded hover:bg-[#222] cursor-pointer">
                  <div className="w-5 h-5 mr-2 flex items-center justify-center text-gray-400">
                    <ImageIcon size={16} />
                  </div>
                  <span className="text-sm text-gray-300">Image</span>
                </div>
                
                <div className="flex items-center px-2 py-1.5 rounded hover:bg-[#222] cursor-pointer">
                  <div className="w-5 h-5 mr-2 flex items-center justify-center text-gray-400">
                    <Square size={16} />
                  </div>
                  <span className="text-sm text-gray-300">TextField</span>
                </div>
                
                <div className="flex items-center px-2 py-1.5 rounded hover:bg-[#222] cursor-pointer">
                  <div className="w-5 h-5 mr-2 flex items-center justify-center text-gray-400">
                    <Circle size={16} />
                  </div>
                  <span className="text-sm text-gray-300">Toggle</span>
                </div>
                
                <div className="flex items-center px-2 py-1.5 rounded hover:bg-[#222] cursor-pointer">
                  <div className="w-5 h-5 mr-2 flex items-center justify-center text-gray-400">
                    <Sliders size={16} />
                  </div>
                  <span className="text-sm text-gray-300">Slider</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Canvas */}
          <div className="flex-1 overflow-auto p-8 flex items-center justify-center bg-[#0d0d0d]">
            <div 
              className="relative bg-white rounded-lg shadow-lg overflow-hidden"
              style={{
                width: `${dimensions.width * zoom / 100}px`,
                height: `${dimensions.height * zoom / 100}px`,
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'center',
              }}
            >
              {/* Grid overlay */}
              {showGrid && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-full h-full" style={{
                    backgroundImage: 'linear-gradient(to right, rgba(128, 128, 128, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(128, 128, 128, 0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>
              )}
              
              {/* Preview content based on active file */}
              <div className="w-full h-full">
                {activeFile === "app.swift" && (
                  <div className="w-full h-full bg-[#f0e6dc] flex flex-col">
                    <div className="p-4 text-center">
                      <h1 className="text-xl font-semibold text-white bg-black bg-opacity-50 p-2 rounded">LET'S LEARN</h1>
                    </div>
                  </div>
                )}
                
                {activeFile === "navbar.swift" && (
                  <div className="w-full bg-black bg-opacity-80 p-4 flex items-center justify-between">
                    <h1 className="text-lg font-semibold text-white">Codejc</h1>
                    <button className="text-white">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                      </svg>
                    </button>
                  </div>
                )}
                
                {activeFile === "modal.swift" && (
                  <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-4/5 max-w-md">
                      <h2 className="text-xl font-bold text-center mb-4">Modal Title</h2>
                      <p className="text-gray-700 mb-6 text-center">This is a modal view</p>
                      <div className="flex justify-center">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeFile === "inputField.swift" && (
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <div className="w-full">
                      <input 
                        type="text" 
                        placeholder="Enter text here" 
                        className="w-full p-4 bg-gray-100 rounded-lg text-gray-800"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Right sidebar - Properties */}
        <div className="w-[240px] border-l border-[#222] bg-[#111] flex flex-col">
          <div className="flex-1 overflow-y-auto p-3">
            <div className="space-y-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">LAYOUT</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Width</label>
                    <input type="text" value={sidebarProps.width} onChange={e => setSidebarProps(p => ({ ...p, width: e.target.value }))} className="w-full bg-[#222] border border-[#333] rounded px-2 py-1 text-xs text-white" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Height</label>
                    <input type="text" value={sidebarProps.height} onChange={e => setSidebarProps(p => ({ ...p, height: e.target.value }))} className="w-full bg-[#222] border border-[#333] rounded px-2 py-1 text-xs text-white" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Padding</label>
                    <input type="text" value={sidebarProps.padding} onChange={e => setSidebarProps(p => ({ ...p, padding: e.target.value }))} className="w-full bg-[#222] border border-[#333] rounded px-2 py-1 text-xs text-white" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Margin</label>
                    <input type="text" value={sidebarProps.margin} onChange={e => setSidebarProps(p => ({ ...p, margin: e.target.value }))} className="w-full bg-[#222] border border-[#333] rounded px-2 py-1 text-xs text-white" />
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-xs text-gray-500 mb-1">APPEARANCE</div>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Background</label>
                    <div className="flex">
                      <div className="w-6 h-6 rounded border border-[#333] bg-[#f0e6dc] mr-2"></div>
                      <input type="text" value={sidebarProps.background} onChange={e => setSidebarProps(p => ({ ...p, background: e.target.value }))} className="flex-1 bg-[#222] border border-[#333] rounded px-2 py-1 text-xs text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Border Radius</label>
                    <input type="text" value={sidebarProps.borderRadius} onChange={e => setSidebarProps(p => ({ ...p, borderRadius: e.target.value }))} className="w-full bg-[#222] border border-[#333] rounded px-2 py-1 text-xs text-white" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Opacity</label>
                    <input type="range" min="0" max="100" value={sidebarProps.opacity} onChange={e => setSidebarProps(p => ({ ...p, opacity: Number(e.target.value) }))} className="w-full" />
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-xs text-gray-500 mb-1">TEXT</div>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Font</label>
                    <select className="w-full bg-[#222] border border-[#333] rounded px-2 py-1 text-xs text-white">
                      <option>System Font</option>
                      <option>SF Pro</option>
                      <option>Helvetica</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Size</label>
                    <input type="text" value={sidebarProps.fontSize} onChange={e => setSidebarProps(p => ({ ...p, fontSize: e.target.value }))} className="w-full bg-[#222] border border-[#333] rounded px-2 py-1 text-xs text-white" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Weight</label>
                    <select className="w-full bg-[#222] border border-[#333] rounded px-2 py-1 text-xs text-white">
                      <option>Regular</option>
                      <option>Medium</option>
                      <option selected>Semibold</option>
                      <option>Bold</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Color</label>
                    <div className="flex">
                      <div className="w-6 h-6 rounded border border-[#333] bg-white mr-2"></div>
                      <input type="text" value={sidebarProps.color} onChange={e => setSidebarProps(p => ({ ...p, color: e.target.value }))} className="flex-1 bg-[#222] border border-[#333] rounded px-2 py-1 text-xs text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}