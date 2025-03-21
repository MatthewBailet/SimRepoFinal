import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Workflow, Shield } from 'lucide-react';

const FeatureCard = ({ title, description, delay }: { 
  title: string; 
  description: string; 
  icon: React.ElementType;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay }}
      className="relative bg-white rounded-lg p-8 border border-gray-200 border-[1px] hover:border-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 h-[640px] w-full"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-white pointer-events-none" />
      
      <div className="relative flex flex-col h-full">
        {/* Title */}
        <div>
          <h3 className="text-xl font-medium -tracking-4 tracking-tight text-gray-900 leading-tight">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="mt-8 text-base text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const FeatureCards = () => {
  const features = [
    {
      icon: Sparkles,
      title: "First of its kind.",
      description: "Our platform pioneers AI-enhanced predictive analytics with seamless simulation integration for teams."
    },
    {
      icon: Shield,
      title: "Committed to Security.",
      description: "Your data is safe with us—no storage, no model training, simple data privacy."
    },
    {
      icon: Workflow,
      title: "Seamless Workflow integration.",
      description: "Easily integrate workflows and data, then export insights for any use case."
    },
  ];

  return (
    <div className="mt-8 flex justify-center gap-4 max-w-7xl mx-auto relative z-[5] pb-12">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
};

export default FeatureCards; 