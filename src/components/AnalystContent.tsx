import React from 'react';
import {
  LayoutGrid, PlaySquare, BarChart3, FolderClosed, CheckCircle2, Play,
  FileText, Plus, Activity, AlertTriangle, Clock, TrendingUp, Database,
  FileSpreadsheet, Link, Sliders, Code, GitBranch, Layers, Settings,
  BarChart, LineChart, PieChart, Sigma, Terminal, GitMerge
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import GradientFeatureSection from "./GradientFeatureSection";
import AnalystAnimations from "./AnalystAnimations";
import ParameterTuningAnimation from "./animations/ParameterTuningAnimation";
import SimulationRunAnimation from "./animations/SimulationRunAnimation";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AnalystContent = () => {
  // Chart data for simulation results
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Simulation Accuracy',
        data: [92, 89, 94, 91, 96, 95, 98],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Parameter Sensitivity',
        data: [45, 52, 49, 60, 55, 58, 62],
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.5)',
        tension: 0.3,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 10,
          },
        },
      },
    },
  };

  // Parameter data for the parameter tuning section
  const parameters = [
    { name: 'Learning Rate', value: 0.01, min: 0.001, max: 0.1 },
    { name: 'Regularization', value: 0.2, min: 0, max: 1 },
    { name: 'Batch Size', value: 64, min: 16, max: 256 },
    { name: 'Epochs', value: 100, min: 10, max: 500 },
    { name: 'Dropout Rate', value: 0.3, min: 0, max: 0.5 },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      

      {/* Main Dashboard */}
      <div className="animate-content-fade">
        <GradientFeatureSection />
        <AnalystAnimations />

        <div className="flex flex-col bg-base-100 p-4 h-[calc(100%-3rem)] overflow-hidden">
          {/* Dashboard Content */}
          <div className="grid grid-cols-12 gap-4 animate-content-fade h-full relative">
            {/* Sidebar */}
            <div className="col-span-3 flex flex-col text-[13px] text-base-content/70 overflow-y-auto pr-2 pointer-events-none select-none">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <input type="text" placeholder="Search simulations..." className="w-full bg-base-200/50 rounded-lg px-3 py-1.5 pl-8 text-sm cursor-default" disabled />
                  <svg className="absolute left-2.5 top-2 h-3.5 w-3.5 text-base-content/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Simulation Tools Section */}
              <div className="mb-6">
                <h3 className="text-[11px] font-medium mb-1.5 text-base-content/50 px-2">Simulation Tools</h3>
                <div className="space-y-0.5">
                  <div className="flex items-center px-2 py-1.5 text-primary bg-primary/5 rounded-lg relative">
                    <div className="absolute left-0 w-0.5 h-4 bg-primary rounded-r-lg"></div>
                    <LayoutGrid className="h-3.5 w-3.5 mr-2" />
                    <span>Dashboard</span>
                  </div>
                  <div className="flex items-center px-2 py-1.5 hover:bg-base-200/50 rounded-lg cursor-pointer">
                    <PlaySquare className="h-3.5 w-3.5 mr-2" />
                    <span>Simulation Runner</span>
                  </div>
                  <div className="flex items-center px-2 py-1.5 hover:bg-base-200/50 rounded-lg cursor-pointer">
                    <Sliders className="h-3.5 w-3.5 mr-2" />
                    <span>Parameter Tuning</span>
                  </div>
                  <div className="flex items-center px-2 py-1.5 hover:bg-base-200/50 rounded-lg cursor-pointer">
                    <BarChart3 className="h-3.5 w-3.5 mr-2" />
                    <span>Results Analysis</span>
                  </div>
                  <div className="flex items-center px-2 py-1.5 hover:bg-base-200/50 rounded-lg cursor-pointer">
                    <Code className="h-3.5 w-3.5 mr-2" />
                    <span>Model Editor</span>
                  </div>
                </div>
              </div>

              {/* Models Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1.5 px-2">
                  <h3 className="text-[11px] font-medium text-base-content/50">Models</h3>
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center px-2 py-1.5 hover:bg-base-200/50 rounded-lg cursor-pointer">
                    <LayoutGrid className="h-3.5 w-3.5 mr-2" />
                    <span>All Models</span>
                  </div>
                  <div className="pl-2">
                    <div className="flex items-center justify-between group">
                      <div className="flex items-center px-2 py-1.5 hover:bg-base-200/50 rounded-lg cursor-pointer flex-1">
                        <FolderClosed className="h-3.5 w-3.5 mr-2" />
                        <span>Monte Carlo Simulations</span>
                      </div>
                    </div>
                    <div className="pl-6 space-y-0.5">
                      <div className="flex items-center px-2 py-1.5 hover:bg-base-200/50 rounded-lg cursor-pointer">
                        <CheckCircle2 className="h-3.5 w-3.5 mr-2" />
                        <span>Market Volatility Model</span>
                      </div>
                      <div className="flex items-center px-2 py-1.5 hover:bg-base-200/50 rounded-lg cursor-pointer">
                        <Play className="h-3.5 w-3.5 mr-2" />
                        <span>Risk Assessment</span>
                      </div>
                      <div className="flex items-center px-2 py-1.5 hover:bg-base-200/50 rounded-lg cursor-pointer">
                        <FileText className="h-3.5 w-3.5 mr-2" />
                        <span>Portfolio Optimization</span>
                      </div>
                      <div className="flex items-center px-2 py-1.5 text-primary hover:bg-base-200/50 rounded-lg cursor-pointer">
                        <Plus className="h-3.5 w-3.5 mr-2" />
                        <span>Add New</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center px-2 py-1.5 hover:bg-base-200/50 rounded-lg cursor-pointer">
                    <FolderClosed className="h-3.5 w-3.5 mr-2" />
                    <span>Agent-Based Models</span>
                  </div>
                  <div className="flex items-center px-2 py-1.5 hover:bg-base-200/50 rounded-lg cursor-pointer">
                    <FolderClosed className="h-3.5 w-3.5 mr-2" />
                    <span>System Dynamics</span>
                  </div>
                  <div className="flex items-center px-2 py-1.5 hover:bg-base-200/50 rounded-lg cursor-pointer">
                    <FolderClosed className="h-3.5 w-3.5 mr-2" />
                    <span>Discrete Event</span>
                  </div>
                </div>
              </div>

              {/* Data Sources Section */}
              <div className="mb-6">
                <h3 className="text-[11px] font-medium mb-1.5 text-base-content/50 px-2">Data Sources</h3>
                <div className="space-y-0.5">
                  <div className="flex items-center px-2 py-1.5 hover:bg-base-200/50 rounded-lg cursor-pointer">
                    <Database className="h-3.5 w-3.5 mr-2" />
                    <span>Connected Sources</span>
                  </div>
                  <div className="flex items-center px-2 py-1.5 hover:bg-base-200/50 rounded-lg cursor-pointer">
                    <FileSpreadsheet className="h-3.5 w-3.5 mr-2" />
                    <span>Import Data</span>
                  </div>
                  <div className="flex items-center px-2 py-1.5 hover:bg-base-200/50 rounded-lg cursor-pointer">
                    <Link className="h-3.5 w-3.5 mr-2" />
                    <span>API Connections</span>
                  </div>
                </div>
              </div>

              {/* Version Control Section */}
              <div className="mb-6">
                <h3 className="text-[11px] font-medium mb-1.5 text-base-content/50 px-2">Version Control</h3>
                <div className="space-y-0.5">
                  <div className="flex items-center px-2 py-1.5 hover:bg-base-200/50 rounded-lg cursor-pointer">
                    <GitBranch className="h-3.5 w-3.5 mr-2" />
                    <span>Branches</span>
                  </div>
                  <div className="flex items-center px-2 py-1.5 hover:bg-base-200/50 rounded-lg cursor-pointer">
                    <GitMerge className="h-3.5 w-3.5 mr-2" />
                    <span>Merge Models</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-9 space-y-3 overflow-y-auto pr-2 pointer-events-none select-none relative">
              {/* Top Controls */}
              <div className="flex gap-3 mb-4">
                <div className="flex-1">
                  <label className="text-[11px] text-base-content/60 mb-0.5 block">Simulation Type</label>
                  <select className="select select-bordered select-sm w-full h-8 min-h-8 cursor-default" disabled>
                    <option>Monte Carlo</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-[11px] text-base-content/60 mb-0.5 block">Iterations</label>
                  <select className="select select-bordered select-sm w-full h-8 min-h-8 cursor-default" disabled>
                    <option>10,000</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-[11px] text-base-content/60 mb-0.5 block">Confidence Level</label>
                  <select className="select select-bordered select-sm w-full h-8 min-h-8 cursor-default" disabled>
                    <option>95%</option>
                  </select>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-base-100 p-3 rounded-xl border border-base-content/10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-medium">Simulation Runs</h3>
                    <BarChart className="h-4 w-4 text-primary" />
                  </div>
                  <div className="mt-2">
                    <p className="text-2xl font-semibold">1,248</p>
                    <p className="text-[11px] text-base-content/60 mt-1">+12% from last week</p>
                  </div>
                </div>
                <div className="bg-base-100 p-3 rounded-xl border border-base-content/10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-medium">Avg. Accuracy</h3>
                    <LineChart className="h-4 w-4 text-success" />
                  </div>
                  <div className="mt-2">
                    <p className="text-2xl font-semibold">94.2%</p>
                    <p className="text-[11px] text-base-content/60 mt-1">+2.3% from last month</p>
                  </div>
                </div>
                <div className="bg-base-100 p-3 rounded-xl border border-base-content/10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-medium">Parameters Tuned</h3>
                    <Sliders className="h-4 w-4 text-warning" />
                  </div>
                  <div className="mt-2">
                    <p className="text-2xl font-semibold">87</p>
                    <p className="text-[11px] text-base-content/60 mt-1">+5 new parameters</p>
                  </div>
                </div>
                <div className="bg-base-100 p-3 rounded-xl border border-base-content/10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-medium">Compute Time</h3>
                    <Clock className="h-4 w-4 text-info" />
                  </div>
                  <div className="mt-2">
                    <p className="text-2xl font-semibold">42.3h</p>
                    <p className="text-[11px] text-base-content/60 mt-1">-15% optimization</p>
                  </div>
                </div>
              </div>

              {/* Chart Section */}
              <div className="bg-base-100 p-3 rounded-xl border border-base-content/10 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-medium">Simulation Accuracy vs Parameter Sensitivity</h3>
                  <div className="flex items-center gap-3 text-[11px] text-base-content/60">
                  </div>
                </div>
                <div className="h-[240px]">
                  <Line options={chartOptions} data={chartData} />
                </div>
              </div>

              {/* Parameter Tuning Section */}
              <div className="bg-base-100 p-3 rounded-xl border border-base-content/10 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-medium">Parameter Tuning</h3>
                  <div className="flex items-center gap-1 text-[11px] text-primary cursor-pointer">
                    <Settings className="h-3 w-3" />
                    <span>Advanced Settings</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {parameters.map((param, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-1/4 text-xs">{param.name}</div>
                      <div className="w-1/2">
                        <div className="h-1.5 w-full bg-gray-200 rounded-full">
                          <div 
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${((param.value - param.min) / (param.max - param.min)) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-1/4 text-xs text-right">{param.value}</div>
                    </div>
                  ))}
                </div>
                
                {/* Add Parameter Tuning Animation */}
                <ParameterTuningAnimation />
              </div>

              {/* Bottom Section */}
              <div className="grid grid-cols-2 gap-3">
                {/* Simulation Logs */}
                <div className="bg-base-100 p-3 rounded-xl border border-base-content/10">
                  <h3 className="text-xs font-medium mb-2">Simulation Logs</h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs p-1.5 hover:bg-base-200/50 rounded-lg">
                      <Activity className="h-3.5 w-3.5 text-success" />
                      <span>Monte Carlo simulation completed (10,000 iterations)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs p-1.5 hover:bg-base-200/50 rounded-lg">
                      <AlertTriangle className="h-3.5 w-3.5 text-warning" />
                      <span>Convergence warning in parameter optimization</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs p-1.5 hover:bg-base-200/50 rounded-lg">
                      <Terminal className="h-3.5 w-3.5 text-info" />
                      <span>Custom model function executed successfully</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs p-1.5 hover:bg-base-200/50 rounded-lg">
                      <GitBranch className="h-3.5 w-3.5 text-primary" />
                      <span>New model version created (v2.3.1)</span>
                    </div>
                  </div>
                  
                  {/* Add Simulation Run Animation */}
                  <SimulationRunAnimation />
                </div>

                {/* Technical Insights */}
                <div className="bg-base-100 p-3 rounded-xl border border-base-content/10">
                  <h3 className="text-xs font-medium mb-2">Technical Insights</h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs p-1.5 hover:bg-base-200/50 rounded-lg">
                      <TrendingUp className="h-3.5 w-3.5 text-success" />
                      <span>Optimal learning rate identified: 0.01</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs p-1.5 hover:bg-base-200/50 rounded-lg">
                      <Sigma className="h-3.5 w-3.5 text-warning" />
                      <span>Statistical significance achieved </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs p-1.5 hover:bg-base-200/50 rounded-lg">
                      <PieChart className="h-3.5 w-3.5 text-info" />
                      <span>Feature importance analysis completed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Model Components */}
              <div className="bg-base-100 p-3 rounded-xl border border-base-content/10 mt-3">
                <h3 className="text-xs font-medium mb-2">Model Components</h3>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs p-1.5 hover:bg-base-200/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Layers className="h-3.5 w-3.5" />
                      <span>Neural Network Layer (Dense, 128 units)</span>
                    </div>
                    <span className="text-[11px] text-base-content/60">Active</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-1.5 hover:bg-base-200/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Settings className="h-3.5 w-3.5" />
                      <span>Optimizer (Adam, lr=0.01)</span>
                    </div>
                    <span className="text-[11px] text-base-content/60">Active</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-1.5 hover:bg-base-200/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Plus className="h-3.5 w-3.5 text-primary" />
                      <span>Add Component</span>
                    </div>
                    <span className="text-[11px] text-primary">New</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar Section */}
              <div className="bg-base-100 p-3 rounded-xl border border-base-content/10 mt-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-medium">Current Simulation Progress</h3>
                  <div className="flex items-center gap-1 text-[11px] text-base-content/60">
                    <Clock className="h-3 w-3" />
                    <span>Est. time remaining: 2h 14m</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '68%' }} />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[11px] text-base-content/60">6,800 / 10,000 iterations</span>
                  <span className="text-[11px] text-base-content/60">68%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalystContent; 