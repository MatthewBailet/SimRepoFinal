import React, { useState } from 'react';
import { FileSpreadsheet, FileText, Database, Play, ArrowRight, X, Plus, Sliders, ChevronDown, Folders, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SimulationFlow from './SimulationFlow';

interface SimulationInterfaceProps {
  dataSources: Array<{
    name: string;
    type: string;
    loaded: boolean;
  }>;
}

// Sample simulation tabs data
const SIMULATION_TABS = [
  { id: 1, name: "market_volatility.sim", active: true, industry: "finance" },
  { id: 2, name: "supply_chain_opt.sim", active: false, industry: "logistics" },
  { id: 3, name: "patient_readmission.sim", active: false, industry: "healthcare" },
  { id: 4, name: "seasonal_demand.sim", active: false, industry: "retail" },
];

const SimulationInterface: React.FC<SimulationInterfaceProps> = ({
  dataSources
}) => {
  const [isDirectoryView, setIsDirectoryView] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative mb-0 ">
      {/* Gradient canvas background */}
      <motion.div 
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute inset-0 z-10 w-[100%] h-[100%] mx-auto overflow-hidden rounded-2xl"
      >
        <canvas id="gradient-canvas-2" data-transition-in className="absolute inset-0 w-[150%] h-full transform rotate-180" />
      </motion.div>
      
      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto p-8 py-16 mt-4">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* VS Code-like tabs */}
          <div className="flex bg-gray-100 border-b border-gray-200 overflow-x-auto no-scrollbar">
            {SIMULATION_TABS.map((tab) => (
              <div 
                key={tab.id}
                className={`flex items-center px-3 py-2 min-w-[160px] max-w-[250px] border-r border-gray-200 cursor-pointer group ${
                  tab.active ? 'bg-white' : 'bg-gray-100 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2 overflow-hidden">
                  <FileText className={`w-3.5 h-3.5 flex-shrink-0 ${tab.active ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span className={`text-xs font-medium truncate ${tab.active ? 'text-gray-900' : 'text-gray-600'}`}>
                    {tab.name}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${tab.active ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-600'}`}>
                    {tab.industry}
                  </span>
                </div>
                <button className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="w-3.5 h-3.5 text-gray-500 hover:text-gray-700" />
                </button>
              </div>
            ))}
            <div className="flex items-center px-3 py-2 border-r border-gray-200 cursor-pointer hover:bg-gray-50">
              <Plus className="w-3.5 h-3.5 text-gray-500" />
            </div>
            <div className="ml-auto flex items-center px-3 py-2 border-l border-gray-200">
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </div>
          </div>

          {/* Main content area with overlay */}
          <div className="relative">
            {/* Middle content - always full height */}
            <motion.div 
              className="w-full h-[600px] bg-white"
              animate={{ 
                paddingTop: isCollapsed ? "80px" : "200px"
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <AnimatePresence mode="wait">
                {isDirectoryView ? (
                  <motion.div
                    key="directory"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <SimulationFlow />
                  </motion.div>
                ) : (
                  <motion.div
                    key="editor"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex items-center justify-center text-gray-400"
                  >
                    <div className="text-center">
                      <p className="text-sm">Start your simulation here</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Top overlay section */}
            <motion.div 
              className="absolute top-0 left-0 right-0 bg-gray-50 border-b border-gray-200 z-10"
              animate={{ 
                height: isCollapsed ? "80px" : "200px"
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <div className="flex justify-between px-4 pt-4 pb-2">
                {/* Left section - Filename and timestamp */}
                <div className="flex-shrink-0 max-w-[180px]">
                  <div className="flex items-center space-x-2">
                    {/* Back button */}
                    <button className="p-1 rounded-md hover:bg-gray-200 text-gray-500 transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    
                    <div className="flex flex-col">
                      <AnimatePresence mode="wait">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="flex space-x-2"
                        >
                          <span className="text-sm font-medium text-gray-900">
                            {(() => {
                              const filename = "Simulation"
                                .toLowerCase()
                                .split(' ')
                                .slice(0, 3)
                                .join('_')
                                .replace(/[^a-z0-9_]/g, '') + '.sim';
                              return filename;
                            })()}
                          </span>
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-600"
                          >
                            finance
                          </motion.span>
                        </motion.div>
                      </AnimatePresence>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="text-xs text-gray-500 mt-0.5"
                      >
                        Modified today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </motion.span>
                    </div>
                  </div>
                </div>

                {/* Middle section - White container */}
                <div className="flex-1 flex flex-col justify-center mx-auto">
                  <div className="mx-auto bg-gray-50 w-[500px] h-[40px] rounded-lg border border-gray-300 shadow-sm flex items-center px-4 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                    <div className="w-full h-full flex items-center text-sm text-slate-500">
                      How would a 15% increase in interest rates affect...
                    </div>
                    <div className="flex items-center space-x-2 ml-2">
                      <button className="p-1 rounded-md hover:bg-gray-100 text-gray-500">
                        <Sliders className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <motion.div 
                    className="mx-auto bg-white w-[500px] rounded-lg border border-gray-300 shadow-sm px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all relative overflow-hidden"
                    animate={{ 
                      height: isCollapsed ? 0 : 120,
                      opacity: isCollapsed ? 0 : 1,
                      marginTop: isCollapsed ? 0 : 4
                    }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <div className="h-full flex flex-col">
                      <textarea 
                        className="flex-1 mt-1 resize-none text-sm text-slate-800 bg-transparent border-none focus:outline-none focus:ring-0"
                        placeholder="Expand, Ask or Edit anything..."
                      ></textarea>
                      
                      {/* Control bar at bottom of textarea */}
                      <div className="flex justify-between items-center mt-2">
                        {/* Mode switcher button (left side) */}
                        <div className="relative">
                          <button className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium border border-gray-200 transition-colors">
                            <span>Ask</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500">
                              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                        
                        {/* Right side buttons */}
                        <div className="flex items-center space-x-2">
                          {/* Parameters button */}
                          <button className="p-1 rounded-md hover:bg-gray-100 text-gray-500 transition-colors">
                            <Sliders className="w-4 h-4" />
                          </button>
                          {/* Paperclip button */}
                          <button className="p-1 rounded-md hover:bg-gray-100 text-gray-500 transition-colors">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500">
                              <path d="M21.44 11.05L12.25 20.24C11.1242 21.3658 9.59723 21.9983 8.005 21.9983C6.41277 21.9983 4.88584 21.3658 3.76 20.24C2.63416 19.1142 2.00166 17.5872 2.00166 15.995C2.00166 14.4028 2.63416 12.8758 3.76 11.75L12.33 3.18C13.0806 2.42975 14.0991 2.00132 15.16 2.00132C16.2209 2.00132 17.2394 2.42975 17.99 3.18C18.7403 3.93063 19.1687 4.94905 19.1687 6.01C19.1687 7.07095 18.7403 8.08938 17.99 8.84L9.41 17.41C9.03472 17.7853 8.52573 17.9961 7.995 17.9961C7.46427 17.9961 6.95528 17.7853 6.58 17.41C6.20472 17.0347 5.99389 16.5257 5.99389 15.995C5.99389 15.4643 6.20472 14.9553 6.58 14.58L15.07 6.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          
                          {/* Send button */}
                          <button className="flex items-center space-x-1 px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 text-white text-xs font-medium transition-colors">
                            <span>Send</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Right section - Badges */}
                <div className="flex-shrink-0 flex items-center max-w-[180px] min-w-[180px] space-x-2">
                  <button className="inline-flex items-center space-x-2 bg-gray-200 text-gray-700 px-4 py-1.5 rounded-lg text-sm hover:bg-gray-300 transition-colors">test</button>
                </div>
              </div>

              {/* Toggle collapse button */}
              <div className="absolute left-4 -bottom-10">
                <button 
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="p-2 shadow-md rounded-md hover:bg-gray-100 bg-white text-gray-500 transition-colors"
                >
                  <motion.div
                    animate={{ rotate: isCollapsed ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                  </motion.div>
                </button>
              </div>

              {/* Directory view toggle button */}
              <div className="absolute right-4 -bottom-10">
                <button 
                  onClick={() => setIsDirectoryView(!isDirectoryView)}
                  className="p-2 shadow-md rounded-md hover:bg-gray-100 bg-white text-gray-500 transition-colors group"
                >
                  <Folders className="w-4 h-4" />
                  <div className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {isDirectoryView ? 'Switch to Editor View' : 'Switch to Map View'}
                  </div>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Bottom section with scrollable badges and fixed buttons */}
          <div className="border-t border-gray-100 bg-gray-50 p-4">
            <div className="flex flex-col space-y-4">
              {/* Data sources header and scrollable section */}
              <div>
                <h3 className="text-[13px] font-medium text-gray-600 mb-1">Data Sources</h3>
                <div className="flex items-center justify-between">
                  <div className="w-[80%] relative">
                    <div className="overflow-x-auto no-scrollbar" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                      <div className="flex items-center space-x-2 pr-16">
                        {dataSources.map((source) => (
                          <div
                            key={source.name}
                            className="inline-flex items-center space-x-1.5 px-2 py-1 rounded-full text-xs whitespace-nowrap transition-all duration-300 group bg-blue-50 text-blue-700 border border-blue-200"
                          >
                            {source.type === 'spreadsheet' && <FileSpreadsheet className="w-3.5 h-3.5 flex-shrink-0" />}
                            {source.type === 'pdf' && <FileText className="w-3.5 h-3.5 flex-shrink-0" />}
                            {source.type === 'database' && <Database className="w-3.5 h-3.5 flex-shrink-0" />}
                            <span className="truncate max-w-[120px]">{source.name}</span>
                            <button className="w-3.5 h-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Enhanced fade effect */}
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent pointer-events-none"></div>
                  </div>
                  <button className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200 transition-colors whitespace-nowrap">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add data source</span>
                  </button>
                </div>
              </div>

              {/* Action buttons and progress bar row */}
              <div className="flex items-center justify-between">
                {/* Simulation Progress Bar - left side */}
                <div className="flex-1 max-w-[60%]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600 font-medium">Simulation Progress</span>
                    <span className="text-sm text-gray-500">--</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-gray-500">All sources loaded</span>
                  </div>
                </div>

                {/* Right side action buttons */}
                <div className="flex items-center space-x-3">
                  <div className="text-xs text-gray-500">
                    {dataSources.length} of {dataSources.length} sources
                  </div>
                  <button className="inline-flex items-center space-x-2 bg-gray-200 text-gray-700 px-4 py-1.5 rounded-lg text-sm hover:bg-gray-300 transition-colors">
                    <Play className="w-4 h-4" />
                    <span>Re-run</span>
                  </button>
                  <button className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationInterface; 