import React, { useState, useEffect } from 'react';
import { FileSpreadsheet, FileText, Database, Globe, Check, Play, ArrowRight, Loader2, X, Plus, Settings, Wand2, Calendar, LineChart, Network, GitBranch, Activity, ArrowUpRight, Sliders, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import StepsSection from './StepsSection';
import FeatureCards from './FeatureCards';
import { Gradient } from './Gradient.js';
import SimulationInterface from './SimulationInterface';
import IndustrySearch from './IndustrySearch';

const USE_CASES = [
  {
    industry: "Finance",
    query: "Simulate market volatility impact on our derivatives portfolio over next 6 months"
  },
  {
    industry: "Healthcare",
    query: "Project patient readmission rates based on historical treatment outcomes"
  },
  {
    industry: "Supply Chain",
    query: "Optimize inventory levels across 12 distribution centers considering demand patterns"
  },
  {
    industry: "Retail",
    query: "Forecast seasonal demand variations for new product line launch"
  }
];

const DATA_SOURCES = [
  { name: "Q4_Financial_Report.xlsx", type: "spreadsheet", loaded: false },
  { name: "Market_Analysis_2024.pdf", type: "pdf", loaded: false },
  { name: "Customer_Database", type: "database", loaded: false },
  { name: "Sales_Metrics_2023.xlsx", type: "spreadsheet", loaded: false },
  { name: "Industry_Report.pdf", type: "pdf", loaded: false },
  { name: "Competitor_Analysis.pdf", type: "pdf", loaded: false },
  { name: "Historical_Data.xlsx", type: "spreadsheet", loaded: false },
  { name: "API_Endpoints.json", type: "database", loaded: false },
  { name: "Market_Trends.xlsx", type: "spreadsheet", loaded: false },
  { name: "Risk_Analysis.pdf", type: "pdf", loaded: false }
];

const SimulationHeroSection = () => {
  const [currentUseCase, setCurrentUseCase] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loadedSources, setLoadedSources] = useState<number[]>([]);
  const [processingSource, setProcessingSource] = useState<number | null>(null);
  const [marketIntelEnabled, setMarketIntelEnabled] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);
  const [relevanceThreshold, setRelevanceThreshold] = useState(80);
  const [confidenceThreshold, setConfidenceThreshold] = useState(80);

  // Typing animation effect
  useEffect(() => {
    const currentQuery = USE_CASES[currentUseCase].query;
    
    if (isDeleting) {
      if (currentText === "") {
        setIsDeleting(false);
        setCurrentUseCase((prev) => (prev + 1) % USE_CASES.length);
      } else {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, 20);
        return () => clearTimeout(timeout);
      }
    } else {
      if (currentText === currentQuery) {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentText(currentQuery.slice(0, currentText.length + 1));
        }, 25);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentText, isDeleting, currentUseCase]);

  // Sequential data sources loading simulation
  useEffect(() => {
    if (currentSourceIndex >= DATA_SOURCES.length) return;

    setProcessingSource(currentSourceIndex);
    
    const timeout = setTimeout(() => {
      setLoadedSources(prev => [...prev, currentSourceIndex]);
      setProcessingSource(null);
      setCurrentSourceIndex(prev => prev + 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [currentSourceIndex]);

  const toggleMarketIntelligence = () => {
    if (!marketIntelEnabled && !isProcessing) {
      setIsProcessing(true);
      setTimeout(() => {
        setMarketIntelEnabled(true);
        setIsProcessing(false);
      }, 2000);
    } else if (marketIntelEnabled) {
      setMarketIntelEnabled(false);
    }
  };

  // Add useEffect for gradient initialization
  useEffect(() => {
    // Initialize gradient after component mounts and canvas is in the DOM
    const gradient = new Gradient();
    gradient.initGradient('#gradient-canvas');
    
    // Clean up on unmount
    return () => {
      if (gradient.disconnect) {
        gradient.disconnect();
      }
    };
  }, []);
  
  useEffect(() => {
    // Initialize gradient after component mounts and canvas is in the DOM
    const gradient = new Gradient();
    gradient.initGradient('#gradient-canvas-2');
    
    // Clean up on unmount
    return () => {
      if (gradient.disconnect) {
        gradient.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    // Initialize gradient after component mounts and canvas is in the DOM
    const gradient = new Gradient();
    gradient.initGradient('#gradient-canvas-3');
    
    // Clean up on unmount
    return () => {
      if (gradient.disconnect) {
        gradient.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    // Initialize gradient after component mounts and canvas is in the DOM
    const gradient = new Gradient();
    gradient.initGradient('#gradient-canvas-4');
    
    // Clean up on unmount
    return () => {
      if (gradient.disconnect) {
        gradient.disconnect();
      }
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="py-10"
    >
      <div className="max-w-7xl mx-auto my-8">
        {/* Main simulation input with gradient background */}
        <div className="relative mb-0">
          {/* Gradient canvas background */}
          <motion.div 
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute inset-0 z-10 w-[100%] h-[100%] mx-auto overflow-hidden rounded-2xl"
          >
            <canvas id="gradient-canvas" data-transition-in className="absolute inset-0 w-[150%] h-full" />
          </motion.div>
          
          {/* Content */}
          <div className="relative z-20 max-w-5xl mx-auto p-8 py-28 mt-8">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentUseCase}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center space-x-2"
                      >
                        <span className="text-sm font-medium text-gray-900">
                          {(() => {
                            const query = USE_CASES[currentUseCase].query;
                            const filename = query
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
                          {USE_CASES[currentUseCase].industry}
                        </motion.span>
                      </motion.div>
                    </AnimatePresence>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="text-xs text-gray-500 mt-0.5"
                    >
                      Created today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </motion.span>
                  </div>
                </div>
                
                {/* Badges */}
                <div className="flex items-center space-x-2">
                  <button
                    className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100 transition-all duration-300"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Automate</span>
                  </button>
                  
                  <button
                    onClick={toggleMarketIntelligence}
                    className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs transition-all duration-300 ${
                      marketIntelEnabled
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : isProcessing
                        ? 'bg-gray-100 text-gray-600 border border-gray-200'
                        : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {isProcessing ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Globe className="w-3.5 h-3.5" />
                    )}
                    <span>Market Intelligence</span>
                    {marketIntelEnabled && <Check className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              
              <div className="p-6 pb-8 py-6">
                <div className="flex items-center space-x-3 text-gray-700 min-h-[100px]">
                  <span className="text-blue-600">&gt;</span>
                  <div className="flex-1">
                    <span>{currentText}</span>
                    <span className="animate-pulse">|</span>
                  </div>
                </div>
              </div>

              {/* Bottom section with scrollable badges and fixed buttons */}
              <div className="border-t border-gray-200 bg-gray-50 p-4">
                <div className="flex flex-col space-y-4">
                  {/* Data sources header and scrollable section */}
                  <div>
                    <h3 className="text-[13px] font-medium text-gray-600 mb-1">Data Sources</h3>
                    <div className="flex items-center justify-between">
                      <div className="w-[80%] relative">
                        <div className="overflow-x-auto no-scrollbar" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                          <div className="flex items-center space-x-2 pr-16">
                            {DATA_SOURCES.map((source, index) => (
                              <div
                                key={source.name}
                                className={`inline-flex items-center space-x-1.5 px-2 py-1 rounded-full text-xs whitespace-nowrap transition-all duration-300 group ${
                                  loadedSources.includes(index)
                                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                    : processingSource === index
                                    ? 'bg-gray-100 text-gray-600 border border-gray-300'
                                    : 'bg-gray-50 text-gray-400 border border-gray-200'
                                }`}
                              >
                                {source.type === 'spreadsheet' && <FileSpreadsheet className="w-3.5 h-3.5 flex-shrink-0" />}
                                {source.type === 'pdf' && <FileText className="w-3.5 h-3.5 flex-shrink-0" />}
                                {source.type === 'database' && <Database className="w-3.5 h-3.5 flex-shrink-0" />}
                                <span className="truncate max-w-[120px]">{source.name}</span>
                                {processingSource === index ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : loadedSources.includes(index) ? (
                                  <button className="w-3.5 h-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                ) : null}
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

                  {/* Action buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button className="inline-flex items-center space-x-2 bg-gray-200 text-gray-700 px-4 py-1.5 rounded-lg text-sm hover:bg-gray-300 transition-colors">
                        <Settings className="w-4 h-4" />
                        <span>Edit Parameters</span>
                      </button>
                      <div className="relative group">
                        <button className="inline-flex items-center space-x-2 bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-300 transition-colors">
                          <Wand2 className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Automate parameters
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-xs text-gray-500">
                        {loadedSources.length} of {DATA_SOURCES.length} sources
                      </div>
                      <button className="inline-flex items-center space-x-2 bg-gray-200 text-gray-700 px-4 py-1.5 rounded-lg text-sm hover:bg-gray-300 transition-colors">
                        <Play className="w-4 h-4" />
                        <span>Quick run</span>
                      </button>
                      <button className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                        <ArrowRight className="w-4 h-4" />
                        <span>Run Sim</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Industry Search */}
        <IndustrySearch />
        {/* Blue Cards Section */}
        <div className="max-w-7xl mx-auto px-0 mt-4 pb-16">
          <div className="flex gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex-1 relative rounded-2xl shadow-lg p-8 min-h-[400px]"
            >
              <motion.div
                className="absolute inset-0 z-10 w-[100%] h-[100%] mx-auto overflow-hidden rounded-2xl"
              >
                <canvas id="gradient-canvas-3" data-transition-in className="absolute inset-0 w-[150%] h-full transform rotate-180" />
              </motion.div>
              <div className="relative z-20">
                <div className="relative z-20 mx-auto px-9 py-9">
                  <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                    {/* Header Section */}
                    <div className="px-6 py-4 border-b border-gray-100">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <div className="relative">
                            <div className="w-full h-10 pl-4 pr-10 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 flex items-center">
                              How would a 15% increas...
                            </div>
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                              <Sliders className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm bg-blue-50 text-blue-700 border border-blue-100">
                            <ChevronDown className="w-4 h-4" />
                            <span className="font-medium">Market Intelligence</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 bg-white">
                      <div className="space-y-6">
                        {/* Thresholds Section */}
                        <div className="grid grid-cols-2 gap-6">
                          {/* Relevance Threshold */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="text-xs font-medium text-gray-600">
                                Relevance Threshold
                              </label>
                            </div>
                            <div className="flex items-center gap-3">
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={relevanceThreshold}
                                onChange={(e) => setRelevanceThreshold(parseInt(e.target.value))}
                                className="w-16 h-8 px-2 text-center rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={relevanceThreshold}
                                onChange={(e) => setRelevanceThreshold(parseInt(e.target.value))}
                                className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                              />
                           
                            </div>
                          </div>

                          {/* Confidence Threshold */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="text-xs font-medium text-gray-600">
                                Confidence Threshold
                              </label>
                            </div>
                            <div className="flex items-center gap-3">
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={confidenceThreshold}
                                onChange={(e) => setConfidenceThreshold(parseInt(e.target.value))}
                                className="w-16 h-8 px-2 text-center rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={confidenceThreshold}
                                onChange={(e) => setConfidenceThreshold(parseInt(e.target.value))}
                                className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                              />
                            
                            </div>
                          </div>
                        </div>

                        {/* Options Section */}
                        <div className="grid grid-cols-2 gap-4">
                          <button className="flex items-center justify-between px-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                                <Globe className="w-4 h-4 text-gray-600" />
                              </div>
                              <div className="flex flex-col items-start">
                                <span className="text-xs text-gray-500">Location</span>
                                <span className="text-sm text-gray-900">Global</span>
                              </div>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          </button>

                          <button className="flex items-center justify-between px-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                                <Calendar className="w-4 h-4 text-gray-600" />
                              </div>
                              <div className="flex flex-col items-start">
                                <span className="text-xs text-gray-500">Time Frame</span>
                                <span className="text-sm text-gray-900">Last 12 months</span>
                              </div>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>

                        {/* Keywords Section */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-xs font-medium text-gray-600">
                              Relevant Keywords
                            </label>
                            <span className="text-xs text-gray-400">Separate with commas</span>
                          </div>
                          <div className="relative flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="interest rates, federal reserve, monetary policy..."
                              className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                            <div className="relative group">
                              <button className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors border border-gray-200">
                                <Wand2 className="w-4 h-4" />
                              </button>
                              <div className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Automate parameters
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex-1 relative rounded-2xl shadow-lg p-8 min-h-[400px]"
            >
              <motion.div
                className="absolute inset-0 z-10 w-[100%] h-[100%] mx-auto overflow-hidden rounded-2xl"
              >
                <canvas id="gradient-canvas-4" data-transition-in className="absolute inset-0 w-[150%] h-full" />
              </motion.div>
              <div className="relative z-20">
                {/* Content for second card will go here */}
              </div>
            </motion.div>
          </div>

          {/* Titles and Descriptions for Cards */}
          <div className="flex gap-4 mt-8">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="flex-1 text-center"
            >
              <h2 className="text-lg font-medium text-slate-950 mb-4">
                Real-Time Market Intelligence
              </h2>
              <p className="text-md text-slate-700 leading-relaxed max-w-md mx-auto">
                Transform complex datasets into actionable insights with our advanced processing engine. Seamlessly integrate multiple data sources for comprehensive analysis and decision-making.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="flex-1 text-center"
            >
              <h2 className="text-lg font-medium text-slate-950 mb-4">
                Real-Time Simulation Engine
              </h2>
              <p className="text-md text-slate-700 leading-relaxed max-w-md mx-auto">
                Experience the power of real-time scenario modeling with our advanced simulation engine. Generate accurate predictions and insights with confidence scoring for informed decision-making.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Description paragraph */}
        <div className="max-w-7xl mx-auto text-center mt-16 mx-auto">
          

          {/* 4-column card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-0 mb-8 px-0">
            {[
              {
                title: "Monte Carlo Models",
                description: "Turn unstructured data into precise figures to compute reliable outcomes with advanced probabilistic modeling.",
                icon: <LineChart className="w-5 h-5 text-blue-500 flex-shrink-0" />,
                link: "monte-carlo"
              },
              {
                title: "Agent Based Simulations",
                description: "Model agent interactions and predict outcomes by structuring unstructured data into dynamic scenarios.",
                icon: <Network className="w-5 h-5 text-blue-500 flex-shrink-0" />,
                link: "agent-based"
              },
              {
                title: "System Dynamics",
                description: "Turn inputs into system-wide models to forecast long-term impacts and trends.",
                icon: <Activity className="w-5 h-5 text-blue-500 flex-shrink-0" />,
                link: "system-dynamics"
              },
              {
                title: ["Discrete Event", "Simulations"],
                description: "Map sequential events from unstructured data to optimize workflows and reduce inefficiencies.",
                icon: <GitBranch className="w-5 h-5 text-blue-500 flex-shrink-0" />,
                link: "discrete-event"
              }
            ].map((card, index) => (
              <div 
                key={index}
                className="group relative rounded-lg p-6 border border-gray-200 border-[1px] hover:border-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 h-[350px] w-full overflow-hidden bg-white"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80 group-hover:from-transparent group-hover:via-transparent group-hover:to-transparent transition-all duration-300" />
                <div className="relative h-full flex flex-col transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="flex gap-4">
                    <div className="mt-1">{card.icon}</div>
                    <h3 className="text-lg  font-medium text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
                      {Array.isArray(card.title) ? (
                        <div className="text-left">
                          {card.title.map((line, i) => (
                            <div key={i} className="leading-tight ">{line}</div>
                          ))}
                        </div>
                      ) : (
                        card.title
                      )}
                    </h3>
                  </div>
                  <p className="text-[15px] text-gray-600 text-left mt-6 leading-relaxed">
                    {card.description}
                  </p>
                  <div className="pt-0 mb-2 text-left mt-auto">
                    <a 
                      href={`/simulations/${card.link}`}
                      className="inline-flex items-left text-blue-500 hover:text-blue-600 text-sm font-regular text-left transition-colors group/link"
                    >
                      Learn more
                      <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          
        </div>
        

        {/* Replace the second simulation interface with the new component */}
        <SimulationInterface 
       
          dataSources={DATA_SOURCES}
        />

<h1  className="mt-8 text-center font-medium text-2xl text-slate-950 leading-relaxed max-w-3xl mx-auto"> 
Precision matters

          </h1>

          <p className="mt-6 mb-20 text-center  text-md text-slate-700 leading-relaxed max-w-3xl mx-auto">
            Our platform transforms unstructured PDFs, datasheets, and databases into reliable, precise simulations. Combining proven simulation methodologies with fine-tuned models and real-time industry data, we deliver actionable insights, confidence scores, and tailored strategies—turning chaos into clarity with intelligent, trusted decision-making tools.
          </p>

        <div className="max-w-7xl mx-auto py-2">
          <FeatureCards />
        </div>
      </div>

      {/* Steps Section */}
      <div className="max-w-7xl mx-auto">
        <StepsSection />
      </div>
    </motion.div>
  );
};

export default SimulationHeroSection;

// Add this to your global CSS file
/*
.no-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
*/ 