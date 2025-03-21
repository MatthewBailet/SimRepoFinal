import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowRight, Code, FileCode, Check } from 'lucide-react';

// Animation timing configuration (in milliseconds)
const ANIMATION_CONFIG = {
  STEP_TIMINGS: {
    ANALYZING_PROMPT: 3000,
    SELECTING_MODEL: 2000,
    PARSING_DATA: 3000,
    DEVELOPING_MODEL: 6000,
    SEARCHING_EXTERNAL: 5000,
    PARSING_EXTERNAL: 3000,
    REFINING_PARAMS: 2000,
    VERIFYING: 5000,
  },
  PROGRESS_BAR_INCREMENT_INTERVAL: 50, // How often to update progress bar
};

const GradientFeatureSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isSimulationComplete, setIsSimulationComplete] = useState(false);
  const [hasAnimationStarted, setHasAnimationStarted] = useState(false);
  const sectionRef = useRef(null);

  const steps = useMemo(() => [
    { text: "Analyzing query", duration: ANIMATION_CONFIG.STEP_TIMINGS.ANALYZING_PROMPT },
    { text: "Selecting simulation model", duration: ANIMATION_CONFIG.STEP_TIMINGS.SELECTING_MODEL },
    { text: "Parsing data sources", duration: ANIMATION_CONFIG.STEP_TIMINGS.PARSING_DATA },
    { text: "Developing industry model", duration: ANIMATION_CONFIG.STEP_TIMINGS.DEVELOPING_MODEL },
    { text: "Searching for external data sources", duration: ANIMATION_CONFIG.STEP_TIMINGS.SEARCHING_EXTERNAL },
    { text: "Parsing external data sources", duration: ANIMATION_CONFIG.STEP_TIMINGS.PARSING_EXTERNAL },
    { text: "Refining parameters", duration: ANIMATION_CONFIG.STEP_TIMINGS.REFINING_PARAMS },
    { text: "Verifying details", duration: ANIMATION_CONFIG.STEP_TIMINGS.VERIFYING }
  ], []); // Empty dependency array since ANIMATION_CONFIG is constant

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimationStarted) {
          setHasAnimationStarted(true);
        }
      },
      {
        threshold: 0.3, // Start when 30% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimationStarted]);

  useEffect(() => {
    if (!hasAnimationStarted) return;

    const runStep = async () => {
      if (currentStep < steps.length) {
        const timer = setTimeout(() => {
          setCurrentStep(prev => prev + 1);
        }, steps[currentStep].duration);
        return () => clearTimeout(timer);
      } else if (currentStep === steps.length && !isSimulationComplete) {
        setIsSimulationComplete(true);
        let currentProgress = 0;
        const interval = setInterval(() => {
          currentProgress += 1;
          setProgress(currentProgress);
          
          if (currentProgress >= 100) {
            clearInterval(interval);
          }
        }, ANIMATION_CONFIG.PROGRESS_BAR_INCREMENT_INTERVAL);
        return () => clearInterval(interval);
      }
    };

    runStep();
  }, [currentStep, isSimulationComplete, steps, hasAnimationStarted]);

  return (
    <div className="relative pb-14 pb-24 border-b border-base-content/[7.5%]" ref={sectionRef}>
      {/* Content */}
      <div className="max-w-7xl mx-auto px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
          {/* Left side */}
          <div className="space-y-0">
            <h2 className="text-3xl font-semibold text-base-content/90 pb-5">
              Flexible System Design
            </h2>
            <p className="text-md text-base-content/80 leading-relaxed max-w-[400px] pb-4">
              Describe your scenario in natural language, and our AI-driven engine builds powerful simulations using trusted methodologies. With intelligent model selection and customizable parameters, exploring strategies and analyzing outcomes has never been easier—data-driven decision-making, simplified.
            </p>
            <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm">
              Build with Copilot Edits
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>

          {/* Right side - Code Editor Mock */}
          <div className="relative mr-10">
            {/* Background gradient for right side only */}
            <div className="absolute -inset-10 bg-gradient-to-br from-blue-400 via-blue-200 to-blue-500 rounded-2xl -z-10" />
            
            <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
              {/* Editor Header */}
              <div className="flex items-center px-4 py-2 bg-gray-100 border-b border-gray-200">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="flex items-center ml-4 space-x-2">
                  <div className="flex items-center space-x-1 bg-gray-200 px-2 py-1 rounded text-xs text-gray-600">
                    <FileCode className="w-3.5 h-3.5" />
                    <span>simulation.tsx</span>
                  </div>
                </div>
              </div>

              {/* Code Content */}
              <div className="p-4 font-mono text-sm h-[450px] flex flex-col items-center justify-center">
                <div className="w-full max-w-md space-y-4">
                  {steps.map((step, index) => (
                    <div 
                      key={step.text}
                      className={`flex items-center gap-3 transition-all duration-500 ${
                        !hasAnimationStarted ? 'opacity-30 scale-90' :
                        index === currentStep ? 'opacity-100 scale-100 translate-y-0' :
                        index < currentStep ? 'opacity-50 scale-95 -translate-y-2' :
                        'opacity-30 scale-90 translate-y-2'
                      }`}
                    >
                      <div className="w-6 h-6 relative flex items-center justify-center">
                        {hasAnimationStarted && index === currentStep ? (
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
                        ) : hasAnimationStarted && index < currentStep ? (
                          <div className="rounded-full bg-blue-600 h-6 w-6 flex items-center justify-center">
                            <Check className="h-4 w-4 text-white animate-scale-check" />
                          </div>
                        ) : (
                          <div className="rounded-full border-2 border-gray-300 h-6 w-6" />
                        )}
                      </div>
                      <span className="text-sm text-gray-700">{step.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Copilot Suggestion with Progress Bar */}
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                  <Code className="w-4 h-4" />
                  <span>Simulation Progress</span>
                </div>
                <div className="w-full">
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                      style={{ 
                        width: `${hasAnimationStarted && isSimulationComplete ? progress : 0}%`,
                        transition: 'width 0.3s ease-in-out'
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">
                      {!hasAnimationStarted ? "Waiting to start..." :
                        isSimulationComplete ? "Processing simulation..." : "Preparing simulation..."}
                    </span>
                    <span className="text-xs text-gray-500">
                      {hasAnimationStarted && isSimulationComplete ? `${progress}%` : "0%"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Set Overlay */}
            <div className="absolute top-1 right-2 bg-white rounded-lg shadow-sm p-2">
              <div className="text-xs text-gray-600 mb-0">Data sources (12 loaded)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientFeatureSection; 