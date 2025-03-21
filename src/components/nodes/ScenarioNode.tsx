import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Sliders } from 'lucide-react';

export type ScenarioData = {
  label: string;
  metadata: {
    description: string;
    tags: string[];
    created: string;
    modified: string;
  };
  [key: string]: unknown;
};

const ScenarioNode: React.FC<NodeProps> = ({ data }) => {
  const nodeData = data as ScenarioData;
  
  return (
    <div className="relative bg-white border border-gray-200 rounded-lg shadow-sm p-4 min-w-[300px] max-w-[300px]">
      {/* Label above node */}
      <div className="absolute -top-6 left-0">
        <span className="text-xs font-medium text-gray-500">Primary Scenario</span>
      </div>

      {/* Main content */}
      <div className="space-y-3">
        {/* Timestamp */}
        <div className="text-[11px] text-gray-400 font-medium select-none">
          Created {new Date(nodeData.metadata.created).toLocaleString()}
        </div>

        {/* Query text */}
        <div className="text-sm text-gray-700 font-medium border-b border-gray-100 pb-3">
          {nodeData.label}
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">Data sources:</span>
            <span className="text-xs font-medium text-gray-700">11</span>
          </div>
          <button className="p-1 rounded-md hover:bg-gray-50 text-gray-500 transition-colors">
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Handles for connections */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-blue-500 !border-2 !border-white !w-3 !h-3 !top-[-6px]"
      />
    </div>
  );
};

export default ScenarioNode; 