/**
 * Raftel Engine Documentation Scripts
 * Based on Three.js documentation functionality
 */

// Initialize all features
document.addEventListener('DOMContentLoaded', function () {
  initSearch();
  highlightCode();
  initExampleViewers();
  initSidebar();
  initMobileNav();
  initDarkMode();
  initAnimatedExamples();
});

/**
 * Initialize search functionality
 */function initSearch() {
  const searchInput = document.querySelector('.header-search input');
  if (!searchInput) return;
  
  searchInput.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
      const searchTerm = this.value.toLowerCase();
      
      if (searchTerm.length < 2) return;
      
      // Buscar en todos los títulos y contenido
      const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const paragraphs = document.querySelectorAll('p');
      
      let found = false;
      
      // Buscar en títulos
      headers.forEach(header => {
        if (header.textContent.toLowerCase().includes(searchTerm)) {
          header.scrollIntoView({ behavior: 'smooth', block: 'center' });
          header.classList.add('search-highlight');
          setTimeout(() => header.classList.remove('search-highlight'), 2000);
          found = true;
          return;
        }
      });
      
      // Si no se encontró en títulos, buscar en párrafos
      if (!found) {
        paragraphs.forEach(para => {
          if (para.textContent.toLowerCase().includes(searchTerm)) {
            para.scrollIntoView({ behavior: 'smooth', block: 'center' });
            para.classList.add('search-highlight');
            setTimeout(() => para.classList.remove('search-highlight'), 2000);
            found = true;
            return;
          }
        });
      }
      
      if (!found) {
        alert('No results found for: ' + searchTerm);
      }
      
      // Limpiar el campo de búsqueda
      this.value = '';
    }
  });
}

/**
 * Initialize code highlighting
 * This is a simplified version that adds basic styling
 * In a production environment, you might want to use a library like Prism.js or highlight.js
 */
function highlightCode() {
  const codeBlocks = document.querySelectorAll('pre code');

  codeBlocks.forEach(block => {
    // Simple syntax highlighting for C++
    // In a real implementation, use a proper syntax highlighter
    const text = block.innerHTML;

    // Highlight C++ keywords
    const keywords = ['auto', 'break', 'case', 'class', 'const', 'continue', 'default',
      'do', 'double', 'else', 'enum', 'extern', 'float', 'for', 'goto',
      'if', 'int', 'long', 'register', 'return', 'short', 'signed',
      'sizeof', 'static', 'struct', 'switch', 'typedef', 'union',
      'unsigned', 'void', 'volatile', 'while', 'bool', 'true', 'false'];

    let highlighted = text;

    // Highlight strings
    highlighted = highlighted.replace(/"(.*?)"/g, '<span style="color: #7ec699;">\"$1\"</span>');

    // Highlight comments
    highlighted = highlighted.replace(/\/\/(.*)/g, '<span style="color: #999;">\/\/$1</span>');

    // Highlight keywords
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      highlighted = highlighted.replace(regex, `<span style="color: #cc7832;">${keyword}</span>`);
    });

    // Highlight Raftel namespace and classes
    highlighted = highlighted.replace(/Raftel::\w+/g, match => {
      return `<span style="color: #a9b7c6;">${match}</span>`;
    });

    // Highlight function calls
    highlighted = highlighted.replace(/(\w+)\(/g, '<span style="color: #ffc66d;">$1</span>(');

    block.innerHTML = highlighted;
  });
}

/**
 * Initialize example viewers with interactive features
 */
function initExampleViewers() {
  const exampleViewers = document.querySelectorAll('.example-viewer');

  exampleViewers.forEach(viewer => {
    const fullScreenBtn = viewer.querySelector('button:nth-child(2)');
    const codeBtn = viewer.querySelector('button:first-child');
    const content = viewer.querySelector('.example-viewer-content');

    if (fullScreenBtn) {
      fullScreenBtn.addEventListener('click', function () {
        if (!document.fullscreenElement) {
          content.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable fullscreen: ${err.message}`);
          });
        } else {
          document.exitFullscreen();
        }
      });
    }

    if (codeBtn) {
      codeBtn.addEventListener('click', function () {
        // Toggle code visibility (simplified implementation)
        const codeSection = viewer.querySelector('.example-viewer-code');

        if (codeSection) {
          codeSection.style.display = codeSection.style.display === 'none' ? 'block' : 'none';
        } else {
          // Code section doesn't exist yet, create it
          const newCodeSection = document.createElement('div');
          newCodeSection.className = 'example-viewer-code';
          newCodeSection.innerHTML = '<pre><code>// Example code would be loaded here\n// In a real implementation, this would be fetched from a file</code></pre>';
          viewer.appendChild(newCodeSection);

          // Apply syntax highlighting to the new code
          highlightCode();
        }
      });
    }
  });
}

/**
 * Initialize sidebar navigation with active state tracking
 */
function initSidebar() {
  const sidebarItems = document.querySelectorAll('.sidebar-item');

  // Set active class based on current URL
  const currentPath = window.location.pathname;

  sidebarItems.forEach(item => {
    const itemPath = item.getAttribute('href');

    if (currentPath.endsWith(itemPath)) {
      item.classList.add('active');

      // Expand parent sections if needed
      const parentSection = item.closest('.sidebar-section');
      if (parentSection) {
        parentSection.classList.add('expanded');
      }
    }

    // Add click event for tracking (useful for SPA-like behavior)
    item.addEventListener('click', function () {
      // Remove active class from all items
      sidebarItems.forEach(i => i.classList.remove('active'));

      // Add active class to clicked item
      this.classList.add('active');
    });
  });

  // Handle collapsible categories
  const categories = document.querySelectorAll('.sidebar-category');

  categories.forEach(category => {
    category.addEventListener('click', function () {
      const section = this.closest('.sidebar-section');
      section.classList.toggle('collapsed');
    });
  });
}

/**
 * Initialize mobile navigation
 */
function initMobileNav() {
  const mobileMenuBtn = document.createElement('button');
  mobileMenuBtn.className = 'mobile-menu-btn';
  mobileMenuBtn.innerHTML = '☰';
  mobileMenuBtn.style.display = 'none';

  const header = document.querySelector('.header');
  if (header) {
    header.appendChild(mobileMenuBtn);

    mobileMenuBtn.addEventListener('click', function () {
      const sidebar = document.querySelector('.sidebar');
      sidebar.classList.toggle('mobile-visible');
    });

    // Check screen size and show/hide mobile button
    function checkMobile() {
      if (window.innerWidth <= 768) {
        mobileMenuBtn.style.display = 'block';
      } else {
        mobileMenuBtn.style.display = 'none';
        // Hide mobile sidebar if visible
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) sidebar.classList.remove('mobile-visible');
      }
    }

    // Initial check
    checkMobile();

    // Check on window resize
    window.addEventListener('resize', checkMobile);
  }
}

/**
 * Handle dark mode toggle
 */
function initDarkMode() {
  const darkModeToggle = document.createElement('button');
  darkModeToggle.className = 'dark-mode-toggle';
  darkModeToggle.innerHTML = '🌙';
  darkModeToggle.title = 'Toggle dark mode';

  const header = document.querySelector('.header');
  if (header) {
    const headerLinks = header.querySelector('.header-links');
    if (headerLinks) {
      headerLinks.insertBefore(darkModeToggle, headerLinks.firstChild);
    }

    // Check for saved preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      darkModeToggle.innerHTML = '☀️';
    }

    darkModeToggle.addEventListener('click', function () {
      document.body.classList.toggle('dark-theme');
      const isDark = document.body.classList.contains('dark-theme');
      localStorage.setItem('darkMode', isDark);
      darkModeToggle.innerHTML = isDark ? '☀️' : '🌙';
    });
  }
}

/**
 * Initialize table of contents for long articles
 */
function initTableOfContents() {
  const content = document.querySelector('.content');
  if (!content) return;

  const headers = content.querySelectorAll('h2, h3');
  if (headers.length < 3) return; // Only create TOC for longer articles

  const toc = document.createElement('div');
  toc.className = 'table-of-contents';
  toc.innerHTML = '<h3>Table of Contents</h3><ul></ul>';

  const tocList = toc.querySelector('ul');

  headers.forEach((header, index) => {
    // Add ID to the header if it doesn't have one
    if (!header.id) {
      header.id = `section-${index}`;
    }

    const listItem = document.createElement('li');
    listItem.className = header.tagName.toLowerCase();

    const link = document.createElement('a');
    link.href = `#${header.id}`;
    link.textContent = header.textContent;

    listItem.appendChild(link);
    tocList.appendChild(listItem);

    // Add scroll highlight
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetElement = document.getElementById(this.getAttribute('href').substring(1));

      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: 'smooth'
      });

      // Update URL without full page reload
      history.pushState(null, null, this.getAttribute('href'));
    });
  });

  // Insert TOC after the first paragraph
  const firstParagraph = content.querySelector('p');
  if (firstParagraph) {
    firstParagraph.parentNode.insertBefore(toc, firstParagraph.nextSibling);
  } else {
    content.insertBefore(toc, content.firstChild.nextSibling);
  }
}

/**
 * Initialize animated code samples
 */
function initAnimatedExamples() {
  const animatedExamples = document.querySelectorAll('.animated-example');

  animatedExamples.forEach(example => {
    const runButton = example.querySelector('.run-button');
    const resetButton = example.querySelector('.reset-button');
    const codeView = example.querySelector('.code-view');
    const resultView = example.querySelector('.result-view');

    if (runButton && resultView) {
      runButton.addEventListener('click', function () {
        // Simple animation effect
        resultView.classList.add('running');

        // In a real implementation, this would execute the code
        setTimeout(() => {
          resultView.classList.remove('running');
          resultView.classList.add('complete');
        }, 1000);
      });
    }

    if (resetButton && resultView) {
      resetButton.addEventListener('click', function () {
        resultView.classList.remove('running', 'complete');
      });
    }
  });
}