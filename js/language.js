// Language toggle functionality
(function() {
  'use strict';
  
  // Get current language from localStorage or default to 'en'
  let currentLang = localStorage.getItem('language') || 'en';
  
  // Initialize language on page load
  function initLanguage() {
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.getAttribute('data-translate');
      if (translations[currentLang] && translations[currentLang][key]) {
        if (element.tagName === 'INPUT' && element.type === 'button') {
          element.value = translations[currentLang][key];
        } else {
          element.textContent = translations[currentLang][key];
        }
      }
    });
    
    // Update all elements with data-translate-html attribute (for HTML content)
    document.querySelectorAll('[data-translate-html]').forEach(element => {
      const key = element.getAttribute('data-translate-html');
      if (translations[currentLang] && translations[currentLang][key]) {
        element.innerHTML = translations[currentLang][key];
      }
    });
    
    // Update page title if it has data-translate-title
    const titleElement = document.querySelector('[data-translate-title]');
    if (titleElement) {
      const key = titleElement.getAttribute('data-translate-title');
      if (translations[currentLang] && translations[currentLang][key]) {
        document.title = translations[currentLang][key];
      }
    }
    
    // Update lang attribute on html element
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
  }
  
  // Toggle language function
  function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    localStorage.setItem('language', currentLang);
    initLanguage();
  }
  
  // Mobile menu toggle
  function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', function() {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
          mobileMenu.classList.remove('hidden');
          mobileMenuButton.querySelector('.material-symbols-outlined').textContent = 'close';
        } else {
          mobileMenu.classList.add('hidden');
          mobileMenuButton.querySelector('.material-symbols-outlined').textContent = 'menu';
        }
      });
      
      // Close menu when clicking on a link
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
          mobileMenu.classList.add('hidden');
          mobileMenuButton.querySelector('.material-symbols-outlined').textContent = 'menu';
        });
      });
    }
  }
  
  // Add event listeners to language toggle buttons
  document.addEventListener('DOMContentLoaded', function() {
    initLanguage();
    initMobileMenu();
    
    // Find all language toggle buttons
    document.querySelectorAll('.lang-toggle, [data-lang-toggle]').forEach(button => {
      button.addEventListener('click', toggleLanguage);
    });
  });
  
  // Make toggleLanguage available globally for buttons that might be added dynamically
  window.toggleLanguage = toggleLanguage;
  window.getCurrentLanguage = () => currentLang;
})();

