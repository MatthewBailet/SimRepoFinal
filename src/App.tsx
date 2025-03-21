import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import BusinessContent from './components/BusinessContent';
import AnalystContent from './components/AnalystContent';
import DeveloperContent from './components/DeveloperContent';
import ResearchContent from './components/ResearchContent';
import topBg from './assets/top-bg.png';

type Theme = 'business' | 'analyst' | 'developer' | 'research';

const themeMapping: Record<Theme, string> = {
  business: 'light',
  analyst: 'light',
  developer: 'light',
  research: 'light',
};

const themeFilters: Record<Theme, string> = {
  business: 'none',
  analyst: 'hue-rotate(-90deg) saturate(1.5)',
  developer: 'hue-rotate(-170deg) saturate(1.3) invert(0)',
  research: 'hue-rotate(-230deg) saturate(1.4)',
};

const titles: Record<Theme, string> = {
  business: 'Simulate Scenarios, Unlock Insights, Drive Success.',
  analyst: 'Strategies You Know, Our AI-Powered Enhancements.',
  developer: 'Flexible API integration, custom simulation models, and scalable infrastructure—built for developers.',
  research: 'Advanced research tools, collaborative simulations, and comprehensive analysis—empowering academia.',
};

// Content components for each section
const contentComponents: Record<Theme, React.ComponentType> = {
  business: BusinessContent,
  analyst: AnalystContent,
  developer: DeveloperContent,
  research: ResearchContent,
};

const App = () => {
  const [theme, setTheme] = useState<Theme>('business');

  useEffect(() => {
    // Update both the data-theme attribute and the class for dark mode
    document.documentElement.setAttribute('data-theme', themeMapping[theme]);
    if (theme === 'developer') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as Theme);
  };

  return (
    <Router>
      <div className="min-h-screen bg-base-100 relative transition-colors duration-600">
        {/* Top background image */}
        <div 
          className="w-full absolute inset-0 -z-0 bg-[35%_top] bg-no-repeat sm:bg-[38%_top] md:bg-[40%_top] lg:bg-[44%_top] xl:bg-[48%_top] opacity-54 transition-all duration-300"
          style={{ 
            backgroundImage: `url(${topBg})`,
            filter: themeFilters[theme]
          }}
          aria-hidden="true"
        />

        {/* Vertical grid lines overlay */}


        {/* Main layout with sidebar */}
        <div className="flex relative z-[3]">
          <Sidebar currentTheme={theme} onThemeChange={handleThemeChange} />
          <main className="flex-1 ml-[170px]">
            {/* Hero section */}
            <div className="mt-16">
              {/* Dark rounded section */}
              <div className="relative mx-auto ">
                <div className={`relative rounded-4xl ${theme === 'developer' ? 'bg-white/33' : 'bg-white/33'} backdrop-blur-sm min-h-[2500px] z-2 transition-colors duration-300`}>
                  <div className="pointer-events-none absolute inset-0 z-4 px-4 sm:px-6" aria-hidden="true">
                    <div className="mx-auto flex h-full max-w-[calc(var(--width-7xl)+2px)] gap-[14px]">
           
                    </div>
                  </div>

                  

                  <div className="mx-auto max-w-7xl text-left  mt-8">
                    <div className="text-left max-w-7xl relative pt-8 ">
                      <h2 
                        key={theme} 
                        className="text-5xl font-medium mt-8 mx-auto mb-2 letter-spacing-tighter tracking-tight line-height: 1.04; text-base-content animate-fade-in"
                      >
                        {titles[theme]}
                      </h2>
                      
                      {/* Description section */}
                      <div className="mt-8 flex text-left flex-col md:flex-row md:items-center md:justify-between gap-8 animate-fade-in">
                        <div className="md:w-3/5 lg:w-2/3">
                          <p className="animate-fade-in text-md md:text-md text-base-content/80 leading-relaxed">
                            As the first platform to turn unstructured data into precise predictive models, SimRepo helps businesses analyze, predict, and strategize—turning chaos into clarity with actionable insights.
                          </p>
                        </div>
                        <div className="md:w-2/5 lg:w-1/3 flex justify-start md:justify-end">
                          <div className="flex gap-4">
                            <a href="#start-building" className="animate-fade-in btn bg-blue-600 text-white px-3 py-2 rounded-md h-12 w-40 font-medium">
                              Join Waitlist
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                              </svg>
                            </a>
                            <a href="#contact-sales" className="animate-fade-in btn btn-outline flex items-center px-3 py-2 rounded-md h-12 w-40 gap-2 font-medium">
                              Book a Demo
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic content section */}
                  {React.createElement(contentComponents[theme])}
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Bottom background image */}
        <div className="relative mt-24">
          <div 
            className="absolute inset-0 -z-10 h-full w-full bg-contain bg-bottom bg-no-repeat opacity-50"
            style={{ 
              backgroundImage: 'url(/bottom-bg.png)',
              filter: themeFilters[theme]
            }}
            aria-hidden="true"
          />
         
        </div>
      </div>
    </Router>
  );
};

export default App;
