import { useState, useEffect, useRef } from 'react';
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

interface LayerNode {
  id: string;
  tag: string;
  className?: string;
  children: LayerNode[];
  expanded: boolean;
  level: number;
  textContent?: string;
  type?: 'container' | 'text' | 'image' | 'input' | 'button';
  element?: Element; // Reference to actual DOM element
}

interface DesignViewProps {
  activeFile: string;
}

export default function DesignView({ activeFile }: DesignViewProps) {
  const [zoom, setZoom] = useState(100);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [devicePreview, setDevicePreview] = useState<'phone' | 'tablet' | 'desktop'>('phone');
  const [layerTree, setLayerTree] = useState<LayerNode | null>(null);
  const [highlightBox, setHighlightBox] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

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

  const toggleLayer = (layerId: string) => {
    setLayerTree(prevTree => {
      if (!prevTree) return null;
      const updateNode = (node: LayerNode): LayerNode => {
        if (node.id === layerId) {
          return { ...node, expanded: !node.expanded };
        }
        return {
          ...node,
          children: node.children.map(updateNode)
        };
      };
      return updateNode(prevTree);
    });
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

  // Function to build layer tree from DOM
  const buildLayerTree = (element: Element, level: number = 0): LayerNode => {
    const id = Math.random().toString(36).substr(2, 9);
    const tag = element.tagName.toLowerCase();
    
    // Get text content if it's a text-only element
    let textContent = '';
    if (element.childNodes.length === 1 && element.firstChild?.nodeType === Node.TEXT_NODE) {
      textContent = element.textContent?.trim() || '';
    }
    
    // Determine element type
    let type: LayerNode['type'] = 'container';
    if (tag === 'img') type = 'image';
    else if (tag === 'input' || tag === 'textarea') type = 'input';
    else if (tag === 'button') type = 'button';
    else if (textContent) type = 'text';

    return {
      id,
      tag,
      className: element.className || undefined,
      children: Array.from(element.children).map(child => buildLayerTree(child, level + 1)),
      expanded: true,
      level,
      textContent: textContent || undefined,
      type,
      element
    };
  };

  // Function to find layer by id
  const findLayerById = (tree: LayerNode | null, id: string): LayerNode | null => {
    if (!tree) return null;
    if (tree.id === id) return tree;
    for (const child of tree.children) {
      const found = findLayerById(child, id);
      if (found) return found;
    }
    return null;
  };

  // Function to update highlight box position
  const updateHighlightBox = (element: Element) => {
    if (!previewContainerRef.current) return;

    const containerRect = previewContainerRef.current.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    const scale = zoom / 100;

    setHighlightBox({
      top: (elementRect.top - containerRect.top) / scale,
      left: (elementRect.left - containerRect.left) / scale,
      width: elementRect.width / scale,
      height: elementRect.height / scale
    });
  };

  // Update highlight when selection changes
  useEffect(() => {
    if (!selectedElement || !layerTree) {
      setHighlightBox(null);
      return;
    }

    const selectedLayer = findLayerById(layerTree, selectedElement);
    if (selectedLayer?.element) {
      updateHighlightBox(selectedLayer.element);
    }
  }, [selectedElement, layerTree, zoom]);

  // Update layer tree when preview content changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (previewRef.current) {
        try {
          const tree = buildLayerTree(previewRef.current);
          console.log('Layer tree built:', tree);
          setLayerTree(tree);
        } catch (error) {
          console.error('Error building layer tree:', error);
        }
      }
    }, 100); // Small delay to ensure content is rendered

    return () => clearTimeout(timer);
  }, [activeFile]);

  // Get icon for layer type
  const getLayerIcon = (layer: LayerNode) => {
    switch (layer.type) {
      case 'text':
        return <Type size={16} />;
      case 'image':
        return <ImageIcon size={16} />;
      case 'input':
        return <Square size={16} />;
      case 'button':
        return <Square size={16} />;
      default:
        return <Layers size={16} />;
    }
  };

  // Format class names for display
  const formatClassNames = (className?: string) => {
    if (!className) return '';
    return className.split(' ').map(cls => `.${cls}`).join('');
  };

  // Get display name for layer
  const getLayerDisplayName = (layer: LayerNode) => {
    const tagName = layer.tag;
    const classes = formatClassNames(layer.className);
    const text = layer.textContent ? ` "${layer.textContent.substring(0, 20)}${layer.textContent.length > 20 ? '...' : ''}"` : '';
    return `${tagName}${classes}${text}`;
  };

  // Render a single layer in the layer tree
  const renderLayer = (layer: LayerNode) => {
    const isSelected = selectedElement === layer.id;
    const hasChildren = layer.children.length > 0;
    const indent = layer.level * 12;
    
    return (
      <div key={layer.id}>
        <div 
          className={`group flex items-center h-7 cursor-pointer border-l-2 ${
            isSelected 
              ? 'bg-[#2a2a2a] border-[#8cc700]' 
              : 'hover:bg-[#1a1a1a] border-transparent'
          }`}
          style={{ paddingLeft: `${indent}px` }}
          onClick={() => setSelectedElement(layer.id)}
        >
          {/* Expand/Collapse and Icon container */}
          <div className="flex items-center min-w-[60px]">
            {/* Expand/Collapse button */}
            <div className="w-6 flex items-center justify-center">
              {hasChildren && (
                <button
                  className={`w-4 h-4 flex items-center justify-center rounded ${
                    isSelected ? 'text-white' : 'text-gray-400 hover:text-gray-300'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLayer(layer.id);
                  }}
                >
                  {layer.expanded ? (
                    <ChevronDownIcon size={12} />
                  ) : (
                    <ChevronRightIcon size={12} />
                  )}
                </button>
              )}
            </div>

            {/* Element icon */}
            <div className={`w-6 h-6 flex items-center justify-center rounded ${
              isSelected ? 'text-white' : 'text-gray-400'
            }`}>
              {layer.type === 'text' ? (
                <Type size={14} />
              ) : layer.type === 'image' ? (
                <ImageIcon size={14} />
              ) : layer.type === 'input' ? (
                <Square size={14} />
              ) : layer.type === 'button' ? (
                <Square size={14} />
              ) : (
                <Layers size={14} />
              )}
            </div>
          </div>

          {/* Element name and details */}
          <div className="flex-1 flex items-center min-w-0">
            {/* Tag name */}
            <span className={`font-medium text-sm ${
              isSelected ? 'text-white' : 'text-gray-300'
            }`}>
              {layer.tag}
            </span>

            {/* Class names */}
            {layer.className && (
              <span className={`ml-1.5 text-xs truncate ${
                isSelected ? 'text-gray-300' : 'text-gray-500'
              }`}>
                .{layer.className.split(' ')[0]}
                {layer.className.split(' ').length > 1 && '...'}
              </span>
            )}

            {/* Text content preview */}
            {layer.textContent && (
              <span className={`ml-2 text-xs truncate ${
                isSelected ? 'text-gray-300' : 'text-gray-500'
              }`}>
                "{layer.textContent.substring(0, 20)}
                {layer.textContent.length > 20 ? '...' : ''}"
              </span>
            )}
          </div>

          {/* Type badge */}
          {layer.type && layer.type !== 'container' && (
            <div className={`ml-2 px-2 py-0.5 text-[10px] rounded-full uppercase tracking-wider ${
              isSelected 
                ? 'bg-[#8cc700] text-black' 
                : 'bg-[#1e1e1e] text-gray-400'
            }`}>
              {layer.type}
            </div>
          )}
        </div>

        {/* Children container with connection lines */}
        {layer.expanded && hasChildren && (
          <div className="relative">
            <div 
              className="absolute left-[18px] top-0 bottom-0 w-px bg-[#2a2a2a]"
              style={{ left: `${indent + 18}px` }}
            />
            {layer.children.map(child => renderLayer(child))}
          </div>
        )}
      </div>
    );
  };

  // Get preview content based on active file
  const getPreviewContent = () => {
    return (
      <div className="w-full h-full bg-white">
        <header className="w-full bg-gray-800 p-4">
          <h1 className="text-2xl font-bold text-white">Welcome</h1>
          <nav className="mt-2">
            <ul className="flex space-x-4">
              <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">About</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
            </ul>
          </nav>
        </header>
        <main className="p-6">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">About Us</h2>
            <p className="text-gray-700">Welcome to our website. We're excited to share our story with you.</p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-100 rounded">
                <h3 className="font-medium">Feature 1</h3>
                <p className="text-sm text-gray-600">Description of feature 1</p>
              </div>
              <div className="p-4 bg-gray-100 rounded">
                <h3 className="font-medium">Feature 2</h3>
                <p className="text-sm text-gray-600">Description of feature 2</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  };

  return (
    <div className="flex-1 flex h-full flex-col overflow-hidden bg-[#0d0d0d]">
      {/* Top toolbar */}
      <div className="h-[32px] bg-[#111] border-b border-[#222] flex items-stretch z-10">
        {/* Left section - Explorer and Layers */}
        <div className="h-full px-4 flex items-center font-medium text-xs text-gray-400 border-r border-[#222]">
          LAYERS
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
        {/* Layers sidebar */}
        <div className="w-[240px] border-r border-[#222] bg-[#111] flex flex-col">
          {/* Layers header */}
          
          
          {/* Layers tree */}
          <div className="flex-1 overflow-y-auto">
            {layerTree ? (
              renderLayer(layerTree)
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-gray-500">
                No layers available
              </div>
            )}
          </div>
        </div>
        
        {/* Canvas */}
        <div className="flex-1 overflow-auto p-8 flex items-center justify-center bg-[#0d0d0d]">
          <div 
            ref={previewContainerRef}
            className="relative bg-white rounded-lg shadow-lg overflow-hidden"
            style={{
              width: `${dimensions.width * zoom / 100}px`,
              height: `${dimensions.height * zoom / 100}px`,
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'center',
            }}
          >
            {/* Highlight overlay */}
            {highlightBox && (
              <div
                className="absolute pointer-events-none border-2 border-[#8cc700] bg-[#8cc700]/10 z-50"
                style={{
                  top: `${highlightBox.top}px`,
                  left: `${highlightBox.left}px`,
                  width: `${highlightBox.width}px`,
                  height: `${highlightBox.height}px`,
                }}
              >
                <div className="absolute top-full left-0 mt-1 bg-[#8cc700] text-black text-xs px-1 rounded">
                  {Math.round(highlightBox.width)} × {Math.round(highlightBox.height)}
                </div>
              </div>
            )}

            {/* Grid overlay */}
            {showGrid && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full" style={{
                  backgroundImage: 'linear-gradient(to right, rgba(128, 128, 128, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(128, 128, 128, 0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}></div>
              </div>
            )}
            
            {/* Preview content */}
            <div ref={previewRef} className="w-full h-full">
              {getPreviewContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}