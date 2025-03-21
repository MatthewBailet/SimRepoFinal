import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sliders, RefreshCw, Check, ChevronUp, ChevronDown } from 'lucide-react';

interface Parameter {
  name: string;
  value: number;
  min: number;
  max: number;
  step: number;
  optimizing: boolean;
  optimized: boolean;
}

const ParameterTuningAnimation = () => {
  const [parameters, setParameters] = useState<Parameter[]>([
    { name: 'Learning Rate', value: 0.01, min: 0.001, max: 0.1, step: 0.001, optimizing: false, optimized: false },
    { name: 'Batch Size', value: 64, min: 16, max: 256, step: 16, optimizing: false, optimized: false },
    { name: 'Epochs', value: 100, min: 10, max: 500, step: 10, optimizing: false, optimized: false },
  ]);
  
  const [currentOptimizingIndex, setCurrentOptimizingIndex] = useState<number | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  // Animation cycle
  useEffect(() => {
    if (animationComplete && cycleCount < 2) {
      // Reset for next cycle after a delay
      const timer = setTimeout(() => {
        setParameters(params => 
          params.map(p => ({ ...p, optimizing: false, optimized: false }))
        );
        setCurrentOptimizingIndex(null);
        setAnimationComplete(false);
        setCycleCount(prev => prev + 1);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
    
    if (currentOptimizingIndex === null && !animationComplete) {
      // Start with the first parameter
      const timer = setTimeout(() => {
        setCurrentOptimizingIndex(0);
        setParameters(params => 
          params.map((p, i) => i === 0 ? { ...p, optimizing: true } : p)
        );
      }, 1000);
      
      return () => clearTimeout(timer);
    }
    
    if (currentOptimizingIndex !== null && !animationComplete) {
      // Optimize current parameter
      const timer = setTimeout(() => {
        setParameters(params => 
          params.map((p, i) => {
            if (i === currentOptimizingIndex) {
              // Calculate optimized value
              const optimizedValue = i === 0 ? 0.005 : // Learning rate
                                    i === 1 ? 128 :    // Batch size
                                    250;               // Epochs
              return { ...p, value: optimizedValue, optimizing: false, optimized: true };
            }
            return p;
          })
        );
        
        // Move to next parameter or complete
        if (currentOptimizingIndex < parameters.length - 1) {
          const nextIndex = currentOptimizingIndex + 1;
          setCurrentOptimizingIndex(nextIndex);
          setParameters(params => 
            params.map((p, i) => i === nextIndex ? { ...p, optimizing: true } : p)
          );
        } else {
          setCurrentOptimizingIndex(null);
          setAnimationComplete(true);
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [currentOptimizingIndex, animationComplete, parameters.length, cycleCount]);

  return (
    <div className="h-40 mt-4 select-none">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Sliders className="h-4 w-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">Parameter Optimization</span>
          </div>
          {animationComplete ? (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full flex items-center"
            >
              <Check className="h-3 w-3 mr-1" />
              <span>Optimized</span>
            </motion.div>
          ) : (
            <motion.div 
              animate={{ rotate: currentOptimizingIndex !== null ? 360 : 0 }}
              transition={{ duration: 1, repeat: currentOptimizingIndex !== null ? Infinity : 0, ease: "linear" }}
            >
              <RefreshCw className="h-4 w-4 text-blue-600" />
            </motion.div>
          )}
        </div>
        
        <div className="space-y-3">
          {parameters.map((param, index) => (
            <div key={param.name} className="flex items-center gap-2">
              <div className="w-1/4 text-xs text-gray-600">{param.name}</div>
              <div className="w-1/2 relative">
                <div className="h-1.5 w-full bg-gray-200 rounded-full">
                  <motion.div 
                    className={`h-full rounded-full ${
                      param.optimized ? 'bg-green-500' : 
                      param.optimizing ? 'bg-blue-500' : 'bg-blue-400'
                    }`}
                    initial={{ width: `${((param.value - param.min) / (param.max - param.min)) * 100}%` }}
                    animate={{ 
                      width: param.optimizing 
                        ? ['30%', '70%', '50%', '90%', '40%', '60%', `${((param.value - param.min) / (param.max - param.min)) * 100}%`] 
                        : `${((param.value - param.min) / (param.max - param.min)) * 100}%` 
                    }}
                    transition={{ 
                      duration: param.optimizing ? 1.8 : 0.5,
                      ease: param.optimizing ? "easeInOut" : "easeOut"
                    }}
                  />
                </div>
                
                {param.optimizing && (
                  <motion.div 
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex space-x-1">
                      <ChevronDown className="h-3 w-3 text-blue-600" />
                      <ChevronUp className="h-3 w-3 text-blue-600" />
                    </div>
                  </motion.div>
                )}
              </div>
              <div className="w-1/4 text-xs text-right text-gray-700">
                {param.value.toString().includes('.') ? param.value.toFixed(4) : param.value}
              </div>
            </div>
          ))}
        </div>
        
        {animationComplete && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-3 text-xs text-gray-600 bg-blue-50 p-2 rounded"
          >
            Accuracy improved by 12.4% with optimized parameters
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ParameterTuningAnimation; 