import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface SidebarProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'For Business', path: '/business', theme: 'business' },
    { name: 'For Analysts', path: '/analyst', theme: 'analyst' },
    { name: 'For Developers', path: '/developer', theme: 'developer' },
    { name: 'For Research', path: '/research', theme: 'research' },
  ];

  const bottomItems = [
    { name: 'Solutions', path: '#Solutions' },
    { name: 'About', path: '#about' },
    { name: 'Contact', path: '#contact' },
    { name: 'Blog', path: '#Blog' },
  ];

  const handleNavClick = (path: string, theme: string) => {
    onThemeChange(theme);
    if (window.innerWidth < 1024) setIsOpen(false);
    
    // If it's a hash link, handle smooth scrolling
    if (path.startsWith('#')) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // For regular routes, navigate and instantly scroll to top
      window.scrollTo(0, 0); // Instant scroll
      navigate(path);
    }
  };

  const isDeveloperTheme = currentTheme === 'developer';

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-300 ${
          isOpen ? 'bg-zinc-100 dark:bg-zinc-800' : ''
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
        ) : (
          <Menu className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
        )}
      </button>

      {/* Sidebar */}
      <div 
        className={`
          fixed top-0 bottom-0 left-0 
          w-[min(85vw,280px)] 
          flex flex-col 
          bg-white
      
          transform transition-all duration-300 ease-in-out
          
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          shadow-lg lg:shadow-none
        `}
      >
        {/* Logo section */}
        <div className={`sticky top-0 z-10 ${isDeveloperTheme ? 'bg-white' : 'bg-white dark:bg-zinc-900'} px-6 lg:px-8 py-6 lg:py-8 transition-colors duration-300`}>
          <img 
            src="/simrepo.png" 
            alt="SimRepo" 
            className="h-7 w-auto"
          />
        </div>

        {/* Navigation section */}
        <nav className="flex flex-col flex-1 px-6 lg:px-8 overflow-y-auto mt-16">
          {/* All navigation items */}
          <ul className="py-4">
            {/* Main navigation items */}
            {navigationItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleNavClick(item.path, item.theme)}
                  className={`block w-full text-left py-3 transition-colors duration-300 `}
                >
                  <span className="text-[15px]">{item.name}</span>
                </button>
              </li>
            ))}
            
            {/* Bottom items integrated with the same styling and behavior */}
            {bottomItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleNavClick(item.path, currentTheme)}
                  className={`block w-full text-left py-3 transition-colors duration-200 `}
                >
                  <span className="text-[15px]">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar; 