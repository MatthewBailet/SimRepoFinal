import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, BarChart, Activity, AlertTriangle, CheckCircle } from 'lucide-react';

interface DataPoint {
  x: number;
  y: number;
  color: string;
}

const SimulationRunAnimation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [iteration, setIteration] = useState(0);
  const [logs, setLogs] = useState<{message: string, type: 'info' | 'warning' | 'success'}[]>([]);
  
  // Start/stop simulation
  const toggleSimulation = () => {
    setIsRunning(prev => !prev);
    if (!isRunning && progress === 100) {
      // Reset if complete
      setProgress(0);
      setDataPoints([]);
      setIteration(0);
      setLogs([]);
    }
  };
  
  // Generate random data point
  const generateDataPoint = () => {
    return {
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: `rgba(${Math.floor(Math.random() * 100 + 50)}, ${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 155 + 100)}, 0.7)`
    };
  };
  
  // Add log message
  const addLog = (message: string, type: 'info' | 'warning' | 'success') => {
    setLogs(prev => [...prev.slice(-4), { message, type }]);
  };
  
  // Simulation effect
  useEffect(() => {
    if (!isRunning) return;
    
    if (progress < 100) {
      const interval = setInterval(() => {
        // Update progress
        setProgress(prev => {
          const increment = Math.random() * 2 + 1; // Random increment between 1-3
          return Math.min(prev + increment, 100);
        });
        
        // Add data point every few iterations
        if (Math.random() > 0.5) {
          setDataPoints(prev => [...prev, generateDataPoint()].slice(-50));
        }
        
        // Update iteration counter
        setIteration(prev => prev + 1);
        
        // Add random log messages
        if (Math.random() > 0.85) {
          const logTypes = ['info', 'warning', 'success'] as const;
          const type = logTypes[Math.floor(Math.random() * logTypes.length)];
          const messages = {
            info: [
              'Processing batch of data points',
              'Calculating convergence metrics',
              'Updating simulation parameters'
            ],
            warning: [
              'Potential outlier detected',
              'Convergence slower than expected',
              'High variance in results'
            ],
            success: [
              'Batch processed successfully',
              'Convergence criteria met',
              'Optimal solution found'
            ]
          };
          
          const message = messages[type][Math.floor(Math.random() * messages[type].length)];
          addLog(message, type);
        }
      }, 200);
      
      return () => clearInterval(interval);
    } else {
      // Simulation complete
      addLog('Simulation completed successfully', 'success');
      setIsRunning(false);
    }
  }, [isRunning, progress]);
  
  return (
    <div className="h-64 mt-4 select-none">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 max-w-md mx-auto h-full flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <BarChart className="h-4 w-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">Monte Carlo Simulation</span>
          </div>
          <button 
            onClick={toggleSimulation}
            className={`p-1 rounded-full ${isRunning ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}
          >
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        </div>
        
        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-blue-600"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>
        
        {/* Simulation visualization */}
        <div className="flex-1 relative bg-gray-50 rounded-md border border-gray-200 mb-3 overflow-hidden">
          <div className="absolute inset-0">
            {dataPoints.map((point, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  backgroundColor: point.color,
                  width: '6px',
                  height: '6px',
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.7, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
          
          {/* Axes */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-gray-300" />
          <div className="absolute top-0 left-0 w-px h-full bg-gray-300" />
          
          {/* Labels */}
          <div className="absolute bottom-1 right-1 text-[10px] text-gray-400">
            Iterations: {iteration}
          </div>
        </div>
        
        {/* Logs */}
        <div className="h-20 overflow-y-auto bg-gray-50 rounded-md p-1 text-xs">
          {logs.map((log, i) => (
            <div key={i} className="flex items-center py-0.5">
              {log.type === 'info' && <Activity className="h-3 w-3 text-blue-500 mr-1 flex-shrink-0" />}
              {log.type === 'warning' && <AlertTriangle className="h-3 w-3 text-amber-500 mr-1 flex-shrink-0" />}
              {log.type === 'success' && <CheckCircle className="h-3 w-3 text-green-500 mr-1 flex-shrink-0" />}
              <span className="truncate">{log.message}</span>
            </div>
          ))}
          {logs.length === 0 && (
            <div className="text-gray-400 italic p-1">No logs yet. Start the simulation.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimulationRunAnimation; 