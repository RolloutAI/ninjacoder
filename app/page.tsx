"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import Editor from "@/components/editor";
import Topbar from "@/components/topbar";
import BrowserFrame from "@/components/browser-frame";
import VersionHistory from "@/components/version-history";
import DesignView from "@/components/design-view";
import { MenuIcon, XIcon } from "lucide-react";

export default function Home() {
  const [activeFile, setActiveFile] = useState("index.html");
  const [openFiles, setOpenFiles] = useState<string[]>(["index.html", "styles.css", "main.js"]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [versionHistoryOpen, setVersionHistoryOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<'code' | 'design'>('code');
  
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
  
  // Simple form validation (if a form exists)
  const form = document.querySelector('form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const inputs = this.querySelectorAll('input, textarea');
      
      inputs.forEach(input => {
        if (input.value.trim() === '') {
          isValid = false;
          input.style.borderColor = 'red';
        } else {
          input.style.borderColor = '';
        }
      });
      
      if (isValid) {
        alert('Form submitted successfully!');
        this.reset();
      } else {
        alert('Please fill in all required fields.');
      }
    });
  }
  
  // Scroll to top button
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '&uarr;';
  scrollBtn.className = 'scroll-top-btn';
  scrollBtn.style.position = 'fixed';
  scrollBtn.style.bottom = '20px';
  scrollBtn.style.right = '20px';
  scrollBtn.style.display = 'none';
  scrollBtn.style.padding = '10px 15px';
  scrollBtn.style.backgroundColor = 'var(--primary-color)';
  scrollBtn.style.color = 'white';
  scrollBtn.style.border = 'none';
  scrollBtn.style.borderRadius = '50%';
  scrollBtn.style.cursor = 'pointer';
  
  document.body.appendChild(scrollBtn);
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollBtn.style.display = 'block';
    } else {
      scrollBtn.style.display = 'none';
    }
  });
  
  scrollBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  console.log('JavaScript initialized successfully!');
});`,
    "header.js": `// Header Component
export default class Header {
  constructor(selector) {
    this.header = document.querySelector(selector);
    this.scrollThreshold = 100;
    this.isSticky = false;
    this.init();
  }
  
  init() {
    if (!this.header) {
      console.error('Header element not found');
      return;
    }
    
    // Store original styles
    this.originalStyles = {
      position: this.header.style.position,
      top: this.header.style.top,
      backgroundColor: this.header.style.backgroundColor,
      boxShadow: this.header.style.boxShadow,
      zIndex: this.header.style.zIndex
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', this.handleScroll.bind(this));
    
    // Initialize mobile menu
    this.initMobileMenu();
    
    console.log('Header component initialized');
  }
  
  handleScroll() {
    if (window.scrollY > this.scrollThreshold && !this.isSticky) {
      this.makeSticky();
    } else if (window.scrollY <= this.scrollThreshold && this.isSticky) {
      this.removeSticky();
    }
  }
  
  makeSticky() {
    this.header.style.position = 'fixed';
    this.header.style.top = '0';
    this.header.style.left = '0';
    this.header.style.right = '0';
    this.header.style.backgroundColor = 'rgba(52, 152, 219, 0.95)';
    this.header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    this.header.style.zIndex = '1000';
    this.header.classList.add('sticky-header');
    this.isSticky = true;
  }
  
  removeSticky() {
    this.header.style.position = this.originalStyles.position;
    this.header.style.top = this.originalStyles.top;
    this.header.style.backgroundColor = this.originalStyles.backgroundColor;
    this.header.style.boxShadow = this.originalStyles.boxShadow;
    this.header.style.zIndex = this.originalStyles.zIndex;
    this.header.classList.remove('sticky-header');
    this.isSticky = false;
  }
  
  initMobileMenu() {
    const nav = this.header.querySelector('nav');
    if (!nav) return;
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.display = 'none';
    mobileMenuBtn.style.background = 'none';
    mobileMenuBtn.style.border = 'none';
    mobileMenuBtn.style.color = 'white';
    mobileMenuBtn.style.fontSize = '1.5rem';
    mobileMenuBtn.style.cursor = 'pointer';
    
    this.header.querySelector('.container').appendChild(mobileMenuBtn);
    
    // Handle mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
      nav.classList.toggle('mobile-nav-active');
    });
    
    // Handle resize events
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 768) {
        mobileMenuBtn.style.display = 'block';
        nav.classList.add('mobile-nav');
      } else {
        mobileMenuBtn.style.display = 'none';
        nav.classList.remove('mobile-nav');
        nav.classList.remove('mobile-nav-active');
      }
    });
    
    // Initial check
    if (window.innerWidth <= 768) {
      mobileMenuBtn.style.display = 'block';
      nav.classList.add('mobile-nav');
    }
  }
}`,
    "footer.js": `// Footer Component
export default class Footer {
  constructor(selector) {
    this.footer = document.querySelector(selector);
    this.year = new Date().getFullYear();
    this.init();
  }
  
  init() {
    if (!this.footer) {
      console.error('Footer element not found');
      return;
    }
    
    // Update copyright year
    this.updateCopyright();
    
    // Add social media links
    this.addSocialLinks();
    
    // Add newsletter form
    this.addNewsletterForm();
    
    console.log('Footer component initialized');
  }
  
  updateCopyright() {
    const copyrightEl = this.footer.querySelector('p');
    if (copyrightEl) {
      copyrightEl.innerHTML = copyrightEl.innerHTML.replace(/\\d{4}/, this.year);
    }
  }
  
  addSocialLinks() {
    const socialLinks = document.createElement('div');
    socialLinks.className = 'social-links';
    socialLinks.innerHTML = \`
      <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
      <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
      <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
      <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
    \`;
    
    // Add some basic styling
    socialLinks.style.marginTop = '1rem';
    socialLinks.style.display = 'flex';
    socialLinks.style.justifyContent = 'center';
    socialLinks.style.gap = '1rem';
    
    const links = socialLinks.querySelectorAll('a');
    links.forEach(link => {
      link.style.color = 'white';
      link.style.fontSize = '1.5rem';
      link.style.transition = 'color 0.3s ease';
      
      link.addEventListener('mouseenter', () => {
        link.style.color = '#3498db';
      });
      
      link.addEventListener('mouseleave', () => {
        link.style.color = 'white';
      });
    });
    
    this.footer.querySelector('.container').appendChild(socialLinks);
  }
  
  addNewsletterForm() {
    const newsletterForm = document.createElement('div');
    newsletterForm.className = 'newsletter-form';
    newsletterForm.innerHTML = \`
      <h3>Subscribe to our Newsletter</h3>
      <form>
        <input type="email" placeholder="Enter your email" required>
        <button type="submit">Subscribe</button>
      </form>
    \`;
    
    // Add some basic styling
    newsletterForm.style.marginTop = '2rem';
    newsletterForm.style.textAlign = 'center';
    
    const heading = newsletterForm.querySelector('h3');
    heading.style.marginBottom = '1rem';
    heading.style.fontSize = '1.2rem';
    
    const form = newsletterForm.querySelector('form');
    form.style.display = 'flex';
    form.style.justifyContent = 'center';
    form.style.gap = '0.5rem';
    
    const input = newsletterForm.querySelector('input');
    input.style.padding = '0.5rem';
    input.style.borderRadius = '4px';
    input.style.border = 'none';
    
    const button = newsletterForm.querySelector('button');
    button.style.padding = '0.5rem 1rem';
    button.style.backgroundColor = '#3498db';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.cursor = 'pointer';
    
    // Add form submission handler
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert(\`Thank you for subscribing with \${input.value}!\`);
      form.reset();
    });
    
    this.footer.querySelector('.container').appendChild(newsletterForm);
  }
}`,
    "navigation.js": `// Navigation Component
export default class Navigation {
  constructor(selector) {
    this.nav = document.querySelector(selector);
    this.activeClass = 'active';
    this.init();
  }
  
  init() {
    if (!this.nav) {
      console.error('Navigation element not found');
      return;
    }
    
    // Get all navigation links
    this.links = this.nav.querySelectorAll('a');
    
    // Add click event listeners
    this.addEventListeners();
    
    // Set active link based on current URL
    this.setActiveLink();
    
    console.log('Navigation component initialized');
  }
  
  addEventListeners() {
    this.links.forEach(link => {
      link.addEventListener('click', this.handleLinkClick.bind(this));
    });
  }
  
  handleLinkClick(event) {
    // Remove active class from all links
    this.links.forEach(link => link.classList.remove(this.activeClass));
    
    // Add active class to clicked link
    event.currentTarget.classList.add(this.activeClass);
    
    // If it's a demo or the link doesn't point to another page, prevent default
    const href = event.currentTarget.getAttribute('href');
    if (href === '#' || href === '') {
      event.preventDefault();
    }
  }
  
  setActiveLink() {
    // Get current path
    const currentPath = window.location.pathname;
    
    // Find matching link
    let activeLink = null;
    
    this.links.forEach(link => {
      const href = link.getAttribute('href');
      
      // Skip empty or hash-only links
      if (href === '' || href === '#') return;
      
      // Check if the link's href matches the current path
      if (currentPath === href || currentPath.endsWith(href)) {
        activeLink = link;
      }
    });
    
    // If no matching link found, default to first link
    if (!activeLink && this.links.length > 0) {
      activeLink = this.links[0];
    }
    
    // Set active class
    if (activeLink) {
      activeLink.classList.add(this.activeClass);
    }
  }
  
  // Method to programmatically navigate
  navigateTo(linkIndex) {
    if (linkIndex >= 0 && linkIndex < this.links.length) {
      // Simulate click on the link
      this.links[linkIndex].click();
    } else {
      console.error('Invalid link index');
    }
  }
  
  // Add a new link to the navigation
  addLink(text, href) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    
    a.textContent = text;
    a.setAttribute('href', href);
    a.addEventListener('click', this.handleLinkClick.bind(this));
    
    li.appendChild(a);
    this.nav.querySelector('ul').appendChild(li);
    
    // Update links collection
    this.links = this.nav.querySelectorAll('a');
  }
  
  // Remove a link from the navigation
  removeLink(index) {
    if (index >= 0 && index < this.links.length) {
      const linkToRemove = this.links[index];
      linkToRemove.parentElement.remove();
      
      // Update links collection
      this.links = this.nav.querySelectorAll('a');
    } else {
      console.error('Invalid link index');
    }
  }
}`,
    "package.json": `{
  "name": "my-website",
  "version": "1.0.0",
  "description": "A modern website built with HTML, CSS, and JavaScript",
  "main": "index.html",
  "scripts": {
    "start": "serve",
    "build": "mkdir -p dist && cp -R src/* dist/",
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": [
    "html",
    "css",
    "javascript",
    "website"
  ],
  "author": "Your Name",
  "license": "MIT",
  "devDependencies": {
    "serve": "^14.0.1"
  }
}`,
    "README.md": `# My Website

A modern website built with HTML, CSS, and JavaScript.

## Features

- Responsive design that works on all devices
- Modern UI with smooth animations
- Component-based architecture
- Clean and maintainable code

## Getting Started

1. Clone the repository
2. Open \`index.html\` in your browser

## Project Structure

- \`index.html\` - Main HTML file
- \`styles.css\` - CSS styles
- \`main.js\` - Main JavaScript file
- \`components/\` - Reusable components
  - \`header.js\` - Header component
  - \`footer.js\` - Footer component
  - \`navigation.js\` - Navigation component
- \`assets/\` - Images and other assets

## Development

To start the development server:

\`\`\`
npm start
\`\`\`

## Building for Production

To build for production:

\`\`\`
npm run build
\`\`\`

## License

This project is licensed under the MIT License - see the LICENSE file for details.`
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleVersionHistory = () => {
    setVersionHistoryOpen(!versionHistoryOpen);
  };

  const toggleChatSidebar = () => {
    // This function will be passed to the Topbar component
    // Implementation will be handled elsewhere
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

  return (
    <div className="min-h-screen bg-black">
      <BrowserFrame>
        <main className="flex flex-col h-screen bg-[#000000] text-gray-300 font-sans antialiased overflow-hidden">
          <Topbar 
            onVersionHistoryClick={toggleVersionHistory} 
            activeMode={activeMode} 
            setActiveMode={setActiveMode} 
            resetAppState={resetAppState}
            toggleChatSidebar={toggleChatSidebar}
          />
          <div className="flex flex-1 overflow-hidden relative">
            {/* Mobile sidebar toggle */}
            <button 
              className="md:hidden absolute top-2 left-2 z-20 p-1 bg-[#333] rounded-md"
              onClick={toggleSidebar}
            >
              {sidebarOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
            </button>
            
            {/* Sidebar with responsive behavior */}
            <div 
              className={`${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              } transition-transform duration-300 ease-in-out md:translate-x-0 absolute md:relative z-10 h-full md:h-auto md:flex-shrink-0 w-[250px]`}
            >
              <Sidebar 
                activeFile={activeFile} 
                setActiveFile={handleFileOpen} 
                closeSidebar={() => isMobile && setSidebarOpen(false)}
              />
            </div>
            
            {/* Editor or Design View based on active mode */}
            <div className="flex-1 overflow-hidden flex flex-col relative">
              <div className="relative w-full h-full">
                {/* Design View with animation */}
                <div 
                  className={`absolute inset-0 transition-all duration-500 ${
                    activeMode === 'design' 
                      ? 'opacity-100 z-10' 
                      : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <DesignView activeFile={activeFile} />
                </div>
                
                {/* Code Editor with animation */}
                <div 
                  className={`absolute inset-0 transition-all duration-500 ${
                    activeMode === 'code' 
                      ? 'opacity-100 z-10' 
                      : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <Editor 
                    files={fileContents} 
                    activeFile={activeFile} 
                    setActiveFile={setActiveFile}
                    openFiles={openFiles}
                    onCloseFile={handleFileClose}
                  />
                </div>
              </div>
              
              {/* Version History Panel */}
              {versionHistoryOpen && (
                <VersionHistory 
                  isOpen={versionHistoryOpen} 
                  onClose={() => setVersionHistoryOpen(false)} 
                />
              )}
            </div>
          </div>
        </main>
      </BrowserFrame>
    </div>
  );
}