import { motion } from 'framer-motion';
import { FileText, Database, Image, Table, Server, Calendar, Users, Cloud, Layers, Check, Loader2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const DataIntegrationAnimation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  const dataTypes = [
    { icon: <FileText className="h-5 w-5" /> },
    { icon: <Database className="h-5 w-5" /> },
    { icon: <Image className="h-5 w-5" aria-label="Image" /> },
    { icon: <Table className="h-5 w-5" /> },
    { icon: <Server className="h-5 w-5" /> },
    { icon: <Calendar className="h-5 w-5" /> },
    { icon: <Users className="h-5 w-5" /> },
    { icon: <Cloud className="h-5 w-5" /> },
  ];
  
  useEffect(() => {
    setProcessing(true);
    
    const processTimer = setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
      
      const completeTimer = setTimeout(() => {
        setCompleted(false);
        setCurrentIndex((prev) => (prev + 1) % dataTypes.length);
      }, 2500);
      
      return () => clearTimeout(completeTimer);
    }, 1500);
    
    return () => clearTimeout(processTimer);
  }, [currentIndex, dataTypes.length]);
  
  const getVisibleItems = () => {
    const items = [];
    const len = dataTypes.length;
    
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + len) % len;
      items.push({
        ...dataTypes[index],
        position: i
      });
    }
    
    return items;
  };
  
  return (
    <div className="h-32 mt-4 mb-0 relative select-none" style={{ userSelect: 'none' }}>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shadow-sm">
          <Layers className="h-6 w-6 text-blue-600" />
        </div>
      </div>
      
      <motion.div 
        className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 bg-blue-400"
        initial={{ height: 0 }}
        animate={{ 
          height: processing || completed ? 24 : 0,
          opacity: processing || completed ? 1 : 0
        }}
        transition={{ duration: 0.4 }}
      />
      
      <div className="absolute bottom-0 w-full">
        <div className="relative h-16 mx-auto flex items-center justify-center">
          {getVisibleItems().map((item, idx) => {
            const { position } = item;
            const isCenter = position === 0;
            
            let opacity = 1;
            let scale = 1;
            
            if (Math.abs(position) === 2) {
              opacity = 0.3;
              scale = 0.8;
            } else if (Math.abs(position) === 1) {
              opacity = 0.7;
              scale = 0.9;
            }
            
            return (
              <motion.div
                key={`${idx}-${currentIndex}`}
                className="absolute"
                animate={{ 
                  x: position * 60, 
                  opacity, 
                  scale,
                  y: isCenter && (processing || completed) ? -4 : 0
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200,
                  damping: 25 
                }}
              >
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm
                  ${isCenter && completed ? "bg-blue-50 text-blue-600" : "bg-white text-gray-600"}`}
                >
                  {isCenter && processing ? (
                    <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                  ) : isCenter && completed ? (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ 
                        scale: 1,
                        opacity: 1
                      }}
                      transition={{ 
                        type: "spring",
                        stiffness: 400,
                        damping: 15
                      }}
                    >
                      <Check className="w-5 h-5 text-blue-600" strokeWidth={2.5} />
                    </motion.div>
                  ) : (
                    item.icon
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DataIntegrationAnimation; 