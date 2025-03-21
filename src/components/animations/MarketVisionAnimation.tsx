import { motion } from 'framer-motion';
import { CheckCircle, Glasses } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const MarketVisionAnimation: React.FC = () => {
  const [currentSite, setCurrentSite] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const sites = [
    { url: "Bloomberg.com", type: "Financial" },
    { url: "Reuters.com", type: "News" },
    { url: "Harvard.edu", type: "Academic" },
    { url: "JSTOR.org", type: "Research" },
    { url: "ScienceDirect.com", type: "Scientific" },
    { url: "MarketWatch.com", type: "Markets" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsProcessing(true);
      
      setTimeout(() => {
        setIsProcessing(false);
        setIsComplete(true);
        
        setTimeout(() => {
          setIsComplete(false);
          setCurrentSite((prev) => (prev + 1) % sites.length);
        }, 2500);
      }, 2000);
    }, 4000);

    return () => clearInterval(interval);
  }, [sites.length]);

  return (
    <div className="h-22 select-none pt-6 mx-[15vw] md:mx-[25vw] lg:mx-[1vw]">
      <div className="absolute left-10 top-45 -translate-y-1/2 px-40">
        {[-1, 0, 1].map((offset) => {
          const index = (currentSite + offset + sites.length) % sites.length;
          return (
            <motion.div
              key={`${sites[index].url}-${offset}`}
              className={`absolute left-5 h-8 w-40 ${
                offset === 0 ? 'z-10' : 'z-0'
              }`}
              initial={offset === 0 ? { y: 40, opacity: 0 } : { y: offset * 40 }}
              animate={{ 
                y: offset * 35,
                opacity: offset === 0 ? 1 : 0.5,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className={`
                bg-white/80 backdrop-blur-sm rounded-lg px-5 py-2
                border border-slate-200 shadow-sm
                flex items-center justify-between
                ${offset === 0 ? 'scale-105' : 'scale-95'}
              `}>
                <span className="text-sm font-medium text-slate-700">{sites[index].url}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        className="absolute left-45 ml-5 top-49 w-12 h-[2px] -z-100"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          backgroundColor: isProcessing ? "#60A5FA" : (isComplete ? "#34D399" : "#94A3B8")
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="absolute mt-2 mb-6 pt-3 select-none pl-53">
        <motion.div 
          className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center"
          animate={{
            scale: isProcessing ? 1.1 : 1,
            borderColor: isProcessing ? "#60A5FA" : (isComplete ? "#34D399" : "#E2E8F0")
          }}
        >
          {isProcessing ? (
            <motion.div 
              className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          ) : isComplete ? (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: 1,
                opacity: 1
              }}
              transition={{ 
                type: "spring",
                stiffness: 400,
                damping: 15,
                duration: 0.4
              }}
              className="relative"
            >
              <CheckCircle className="w-5 h-5 text-emerald-500" strokeWidth={3} />
            </motion.div>
          ) : (
            <Glasses className="w-5 h-5 text-slate-600" />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MarketVisionAnimation; 