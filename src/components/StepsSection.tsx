import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Database, Search, Sliders, LineChart, Target, RefreshCw } from 'lucide-react';
import DataIntegrationAnimation from './animations/DataIntegrationAnimation';
import ForecastQueryAnimation from './animations/ForecastQueryAnimation';

const StepsSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sectionStart = document.getElementById('steps-section')?.offsetTop || 0;
      const viewportHeight = window.innerHeight;
      const stepHeight = viewportHeight * 0.9;
      const scrollOffset = viewportHeight * 0.2;
      
      const adjustedScroll = scrollPosition - sectionStart + scrollOffset;
      const rawStep = (adjustedScroll / stepHeight);
      const currentStep = Math.min(Math.max(0, Math.floor(rawStep)), 6);
      const progressInStep = rawStep - Math.floor(rawStep);
      
      setActiveStep(currentStep);
      setProgress(progressInStep);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="steps-section" className="mt-0 min-h-screen pb-10 mb-0 relative">
      <div className="absolute inset-0 z-0" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-12 gap-12">
          {/* Steps */}
          <div className="col-span-3 sticky top-[20%] self-start">
            <ul className="steps-vertical h-[700px] flex flex-col justify-between">
              <li className="relative flex items-center group">
                <div className="absolute left-[18px] top-[28px] w-[2px] h-[80px] bg-gray-200 transition-all duration-500"
                     style={{
                       background: `linear-gradient(
                         to bottom,
                         ${0 < activeStep ? 'rgb(59 130 246)' : 0 === activeStep ? `rgb(59 130 246) ${progress * 100}%, rgb(229 231 235) ${progress * 100}%` : 'rgb(229 231 235)'},
                         ${0 < activeStep ? 'rgb(59 130 246)' : 'rgb(229 231 235)'}
                       )`
                     }}
                />
                <div className="flex items-center space-x-4 relative z-10">
                  <motion.div 
                    initial={false}
                    animate={{
                      backgroundColor: 0 <= activeStep ? 'rgb(219 234 254)' : 'rgb(243 244 246)',
                      scale: 0 === activeStep ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      backgroundColor: { duration: 0.3 },
                      scale: { duration: 0.2, times: [0, 0.5, 1] }
                    }}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-opacity-50 transition-all duration-300 group-hover:bg-blue-100"
                  >
                    <FileText className={`w-4 h-4 transition-colors duration-300 ${
                      0 <= activeStep ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                  </motion.div>
                  <motion.span
                    initial={false}
                    animate={{
                      color: 0 <= activeStep ? 'rgb(37 99 235)' : 'rgb(156 163 175)'
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-sm font-medium transition-colors duration-300 group-hover:text-blue-600"
                  >
                    Load Diverse Data Sources
                  </motion.span>
                </div>
              </li>

              <li className="relative flex items-center group">
                <div className="absolute left-[18px] top-[28px] w-[2px] h-[80px] bg-gray-200 transition-all duration-500"
                     style={{
                       background: `linear-gradient(
                         to bottom,
                         ${1 < activeStep ? 'rgb(59 130 246)' : 1 === activeStep ? `rgb(59 130 246) ${progress * 100}%, rgb(229 231 235) ${progress * 100}%` : 'rgb(229 231 235)'},
                         ${1 < activeStep ? 'rgb(59 130 246)' : 'rgb(229 231 235)'}
                       )`
                     }}
                />
                <div className="flex items-center space-x-4 relative z-10">
                  <motion.div 
                    initial={false}
                    animate={{
                      backgroundColor: 1 <= activeStep ? 'rgb(219 234 254)' : 'rgb(243 244 246)',
                      scale: 1 === activeStep ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      backgroundColor: { duration: 0.3 },
                      scale: { duration: 0.2, times: [0, 0.5, 1] }
                    }}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-opacity-50 transition-all duration-300 group-hover:bg-blue-100"
                  >
                    <Database className={`w-4 h-4 transition-colors duration-300 ${
                      1 <= activeStep ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                  </motion.div>
                  <motion.span
                    initial={false}
                    animate={{
                      color: 1 <= activeStep ? 'rgb(37 99 235)' : 'rgb(156 163 175)'
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-sm font-medium transition-colors duration-300 group-hover:text-blue-600"
                  >
                    Request Simulation Queries
                  </motion.span>
                </div>
              </li>

              <li className="relative flex items-center group">
                <div className="absolute left-[18px] top-[28px] w-[2px] h-[80px] bg-gray-200 transition-all duration-500"
                     style={{
                       background: `linear-gradient(
                         to bottom,
                         ${2 < activeStep ? 'rgb(59 130 246)' : 2 === activeStep ? `rgb(59 130 246) ${progress * 100}%, rgb(229 231 235) ${progress * 100}%` : 'rgb(229 231 235)'},
                         ${2 < activeStep ? 'rgb(59 130 246)' : 'rgb(229 231 235)'}
                       )`
                     }}
                />
                <div className="flex items-center space-x-4 relative z-10">
                  <motion.div 
                    initial={false}
                    animate={{
                      backgroundColor: 2 <= activeStep ? 'rgb(219 234 254)' : 'rgb(243 244 246)',
                      scale: 2 === activeStep ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      backgroundColor: { duration: 0.3 },
                      scale: { duration: 0.2, times: [0, 0.5, 1] }
                    }}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-opacity-50 transition-all duration-300 group-hover:bg-blue-100"
                  >
                    <Search className={`w-4 h-4 transition-colors duration-300 ${
                      2 <= activeStep ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                  </motion.div>
                  <motion.span
                    initial={false}
                    animate={{
                      color: 2 <= activeStep ? 'rgb(37 99 235)' : 'rgb(156 163 175)'
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-sm font-medium transition-colors duration-300 group-hover:text-blue-600"
                  >
                    Retrieve Real-Time Industry Data
                  </motion.span>
                </div>
              </li>

              <li className="relative flex items-center group">
                <div className="absolute left-[18px] top-[28px] w-[2px] h-[80px] bg-gray-200 transition-all duration-500"
                     style={{
                       background: `linear-gradient(
                         to bottom,
                         ${3 < activeStep ? 'rgb(59 130 246)' : 3 === activeStep ? `rgb(59 130 246) ${progress * 100}%, rgb(229 231 235) ${progress * 100}%` : 'rgb(229 231 235)'},
                         ${3 < activeStep ? 'rgb(59 130 246)' : 'rgb(229 231 235)'}
                       )`
                     }}
                />
                <div className="flex items-center space-x-4 relative z-10">
                  <motion.div 
                    initial={false}
                    animate={{
                      backgroundColor: 3 <= activeStep ? 'rgb(219 234 254)' : 'rgb(243 244 246)',
                      scale: 3 === activeStep ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      backgroundColor: { duration: 0.3 },
                      scale: { duration: 0.2, times: [0, 0.5, 1] }
                    }}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-opacity-50 transition-all duration-300 group-hover:bg-blue-100"
                  >
                    <Sliders className={`w-4 h-4 transition-colors duration-300 ${
                      3 <= activeStep ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                  </motion.div>
                  <motion.span
                    initial={false}
                    animate={{
                      color: 3 <= activeStep ? 'rgb(37 99 235)' : 'rgb(156 163 175)'
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-sm font-medium transition-colors duration-300 group-hover:text-blue-600"
                  >
                    Toggle Parameters
                  </motion.span>
                </div>
              </li>

              <li className="relative flex items-center group">
                <div className="absolute left-[18px] top-[28px] w-[2px] h-[80px] bg-gray-200 transition-all duration-500"
                     style={{
                       background: `linear-gradient(
                         to bottom,
                         ${4 < activeStep ? 'rgb(59 130 246)' : 4 === activeStep ? `rgb(59 130 246) ${progress * 100}%, rgb(229 231 235) ${progress * 100}%` : 'rgb(229 231 235)'},
                         ${4 < activeStep ? 'rgb(59 130 246)' : 'rgb(229 231 235)'}
                       )`
                     }}
                />
                <div className="flex items-center space-x-4 relative z-10">
                  <motion.div 
                    initial={false}
                    animate={{
                      backgroundColor: 4 <= activeStep ? 'rgb(219 234 254)' : 'rgb(243 244 246)',
                      scale: 4 === activeStep ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      backgroundColor: { duration: 0.3 },
                      scale: { duration: 0.2, times: [0, 0.5, 1] }
                    }}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-opacity-50 transition-all duration-300 group-hover:bg-blue-100"
                  >
                    <LineChart className={`w-4 h-4 transition-colors duration-300 ${
                      4 <= activeStep ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                  </motion.div>
                  <motion.span
                    initial={false}
                    animate={{
                      color: 4 <= activeStep ? 'rgb(37 99 235)' : 'rgb(156 163 175)'
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-sm font-medium transition-colors duration-300 group-hover:text-blue-600"
                  >
                    Review Insights
                  </motion.span>
                </div>
              </li>

              <li className="relative flex items-center group">
                <div className="absolute left-[18px] top-[28px] w-[2px] h-[80px] bg-gray-200 transition-all duration-500"
                     style={{
                       background: `linear-gradient(
                         to bottom,
                         ${5 < activeStep ? 'rgb(59 130 246)' : 5 === activeStep ? `rgb(59 130 246) ${progress * 100}%, rgb(229 231 235) ${progress * 100}%` : 'rgb(229 231 235)'},
                         ${5 < activeStep ? 'rgb(59 130 246)' : 'rgb(229 231 235)'}
                       )`
                     }}
                />
                <div className="flex items-center space-x-4 relative z-10">
                  <motion.div 
                    initial={false}
                    animate={{
                      backgroundColor: 5 <= activeStep ? 'rgb(219 234 254)' : 'rgb(243 244 246)',
                      scale: 5 === activeStep ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      backgroundColor: { duration: 0.3 },
                      scale: { duration: 0.2, times: [0, 0.5, 1] }
                    }}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-opacity-50 transition-all duration-300 group-hover:bg-blue-100"
                  >
                    <Target className={`w-4 h-4 transition-colors duration-300 ${
                      5 <= activeStep ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                  </motion.div>
                  <motion.span
                    initial={false}
                    animate={{
                      color: 5 <= activeStep ? 'rgb(37 99 235)' : 'rgb(156 163 175)'
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-sm font-medium transition-colors duration-300 group-hover:text-blue-600"
                  >
                    Gain Valuable Strategies
                  </motion.span>
                </div>
              </li>

              <li className="relative flex items-center group">
                <div className="absolute left-[18px] top-[28px] w-[2px] h-[80px] bg-gray-200 transition-all duration-500"
                     style={{
                       background: 'transparent'
                     }}
                />
                <div className="flex items-center space-x-4 relative z-10">
                  <motion.div 
                    initial={false}
                    animate={{
                      backgroundColor: 6 <= activeStep ? 'rgb(219 234 254)' : 'rgb(243 244 246)',
                      scale: 6 === activeStep ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      backgroundColor: { duration: 0.3 },
                      scale: { duration: 0.2, times: [0, 0.5, 1] }
                    }}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-opacity-50 transition-all duration-300 group-hover:bg-blue-100"
                  >
                    <RefreshCw className={`w-4 h-4 transition-colors duration-300 ${
                      6 <= activeStep ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                  </motion.div>
                  <motion.span
                    initial={false}
                    animate={{
                      color: 6 <= activeStep ? 'rgb(37 99 235)' : 'rgb(156 163 175)'
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-sm font-medium transition-colors duration-300 group-hover:text-blue-600"
                  >
                    Iterate and Refine
                  </motion.span>
                </div>
              </li>
            </ul>
          </div>

          {/* Content Cards */}
          <div className="col-span-9">
            {/* Card 1 */}
            <div className="h-[90vh] flex items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: activeStep === 0 ? 1 : 0.3,
                  y: activeStep === 0 ? 0 : 20,
                }}
                transition={{ duration: 0.5 }}
                className={`bg-white rounded-lg w-full shadow-xl p-16 transform transition-all duration-500 h-[800px] flex flex-col ${
                  activeStep === 0 ? 'scale-100 border-blue-500 border-1' : 'scale-95'
                }`}
              >
                <h3 className="text-2xl font-medium text-gray-900 mb-12">
                  Load Diverse Data Sources
                </h3>
                <p className="text-md text-gray-600 mb-8 leading-relaxed">
                  Effortlessly connect and analyze data from multiple sources—PDFs, spreadsheets, emails, and more. Our platform supports diverse file formats and structures, ensuring your workflows stay smooth and uninterrupted.
                </p>
                
                {/* Data Integration Animation */}
                <div className="flex justify-center items-center mb-8 scale-110">
                  <DataIntegrationAnimation />
                </div>

                
              </motion.div>
            </div>

            {/* Card 2 */}
            <div className="h-[90vh] flex items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: activeStep === 1 ? 1 : 0.3,
                  y: activeStep === 1 ? 0 : 20,
                }}
                transition={{ duration: 0.5 }}
                className={`bg-white rounded-lg w-full shadow-xl p-16 transform transition-all duration-500  h-[800px] flex flex-col ${
                  activeStep === 1 ? 'scale-100 border-blue-500 border-1' : 'scale-95'
                }`}
              >
                <h3 className="text-2xl font-medium text-gray-900 mb-12">
                  Request Simulation Queries
                </h3>
                <p className="text-md text-gray-600 mb-8 leading-relaxed">
                Turn business questions into precise simulations using natural language. Describe goals like "What if we raise prices by 10%?" and get actionable insights. No coding or guesswork, just clear, data-driven answers. </p>

                {/* Forecast Query Animation */}
                <div className="flex justify-center items-center mb-12 scale-110">
                  <ForecastQueryAnimation />
                </div>

              </motion.div>
            </div>

            {/* Card 3 */}
            <div className="h-[90vh] flex items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: activeStep === 2 ? 1 : 0.3,
                  y: activeStep === 2 ? 0 : 20,
                }}
                transition={{ duration: 0.5 }}
                className={`bg-white rounded-lg w-full shadow-xl p-16 transform transition-all duration-500 h-[800px] flex flex-col ${
                  activeStep === 2 ? 'scale-100 border-blue-500 border-1' : 'scale-95'
                }`}
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-12">
                  Retrieve Real-Time Industry Data
                </h3>
                <p className="text-lg text-gray-600 mb-16 leading-relaxed">
                  Incorporate real-time industry data to enhance simulation accuracy and relevance.
                </p>
                <div className="grid grid-cols-2 gap-8 mt-auto">
                  <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                    <span className="text-md text-gray-700">Market data integration</span>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                    <span className="text-md text-gray-700">Industry benchmarks</span>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                    <span className="text-md text-gray-700">Competitive analysis</span>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                    <span className="text-md text-gray-700">Trend detection</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Card 4 */}
            <div className="h-[90vh] flex items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: activeStep === 3 ? 1 : 0.3,
                  y: activeStep === 3 ? 0 : 20,
                }}
                transition={{ duration: 0.5 }}
                className={`bg-white rounded-lg w-full shadow-xl p-16 transform transition-all duration-500 h-[800px] flex flex-col ${
                  activeStep === 3 ? 'scale-100 border-blue-500 border-1' : 'scale-95'
                }`}
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-12">
                  Toggle Parameters
                </h3>
                <p className="text-lg text-gray-600 mb-16 leading-relaxed">
                  Adjust and optimize simulation parameters with intuitive controls and real-time feedback.
                </p>
                <div className="grid grid-cols-2 gap-8 mt-auto">
                  <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                    <span className="text-md text-gray-700">Dynamic parameter adjustment</span>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                    <span className="text-md text-gray-700">Sensitivity analysis</span>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                    <span className="text-md text-gray-700">Preset configurations</span>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                    <span className="text-md text-gray-700">Custom parameter sets</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Card 5 */}
            <div className="h-[90vh] flex items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: activeStep === 4 ? 1 : 0.3,
                  y: activeStep === 4 ? 0 : 20,
                }}
                transition={{ duration: 0.5 }}
                className={`bg-white rounded-lg w-full shadow-xl p-16 transform transition-all duration-500 h-[800px] flex flex-col ${
                  activeStep === 4 ? 'scale-100 border-blue-500 border-1' : 'scale-95'
                }`}
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-12">
                  Review Insights
                </h3>
                <p className="text-lg text-gray-600 mb-16 leading-relaxed">
                  Explore detailed insights and analytics from your simulation results.
                </p>
                <div className="grid grid-cols-2 gap-8 mt-auto">
                  <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                    <span className="text-md text-gray-700">Interactive visualizations</span>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                    <span className="text-md text-gray-700">Statistical analysis</span>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                    <span className="text-md text-gray-700">Predictive modeling</span>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                    <span className="text-md text-gray-700">Scenario comparison</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Card 6 */}
            <div className="h-[90vh] flex items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: activeStep === 5 ? 1 : 0.3,
                  y: activeStep === 5 ? 0 : 20,
                }}
                transition={{ duration: 0.5 }}
                className={`bg-white rounded-lg w-full shadow-xl p-16 transform transition-all duration-500 h-[800px] flex flex-col ${
                  activeStep === 5 ? 'scale-100 border-blue-500 border-1' : 'scale-95'
                }`}
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-12">
                  Gain Valuable Strategies
                </h3>
                <p className="text-lg text-gray-600 mb-16 leading-relaxed">
                  Convert simulation results into concrete action plans and strategies.
                </p>
                <div className="grid grid-cols-2 gap-8 mt-auto">
                  <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                    <span className="text-md text-gray-700">AI-powered recommendations</span>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                    <span className="text-md text-gray-700">Risk assessment</span>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                    <span className="text-md text-gray-700">Opportunity identification</span>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                    <span className="text-md text-gray-700">Implementation roadmap</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Card 7 */}
            <div className="h-[90vh] flex items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: activeStep === 6 ? 1 : 0.3,
                  y: activeStep === 6 ? 0 : 20,
                }}
                transition={{ duration: 0.5 }}
                    className={`bg-white rounded-lg w-full shadow-xl p-16 transform transition-all duration-500 h-[800px] flex flex-col ${
                  activeStep === 6 ? 'scale-100 border-blue-500 border-1' : 'scale-95'
                }`}
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-12">
                  Iterate and Refine
                </h3>
                <p className="text-lg text-gray-600 mb-16 leading-relaxed">
                  Refine and optimize your simulation models through iterative learning.
                </p>
                <div className="grid grid-cols-2 gap-8 mt-auto">
                  <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                    <span className="text-md text-gray-700">Model optimization</span>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                    <span className="text-md text-gray-700">Performance tracking</span>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                    <span className="text-md text-gray-700">Automated refinement</span>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                    <span className="text-md text-gray-700">Version control</span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsSection;