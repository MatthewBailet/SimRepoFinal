import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, FileCode, Check, ExternalLink } from 'lucide-react';

interface DataPoint {
  id: number;
  impact: number;
  probability: number;
  risk: number;
  category: string;
  analyzed: boolean;
}

const GradientFeatureSection = () => {
  const [hasAnimationStarted, setHasAnimationStarted] = useState(false);
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [highlightedPoint, setHighlightedPoint] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const sectionRef = useRef(null);

  // Generate initial data points
  useEffect(() => {
    if (hasAnimationStarted) {
      const points = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        impact: Math.random() * 100,
        probability: Math.random() * 100,
        risk: Math.random(),
        category: ['Market', 'Financial', 'Operational', 'Strategic'][Math.floor(Math.random() * 4)],
        analyzed: false
      }));
      setDataPoints(points);

      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < points.length) {
          setHighlightedPoint(currentIndex);
          setDataPoints(prev => prev.map(p => 
            p.id === currentIndex ? { ...p, analyzed: true } : p
          ));
          currentIndex++;
        } else {
          clearInterval(interval);
          setHighlightedPoint(null);
          setIsComplete(true);
        }
      }, 800);

      return () => clearInterval(interval);
    }
  }, [hasAnimationStarted]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimationStarted) {
          setHasAnimationStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimationStarted]);

  return (
    <div className="relative py-14 pb-24 border-b border-base-content/[7.5%]" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
          {/* Left side */}
          <div className="space-y-0">
            <h2 className="text-3xl font-semibold text-base-content/90 pb-5">
              Transparent Risk Analysis
            </h2>
            <p className="text-md text-base-content/80 leading-relaxed max-w-[400px] pb-4">
              Identify emerging threats and quantify downside scenarios with clarity. By combining statistical models with real-time market data and domain-specific knowledge, our simulations highlight the probability and potential impact of each risk, ensuring you have full visibility into what's around the corner.
            </p>
            <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm">
              Analyze Risks
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>

          {/* Right side - Risk Matrix Visualization */}
          <div className="relative mr-10">
            {/* Background gradient */}
            <div className="absolute -inset-10 bg-gradient-to-br from-blue-400 via-blue-200 to-blue-500 rounded-2xl -z-10" />
            
            <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <FileCode className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Risk Matrix Analysis</span>
                </div>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
              </div>

              {/* Risk Matrix Visualization */}
              <div className="p-6 h-[450px] bg-gray-50/50">
                <div className="relative w-full h-full bg-white rounded-lg shadow-inner">
                  {/* Axis labels */}
                  <div className="absolute -left-6 top-1/2 -rotate-90 text-xs text-gray-500">Impact</div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-gray-500">Probability</div>
                  
                  {/* Grid lines */}
                  <div className="absolute inset-8 border border-gray-200">
                    <div className="grid grid-cols-4 grid-rows-4 w-full h-full">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className="border border-gray-100" />
                      ))}
                    </div>
                  </div>

                  {/* Risk zones - Flipped gradient */}
                  <div className="absolute inset-8 pointer-events-none">
                    <div className="w-full h-full bg-gradient-to-tr from-green-500/10 via-yellow-500/10 to-red-500/10" />
                  </div>

                  {/* Data points */}
                  {dataPoints.map((point) => (
                    <div
                      key={point.id}
                      className={`absolute w-3 h-3 rounded-full transition-all duration-300 ${
                        point.analyzed ? 'scale-100' : 'scale-0'
                      } ${
                        highlightedPoint === point.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                      } bg-white border-2 border-gray-400 hover:border-blue-500`}
                      style={{
                        left: `${8 + (point.probability * 0.84)}%`,
                        bottom: `${8 + (point.impact * 0.84)}%`,
                        transform: 'translate(-50%, 50%)',
                        opacity: point.analyzed ? 1 : 0
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="px-6 py-3 bg-white border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <span>Low Impact</span>
                      <span className="mx-2">→</span>
                      <span>High Impact</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!isComplete ? (
                      <div className="w-3 h-3 rounded-full border-2 border-blue-500 border-b-transparent animate-spin" />
                    ) : (
                      <Check className="w-3 h-3 text-blue-500" />
                    )}
                    <span className="text-xs text-gray-500">
                      {dataPoints.filter(p => p.analyzed).length} risks analyzed
                    </span>
                  </div>
                </div>
              </div>

              {/* Summary Section */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="space-y-2">
                  <div className="relative h-[108px]"> {/* Fixed height container */}
                    <div className={`absolute inset-0 w-full transition-all duration-500 ${
                      isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}>
                      <div className="flex items-center justify-between text-sm p-2 h-9">
                        <div className="flex items-center space-x-3">
                          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="flex items-center justify-between text-sm p-2 h-9">
                        <div className="flex items-center space-x-3">
                          <div className="h-4 w-52 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="flex items-center justify-between text-sm p-2 h-9">
                        <div className="flex items-center space-x-3">
                          <div className="h-4 w-44 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>

                    <div className={`absolute inset-0 w-full transition-all duration-500 ${
                      isComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      <div className="flex items-center justify-between text-sm hover:bg-gray-100 p-2 rounded cursor-pointer group h-9">
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-700">High probability market risks detected</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">6 sources</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex items-center justify-between text-sm hover:bg-gray-100 p-2 rounded cursor-pointer group h-9">
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-700">3 critical impact points identified</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">4 sources</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex items-center justify-between text-sm hover:bg-gray-100 p-2 rounded cursor-pointer group h-9">
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-700">Strategic risk cluster analysis</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">8 sources</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientFeatureSection; 