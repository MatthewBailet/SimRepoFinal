import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

// Define industry data with their use cases
const industryData = {
  "Financial Services": {
    useCases: [
      "Market Trend Analysis",
      "Investment Risk Scoring",
      "Portfolio Performance",
      "Revenue Forecasting",
      "Market Entry Analysis"
    ]
  },
  "Healthcare": {
    useCases: [
      "Resource Utilization",
      "Patient Flow Analysis",
      "Cost Forecasting",
      "Capacity Planning",
      "Operational Efficiency"
    ]
  },
  "Pharmaceuticals": {
    useCases: [
      "Market Demand Analysis",
      "Distribution Planning",
      "Pricing Strategy",
      "Sales Forecasting",
      "Market Access Modeling"
    ]
  },
  "Manufacturing": {
    useCases: [
      "Production Efficiency",
      "Resource Allocation",
      "Demand Forecasting",
      "Cost Optimization",
      "Capacity Planning"
    ]
  },
  "Retail": {
    useCases: [
      "Demand Forecasting",
      "Pricing Optimization",
      "Market Positioning",
      "Location Analysis",
      "Performance Prediction"
    ]
  },
  "Supply Chain & Logistics": {
    useCases: [
      "Delivery Optimization",
      "Demand Planning",
      "Cost Efficiency",
      "Resource Allocation",
      "Performance Analysis"
    ]
  },
  "Energy & Utilities": {
    useCases: [
      "Usage Forecasting",
      "Resource Planning",
      "Cost Projection",
      "Efficiency Analysis",
      "Performance Modeling"
    ]
  },
  "Telecommunications": {
    useCases: [
      "Usage Pattern Analysis",
      "Resource Planning",
      "Market Expansion",
      "Revenue Forecasting",
      "Performance Modeling"
    ]
  },
  "Insurance": {
    useCases: [
      "Risk Scoring",
      "Premium Modeling",
      "Market Analysis",
      "Cost Projection",
      "Performance Forecasting"
    ]
  },
  "Aerospace & Defense": {
    useCases: [
      "Cost Projection",
      "Resource Planning",
      "Performance Analysis",
      "Market Assessment",
      "Efficiency Modeling"
    ]
  },
  "Automotive": {
    useCases: [
      "Market Demand",
      "Cost Analysis",
      "Performance Modeling",
      "Resource Planning",
      "Efficiency Scoring"
    ]
  },
  "Technology & Software": {
    useCases: [
      "Resource Planning",
      "Market Analysis",
      "Cost Projection",
      "Growth Modeling",
      "Performance Scoring"
    ]
  },
  "Marketing": {
    useCases: [
      "Campaign Performance",
      "Budget Optimization",
      "Market Response",
      "ROI Forecasting",
      "Trend Analysis"
    ]
  },
  "FP&A": {
    useCases: [
      "Budget Planning",
      "Revenue Modeling",
      "Cost Analysis",
      "Growth Projection",
      "Performance Scoring"
    ]
  },
  "E-commerce": {
    useCases: [
      "Demand Forecasting",
      "Pricing Strategy",
      "Market Analysis",
      "Growth Modeling",
      "Performance Scoring"
    ]
  },
  "Transportation": {
    useCases: [
      "Resource Planning",
      "Cost Analysis",
      "Efficiency Modeling",
      "Demand Forecasting",
      "Performance Scoring"
    ]
  },
  "Real Estate": {
    useCases: [
      "Market Analysis",
      "Value Prediction",
      "Investment Scoring",
      "Growth Modeling",
      "Risk Assessment"
    ]
  },
  "Agriculture": {
    useCases: [
      "Production Planning",
      "Market Analysis",
      "Cost Projection",
      "Resource Planning",
      "Performance Modeling"
    ]
  },
  "Oil & Gas": {
    useCases: [
      "Market Analysis",
      "Cost Projection",
      "Resource Planning",
      "Performance Modeling",
      "Efficiency Scoring"
    ]
  },
  "Government & Public Sector": {
    useCases: [
      "Resource Planning",
      "Budget Analysis",
      "Impact Assessment",
      "Cost Projection",
      "Performance Modeling"
    ]
  },
  "Education": {
    useCases: [
      "Resource Planning",
      "Budget Analysis",
      "Growth Modeling",
      "Cost Projection",
      "Performance Scoring"
    ]
  },
  "Media & Entertainment": {
    useCases: [
      "Market Analysis",
      "Revenue Modeling",
      "Growth Projection",
      "Performance Scoring",
      "Trend Analysis"
    ]
  }
} as const;

const industries = Object.keys(industryData);

const IndustrySearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('Financial Services');

  const filteredIndustries = industries.filter(industry =>
    industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-0 py-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Our Supported Industries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-14 bg-white/50 pl-12 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-primary text-xl shadow-sm"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
      </div>

      {/* Split Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="flex">
          {/* Left Panel - Industry List */}
          <div className="w-1/5 border-r border-gray-100 h-[800px]">
            <div className="p-4">
              <div className="space-y-0 h-[780px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredIndustries.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => setSelectedIndustry(industry)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${
                      selectedIndustry === industry
                        ? 'bg-blue-500/10 text-blue-600 font-medium border border-blue-200 text-sm'
                        : 'text-slate-900 hover:bg-blue-50 text-sm'
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Industry Information */}
          <div className="w-3/4 p-8">
            <motion.div 
              key={selectedIndustry}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="max-w-5xl"
            >
              <h2 className="text-2xl font-medium text-gray-900 mb-4">
                {selectedIndustry}
              </h2>
              
              {/* Use Case Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {industryData[selectedIndustry as keyof typeof industryData].useCases.map((useCase, index) => (
                  <motion.span
                    key={`${selectedIndustry}-${useCase}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="inline-flex items-center px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-sm border border-blue-200"
                  >
                    {useCase}
                  </motion.span>
                ))}
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.3 }}
                className="text-gray-600 leading-relaxed text-md"
              >
                Discover how our advanced simulation platform transforms complex data into actionable insights for the {selectedIndustry.toLowerCase()} sector.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.4 }}
                className="mt-6 grid grid-cols-2 gap-4"
              >
                <div className="p-4 rounded-lg bg-gray-50">
                  <h4 className="font-medium text-gray-900 mb-1">Key Features</h4>
                  <p className="text-sm text-gray-600">Tailored solutions for {selectedIndustry.toLowerCase()} specific challenges</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50">
                  <h4 className="font-medium text-gray-900 mb-1">Integration</h4>
                  <p className="text-sm text-gray-600">Seamless integration with existing {selectedIndustry.toLowerCase()} systems</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustrySearch; 