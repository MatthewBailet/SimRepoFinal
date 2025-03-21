import { 

  ArrowUp,
  ArrowDown,
  ArrowUpRight
} from 'lucide-react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  TooltipItem,
  Scale,
  CoreScaleOptions,
  ChartOptions
} from 'chart.js';
import { useState, useEffect, useCallback } from 'react';
import React from 'react';

// Import the animation components

import SimulationHeroSection from './SimulationHeroSection';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface DashboardStats {
  totalRuns: number;
  avgRunTime: number;
  scenarios: number;
  confidence: number;
  favorableScenarios: number;
  financialGain: number;
  highSeverityRisks: number;
  riskExposure: number;
  trends: Record<string, { value: number; direction: 'up' | 'down' | null }>;
}

const initialStats: DashboardStats = {
  totalRuns: 1284,
  avgRunTime: 20.2,
  scenarios: 847,
  confidence: 92,
  favorableScenarios: 76,
  financialGain: 8.4,
  highSeverityRisks: 12,
  riskExposure: 4.2,
  trends: {
    totalRuns: { value: 0, direction: null },
    avgRunTime: { value: 0, direction: null },
    scenarios: { value: 0, direction: null },
    confidence: { value: 0, direction: null },
    favorableScenarios: { value: 0, direction: null },
    financialGain: { value: 0, direction: null },
    highSeverityRisks: { value: 0, direction: null },
    riskExposure: { value: 0, direction: null }
  }
};

interface StatCardProps {
  value: number;
  label: string;
  trend?: { value: number; direction: 'up' | 'down' | null };
  format?: (value: number) => string;
  formatTrend?: (value: number) => string;
}

const generateTimeSeriesData = () => {
  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (13 - i));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  const upsideData = Array.from({ length: 14 }, () => 
    Math.floor(85 + Math.random() * 10)
  );

  const downsideData = Array.from({ length: 14 }, () => 
    Math.floor(15 + Math.random() * 10)
  );

  const chartData: ChartData<'line'> = {
    labels: dates,
    datasets: [
      {
        label: 'Upside Potential',
        data: upsideData,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Downside Risk',
        data: downsideData,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  return chartData;
};




const BusinessContent = () => {

  const [isRunning] = useState(true);
  
  const [runCount, setRunCount] = useState(0);
  const [stuckProgress, setStuckProgress] = useState<number | null>(null);
  const [stuckDuration, setStuckDuration] = useState(0);

  const updateStats = useCallback(() => {
    setStats(prev => {
      const newStats = { ...prev };
      const trends = { ...prev.trends };

      // Always update total runs
      newStats.totalRuns += 1;
      trends.totalRuns = { value: 1, direction: 'up' };

      // Update other stats with reduced probability
      const updateProbabilities = {
        scenarios: 0.15,        // 15% chance
        confidence: 0.2,        // 20% chance
        riskExposure: 0.25,    // 25% chance
        favorableScenarios: 0.3, // 30% chance
        financialGain: 0.25,    // 25% chance
        highSeverityRisks: 0.1  // 10% chance
      };

      // Update scenarios
      if (Math.random() < updateProbabilities.scenarios) {
        newStats.scenarios += 1;
        trends.scenarios = { value: 1, direction: 'up' };
      }

      // Update confidence
      if (Math.random() < updateProbabilities.confidence) {
        const confidenceChange = Math.random() < 0.5 ? 0.1 : -0.1;
        newStats.confidence = Math.min(100, Math.max(0, newStats.confidence + confidenceChange));
        trends.confidence = { value: Math.abs(confidenceChange), direction: confidenceChange > 0 ? 'up' : 'down' };
      }

      // Update risk exposure
      if (Math.random() < updateProbabilities.riskExposure) {
        const riskChange = Math.random() < 0.4 ? 0.1 : -0.1;
        newStats.riskExposure = Math.min(100, Math.max(0, newStats.riskExposure + riskChange));
        trends.riskExposure = { value: Math.abs(riskChange), direction: riskChange > 0 ? 'up' : 'down' };
      }

      // Update favorable scenarios
      if (Math.random() < updateProbabilities.favorableScenarios) {
        const favorableChange = Math.random() < 0.6 ? 0.2 : -0.2;
        newStats.favorableScenarios = Math.min(100, Math.max(0, newStats.favorableScenarios + favorableChange));
        trends.favorableScenarios = { value: Math.abs(favorableChange), direction: favorableChange > 0 ? 'up' : 'down' };
      }

      // Update financial gain
      if (Math.random() < updateProbabilities.financialGain) {
        const gainChange = Math.random() < 0.55 ? 0.1 : -0.1;
        newStats.financialGain = Math.max(0, newStats.financialGain + gainChange);
        trends.financialGain = { value: Math.abs(gainChange), direction: gainChange > 0 ? 'up' : 'down' };
      }

      // Update high severity risks
      if (Math.random() < updateProbabilities.highSeverityRisks) {
        const riskDelta = Math.random() < 0.7 ? 1 : -1;
        newStats.highSeverityRisks = Math.max(0, newStats.highSeverityRisks + riskDelta);
        trends.highSeverityRisks = { value: 1, direction: riskDelta > 0 ? 'up' : 'down' };
      }

      return { ...newStats, trends };
    });
  }, []);

  const updateChart = useCallback(() => {
    setChartData(prev => {
      const newData = { ...prev };
      const lastUpside = (newData.datasets[0].data as number[])[13];
      const lastDownside = (newData.datasets[1].data as number[])[13];

      // Update data points
      newData.datasets[0].data = [
        ...(newData.datasets[0].data as number[]).slice(1),
        lastUpside + (Math.random() - 0.5) * 2
      ];
      newData.datasets[1].data = [
        ...(newData.datasets[1].data as number[]).slice(1),
        lastDownside + (Math.random() - 0.5) * 2
      ];

      return newData;
    });
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    // Random interval between 150-300ms for progress updates
    const baseInterval = Math.floor(Math.random() * (300 - 150 + 1) + 150);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        // Calculate estimated time remaining based on current progress
        const avgTimePerPercent = 250; // 25 seconds for 100%
        const remainingPercent = 100 - prev;
        const remainingMs = remainingPercent * avgTimePerPercent;
        const minutes = Math.floor(remainingMs / 60000);
        const seconds = Math.floor((remainingMs % 60000) / 1000);
        setEstimatedTimeRemaining(`${minutes}m ${seconds}s`);

        // If we're currently stuck, increment the stuck duration
        if (stuckProgress === prev) {
          setStuckDuration(d => d + 1);
          // If we've been stuck for long enough, continue
          if (stuckDuration > (Math.random() * 10 + 5)) {
            setStuckProgress(null);
            setStuckDuration(0);
            return prev + (Math.random() * 2 + 0.5);
          }
          return prev;
        }

        // Random chance to get stuck (5% chance)
        if (Math.random() < 0.05 && prev < 95) {
          setStuckProgress(prev);
          return prev;
        }

        if (prev >= 100) {
          // Simulation complete
          updateStats();
          setRunCount(c => c + 1);
          if (runCount % 3 === 0) {
            updateChart();
          }
          return 0;
        }

        // Random progress increment
        return prev + (Math.random() * 2 + 0.5);
      });
    }, baseInterval);

    return () => clearInterval(interval);
  }, [isRunning, updateStats, updateChart, runCount, stuckProgress, stuckDuration]);

  return (
    <div className="w-full">
      <SimulationHeroSection />
      
      <div className="p-8 pt-0 max-w-7xl mx-auto space-y-16 relative z-[5] scale-95">


      </div>
    </div>
  );
};

export default BusinessContent; 