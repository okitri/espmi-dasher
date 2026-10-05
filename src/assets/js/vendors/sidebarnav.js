// sidebarnav

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('miniSidebar');
  const content = document.getElementById('content');
  const sidebarToggles = document.querySelectorAll('.sidebar-toggle');
  const isSidebarExpanded = localStorage.getItem('sidebarExpanded') === 'true';

  // Apply the toggle functionality to each button
  sidebarToggles.forEach((toggleButton) => {
    toggleButton.addEventListener('click', () => {
      if (localStorage.getItem('sidebarExpanded') === 'true') {
        document.documentElement.classList.add('collapsed');
        document.documentElement.classList.remove('expanded');
        localStorage.setItem('sidebarExpanded', 'false');
      } else {
        document.documentElement.classList.remove('collapsed');
        document.documentElement.classList.add('expanded');
        localStorage.setItem('sidebarExpanded', 'true');
      }
    });
  });

  // Handle nested submenus (level 3): neutralize Bootstrap's data-bs-toggle
  // to avoid double-toggle conflicts, then control visibility ourselves.
  const dropdownSubmenus = document.querySelectorAll('.dropdown-submenu');
  dropdownSubmenus.forEach((submenu) => {
    const toggle = submenu.querySelector(':scope > .dropdown-toggle');
    const submenuDropdown = submenu.querySelector(':scope > .dropdown-menu');

    if (!toggle || !submenuDropdown) {
      return;
    }

    // Remove Bootstrap's toggle so only this handler controls the submenu
    toggle.removeAttribute('data-bs-toggle');

    toggle.addEventListener(
      'click',
      (event) => {
        const href = toggle.getAttribute('href');

        // Allow navigation for valid links
        if (href && href !== '#!') {
          return; // Let the navigation proceed
        }

        // Control the nested submenu exclusively
        event.stopPropagation();
        event.preventDefault();

        const isOpen = submenuDropdown.classList.contains('show');
        submenuDropdown.classList.toggle('show', !isOpen);
        toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      },
      true // capture phase: run before any document-level (Bootstrap) handler
    );
  });
});

// sidebar dropdown menu

document.addEventListener('DOMContentLoaded', function () {
  // Get the current full URL and the path (excluding leading slash)
  var currentUrl = window.location.href;
  var currentPath = window.location.pathname;

  // Normalize the path to remove leading slash
  if (currentPath.startsWith('/')) {
    currentPath = currentPath.substring(1);
  }

  // Go through each sidebar link and dropdown item
  document.querySelectorAll('#miniSidebar .nav-item .nav-link, #miniSidebar .dropdown-item').forEach(function (link) {
    var linkHref = link.getAttribute('href');

    // Ignore links with '#' or empty hrefs
    if (!linkHref || linkHref === '#') {
      return;
    }

    // Normalize linkHref to match currentPath without leading slash
    if (linkHref.startsWith('/')) {
      linkHref = linkHref.substring(1);
    }

    // If the link's href matches the current path or full URL, add the 'active' class
    if (linkHref === currentPath || link.href === currentUrl) {
      link.classList.add('active');

      // If the active link is inside a dropdown-menu
      if (link.closest('.dropdown-menu')) {
        var parentDropdown = link.closest('.dropdown').querySelector('.dropdown-toggle');
        if (parentDropdown) {
          parentDropdown.classList.add('active');
          parentDropdown.setAttribute('aria-expanded', 'true');
          var dropdownMenu = parentDropdown.nextElementSibling;
          dropdownMenu.classList.add('show');
        }

        // If the active link is inside a nested dropdown-submenu
        if (link.closest('.dropdown-submenu')) {
          var parentSubmenu = link.closest('.dropdown-submenu').querySelector('.dropdown-toggle');
          if (parentSubmenu) {
            parentSubmenu.classList.add('active');
            parentSubmenu.setAttribute('aria-expanded', 'true');
            var submenu = parentSubmenu.nextElementSibling;
            submenu.classList.add('show');
          }
        }
      }
    }
  });
});

// content height

function setSidebarHeight() {
  const sidebar = document.getElementById('miniSidebar');
  const content = document.getElementById('content'); // Assuming you have an element with id="content"

  if (sidebar && content) {
    // Calculate the maximum height the sidebar should have
    const contentHeight = content.getBoundingClientRect().height;
    const viewportHeight = window.innerHeight;
    const offset = 45; // Adjust this value based on any offsets

    // Set the height of the sidebar to the smaller of the content height or the viewport height
    sidebar.style.height = `${Math.max(viewportHeight - offset, contentHeight)}px`;
  }
}

// Set the sidebar height on page load
window.addEventListener('load', setSidebarHeight);

// Adjust the sidebar height when the window is resized
window.addEventListener('resize', setSidebarHeight);

// Optional: Adjust the sidebar height when content changes dynamically
// (e.g., if using AJAX or other dynamic content loading)
const observer = new MutationObserver(setSidebarHeight);
observer.observe(document.getElementById('content'), { childList: true, subtree: true });
