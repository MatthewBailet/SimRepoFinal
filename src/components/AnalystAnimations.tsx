import React from 'react';
import ParameterTuningAnimation from './animations/ParameterTuningAnimation';
import SimulationRunAnimation from './animations/SimulationRunAnimation';

const AnalystAnimations = () => {
  return (
    <div className="max-w-7xl mx-auto p-8 animate-content-fade">
      <h2 className="text-2xl font-semibold mb-6 text-primary">Analyst Tools</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-base-100 p-6 rounded-xl border border-base-content/10">
          <h3 className="text-lg font-medium mb-4 text-base-content">Parameter Tuning</h3>
          <p className="text-base-content/80 mb-6">
            Optimize your simulation parameters with our intelligent tuning system. Automatically find the best values for your model.
          </p>
          <ParameterTuningAnimation />
        </div>
        
        <div className="bg-base-100 p-6 rounded-xl border border-base-content/10">
          <h3 className="text-lg font-medium mb-4 text-base-content">Simulation Runner</h3>
          <p className="text-base-content/80 mb-6">
            Run Monte Carlo simulations with thousands of iterations. Visualize results in real-time and analyze outcomes.
          </p>
          <SimulationRunAnimation />
        </div>
      </div>
      
      <div className="mt-12">
        <h3 className="text-xl font-medium mb-4 text-base-content">Key Features for Analysts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-base-100 p-5 rounded-lg border border-base-content/10">
            <h4 className="text-lg font-medium mb-2 text-base-content">Advanced Statistical Models</h4>
            <p className="text-base-content/80">
              Access a wide range of statistical models and algorithms for deep data analysis and prediction.
            </p>
          </div>
          
          <div className="bg-base-100 p-5 rounded-lg border border-base-content/10">
            <h4 className="text-lg font-medium mb-2 text-base-content">Customizable Parameters</h4>
            <p className="text-base-content/80">
              Fine-tune every aspect of your simulation with granular control over all parameters.
            </p>
          </div>
          
          <div className="bg-base-100 p-5 rounded-lg border border-base-content/10">
            <h4 className="text-lg font-medium mb-2 text-base-content">Real-time Visualization</h4>
            <p className="text-base-content/80">
              See your simulation results as they happen with interactive charts and visualizations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalystAnimations; 