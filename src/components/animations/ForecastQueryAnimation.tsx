import { motion } from 'framer-motion';
import React, { useState, useEffect, useMemo } from 'react';

const ForecastQueryAnimation = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const queries = useMemo(() => [
    "Will our new product be successful?",
    "How will market trends affect revenue?",
    "What if we increase prices by 10%?", 
    "Best expansion regions for Q3 2024?",
    "Customer churn prediction next quarter",
    "Supply chain optimization strategies",
    "Marketing budget allocation ROI",
    "Employee retention impact analysis",
    "New product launch timing simulation"
  ], []);

  useEffect(() => {
    const currentQuery = queries[currentIndex];
    
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
      }, isDeleting ? 1500 : 12000);
      
      return () => clearTimeout(pauseTimeout);
    }
    
    let timer;
    
    if (isDeleting) {
      if (text === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % queries.length);
        return;
      }
      
      timer = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
      }, 50);
    } else {
      if (text === currentQuery) {
        setIsPaused(true);
        setIsDeleting(true);
        return;
      }
      
      const randomDelay = 40;
      timer = setTimeout(() => {
        setText(currentQuery.slice(0, text.length + 1));
      }, randomDelay);
    }
    
    return () => clearTimeout(timer);
  }, [text, isDeleting, currentIndex, isPaused, queries]);

  return (
    <div className="h-24 mt-6 mb-6 pt-4 select-none" style={{ userSelect: 'none' }}>
      <div className="mx-auto max-w-md">
        <motion.div className="border border-gray-200 rounded-lg p-2 bg-white shadow-sm w-[500px]">
          <div className="relative">
            <motion.div 
              className="h-8 bg-white rounded px-3 py-1 border border-gray-200 flex items-center overflow-hidden"
            >
              <span className="pr-1 text-sm">
                {text}
              </span>
              <motion.span 
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-1 h-4 bg-blue-500 inline-block ml-1"
              />
            </motion.div>
          </div>
          <div className="flex justify-end mt-2 space-x-2">
            <motion.button 
              className="px-3 py-1 text-xs rounded bg-gray-200 text-gray-700"
            >
              Automate Parameters
            </motion.button>
            <motion.button 
              className="px-3 py-1 text-xs rounded bg-blue-500 text-white"
              whileHover={{ scale: 1.05 }}
            >
              Simulate
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForecastQueryAnimation; 