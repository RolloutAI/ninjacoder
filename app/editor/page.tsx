"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import Editor from "@/components/editor";
import Topbar from "@/components/topbar";
import BrowserFrame from "@/components/browser-frame";
import VersionHistory from "@/components/version-history";
import DesignView from "@/components/design-view";
import { MenuIcon, XIcon } from "lucide-react";
import ChatSidebar from "@/components/chat-sidebar";

export default function EditorPage() {
  const [activeFile, setActiveFile] = useState("index.html");
  const [openFiles, setOpenFiles] = useState<string[]>(["index.html", "styles.css", "main.js"]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [versionHistoryOpen, setVersionHistoryOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<'code' | 'design'>('code');
  const [chatSidebarOpen, setChatSidebarOpen] = useState(false);
  
  // Check if we're on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Reset app state to initial values
  const resetAppState = () => {
    setActiveFile("index.html");
    setOpenFiles(["index.html", "styles.css", "main.js"]);
    setActiveMode('code');
    setVersionHistoryOpen(false);
    setSidebarOpen(true);
    setChatSidebarOpen(false);
  };
  
  // Sample code for different files
  const fileContents = {
    "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header id="main-header">
    <div class="container">
      <h1>Welcome to My Website</h1>
      <nav>
        <ul>
          <li><a href="#" class="active">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="container">
        <h2>Modern Web Development</h2>
        <p>Learn HTML, CSS, and JavaScript to build amazing websites.</p>
        <button class="btn">Get Started</button>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <h2>Our Features</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <h3>Responsive Design</h3>
            <p>Our websites look great on all devices.</p>
          </div>
          <div class="feature-card">
            <h3>Modern Technologies</h3>
            <p>We use the latest web technologies.</p>
          </div>
          <div class="feature-card">
            <h3>Fast Performance</h3>
            <p>Optimized for speed and efficiency.</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="container">
      <p>&copy; 2025 My Website. All rights reserved.</p>
    </div>
  </footer>

  <script src="main.js"></script>
</body>
</html>`,
    "styles.css": `/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --dark-color: #333;
  --light-color: #f4f4f4;
  --danger-color: #e74c3c;
  --success-color: #2ecc71;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: var(--dark-color);
  background-color: #fff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header Styles */
header {
  background-color: var(--primary-color);
  color: #fff;
  padding: 1rem 0;
}

header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header h1 {
  font-size: 1.5rem;
}

nav ul {
  display: flex;
  list-style: none;
}

nav ul li {
  margin-left: 1rem;
}

nav ul li a {
  color: #fff;
  text-decoration: none;
  padding: 0.5rem;
  transition: all 0.3s ease;
}

nav ul li a:hover,
nav ul li a.active {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

/* Hero Section */
.hero {
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  color: #fff;
  padding: 4rem 0;
  text-align: center;
}

.hero h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.btn {
  display: inline-block;
  background: #fff;
  color: var(--primary-color);
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Features Section */
.features {
  padding: 4rem 0;
  background-color: var(--light-color);
}

.features h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
}

.feature-card h3 {
  margin-bottom: 1rem;
  color: var(--primary-color);
}

/* Footer */
footer {
  background-color: var(--dark-color);
  color: #fff;
  padding: 2rem 0;
  text-align: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  header .container {
    flex-direction: column;
  }
  
  header h1 {
    margin-bottom: 1rem;
  }
  
  nav ul {
    margin-top: 1rem;
  }
  
  .hero h2 {
    font-size: 2rem;
  }
}`,
    "main.js": `// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
  // Navigation active state
  const navLinks = document.querySelectorAll('nav ul li a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Remove active class from all links
      navLinks.forEach(link => link.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // If it's not the home link, prevent default behavior for demo
      if (!this.classList.contains('home')) {
        e.preventDefault();
      }
    });
  });
  
  // Button hover effect
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('mouseover', function() {
      this.style.transform = 'translateY(-3px)';
      this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });
    
    button.addEventListener('mouseout', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });
    
    button.addEventListener('click', function() {
      alert('Button clicked! This would normally navigate to another page or perform an action.');
    });
  });
  
  // Feature cards animation
  const featureCards = document.querySelectorAll('.feature-card');
  
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
  });
  
  console.log('JavaScript initialized successfully!');
});`
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleVersionHistory = () => {
    setVersionHistoryOpen(!versionHistoryOpen);
  };

  const toggleChatSidebar = () => {
    setChatSidebarOpen(!chatSidebarOpen);
  };

  // Handle file opening
  const handleFileOpen = (file: string) => {
    // If file is not already open, add it to openFiles
    if (!openFiles.includes(file)) {
      setOpenFiles([...openFiles, file]);
    }
    setActiveFile(file);
  };

  // Handle file closing
  const handleFileClose = (file: string) => {
    // Don't close if it's the only file open
    if (openFiles.length <= 1) return;
    
    // Remove the file from openFiles
    const newOpenFiles = openFiles.filter(f => f !== file);
    setOpenFiles(newOpenFiles);
    
    // If the active file is being closed, set a new active file
    if (activeFile === file) {
      // Set the active file to the last file in the list
      setActiveFile(newOpenFiles[newOpenFiles.length - 1]);
    }
  };

  const handleNewItem = (item: string) => {
    // Implementation for adding a new item
  };

  return (
    <div className="bg-[#0a0a0a] h-screen flex flex-col text-white font-sans antialiased overflow-hidden">
      <Topbar 
        activeMode={activeMode} 
        setActiveMode={setActiveMode} 
        onVersionHistoryClick={toggleVersionHistory}
        resetAppState={resetAppState}
        toggleChatSidebar={toggleChatSidebar}
      />

      <main className="flex-1 flex overflow-hidden p-4 gap-4">
        {/* Floating AI Chat Sidebar */}
        {chatSidebarOpen && <ChatSidebar isOpen={chatSidebarOpen} onClose={() => setChatSidebarOpen(false)} />}

        {/* Main Content Area */}
        <div className="flex-1 flex gap-4 overflow-hidden">
          {/* Left Panel: File Sidebar */}
          {sidebarOpen && (
            <div className="flex flex-col bg-[rgba(20,20,20,0.7)] border border-[#232323] rounded-xl shadow-2xl backdrop-blur-md overflow-hidden w-[250px] transition-all duration-300">
              <Sidebar 
                files={fileContents}
                activeFile={activeFile}
                setActiveFile={handleFileOpen}
                openFiles={openFiles}
                onCloseFile={handleFileClose}
                onNewItem={handleNewItem}
              />
            </div>
          )}

          {/* Center Panel: Editor or Design View */}
          <div className="flex-1 flex flex-col bg-[rgba(20,20,20,0.7)] border border-[#232323] rounded-xl shadow-2xl backdrop-blur-md overflow-hidden">
            {activeMode === 'code' ? (
              <Editor 
                files={fileContents}
                activeFile={activeFile}
                setActiveFile={handleFileOpen}
                openFiles={openFiles}
                onCloseFile={handleFileClose}
              />
            ) : (
              <DesignView activeFile={activeFile} />
            )}
          </div>
        </div>

        {/* Right Panel: Browser Preview */}
        <div className="w-1/3 flex flex-col bg-[rgba(20,20,20,0.7)] border border-[#232323] rounded-xl shadow-2xl backdrop-blur-md overflow-hidden">
          <BrowserFrame
            html={fileContents["index.html"]}
            css={fileContents["styles.css"]}
            js={fileContents["main.js"]}
          />
        </div>
      </main>

      {/* Mobile-only menu button */}
      <button 
        className="md:hidden absolute top-2 left-2 z-20 p-1 bg-[#333] rounded-md"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
      </button>
    </div>
  );
} 